'use strict';

const { random, floor } = Math;

function pick(array) {
  return array[floor(random() * array.length)];
}

module.exports = pick;
