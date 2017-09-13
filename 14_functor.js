// any type with map method and follow those 2 laws below
// fx.map(f).map(g) === fx.map(g(f(x)))
// fx.map(id) === id(fx)

const Box = x => ({
  map: f => Box(f(x)),
  fold: f => f(x),
  inspect: () => `Box(${x})`
});

const id = x => x;

const res1 = Box('functors')
  .map(x => x.substr(5))
  .map(x => x.toUpperCase());

const res2 = Box('functors')
  .map(x => x.substr(5).toUpperCase());

console.log(res1, res2);

const res3 = Box('functors')
  .map(id);

const res4= id(Box('functors'));

console.log(res3, res4);
