/* @flow */

import { Box, id } from './1-box';

// httpGet('/user')
//   .chain(user =>
//     httpGet('/comment/${user.id}')
//       .chain(comments =>
//         updateDOM(user, comments))); // => Task(Task(Task(DOM)))

const join = (m: any) =>
  m.chain(id);

// law 1 join(m.map(join)) === join(join(m))
// const m = Box(Box(Box(10)));
// const res1 = join(m.map(join));
// const res2 = join(join(m));

// law 2 join(Box.of(m)) === join(m.map(Box.of))
const m = Box(10);
const res1 = join(Box.of(m));
const res2 = join(m.map(Box.of));

console.log(res1, res2);
