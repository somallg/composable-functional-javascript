/* @flow */

import { Box } from './1-box';

const mapToCharCode = (x: any) =>
  Box(x)
    .map((s: string) => s.trim())
    .map((s: string) => Number(s))
    .map((i: number) => i + 1)
    .map((c: number) => String.fromCharCode(c))
    .fold(c => c);

console.log(mapToCharCode('  65  '));
