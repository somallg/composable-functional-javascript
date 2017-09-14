/* @flow */

import fs from 'fs';

import { tryCatch } from './3-either';

const getPort = () =>
  tryCatch(() => fs.readFileSync('config.json'))
    .chain((e: string) => tryCatch(() => JSON.parse(e)))
    .fold(e => e,
          e => e.port);

const getPortI = () => {
  try {
    const str = fs.readFileSync('config.json');
    const config = JSON.parse(str.toString());
    return config.port;
  } catch (e) {
    return 3000;
  }
};

const result = getPort();
console.log(result);
