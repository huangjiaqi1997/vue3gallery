export const observeVisible = (target, callback) => {
  const observer = new IntersectionObserver((enteris) => {
    enteris.forEach((entry) => {
      // intersectionRatio > 0 可见
      // intersectionRatio = 0 不可见

      if (entry.intersectionRatio > 0) callback(true)

      // 需要再监控目标元素的完全隐藏
      // (从可见 => 完全隐藏()，说明加载已经铺满全屏)
      if (entry.intersectionRatio === 0) callback(false)
    })
  })

  observer.observe(target)
}
