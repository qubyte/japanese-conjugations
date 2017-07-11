'use strict';

const { conjugations } = require('../lib/verbs');
const cookieName = 'japanese-conjugations-settings';
const cookieOpts = Object.freeze({ httpOnly: true, secure: true });

function getSettings(req, res, next) {
  let enabled;

  if (req.query.settings === 'true') {
    enabled = conjugations.filter(c => req.query[c] === 'true');
    res.cookie(cookieName, enabled, cookieOpts);
  } else {
    enabled = req.cookies[cookieName];
  }
  
  res.locals.enabled = enabled;

  next();
}

module.exports = getSettings;