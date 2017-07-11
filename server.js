'use strict';

const express = require('express');
const cookieParser = require('cookie-parser');
const { verbs, conjugations } = require('./lib/verbs');
const getSettings = require('./middleware/get-settings');
const pick = require('./lib/pick');
const app = express();

app.set('view engine', 'hbs');
app.use(express.static('public'));
app.use(cookieParser());
app.use(getSettings);

app.get('/', (req, res) => {
  res.render('index', {
    conjugations: conjugations.map(c => { 
      return { name: c, enabled: res.locals.enabled.includes(c) };
    })
  });
});

app.get('/test', (req, res) => {
  const conjugation = pick(res.locals.enabled);
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
