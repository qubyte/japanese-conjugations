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
      return { name: c, enabled: res.locals.conjugations.includes(c) };
    }),
    kanjiOptional: res.locals.kanjiOptional
  });
});

app.get('/test', (req, res) => {
  const conjugation = pick(res.locals.conjugations);
  const { plain, kana } = pick(verbs);

  res.render('test', { conjugation, plain, kana });
});

app.get('/check', (req, res) => {
  const { plain, conjugation, guess } = req.query;
  const verb = verbs.find(verb => verb.plain === plain);
  const trimmed = guess.replace(/[\x08|\s]/g, '');
  const kanjiOptional = res.locals.kanjiOptional;
  const { kanji, kana } = verb[conjugation];
  console.log({ kanji, kana, kanjiOptional })
  const result = kanji === trimmed || kanjiOptional && kana === trimmed;

  res.render('check', { result, guess, kanji, kana });
});

app.listen(3000, console.log('Listening.'));
