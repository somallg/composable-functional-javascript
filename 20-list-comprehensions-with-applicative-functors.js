/* @flow */

import { List } from 'immutable-ext';

// Problem
// for (x in xs) {
//   for (y in ys) {
//     for (z in zs) {
//
//     }
//   }
// }

const mech = () =>
  List.of(x => y => `${x}-${y}`)
    .ap(List(['tshirt', 'sweater']))
    .ap(List(['large', 'medium', 'small']));

const res = mech();

console.log(res);
