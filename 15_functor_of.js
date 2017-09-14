const Task = require('data.task');
const Box = require('./1_box');
const Either = require('./3_either');

Task.of('hello'); // Task('hello')
Either.of('hello');// Right('hello')
Box.of(100);
