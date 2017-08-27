
const Box = x => ({
    map: f => Box(f(x)),
    fold: f => f(x),
    inspect: () => `Box(${x})`
});

const mapToCharCode = (x) =>
    Box(x)
        .map(s => s.trim())
        .map(s => new Number(s))
        .map(i => i + 1)
        .map(c => String.fromCharCode(c))
        .fold(c => c);

console.log(mapToCharCode('  65  '));