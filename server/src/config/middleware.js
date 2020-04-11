const path = require('path');
const isDev = think.env === 'development';

module.exports = [
  {
    handle: 'meta',
    options: {
      logRequest: isDev,
      sendResponseTime: isDev
    }
  },
  {
    handle: 'resource',
    enable: true,
    options: {
      root: think.APP_PATH,
      publicPath: '/www4'
    }
  },
  {
    handle: 'trace',
    enable: !think.isCli,
    options: {
      debug: isDev
    }
  },
  {
    handle: 'payload',
    options: {
      // 上传文件临时文件夹
      uploadDir: path.join(think.ROOT_PATH, 'runtime/tmp')
    }
  },
  {
    handle: 'router',
    options: {}
  },
  'logic',
  'controller'
];
