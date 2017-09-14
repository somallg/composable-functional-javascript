/* @flow */

import type { Func } from './1-box';

const LazyBox = (g: Func) =>
  ({
    fold: (f: Func) => f(g()),
    map: (f: Func) => LazyBox(() => f(g())),
    inspect: () => `LazyBox(${g.toString()})`
  });

const res = LazyBox(x => '  64   ')
  .map((s: string) => {
    console.log('trim');
    return s.trim()
  }) // => () => (func s => s.trim())(x => '64')
  .map((s: string) => {
    console.log('Number');
    return Number(s)
  }) // => () => Number()
  .map((i: number) => i + 1) // => () => i + Number()
  .map((c: number) => String.fromCharCode(c)) // () => () => a.fromCharCode
  .fold(c => c);

console.log(res);
