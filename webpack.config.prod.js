const { Configuration, DefinePlugin } = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader/dist/index');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ZipPlugin = require('zip-webpack-plugin');

const publicPathReplace = '__metav_public_path__';

function configCreate(env, argv) {
  /**
   * @type {Configuration} //配置智能提示
   */
  const prodConfig = {
    output: {
      libraryTarget: 'umd',
      filename: 'index.js',
      path: path.resolve(__dirname, `dist/`) //出口文件
    },
    plugins: [
      new CleanWebpackPlugin(),
      new VueLoaderPlugin(), //解析vue

      new FriendlyErrorsWebpackPlugin({
        compilationSuccessInfo: {
          //美化样式
          messages: [`组件构建完成！`]
        }
      }),
      new DefinePlugin({
        // 用于metav静态资源定位
        __webpack_public_path__: publicPathReplace
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, './public'),
            to: path.resolve(__dirname, './dist')
          }
        ]
      }),
      new ZipPlugin({
        path: path.resolve(__dirname, './dist'),
        filename: 'component.zip'
      })
    ]
  };

  return prodConfig;
}

module.exports = configCreate;
