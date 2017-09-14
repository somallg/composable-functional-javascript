/* @flow */

import fs from 'fs';
import { tryCatch } from './3_either';

const getPort = () =>
  tryCatch(() => fs.readFileSync('config.json'))
    .map(
      (e: string) => JSON.parse(e)
    )
    .fold(
      (e: any) => e,
      (e: any) => e
    );

// const getPort = () => {
//   try {
//     const str = fs.readFileSync('config.json');
//     const config = JSON.parse(str);
//     return config.port;
//   } catch (e) {
//     return 3000;
//   }
// };

//const result = Left(3).map(x => x + 1).map(x => x / 2).fold(x => 'error', x => x);
const result = getPort();
console.log(result);
