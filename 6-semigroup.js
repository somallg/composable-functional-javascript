/* @flow */

export const Sum = (x: number) => ({
  x,
  concat: ({ x: y }: Sum) => Sum(x + y),
  inspect: () => `Sum(${x})`
});
Sum.empty = () => Sum(0);

export const All = (x: boolean) => ({
  x,
  concat: ({ x: y }: All) => All(x && y),
  inspect: () => `All(${x.toString()})`
});
All.empty = () => All(true);

export const First = (x: any) => ({
  x,
  concat: (y: First) => First(x),
  inspect: () => `First(${x})`
});
