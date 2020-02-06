module.exports = {
  plugins: {
    'autoprefixer': {
      browsers: ['Android >= 4.0', 'iOS >= 8']
    }, // 用来自动处理浏览器前缀的一个插件。
    'postcss-pxtorem': {
      'rootValue': 75, // 设计稿宽度的1/10
      'unitPrecision': 5, // 小数位
      'minPixelValue': 1, // 转换的最小单位
      'selectorBlackList': ['van-'], // 忽略的样式, 正则
      'propList': ['*'] // 需要做转化处理的属性，如`hight`、`width`、`margin`等，`*`表示全部，正则
    }
  }
}
