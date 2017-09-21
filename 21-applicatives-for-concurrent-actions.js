/* @flow */

import Task from 'data.task';

type ProjectType = {
  id: string,
  title: string,
}

const Db = ({
  find: (id: string) =>
    new Task((reject, resolve) =>
      setTimeout(() =>
        resolve({ id, title: `Project ${id}`}), 1000))
});

const reportHeader = (p1: ProjectType, p2: ProjectType) =>
  `Report: ${p1.title} compared to ${p2.title}`;

// Normal chainning call
const start = new Date().getTime();
Db.find('20').chain(p1 =>
  Db.find('80').map(p2 =>
    reportHeader(p1, p2))
)
  //.fork(console.error, (e) => console.log(e, new Date().getTime() - start));

// Concurrent call
Task.of((p1: ProjectType) => (p2: ProjectType) => reportHeader(p1, p2))
  .ap(Db.find('20'))
  .ap(Db.find('80'))
  .fork(console.error, (e) => console.log(e, new Date().getTime() - start));
