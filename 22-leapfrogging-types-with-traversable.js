/* @flow */

import fs from 'fs';
import Task from 'data.task';
import { futurize } from 'futurize';
import { List } from 'immutable-ext';

console.log(futurize);

const future = futurize(Task);

const readFile = future(fs.readFile);

const files = ['1-box.js', 'config.json'];

const res = files.map(fn => readFile(fn, 'utf-8'));
// The problem we got
// [Task, Task]
// but we want Task([res1, res2])

// solution traverse
List(files).traverse(Task.of, fn => readFile(fn, 'utf-8'))
  .fork(console.error, console.log);


