/* @flow */

import { fromNullable } from './3_either';

const findColor = name => fromNullable({ red: '#ff4444', blue: '#3b5998', yellow: '#fff68f' }[name]);

const result = findColor('red')
  .map((c: string) => c.slice(1))
  .fold(c => 'no color',
    (c: string) => c.toUpperCase());

console.log(result);
