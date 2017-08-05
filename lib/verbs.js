'use strict';

const godanModifiers = require('./godan-modifiers');

function buildConjugated(verb, suffix) {
  const kanjiStem = verb.plain.slice(0, -1);
  const kanaStem = verb.kana.slice(0, -1);

  return {
    kanji: kanjiStem + suffix,
    kana: kanaStem + suffix
  };
}

function addIchidan(verb) {
  verb.masu = buildConjugated(verb, 'ます');
  verb.masen = buildConjugated(verb, 'ません');
  verb.mashita = buildConjugated(verb, 'ました');
  verb.masendeshita = buildConjugated(verb, 'ませんでした');
  verb.nai = buildConjugated(verb, 'ない');
  verb.ta = buildConjugated(verb, 'た');
  verb.nakatta = buildConjugated(verb, 'なかった');
  verb.te = buildConjugated(verb, 'て');
  verb.imperative = buildConjugated(verb, 'て');
  verb.volitional = buildConjugated(verb, 'よう');
  verb.passive = buildConjugated(verb, 'られる');
  verb.causative = buildConjugated(verb, 'させる');
  verb.hypothetical = buildConjugated(verb, 'れば');
  verb.potential = buildConjugated(verb, 'られる');
  verb.mashyou = buildConjugated(verb, 'ましょう');
}

function addGodan(verb) {
  const modifiers = godanModifiers[verb.plain.slice(-1)];

  verb.masu = buildConjugated(verb, modifiers.i + 'ます');
  verb.masen = buildConjugated(verb, modifiers.i + 'ません');
  verb.mashita = buildConjugated(verb, modifiers.i + 'ました');
  verb.masendeshita = buildConjugated(verb, modifiers.i + 'ませんでした');
  verb.nai = buildConjugated(verb, modifiers.a + 'ない');
  verb.ta = buildConjugated(verb, modifiers.ta);
  verb.nakatta = buildConjugated(verb, modifiers.a + 'なかった');
  verb.te = buildConjugated(verb, modifiers.te);
  verb.imperative = buildConjugated(verb, modifiers.e);
  verb.volitional = buildConjugated(verb, modifiers.ou);
  verb.passive = buildConjugated(verb, modifiers.a + 'れる');
  verb.causitive = buildConjugated(verb, modifiers.a + 'せる');
  verb.hypothetical = buildConjugated(verb, modifiers.e + 'ば');
  verb.potential = buildConjugated(verb, modifiers.e + 'る');
  verb.mashyou = buildConjugated(verb, modifiers.i + 'ましよう');
}

function addSuru(verb) {
  verb.masu = { kanji: 'します', kana: 'します' };
  verb.masen = { kanji: 'しません', kana: 'しません' };
  verb.mashita = { kanji: 'しました', kana: 'しました' };
  verb.masendeshita = { kanji: 'しませんでした', kana: 'しませんでした' };
  verb.nai = { kanji: 'しない', kana: 'しない' };
  verb.ta = { kanji: 'した', kana: 'した' };
  verb.nakatta = { kanji: 'しなかった', kana: 'しなかった' };
  verb.te = { kanji: 'して', kana: 'して' };
  verb.imperative = { kanji: 'しろ', kana: 'しろ' };
  verb.volitional = { kanji: 'しよう', kana: 'しよう' };
  verb.passive = { kanji: 'される', kana: 'される' };
  verb.causative = { kanji: 'させる', kana: 'させる' };
  verb.hypothetical = { kanji: 'されば', kana: 'されば' };
  verb.potential = { kanji: 'できる', kana: 'できる' };
  verb.mashyou = { kanji: 'しましょう', kana: 'しましょう' };
}

function addKuru(verb) {
  verb.masu = { kanji: '来ます', kana: '来ます' };
  verb.masen = { kanji: '来ません', kana: '来ません' };
  verb.mashita = { kanji: '来ました', kana: '来ました' };
  verb.masendeshita = { kanji: '来ませんでした', kana: '来ませんでした' };
  verb.nai = { kanji: '来ない', kana: '来ない' };
  verb.ta = { kanji: '来た', kana: '来た' };
  verb.nakatta = { kanji: '来なかった', kana: '来なかった' };
  verb.te = { kanji: '来て', kana: '来て' };
  verb.imperative = { kanji: '来い', kana: '来い' };
  verb.volitional = { kanji: '来よう', kana: '来よう' };
  verb.passive = { kanji: '来られる', kana: '来られる' };
  verb.causative = { kanji: '来させる', kana: '来させる' };
  verb.hypothetical = { kanji: '来れば', kana: '来れば' };
  verb.potential = { kanji: '来られる', kana: '来られる' };
  verb.mashyou = { kanji: '来ましょう', kana: '来ましょう' };
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

exports.verbs = require('./verb-data').map(buildVerb);

exports.conjugations = [
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
