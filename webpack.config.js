const { Configuration, DefinePlugin } = require('webpack');
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader/dist/index');
const chalk = require('chalk');
const figlet = require('figlet');
const pkgInfo = require('./package.json');

const devConfig = require('./webpack.config.dev');
const prodConfig = require('./webpack.config.prod');

const widgetName = pkgInfo.name;
const widgetVersion = pkgInfo.version;

const publicPathReplace = '__metav_public_path__';

function configCreate(env, argv) {
  const envConfig = argv.mode === 'development' ? devConfig(env, argv) : prodConfig(env, argv);

  /**
   * @type {Configuration} //配置智能提示
   */
  const baseConfig = {
    context: path.resolve(__dirname, ''),
    entry: `./src/index.ts`, //入口文件
    module: {
      rules: [
        {
          test: /\.tpl$/i,
          type: 'asset/source'
        },
        {
          test: /\.vue$/, //解析vue 模板
          use: 'vue-loader'
        },
        {
          test: /\.less$/, //解析 less
          use: ['style-loader', 'css-loader', 'less-loader']
        },
        {
          test: /\.css$/, //解析css
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.ts$/, //解析ts
          loader: 'ts-loader',
          options: {
            configFile: path.resolve(process.cwd(), 'tsconfig.json'),
            appendTsSuffixTo: [/\.vue$/]
          }
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg)$/,
          loader: 'file-loader',
          options: {
            outputPath: 'assets',
            esModule: false, // file-loader 默认使用 ES6 模块解析，将其关闭，启用 CommonJS 模块，不配置这个，html 文件中的图片路径不对
            name: '[name]_[hash:6].[ext]'
          },
          type: 'javascript/auto' // 不加这个配置，一张图片打包后会生成两张
        }
      ]
    },
    plugins: [
      new VueLoaderPlugin(), //解析vue
      new DefinePlugin({
        // 用于metav静态资源定位
        __webpack_public_path__: publicPathReplace
      })
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src') // 别名
      },
      extensions: ['.js', '.json', '.vue', '.ts', '.tsx'] //识别后缀
    },
    optimization: {
      usedExports: true
    },
    stats: 'errors-only', //取消提示
    externals: {
      vue: 'vue', //CDN 引入
      echarts: 'echarts' // CDN引入
    },
    ...envConfig
  };

  const fontType = 'Chunky'; //Ghost|Chunky

  figlet('MetaV', fontType, function (err, text) {
    if (err) {
      console.dir(err);
      return;
    }
    console.log(text);
    console.log('<i>', chalk.green('[脚手架使用说明:]'), chalk.blue('https://xuelangyun.feishu.cn/wiki/wikcns58lXn5BohqrI7fWvp87lh'));
  });
  return baseConfig;
}

module.exports = configCreate;
