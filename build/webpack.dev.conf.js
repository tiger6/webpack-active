const path = require('path');
const merge = require('webpack-merge');
const jsonConfig = require('../config/index.json');
const baseWebpackConfig = require('./webpack.base.conf');

module.exports = merge(baseWebpackConfig, {
  //服务器
  devServer: {
    // 设置服务器访问的基本目录
    contentBase: path.resolve(__dirname, 'dist'), //最好设置成绝对路径
    // 设置服务器的ip地址,可以是localhost
    host: jsonConfig.host,
    // 设置端口
    port: jsonConfig.port,
    // 设置自动拉起浏览器
    open: false,
    // 设置热更新
    hot: true
  }
});