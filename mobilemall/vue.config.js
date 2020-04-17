const path = require('path');
function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  lintOnSave: true,
  chainWebpack: (config)=>{
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets',resolve('src/assets'))
      .set('components',resolve('src/components'))
      .set('views',resolve('src/views'))
  },
  devServer: {
     // host: 'localhost', // ip
     // host: '192.168.3.247',
    host: '192.168.1.102', // ip
    port: 8080, // 设置端口号
    https: false, // https:{type:Boolean}
    open: true, //配置自动启动浏览器
    proxy:{
      '/api': {
        target: 'http://127.0.0.1:8360', //API服务器的地址
        // target: 'http://192.168.3.250:8360', //API服务器的地址
        // ws: true,  //代理websockets
        changeOrigin: true, // 虚拟的站点需要更管origin
        // pathRewrite: {   //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
        //   '^/api': ''
        // }
      }
    }  //设置代理
  }
}


