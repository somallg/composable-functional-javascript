/* @flow */

export const Box = (x: any) => ({
  ap: (b2: Box) => b2.map(x),
  chain: (f: (x) => mixed) => f(x),
  map: (f: (x) => mixed) => Box(f(x)),
  fold: (f: (x) => mixed) => f(x),
  inspect: () => `Box(${x})`
});
Box.of = x => Box(x);

const mapToCharCode = (x: any) =>
  Box(x)
    .map((s: string) => s.trim())
    .map((s: string) => Number(s))
    .map((i: number) => i + 1)
    .map((c: number) => String.fromCharCode(c))
    .fold(c => c);

// console.log(mapToCharCode('  65  '));
