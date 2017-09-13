const Sum = x => ({
  x,
  concat: ({ x: y }) => Sum(x + y),
  inspect: () => `Sum(${x})`
});
Sum.empty = () => Sum(0);

const All = x => ({
  x,
  concat: ({ x: y }) => All(x && y),
  inspect: () => `All(${x})`
});
All.empty = () => All(true);

const First = x => ({
  x,
  concat: _ => First(x),
  inspect: () => `First(${x})`
});

const sum = xs =>
  xs.reduce((acc, x) => acc + x, 0);

const all = xs =>
  xs.reduce((acc, x) => acc & x, true);

const first = xs =>
  xs.reduce((acc, x) => acc);

console.log(first([]));

