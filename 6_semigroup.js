const { Map } = require('immutable-ext');
// const result = 'a'.concat('b').concat('c');

const Sum = x => ({
    x, 
    concat: ({ x: y }) => Sum(x + y),
    inspect: () => `Sum(${x})`
});

Sum.empty = () => Sum(0);

// const res = Sum(1).concat(Sum(2));

const All = x => ({
    x, 
    concat: ({ x: y }) => Sum(x && y),
    inspect: () => `All(${x})`
});

All.empty = () => All(true);

// const res = All(true).concat(All(true));

const First = x => ({
    x, 
    concat: _ => First(x),
    inspect: () => `First(${x})`
});

// const res = First('blah').concat(First('another'));

const acc1 = Map({ name: First('Nico'), isPaid: All(true), points: Sum(10), friends: ['Franklin'] });

const acc2 = Map({ name: First('Nico'), isPaid: All(false), points: Sum(2), friends: ['Gatsby'] })

const res = acc1.concat(acc2);

console.log(res.toJS());