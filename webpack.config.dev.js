const { Configuration, DefinePlugin } = require('webpack');
const { VueLoaderPlugin } = require('vue-loader/dist/index');
const publicPathReplace = '__metav_public_path__';

function configCreate(env, argv) {
  /**
   * @type {Configuration} //配置智能提示
   */
  const devConfig = {
    devServer: {
      headers: { 'Access-Control-Allow-Origin': '*' },
      allowedHosts: 'all',
      compress: true,
      port: 9000,
      // host: 'localhost',
      historyApiFallback: {
        rewrites: [{ from: /^\/$/, to: '/index.js' }]
      },
      client: false,
      hot: false
    },
    plugins: [
      new VueLoaderPlugin(), //解析vue
      new DefinePlugin({
        // 用于metav静态资源定位
        __webpack_public_path__: publicPathReplace
      })
    ],
    output: {
      libraryTarget: 'umd',
      filename: 'index.js',
      // publicPath: 'assets'
      // path: path.resolve(__dirname, `dist/${widgetName}/${widgetVersion}`) //出口文件
    },
  };

  return devConfig;
}

module.exports = configCreate;
