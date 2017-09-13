const fs = require('fs');
const Task = require('data.task');

const readFile = (fileName, encoding) =>
  new Task((reject, resolve) =>
    fs.readFile(fileName, encoding, (err, contents) =>
      err ? reject(err) : resolve(contents)));

const writeFile = (fileName, contents) =>
  new Task((reject, resolve) =>
    fs.writeFile(fileName, contents, (err, contents) =>
      err ? reject(err) : resolve(contents)));

const app =
  readFile('config.json', 'utf-8')
    .map(contents => contents.replace(/8/g, '6'))
    .chain(newContents => writeFile('config1.json', newContents))

// const app = () => {
//   fs.readFile('config.json', 'utf-8', (err, contents) => {
//     if (err) throw err;
//
//     const newContents = contents.replace(/8/g, '6');
//
//     fs.writeFile('config1.json', newContents, (err, contents) => {
//       if (err) throw err;
//       console.log('success');
//     })
//   })
// };

app.fork(e => console.log('error', e),
         x => console.log('success ahihi', x));
