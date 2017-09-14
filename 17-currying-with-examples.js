/* @flow */

import type { Func } from './1-box';

const add = (x: number) => (y: number) => x + y;

const inc = add(1); // y => 1 + y

const modulo = (dvr: number) => (dvd: number) => dvd % dvr;

const isOdd = modulo(2);

const filter = (predicate: Func) => (xs: mixed[]) => xs.filter(predicate);

const map = (f: Func) => (xs: mixed[])=> xs.map(f);

const getAllOdds = filter(isOdd);

const replace = (regex: RegExp) => (repl: string) => (str: string) =>
  str.replace(regex, repl);

const censor = replace(/[aieou]/ig)('*');

const censorAll = map(censor);

const res = censorAll(['hello', 'world']);

console.log(res);
