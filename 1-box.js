/* @flow */

export type Func = (x: any) => any;

export const Box = (x: number | string) => ({
  ap: (b2: Box) => b2.map(x),
  chain: (f: Func) => f(x),
  map: (f: Func) => Box(f(x)),
  fold: (f: Func) => f(x),
  of: (x: number | string) => Box(x),
  inspect: () => `Box(${x.toString()})`
});

export const id = (x: mixed) => x;

Box.of = x => Box(x);
