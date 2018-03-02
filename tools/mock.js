/* eslint-disable no-console */
import jsonServer from 'json-server';
import enableDestroy from 'server-destroy';
import chokidar from 'chokidar';
import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import { chalkSuccess } from './chalkConfig';
import { getConfig } from '../source/config';
import { travelDir } from './helps';

let server = null;
const db = './source/data/db.json';
const apiMocksPath = './api-mocks/';
const middlewares = jsonServer.defaults();
const ajaxPrefix = getConfig().ajaxPrefix;
let router = jsonServer.router(db);
const mockPath = [];

function start(){
  const app = jsonServer.create();
  app.use(middlewares);
  app.use(function(req, res, next) {
    // 检查请求地址和mocks文件路径是否匹配
    for (let i = 0; i < mockPath.length; i ++) {
      const path = mockPath[i];
      const repPath = path
        .replace(/^api-mocks(\/|\\)(get|post|patch|delete)|(\/|\\)data\.json$/g, '')
        // 兼容windows反斜杠
        .replace(/\\/g, '/')
        // 支持NEI mock path 带:id 的写法， /_/id => /1111
        .replace(/\/_\/id/, '/\\d+');
      if ( new RegExp(repPath).test(req.originalUrl) ) {
        const obj = JSON.parse(fs.readFileSync(path));
        return res.send(obj);
      }

    }
    next();
  });
  // Add this before app.use(router)
  app.use(jsonServer.rewriter({
    [`${ajaxPrefix}/`]: '/'
  }));

  app.use(router);
  server = app.listen(4000, function() {
    console.log(chalkSuccess('Mock Server is running'));
  });
  // Enhance with a destroy function
  enableDestroy(server);
}

// Watch .js or .json file
// Since lowdb uses atomic writing, directory is watched instead of file
chokidar
  .watch(path.dirname(db))
  .on('change', function () {
    const obj = JSON.parse(fs.readFileSync(db));
    const isDatabaseDifferent = !_.isEqual(obj, router.db.getState());
    if (isDatabaseDifferent) {
      console.log(chalkSuccess('Db file was changed, Reloading...'));
      server && server.destroy();
      router = jsonServer.router(obj);
      start();
    }
  });

if ( !fs.existsSync(apiMocksPath) ) {
  console.log('not find api-mocks directory, please run nei build first');
} else {
  travelDir(apiMocksPath, mockPath);
  start();
}
