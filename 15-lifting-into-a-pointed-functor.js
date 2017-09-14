/* @flow */

import Task from 'data.task';

import { Box } from './1-box';
import { Either } from './3-either';

Task.of('hello'); // Task('hello')
// Either.of('hello');// Right('hello')
Box.of(100);
