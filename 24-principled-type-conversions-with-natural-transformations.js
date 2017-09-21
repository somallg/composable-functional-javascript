/* @flow */

import Task from 'data.task';

import { Box } from './1-box';
import { Either, Right, Left, fromNullable } from './3-either';

// eitherToTask is a natural transformation
const eitherToTask = e =>
  e.fold(Task.rejected, Task.of);

// eitherToTask(Left('right'))
//   .fork((e) => console.log('err', e), (e) => console.log('res', e));

// boxToEither is a nt
const boxToEither = b =>
  b.fold(Right);

const res1 = boxToEither(Box(10)).map(x => x * 2);
const res2 = boxToEither(Box(10).map(x => x * 2));
// console.log(res1, res2);

// first is a nt?
const first = xs =>
  fromNullable(xs[0]);

const res3 = first([2, 3, 4]).map(x => x * 10);
const res4 = first([2, 3, 4].map(x => x * 10));
console.log(res3, res4);

