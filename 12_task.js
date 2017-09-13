const Task = require('data.task');

const launchMissiles = () =>
  new Task((reject, resolve) => {
    console.log('launch missiles!');
    resolve('missile');
  });

// Task.rejected(1) // Task(1)
launchMissiles()
  .map(x => x + '!')
  .map(x => x + '!')
  .fork(e => console.log('error', e),
    x => console.log('success', x));
