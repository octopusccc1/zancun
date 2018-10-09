// This file configures the development web server
// which supports hot reloading and synchronized testing.

// Require Browsersync along with webpack and middleware for it
import browserSync from 'browser-sync';
// Required for react-router browserHistory
// see https://github.com/BrowserSync/browser-sync/issues/204#issuecomment-102623643
import historyApiFallback from 'connect-history-api-fallback';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import proxy from 'http-proxy-middleware';
import config from '../source/config';
import webpackConfig from '../webpack.config.dev';

const bundler = webpack(webpackConfig);
const ajaxPrefix = config.ajaxPrefix;
const dbPrefix = '/db/api';

const upcaseFirstChar = (name) => {
  if (!name || typeof name != 'string') {
    return '';
  }
  return name.replace(/^\w/, function (a) {
    return a.toUpperCase();
  });
};
const apiProxy = proxy(ajaxPrefix, {
  target: 'http://localhost:8002', // nei 默认使用8002端口
  changeOrigin: true,
  ws: true
});
const dbProxy = proxy(dbPrefix, {
  target: 'http://localhost:4001',
  changeOrigin: true,
  ws: true
});
// 配置开发环境下的虚拟路径到物理路径的url path映射
const urlConfig = [
  {
    virtualPath: '/notFound/',
    realPath: '/notFound/notFound.html'
  },
  {
    virtualPath: '/landing/',
    realPath: '/landing/landing.html'
  },
  {
    virtualPath: '/setting/',
    realPath: '/setting/setting.html'
  },
  {
    virtualPath: '/detailPage/',
    realPath: '/detailPage/detailPage.html'
  },
  {
    virtualPath: '/formPage/',
    realPath: '/formPage/formPage.html'
  },
  {
    virtualPath: '/abnormalPage/',
    realPath: '/abnormalPage/abnormalPage.html'
  },
  {
    virtualPath: '/authority/',
    realPath: '/authority/authority.html'
  },
  {
    virtualPath: '/insight/createByPOI/',
    // 不配置realPath时，使用以下默认规则拼写虚拟路径
    // realPath: '/insightCreateByPOI/insightCreateByPOI.html'
  },
  // 使用字符串模式时，等同于以下规则
  // {
  //   virtualPath: '/customer/create/',
  //   realPath: '/customerCreate/customerCreate.html'
  // },
  '/customer/createByTag',
];

// Run Browsersync and use middleware for Hot Module Replacement
browserSync({
  server: {
    baseDir: 'source'
  },
  middleware: [
    apiProxy,
    dbProxy,
    // 处理开发环境下虚拟路径到物理路径的url path映射
    function(req, res, next) {
      // mock 服务器静态资源请求
      if (req.url.startsWith('/public')) {
        req.url = req.url.replace(/\/public/, '');
        return next();
      }
      // 直接返回js、css资源
      if (/\.js|\.css/.test(req.url)) {
        return next();
      }
      // 特殊规则的配置写在这
      if (req.url.indexOf('/demo') > -1 && req.url.indexOf('.js') == -1) {
        req.url = req.url.replace(/\/demo\/?/, '/demo.html');
      } else if (req.url.startsWith('/login/')) {
        req.url = req.url.replace(/\/login\//, '/login/login.html');
      // 通用规则的配置
      } else {
        for (let item of urlConfig) {
          // 处理字符串类型的配置
          if ( typeof item === 'string' ) {
            const splited = item.split('/');
            const upcaseFileName = `${splited[1]}${upcaseFirstChar(splited[2])}`;
            item = {
              virtualPath: item,
              realPath: `/${upcaseFileName}/${upcaseFileName}.html`
            };
          // 处理缺省realPath类型的配置
          } else if ( item.virtualPath && typeof item.realPath === 'undefined' ) {
            const splited = item.virtualPath.split('/');
            const upcaseFileName = `${splited[1]}${upcaseFirstChar(splited[2])}`;
            item.realPath = `/${upcaseFileName}/${upcaseFileName}.html`;
          }
          if (req.url.startsWith(item.virtualPath)){
            req.url = item.realPath;
          }
        }
      }
      return next();
    },
    // 使用historyApiFallback做SPA路由，暂时用不到
    // historyApiFallback({
    //   rewrites: [
    //     // 排除demo/路径
    //     { from: /\/demo\/?$/, to: '/demo.html'}
    //   ]
    // }),
    webpackDevMiddleware(bundler, {
      // Dev middleware can't access config, so we provide publicPath
      publicPath: webpackConfig.output.publicPath,

      // pretty colored output
      stats: { colors: true },

      // Set to false to display a list of each file that is being bundled.
      noInfo: false,

      // for other settings see
      // http://webpack.github.io/docs/webpack-dev-middleware.html
    }),

    // bundler should be the same as above
    webpackHotMiddleware(bundler),
  ],

  // no need to watch '*.js' here, webpack will take care of it for us,
  // including full page reloads if HMR won't work
  files: [
    'source/*.html'
  ],
  open: false
});
