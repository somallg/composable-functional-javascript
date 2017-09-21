/* @flow */

import { Either } from './3-either';

import { liftA2 } from './18-applicative-functors-for-multiple-arguments';

const $ = (selector: string) =>
  Either.of({ selector, height: 10 });

type JQueryType = {
  selector: string;
  height: number;
}

const getScreenSize = (screen: number) => (header: JQueryType) => (footer: JQueryType) =>
  screen - (header.height + footer.height);

const res = Either.of(getScreenSize(800))
  .ap($('header'))
  .ap($('footer'));

const res2 = liftA2(getScreenSize(800),
  $('header'), $('footer'));


console.log(res, res2);

