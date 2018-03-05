/* eslint-disable no-console */
import webpack from 'webpack';
import path from 'path';
import fs from 'fs';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import autoprefixer from 'autoprefixer';
import lessToJs from 'less-vars-to-js';
import { travelDir, getEntries, getEntireName, getReplParams } from './tools/helps';

const themeVariables = lessToJs(fs.readFileSync(path.join(__dirname, './source/assets/css/lib/ant-theme-vars.less'),
  'utf8'));
// lessToJs does not support @icon-url: "some-string",
// so we are manually adding it to the produced themeVariables js object here
themeVariables["@icon-url"] = "'https://at.alicdn.com/t/font_zck90zmlh7hf47vi'";
const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('development'),
  __DEV__: true
};

const viewsPath = '/views/';
const dataPath = '/ftl-mocks/';
const mockPath = [];
travelDir('.' + viewsPath, mockPath);
const argvFilter = getReplParams('filter');
const getHtmlWebpackPlugin = () => {
  // generate ftl plugin
  const htmlWebpackPlugin = mockPath
    // skip /common/ directory
    .filter((pt) => {
      return pt.indexOf(`${path.sep}common${path.sep}`) === -1;
    })
    .filter((pt) => {
      if (argvFilter) {
        return pt.indexOf(argvFilter[0]) > -1;
      }
      return true;
    })
    .map((pt) => {
      const chunkName = getEntireName(pt);
      return new HtmlWebpackPlugin({
        filename: chunkName + '.html',
        template: pt,
        chunks: [chunkName]
      });
    });
  htmlWebpackPlugin.push(
    new HtmlWebpackPlugin({
      filename: 'demo.html',
      template: `${__dirname}/source/demo.html`,
      chunks: ['demo']
    })
  );
  return htmlWebpackPlugin;
};
// more info: https://github.com/isaacs/node-glob
let newEntries = getEntries(['./source/entries/**/*.js'],
  ['./source/utils/webpackPublicPath', 'webpack-hot-middleware/client?reload=true']);

if ( argvFilter ) {
  let filteredNewEntries = Object.keys(newEntries)
    .filter((key) => {
      return key.indexOf(argvFilter[0]) > -1;
    })
    .reduce((obj, key) => {
      obj[key] = newEntries[key];
      return obj;
    }, {});
  if ( Object.keys(filteredNewEntries).length ) {
    console.log(`webpack config entry for ${argvFilter[0]}`);
    newEntries = filteredNewEntries;
    filteredNewEntries = null;
  }
}

export default {
  // more info:https://webpack.github.io/docs/build-performance.html#sourcemaps
  // and https://webpack.github.io/docs/configuration.html#devtool
  devtool: 'cheap-module-source-map',
  entry: Object.assign(newEntries, {
    // app: [
    //   './source/utils/webpackPublicPath',
    //   'webpack-hot-middleware/client?reload=true',
    //   './source/index',
    // ],
    demo: [
      './source/utils/webpackPublicPath',
      'webpack-hot-middleware/client?reload=true',
      './source/demo',
    ]
  }),
  target: 'web', // necessary per https://webpack.github.io/docs/testing.html#compile-and-test
  output: {
    path: `${__dirname}/dist`, // Note: Physical files are only output by the production build task `npm run build`.
    publicPath: '/',
    filename: '[name].js'
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [
          autoprefixer(),
        ],
        debug: true,
        noInfo: true // set to false to see a list of every file being bundled.
      }
    }),
    new webpack.DefinePlugin(GLOBALS), // Tells React to build in prod mode. https://facebook.github.io/react/downloads.htmlnew webpack.HotModuleReplacementPlugin());
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ].concat(getHtmlWebpackPlugin()),
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.join(__dirname, 'source'),
          path.join(__dirname, 'node_modules/ppfish') // 指定使用babel-loader编译ppfish
        ],
        exclude: /(node_modules|vendor)\/(?!(ppfish)\/).*/, // 优先于include，排除ppfish
        use: [{
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }]
      },
      {
        test: /\.eot(\?v=\d+.\d+.\d+)?$/,
        use: [{
          loader: 'file-loader'
        }]
      },
      {
        test: /\.(woff|woff2)$/,
        use: [{
          loader: 'url-loader?limit=100000'
        }]
      },
      {
        test: /\.ttf(\?v=\d+.\d+.\d+)?$/,
        use: [{
          loader: 'file-loader?limit=10000&mimetype=application/octet-stream'
        }]
      },
      {
        test: /\.svg(\?v=\d+.\d+.\d+)?$/,
        use: [{
          loader: 'file-loader?limit=10000&mimetype=image/svg+xml'
        }]
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: [{
          loader: 'file-loader'
        }]
      },
      {
        test: /\.ico$/,
        use: [{
          loader: 'file-loader?name=[name].[ext]'
        }]
      },
      {
        test: /\.css$/,
        include: [
          path.resolve(__dirname, './source/assets/css/lib'),
          path.join(__dirname, 'node_modules/antd')
        ],
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader?'
        }, {
          loader: 'postcss-loader?'
        }]
      },
      {
        test: /\.less$/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader?'
        }, {
          loader: 'postcss-loader?'
        }, {
          loader: 'less-loader?',
          options: {
            modifyVars: themeVariables
          }
        }]
      },
      {
        test: /(\.html)$/,
        use: [{
          loader: 'ejs-loader'
        }]
      },
      {
        test: /(\.ftl)$/,
        use: [{
          loader: 'ejs-loader'
        }, {
          loader: 'ftl-loader',
          options: {
            // 指定ftl模板的路径
            dataPath: dataPath,
            // 指定ftl的mock数据的路径
            templatePath: viewsPath,
          }
        }]
      }
    ]
  },
  // 定义loader从哪里搜索
  resolveLoader: {
    modules: [
      'node_modules',
      path.resolve(__dirname, 'tools/loader')
    ]
  }
};
