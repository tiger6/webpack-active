const webpack = require('webpack')
const path = require('path')

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const PurifyCssWebpack = require('purifycss-webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const glob = require('glob');
const jsonConfig = require('./config/index.json');
module.exports = {
    entry: {
        main: './src/index.js',
        vendor: './src/vendor.js',
        // zepto: 'zepto-webpack'
    },

    output: {
        filename: '[name].[hash].js',
        chunkFilename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, 'dist')
    },

    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'

            // options: {
            //     presets: ['env']
            // }
        }, {
            test: /\.(less|css)$/,

            use: ExtractTextPlugin.extract({
                use: [{
                        loader: "css-loader",
                        options: {
                            sourceMap: true
                        }
                    }, {
                        loader: 'postcss-loader',
                        options: { // 如果没有options这个选项将会报错 No PostCSS Config found
                            plugins: (loader) => [
                                require('autoprefixer')() //CSS浏览器兼容
                            ]
                        }
                    }, //利用postcss-loader自动添加css前缀
                    {
                        loader: "less-loader",
                        options: {
                            sourceMap: true
                        }
                    }
                ],
                fallback: "style-loader", // 回滚
                publicPath: '../' //解决css背景图的路径问题
            })
        }, {
            test: /\.(png|jpg|gif)$/,
            use: [{
                loader: 'url-loader',
                options: { // 这里的options选项参数可以定义多大的图片转换为base64
                    limit: 50000, // 表示小于50kb的图片转为base64,大于50kb的是路径
                    outputPath: 'images/' //定义输出的图片文件夹
                }
            }]
        }]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(), //调用webpack的热更新插件
        new UglifyJSPlugin(),
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            // minify: {
            //     collapseWhitespace: true
            // },
            hash: true,
            title: 'test webpack',
            template: './src/index.html'
        }),
        new ExtractTextPlugin('css/index.css'),
        new PurifyCssWebpack({ //消除冗余代码
            paths: glob.sync(path.join(__dirname, 'src/*.html'))
        }),
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, 'src/assets'), //将src/assets下的文件
            to: './assets' // 复制到assets
        }]),
        //引入第三方库
        new webpack.ProvidePlugin({
            $: 'zepto-webpack'
        })
    ],
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
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                zepto: { // 键值可以自定义
                    chunks: 'initial', // 
                    name: 'zepto', // 入口的entry的key
                    enforce: true // 强制 
                }
            }
        }
    }
}
