const add = x => y => x + y;

const inc = add(1); // y => 1 + y

const modulo = dvr => dvd => dvd % dvr;

const isOdd = modulo(2);

const filter = predicate => xs => xs.filter(predicate);

const map = f => xs => xs.map(f);

const getAllOdds = filter(isOdd);

const replace = regex => repl => str =>
  str.replace(regex, repl);

const censor = replace(/[aieou]/ig)('*');

const censorAll = map(censor);

const res = censorAll(['hello', 'world']);

console.log(res);
