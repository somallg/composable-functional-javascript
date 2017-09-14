/* @flow */

type FuncType = (x: any) => mixed;

export const Right = (x: any) => ({
  chain: (f: FuncType) => f(x),
  map: (f: FuncType) => Right(f(x)),
  fold: (f: FuncType, g: FuncType) => g(x),
  inspect: () => `Right(${x})`
});

export const Left = (x: any) => ({
  chain: (f: FuncType) => Left(x),
  map: (f: FuncType) => Left(x),
  fold: (f: FuncType, g: FuncType) => f(x),
  inspect: () => `Left(${x})`
});

export const Either = {
  of: (x: mixed) => Right(x)
};

export const tryCatch = (f: () => mixed) => {
  try {
    return Right(f());
  } catch (e) {
    return Left(e);
  }
};

export const fromNullable = (x: mixed) => !!x ? Right(x) : Left(x);

const findColor = name => fromNullable({ red: '#ff4444', blue: '#3b5998', yellow: '#fff68f' }[name]);

//const result = Left(3).map(x => x + 1).map(x => x / 2).fold(x => 'error', x => x);
const result = findColor('red')
  .map((c: string) => c.slice(1))
  .fold(c => 'no color',
    (c: string) => c.toUpperCase());

// console.log(result);
