/* eslint-disable global-require,no-console,import/no-unresolved,no-unused-vars */
import 'babel-polyfill';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import webpack from 'webpack';
import fs from 'fs';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackHotServerMiddleware from 'webpack-hot-server-middleware';
import clientConfig from '../webpack/client.dev';
import serverConfig from '../webpack/server.dev';

const DEFAULT_PORT = 3010;
const APP_PORT = process.env.APP_PORT || DEFAULT_PORT;
const DEV = process.env.NODE_ENV === 'development';
const {publicPath, path: outputPath} = clientConfig.output;
const app = express();
app.use(cookieParser());

// API

if (DEV) {
  const multiCompiler = webpack([clientConfig, serverConfig]);
  const clientCompiler = multiCompiler.compilers[0];
  app.use(webpackDevMiddleware(multiCompiler, {publicPath, stats: {colors: true}}));
  app.use(webpackHotMiddleware(clientCompiler));
  app.use(webpackHotServerMiddleware(multiCompiler, {
      serverRendererOptions: {outputPath}
    }));
} else {
  const clientStats = require('../buildClient/stats.json');
  const serverRender = require('../buildServer/main.js').default;
  app.use(publicPath, express.static(outputPath));
  app.use(serverRender({clientStats, outputPath}));
}

app.listen(APP_PORT, () => {
  console.log(`Listening on port ${APP_PORT}`);
});
