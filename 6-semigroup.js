/* @flow */

import type { Func } from './1-box';

export const Sum = (x: number) =>
  ({
    x,
    concat: ({ x: y }: Sum) => Sum(x + y),
    inspect: () => `Sum(${x})`
  });
Sum.empty = () => Sum(0);

export const All = (x: boolean) =>
  ({
    x,
    concat: ({ x: y }: All) => All(x && y),
    inspect: () => `All(${x.toString()})`
  });
All.empty = () => All(true);

export const First = (x: any) =>
  ({
    x,
    concat: (y: First) => First(x),
    inspect: () => `First(${x})`
  });

export const Pair = (x: any, y: any) =>
  ({
    x,
    y,
    bimap: (f: Func, g: Func) => Pair(f(x), g(y)),
    toList: () => [x, y],
    concat: ({ x: x1, y: y1 }: Pair) =>
      Pair(x.concat(x1), y.concat(y1)),
    inspect: () => `Pair(${x}, ${y})`
  });
