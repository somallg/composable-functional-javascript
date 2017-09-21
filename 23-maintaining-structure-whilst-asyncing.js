/* @flow */

// We take our Promise.all() analogy further by using traversable on a Map(). Then we use two traversals in the same workflow.

import fs from 'fs';
import Task from 'data.task';
import { List, Map } from 'immutable-ext';

const httpGet = (path: string, params: mixed) =>
  Task.of(`${path}: result`);

Map({ home: ['/', '/home'], about: ['/about'], blog: ['/blog'] })
  .traverse(Task.of, routes =>
    List(routes).traverse(Task.of, route => httpGet(route, {})))
  .fork(console.error, console.log);
