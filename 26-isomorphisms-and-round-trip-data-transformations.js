/* flow */

import { Right, Left, Either } from './3-either';

// to, from
// from(to(x)) === x
// to(from(x)) === x

// String ~ [Char]
const Iso = (to, from) =>
  ({
    to,
    from
  });

const chars = Iso((s: string) => s.split(''),
                  (s: List<mixed>) => s.join(''));

const res = chars.from(chars.to('Hello'));

const truncate = str =>
  chars.from(chars.to(str).splice(0, 3).concat('...'));

// [a] ~ Either null or a
const singleton = Iso(
  (e: Either) => e.fold(() => [], x => [x]),
  ([x]) => x ? Right(x) : Left(x)
);

const filterEither = (e, pred) =>
  singleton.from(singleton.to(e).filter(pred));

const res2 = filterEither(Right('hello'), (x: string) => x.match(/h/ig))
  .map((x: string) => x.toUpperCase());
console.log(res2);
