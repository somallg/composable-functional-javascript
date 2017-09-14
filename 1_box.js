/* @flow */

export type Func = (x: any) => any;

export const Box = (x: number | string) => ({
  ap: (b2: Box) => b2.map(x),
  chain: (f: Func) => f(x),
  map: (f: Func) => Box(f(x)),
  fold: (f: Func) => f(x),
  inspect: () => `Box(${x})`
});

Box.of = x => Box(x);
