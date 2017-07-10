'use strict';

const express = require('express');
const cookieParser = require('cookie-parser');
const verbs = require('./lib/verbs');
const pick = require('./lib/pick');
const app = express();

app.set('view engine', 'hbs');
app.use(express.static('public'));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.render('index', {
    forms: verbs.forms.map(form => ({ name: form }))
  });
});

function getSettings(req, res, next) {
  if (req.query.settings === 'true') {
    res.locals.forms = verbs.forms.filter(form => req.query[form] === 'true');
    res.cookie('japanese-conjugations-settings', res.locals.forms, { httpOnly: true, secure: true });
  } else {
    res.locals.forms = req.cookies['japanese-conjugations-settings'];
  }

  next();
}

app.get('/test', getSettings, (req, res) => {
  const form = pick(res.locals.forms);
  const { plain, kana } = pick(verbs);
  
  res.render('test', { form, plain, kana });
});

app.get('/check', (req, res) => {
  const plain = req.query.plain;
  const form = req.query.form;
  const guess = req.query.guess.trim();
  const verb = verbs.find(verb => verb.plain === plain);
  const actual = verb[form];
  const result = actual === guess;

  res.render('check', { result, guess, actual });
});

app.listen(3000, console.log('Listening.'));
