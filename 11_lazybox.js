const Box = x => ({
  map: f => Box(f(x)),
  fold: f => f(x),
  inspect: () => `Box(${x})`
});

const LazyBox = g =>
  ({
    fold: f => f(g()),
    map: f => LazyBox(() => f(g())),
    inspect: () => `LazyBox(${g})`
  });

const res = LazyBox(x => '  64   ')
    .map(s => { console.log('trim'); return s.trim()}) // => () => (func s => s.trim())(x => '64')
    .map(s => { console.log('Number'); return Number(s)}) // => () => Number()
    .map(i => i + 1) // => () => i + Number()
    .map(c => String.fromCharCode(c)) // () => () => a.fromCharCode
    .fold(c => c);

console.log(res);
