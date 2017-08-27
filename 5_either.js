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

const fromNullable = x => x != null ? Right(x) : Left(x);

const tryCatch = f => {
    try {
        return Right(f());
    } catch (e) {
        return Left(e);
    }
}

const findColor = name => fromNullable({ red: '#ff4444', blue: '#3b5998', yellow: '#fff68f' }[name]);

//const result = Left(3).map(x => x + 1).map(x => x / 2).fold(x => 'error', x => x);
//const result = findColor('red')
//    .map(c => c.slice(1))
//    .fold(c => 'no color', c => c.toUpperCase());
// console.log(result);

const fs = require('fs');

const getPortI = () => {
    try {
        const str = fs.readFileSync('config.json');
        const config = JSON.parse(str);
        return config.port
    } catch (e) {
        return 3000;
    }
}

const getPort = () => 
    tryCatch(() => fs.readFileSync('config.json'))
    .chain(c => tryCatch(() => JSON.parse(c)))
    .fold(c => 3000,
          c => c.port);

const res = getPort();
console.log(res);