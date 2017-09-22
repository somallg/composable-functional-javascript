import Task from 'data.task';
import Either from 'data.either';
import request from 'request';

const token = 'BQBXmF2gYzYKfiivRPmD1f5TE3p1ETkfjJWIIhb9Vluc9NASy1rq5tUZdqeTwc551FrFqkMMOL0CfGSjwF8HvZhxxvlWB2t6shTCkWjE9IxXR4nqgNPYnG-Acz552kp9IgzPB-EqHZw';

const httpGet = (url: string) =>
  new Task((reject, resolve) => {
    request({
      url,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }, (error, response, body) =>
      error ? reject(error) : resolve(body)
    );
  });

const getJSON = (url: string) =>
  httpGet(url) // Task(str)
    .map(parse) // Task(Either(object parsed))
    .chain(eitherToTask); // Task(object parsed)

const parse = Either.try(JSON.parse);

const first = (xs: mixed[]) =>
  Either.fromNullable(xs[0]);

const eitherToTask = e =>
  e.fold(Task.rejected, Task.of);

const getArtists = (response) =>
  Either.fromNullable(response.artists);

const getArtistsItems = (response) =>
  getArtists(response)
    .chain(response => Either.fromNullable(response.items));

export const findArtist = name =>
  getJSON(`https://api.spotify.com/v1/search?q=${name}&type=artist`)
    .map(getArtistsItems)
    .chain(eitherToTask)
    .map(first)
    .chain(eitherToTask);

export const relatedArtists = id =>
  getJSON(`https://api.spotify.com/v1/artists/${id}/related-artists`)
    .map(getArtists)
    .chain(eitherToTask);

