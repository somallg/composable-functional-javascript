/* @flow */

import { List } from 'immutable-ext';
import type { Func } from './1-box';

const fromNullable = x => !!x ? Right(x) : Left(x);

const Sum = (x: number) =>
  ({
    x,
    concat: ({ x: y }: Sum) => Sum(x + y),
    inspect: () => `Sum(${x})`
  });
Sum.empty = () => Sum(0);

const Product = (x: number) =>
  ({
    x,
    concat: ({ x: y }: Product) => Product(x * y),
    inspect: () => `Product(${x})`
  });
Product.empty = () => Product(1);

const Any = (x: boolean) =>
  ({
    x,
    concat: ({ x: y }: Any) => Any(x || y)
  });
Any.empty = () => Any(false);

const All = (x: boolean) =>
  ({
    x,
    concat: ({ x: y }: All) => All(x && y)
  });
All.empty = () => All(true);

const Max = (x: number) =>
  ({
    x,
    concat: ({ x: y }: Max) => Max(x > y ? x : y)
  });
Max.empty = () => Max(-Infinity);

const Min = (x: number) =>
  ({
    x,
    concat: ({ x: y }: Min) => Min(x < y ? x : y)
  });
Min.empty = () => Min(Infinity);

type Either = Right | Left;

const Right = (x: any) =>
  ({
    fold: (f: Func, g: Func) => g(x),
    map: (f: Func) => Right(f(x)),
    concat: (o: Either) =>
      o.fold(e => Left(e),
             r => Right(x.concat(r)))
  });

const Left = (x: any) =>
  ({
    fold: (f: Func, g: Func) => f(x),
    map: (f: Func) => Left(x),
    concat: (o: Either) => Left(x),
    isLeft: true,
  });

const First = (either: Either) =>
  ({
    fold: (f: Func) => f(either),
    concat: (o: Either) =>
      either.isLeft ? o : First(either)
  });
First.empty = () => First(Left());

const stats = List.of(
  { page: 'Home', views: 40 },
  { page: 'About', views: 10 },
  { page: 'Blog', views: null });

const result = stats.foldMap(x =>
  fromNullable(x.views).map(Sum), Right(Sum(0)))
  .fold(e => console.log(e),
        r => console.log(r));

const find = (xs, f) =>
  List(xs)
    .foldMap(x =>
      First(f(x) ? Right(x) : Left()), First.empty())
    .fold(x => x);

console.log(find([3, 4, 5, 6, 7], x => x > 4));
