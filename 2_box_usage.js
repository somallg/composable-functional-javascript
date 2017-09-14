/* @flow */

import { Box } from './1_box';

const moneyToFloat = (str: string) =>
  Box(str)
    .map((str: string) => str.replace(/\$/g, ''))
    .map(parseFloat);

const percentToFloat = (str: string) =>
  Box(str.replace(/\%/g, ''))
    .map(parseFloat)
    .map(n => n * 0.01);

const applyDiscount = (price: string, discount: string) =>
  moneyToFloat(price)
    .fold(cost =>
      percentToFloat(discount)
        .fold(savings => cost - cost * savings)
    );

console.log(applyDiscount('$5.00', '20%'));
