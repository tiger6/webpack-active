const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const PurifyCssWebpack = require('purifycss-webpack');
const baseWebpackConfig = require('./webpack.base.conf');
//打包用时间戳
let date = new Date();
let
  year = date.getFullYear(),
  month = timer(date.getMonth() + 1),
  day = timer(date.getDate()),
  hour = (date.getHours()),
  minute = timer(date.getMinutes());
let timeStr = `${month}${day}${hour}${minute}`;

function timer(tim) {
  return (tim + 1) < 10 ? `0${tim}` : tim;
}
module.exports = merge(baseWebpackConfig, {
  output: {
    publicPath: '/'
  },
  plugins: [
    //消除冗余代码
    // new PurifyCssWebpack({
    //   paths: glob.sync(path.join(__dirname, 'src/*.html'))
    // }),
    //打包zip
    new FileManagerPlugin({
      onEnd: {
        mkdir: ['./zip'],
        archive: [{
          source: './dist',
          destination: `./zip/xxxx-active${timeStr}.zip`
        }]
      }
    })
  ],
  optimization: {
    // minimize: true, //压js
    minimizer: [
      //压缩js webpack4.X机制
      new UglifyJSPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCSSAssetsPlugin({}) // use OptimizeCSSAssetsPlugin
    ]
  }
});