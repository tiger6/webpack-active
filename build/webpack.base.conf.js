const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const pageArray = require('../config/pagesArray');
//page目录处理
let htmlPages = [],
  entryObj = {};
pageArray.forEach(function (page) {
  //输出文件模块
  const htmlPlugin = new HtmlWebpackPlugin({
    filename: page.filename,
    minify: {
      removeComments: true, //删除html的注释
      collapseWhitespace: true
    },
    hash: true,
    xhtml: true,
    title: page.title,
    pageName: page.name,
    chunks: ['vendor', page.name],
    template: 'src/index.ejs'
  });
  htmlPages.push(htmlPlugin);
  entryObj[page.name] = `./src/page/${page.name}/index.js`;
});

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}
module.exports = {
  entry: Object.assign(entryObj, {
    // zepto: 'zepto-webpack'
  }),
  output: {
    filename: 'js/[name].[hash:8].js',
    chunkFilename: 'js/[name].[chunkhash:8].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/'
  },
  resolve: {
    alias: {
      '@common': resolve('src/common'),
      '@assets': resolve('src/assets'),
      '@static': resolve('src/static'),
      '@img': resolve('css/images')
    }
  },
  module: {
    rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'

        // options: {
        //     presets: ['env']
        // }
      },
      {
        test: /\.ejs$/,
        exclude: /node_modules/,
        use: [{
          loader: 'ejs-loader'
        }]
      },
      {
        test: /\.(html|tpl)$/,
        use: ['html-loader']
      },
      {
        test: /\.(less|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              // 如果没有options这个选项将会报错 No PostCSS Config found
              plugins: loader => [
                require('autoprefixer')() //CSS浏览器兼容
              ],
              sourceMap: true
            }
          },
          {
            loader: 'less-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            // 这里的options选项参数可以定义多大的图片转换为base64
            limit: 10000, // 表示小于10kb的图片转为base64,大于10kb的是路径
            outputPath: 'images/' //定义输出的图片文件夹
          }
        }]
      }
    ]
  },

  plugins: [
    //热更新
    new webpack.HotModuleReplacementPlugin(), //调用webpack的热更新插件
    //清理dist
    new CleanWebpackPlugin(['dist'], {
      root: path.resolve(__dirname, '../')
    }),
    //压缩css文件
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'css/[name].[chunkhash:8].css',
      chunkFilename: 'css/[contenthash:8].css'
    }),
    //拷贝文件
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, '../src/assets'), //将src/assets下的文件
      to: './assets' // 复制到assets
    }]),
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, '../src/common'), //将src/common下的文件
      to: './common', // 复制到common
      ignore: ['.*', '*.js']
    }]),
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, '../src/static'), //将src/common下的文件
      to: './static' // 复制到common
    }]),
    //引入第三方库
    // new webpack.ProvidePlugin({
    //   $: 'zepto-webpack'
    // })
  ].concat(htmlPages),

};