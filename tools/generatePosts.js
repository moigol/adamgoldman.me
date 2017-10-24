/* eslint no-use-before-define: 0 */

import path from 'path';
import fs from 'fs';

// read all files in src/posts
const pathToWriteFile = path.resolve(
  __dirname,
  '..',
  'src',
  'routes',
  'blog',
  'postsData.js',
);
const dirToReadPath = path.resolve(__dirname, '..', 'src', 'posts');

const fileToWrite = fs.readdirSync(dirToReadPath).map(fileNameToObject);
//
// // write file posts.js
fs.writeFileSync(
  pathToWriteFile,
  `/* eslint-disable */
  export default ${JSON.stringify(fileToWrite, null, 2)}`,
);
// write export default {array} to file
// put file in src/routes/posts/postsData.js

function fileNameToObject(fileName) {
  // eslint-disable-next-line global-require,import/no-dynamic-require
  const post = require(path.resolve(dirToReadPath, fileName)).default;
  return { ...post, url: fileName.split('.js')[0] };
}
