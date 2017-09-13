const { List } = require('immutable-ext');

const fromNullable = x => !!x ? Right(x) : Left(x);

const Sum = x =>
  ({
    x,
    concat: ({ x: y }) => Sum(x + y),
    inspect: () => `Sum(${x})`
  });
Sum.empty = () => Sum(0);

const Product = x =>
  ({
    x,
    concat: ({ x: y }) => Product(x * y),
    inspect: () => `Product(${x})`
  });
Product.empty = () => Product(1);

const Any = x =>
  ({
    x,
    concat: ({ x: y }) => Any(x || y)
  });
Any.empty = () => Any(false);

const All = x =>
  ({
    x,
    concat: ({ x: y }) => All(x && y)
  });
All.empty = () => All(true);

const Max = x =>
  ({
    x,
    concat: ({ x: y }) => Max(x > y ? x : y)
  });
Max.empty = () => Max(-Infinity);

const Min = x =>
  ({
    x,
    concat: ({ x: y }) => Min(x < y ? x : y)
  });
Min.empty = () => Min(Infinity);

const Right = x =>
  ({
    fold: (f, g) => g(x),
    map: f => Right(f(x)),
    concat: o =>
      o.fold(e => Left(e),
        r => Right(x.concat(r))),
    inspect: () => `Right(${x})`
  });

const Left = x =>
  ({
    fold: (f, g) => f(x),
    map: f => Left(x),
    concat: o => Left(x),
    isLeft: true,
  });

const First = either =>
  ({
    fold: f => f(either),
    concat: o =>
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
