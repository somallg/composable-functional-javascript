/* @flow */

import type { Func } from './1_box';

export const Right = (x: any) => ({
  chain: (f: Func) => f(x),
  map: (f: Func) => Right(f(x)),
  fold: (f: Func, g: Func) => g(x),
  inspect: () => `Right(${x})`
});

export const Left = (x: any) => ({
  chain: (f: Func) => Left(x),
  map: (f: Func) => Left(x),
  fold: (f: Func, g: Func) => f(x),
  inspect: () => `Left(${x})`
});

export const Either = Right || Left;
Either.of = (x: mixed) => Right(x)

export const tryCatch = (f: () => mixed) => {
  try {
    return Right(f());
  } catch (e) {
    return Left(e);
  }
};

export const fromNullable = (x: mixed) => !!x ? Right(x) : Left(x);
