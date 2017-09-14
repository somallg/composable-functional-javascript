/* @flow */

// any type with map method and follow those 2 laws below
// fx.map(f).map(g) === fx.map(g(f(x)))
// fx.map(id) === id(fx)

import { Box, id } from './1-box';

const res1 = Box('functors')
  .map((x: string) => x.substr(5))
  .map((x: string) => x.toUpperCase());

const res2 = Box('functors')
  .map((x: string) => x.substr(5).toUpperCase());

console.log(res1, res2);

const res3 = Box('functors')
  .map(id);

const res4= id(Box('functors'));

console.log(res3, res4);
