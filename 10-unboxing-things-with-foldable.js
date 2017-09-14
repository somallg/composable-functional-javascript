/* @flow */

import { Map, List } from 'immutable-ext';

const Sum = (x: number) =>
  ({
    x,
    concat: ({ x: y }: Sum) => Sum(x + y),
    inspect: () => `Sum(${x})`
  });
Sum.empty = () => Sum(0);

const res = List.of(1, 2, 3)
  .foldMap(Sum, Sum.empty());
  //List.of(Sum(1), Sum(2), Sum(3))
  //.fold(Sum.empty());
  //.reduce((acc, x) => acc.concat(x), Sum.empty());

console.log(res);
