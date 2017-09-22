/* flow */

import { List } from 'immutable-ext';

import { findArtist, relatedArtists } from './spotify';
import { Pair, Sum } from './6-semigroup';

const Task = require('data.task');

const argv = Task.of(process.argv);
const names = argv.map(args => args.slice(2));

const related = (name: string) =>
  findArtist(name)
    .map(artist => artist.id)
    .chain(relatedArtists)
    .map(artists => artists.map(artist => artist.name));

const Intersection = xs =>
  ({
    xs,
    concat: ({ xs: ys }: Intersection) =>
      Intersection(xs.filter(x => ys.some(y => x === y)))
  });

const artistIntersection = rels =>
  rels
    .foldMap(x => Pair(Intersection(x), Sum(x.length)))
    .bimap(x => x.xs, y => y.x)
    .toList();

const main = (names) =>
  List(names)
    .traverse(Task.of, related)
    .map(artistIntersection);

names.chain(main)
  .fork(console.error, console.log);
