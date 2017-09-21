/* flow */

import { List } from 'immutable-ext';

import Task from 'data.task';
import { Right, Left } from './3-either';

const fake = (id: number) =>
  ({ id, name: 'user1', best_friend_id: id + 1 });

const Db = ({
  find: id =>
    new Task((reject, resolve) =>
      resolve(id > 2 ? Right(fake(id)) : Left('not found')))
});

const eitherToTask = e =>
  e.fold(Task.rejected, Task.of);

// Db.find(3) // Task(Either({}))
//   .chain(either =>
//     either.chain(user => Db.find(user.best_friend_id))
//   ) // Task(Either({}))
//   .fork(console.log, console.log);

Db.find(3) // Task(Either({}))
  .chain(eitherToTask) // Task({})
  .chain(user => Db.find(user.best_friend_id)) // Task(Either({})
  .chain(eitherToTask)
  .fork(console.log, console.log);
