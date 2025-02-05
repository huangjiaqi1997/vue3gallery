import { driver } from 'driver.js'
import 'driver.js/dist/driver.css'

// 配置
const driverObj = driver({
  showProgress: false,
  nextBtnText: '下一个',
  prevBtnText: '上一个',
  doneBtnText: '完成',
  steps: [
    {
      element: '.driver-home',
      popover: { title: 'Logo', description: '点击返回首页' }
    },
    {
      element: '.driver-search',
      popover: { title: '搜索', description: '搜索你想要的图片' }
    },
    {
      element: '.driver-theme',
      popover: { title: '主题', description: '选择你喜欢的主题' }
    },
    {
      element: '.driver-profile',
      popover: { title: '用户', description: '查看你的用户信息' }
    },
    {
      element: '.driver-guide',
      popover: { title: '引导', description: '再次查看引导内容' }
    },
    {
      element: '.driver-feedback',
      popover: { title: '反馈', description: '向我们提供反馈信息' }
    }
  ]
})

export default driverObj
