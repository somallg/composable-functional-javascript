const Box = require('./1_box');
const add = x => y => x + y;

// const res = Box(x => x + 1).ap(Box(2)); // Box(3)
// const res = Box(add).ap(Box(2)).ap(Box(3)); // Box(y => 2 + y).app(Box(3)) => Box(5

const liftA2 = (f, fx, fy) =>
  // F(f).ap(fx).ap(fy)
  fx.map(f).ap(fy);

const res = liftA2(add, Box(2), Box(3));
// console.log(res);

module.exports = liftA2;
