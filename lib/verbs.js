'use strict';

const verbData = require('./verb-data');
const godanModifiers = require('./godan-modifiers');

function addIchidan(verb) {
  const stem = verb.plain.slice(0, -1);
  
  verb.masu = stem + 'ます';
  verb.masen = stem + 'ません';
  verb.mashita = stem + 'ました';
  verb.masendeshita = stem + 'ませんでした';
  verb.nai = stem + 'ない';
  verb.ta = stem + 'た';
  verb.nakatta = stem + 'なかった';
  verb.te = stem + 'て';
  verb.imperative = stem + 'て';
  verb.volitional = stem + 'よう';
  verb.passive = stem + 'られる';
  verb.causative = stem + 'させる';
  verb.hypothetical = stem + 'れば';
  verb.potential = stem + 'られる';
  verb.mashyou = stem + 'ましょう';
}

function addGodan(verb) {
  const stem = verb.plain.slice(0, -1);
  const modifiers = godanModifiers[verb.plain.slice(-1)]

  verb.masu = stem + modifiers.i + 'ます';
  verb.masen = stem + modifiers.i + 'ません';
  verb.mashita = stem + modifiers.i + 'ました';
  verb.masendeshita = stem + modifiers.i + 'ませんでした';
  verb.nai = stem + modifiers.a + 'ない';
  verb.ta = stem + modifiers.ta;
  verb.nakatta = stem + modifiers.a + 'なかった';
  verb.te = stem + modifiers.te;
  verb.imperative = stem + modifiers.e;
  verb.volitional = stem + modifiers.ou;
  verb.passive = stem + modifiers.a + 'れる';
  verb.causitive = stem + modifiers.a + 'せる';
  verb.hypothetical = stem + modifiers.e + 'ば';
  verb.potential = stem + modifiers.e + 'る';
  verb.mashyou = stem + modifiers.i + 'ましよう';
}

function addSuru(verb) {
  verb.masu = 'します';
  verb.masen = 'しません';
  verb.mashita = 'しました';
  verb.masendeshita = 'しませんでした';
  verb.nai = 'しない';
  verb.ta = 'した';
  verb.nakatta = 'しなかった';
  verb.te = 'して';
  verb.imperative = 'しろ';
  verb.volitional = 'しよう';
  verb.passive = 'される';
  verb.causative = 'させる';
  verb.hypothetical = 'されば';
  verb.potential = 'できる';
  verb.mashyou = 'しましょう';
}

function addKuru(verb) {
  verb.masu = '来ます';
  verb.masen = '来ません';
  verb.mashita = '来ました';
  verb.masendeshita = '来ませんでした';
  verb.nai = '来ない';
  verb.ta = '来た';
  verb.nakatta = '来なかった';
  verb.te = '来て';
  verb.imperative = '来い';
  verb.volitional = '来よう';
  verb.passive = '来られる';
  verb.causative = '来させる';
  verb.hypothetical = '来れば';
  verb.potential = '来られる';
  verb.mashyou = '来ましょう';
}

function buildVerb(datum) {
  const verb = {
    plain: datum.kanji,
    kana: datum.kana,
    meaning: datum.meaning,
    type: datum.type,
    kind: datum.kind
  };
  
  switch (verb.kind) {
    case 'ichidan':
      addIchidan(verb);
      break;
    case 'godan':
      addGodan(verb);
      break;
    case 'suru':
      addSuru(verb);
      break;
    case 'kuru':
      addKuru(verb);
      break;
  }
  
  return verb;
}

module.exports = verbData.map(buildVerb);

module.exports.forms = [
  'plain',
  'masu',
  'masen',
  'mashita',
  'masendeshita',
  'nai',
  'ta',
  'nakatta',
  'te',
  'imperative',
  'volitional',
  'passive',
  'causative',
  'hypothetical',
  'potential',
  'mashyou'
];
