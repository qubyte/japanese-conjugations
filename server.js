'use strict';

const express = require('express');
const cookieParser = require('cookie-parser');
const { verbs, conjugations } = require('./lib/verbs');
const pick = require('./lib/pick');
const app = express();

app.set('view engine', 'hbs');
app.use(express.static('public'));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.render('index', {
    conjugations: conjugations.map(form => ({ name: form }))
  });
});

function getSettings(req, res, next) {
  if (req.query.settings === 'true') {
    res.locals.conjugations = conjugations.filter(conjugation => req.query[conjugation] === 'true');
    res.cookie('japanese-conjugations-settings', res.locals.conjugations, { httpOnly: true, secure: true });
  } else {
    res.locals.conjugations = req.cookies['japanese-conjugations-settings'];
  }

  next();
}

app.get('/test', getSettings, (req, res) => {
  const conjugation = pick(res.locals.conjugations);
  const { plain, kana } = pick(verbs);
  
  res.render('test', { conjugation, plain, kana });
});

app.get('/check', (req, res) => {
  const plain = req.query.plain;
  const conjugation = req.query.conjugation;
  const guess = req.query.guess.trim();
  const verb = verbs.find(verb => verb.plain === plain);
  const actual = verb[conjugation];
  const result = actual === guess;

  res.render('check', { result, guess, actual });
});

app.listen(3000, console.log('Listening.'));
