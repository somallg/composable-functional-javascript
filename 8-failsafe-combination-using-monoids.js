/* @flow */

const sum = xs =>
  xs.reduce((acc, x) => acc + x, 0);

const all = xs =>
  xs.reduce((acc, x) => acc & x, true);

const first = xs =>
  xs.reduce((acc, x) => acc);

console.log(first([]));

