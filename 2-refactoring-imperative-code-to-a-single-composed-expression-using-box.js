/* @flow */

import { Box } from './1-box';

const moneyToFloat = (str: string) =>
  Box(str)
    .map((str: string) => str.replace(/\$/g, ''))
    .map(parseFloat);

const percentToFloat = (str: string) =>
  Box(str.replace(/\%/g, ''))
    .map(parseFloat)
    .map((n: number) => n * 0.01);

const applyDiscount = (price: string, discount: string) =>
  moneyToFloat(price)
    .fold((cost: number) =>
      percentToFloat(discount)
        .fold((savings: number) => cost - cost * savings)
    );

console.log(applyDiscount('$5.00', '20%'));
