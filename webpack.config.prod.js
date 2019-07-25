const path = require('path');
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin'); //引入打包的html模板
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin'); //引入css文件分离
const es3ifyPlugin = require('es3ify-webpack-plugin');


const prodConfig = {
  devtool: 'cheap-module-source-map',
  entry: {
    app: [
      "es5-shim", "es5-shim/es5-sham",
      "babel-polyfill",
      path.join(__dirname, 'src/index.js')
    ]
  },
  output: {
    path: path.resolve(__dirname,'dist') ,  
    publicPath: "./",
    filename: '[name].[hash].js',
    chunkFilename: '[name].[hash].js',
  },
  resolve: {
    alias: { // 配置项目文件别名
      '@': path.join(__dirname, 'src'),
      'assets': path.join(__dirname, 'src/assets'),
      'utils': path.join(__dirname, 'src/utils'),
    }
  },
  module: {
    postLoaders: [
      {
        test: /\.js$/,
        loaders: ['export-from-ie8/loader']
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel-loader?cacheDirectory=true'],
        include: path.join(__dirname, 'src'),
      }, {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader?limit=8192',
      },
      {
        test: /\.css$/,
        loaders: ExtractTextPlugin.extract("style-loader", "css-loader")
      }
    ],
  },
  plugins: [
    new CleanWebpackPlugin(['dist/']),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './public/index.html'), //指定要打包的html路径和文件名
      filename: 'index.html',
      favicon: path.join(__dirname, './public/favicon.ico'), //给生成的 html 文件生成一个标签<link rel="shortcut icon" href="apple-touch-icon.png">
      // hash: true, //给生成的 js 文件一个独特的 hash 值 <script type=text/javascript src=bundle.js?22b9692e22e7be37b57e></script>
      // showErrors: true, //webpack 编译出现错误
      // minify: { //对 html 文件进行压缩，minify 的属性值是一个压缩选项或者 false 。默认值为false, 不对生成的 html 文件进行压缩
      //   removeComments:true, // 去除注释
      //   collapseWhitespace: true //是否去除空格
      // }
    }),
    new es3ifyPlugin(),
    new UglifyJSPlugin({
      mangle: {
          screw_ie8: false
      },
      mangleProperties: {
          screw_ie8: false,
      },
      compress: {
          screw_ie8: false,
      },
      output: {
          screw_ie8: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
          'NODE_ENV': JSON.stringify('production')
      }
    }),
    new ExtractTextPlugin('[name].[hash:5].css')
    // new ExtractTextPlugin("css/index.css"),  //这里的/css/index.css 是分离后的路径
  ]
};

module.exports = prodConfig;