/**
 * prettier 特性参数配置
 * 配置说明文档：https://prettier.io/docs/en/options.html
 */
module.exports = {
  printWidth: 330, // 单行长度
  tabWidth: 2, //缩进长度
  useTabs: false, //使用空格代替tab缩进
  singleQuote: true, // 使用单引号
  semi: true, //句末使用分号
  trailingComma: 'none', //多行时尽可能打印尾随逗号
  bracketSpacing: true, //在对象前后添加空格 如: { foo: bar }
  jsxSingleQuote: true, // jsx中使用单引号
  jsxBracketSameLine: false, //多属性html标签的‘>’折行放置
  arrowParens: 'avoid', //avoid | always, 单参数箭头函数使用圆括号 如: (x) => x
  quoteProps: 'as-needed', //仅在必需时为对象的key添加引号
  requirePragma: false, //无需顶部注释即可格式化
  insertPragma: false, //已被 preitter 格式化的文件顶部加上标注
  proseWrap: 'preserve',
  htmlWhitespaceSensitivity: 'ignore', //对HTML全局空白不敏感
  vueIndentScriptAndStyle: false, //不对vue中的script及style标签缩进
  endOfLine: 'lf', //结束行形式
  embeddedLanguageFormatting: 'auto' //对引用代码进行格式化
};
