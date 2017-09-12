const Right = x => ({
  chain: f => f(x),
  map: f => Right(f(x)),
  fold: (f, g) => g(x),
  inspect: () => `Right(${x})`
});

const Left = x => ({
  chain: f => Left(x),
  map: f => Left(x),
  fold: (f, g) => f(x),
  inspect: () => `Left(${x})`
});

const fromNullable = x => !!x ? Right(x) : Left(x);

const fs = require('fs');

const tryCatch = f => {
  try {
    return Right(f());
  } catch (e) {
    return Left(e);
  }
};

const getPort = () =>
  tryCatch(() => fs.readFileSync('config.json'))
    .chain(e => tryCatch(() => JSON.parse(e)))
    .fold(e => 3000,
          e => e.port);

// const getPort = () => {
//   try {
//     const str = fs.readFileSync('config.json');
//     const config = JSON.parse(str);
//     return config.port;
//   } catch (e) {
//     return 3000;
//   }
// };

//const result = Left(3).map(x => x + 1).map(x => x / 2).fold(x => 'error', x => x);
const result = getPort();
console.log(result);
