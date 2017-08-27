const Box = x => ({
    map: f => Box(f(x)),
    fold: f => f(x),
    inspect: () => `Box(${x})`
});

const moneyToFloat = str =>
    Box(str)
        .map(str => str.replace(/\$/g, ''))
        .map(parseFloat);

const percentToFloat = str =>
    Box(str.replace(/\%/g, ''))
        .map(parseFloat)
        .map(n => n * 0.01);

const applyDiscount = (price, discount) =>
    moneyToFloat(price)
        .fold(cost => {
            return percentToFloat(discount)
                .fold(savings => cost - cost * savings);
        });

console.log(applyDiscount('$5.00', '20%'));