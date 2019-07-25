const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //引入打包的html模板
const es3ifyPlugin = require('es3ify-webpack-plugin');


const devConfig = {
  devtool: 'inline-source-map',
  entry: {
    app: [
      "es5-shim", "es5-shim/es5-sham",
      "babel-polyfill",
      path.join(__dirname, 'src/index.js')
    ]
  },
  output: {
    path: path.resolve(__dirname,'dist') ,  
    publicPath: "/",
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
        loaders: ["style-loader", "css-loader"]
      }
    ],
  },
  devServer: {
    // publicPath: '/', //
    contentBase: path.resolve(__dirname, "dist"), //此处的路径必须和输出output文件的路径一致 否则无法自动更新，或者是基于output的相对路径
    historyApiFallback: true, //在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
    // compress: true,
    host: "localhost",
    port: 9000,
    // headers: { // 允许开发服务器访问本地服务器的包JSON文件，防止跨域
    //     'Access-Control-Allow-Origin': '*'
    // },
    // hot: true, // 设置热替换
    // proxy: {
    //   "/api/*": "http://localhost:9000"
    // }
  },
  plugins: [
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
    new es3ifyPlugin()
  ]
};
console.log(devConfig)
module.exports = devConfig;