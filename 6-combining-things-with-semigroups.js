/* @flow */

import { Map } from 'immutable-ext';

import { Sum, All, First } from './6-semigroup';

const res1 = 'a'.concat('b').concat('c');

const res2 = Sum(1).concat(Sum(2));

const res3 = First('blah').concat(First('another'));

console.log(res1, res2, res3);

const acc1 = Map({ name: First('Nico'), isPaid: All(true), points: Sum(10), friends: ['Franklin'] });

const acc2 = Map({ name: First('Nico'), isPaid: All(false), points: Sum(2), friends: ['Gatsby'] });

const res = acc1.concat(acc2);

console.log(res.toJS());
