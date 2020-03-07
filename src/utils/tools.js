export const debounce = (fn, time = 1000) => {
  // 4、创建一个标记用来存放定时器的返回值
  let timeout = null
  return function () {
    // 5、每次当用户点击/输入的时候，把前一个定时器清除
    clearTimeout(timeout)
    // 6、然后创建一个新的 setTimeout，
    // 这样就能保证点击按钮后的 interval 间隔内
    // 如果用户还点击了的话，就不会执行 fn 函数
    timeout = setTimeout(() => {
      fn.call(this, arguments)
    }, time)
  }
}

export const throttle = (fn, time = 1000) => {
  // 4、通过闭包保存一个标记
  let canRun = true
  return function () {
    // 5、在函数开头判断标志是否为 true，不为 true 则中断函数
    if (!canRun) {
      return
    }
    // 6、将 canRun 设置为 false，防止执行之前再被执行
    canRun = false
    // 7、定时器
    setTimeout(() => {
      fn.call(this, arguments)
      // 8、执行完事件（比如调用完接口）之后，重新将这个标志设置为 true
      canRun = true
    }, time)
  }
}
