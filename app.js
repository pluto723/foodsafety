// app.js
App({
  onLaunch() {
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  globalData: {
    nodes:'',
    links:'',
    information:'',
    dieases:'',
    ingredient_list:''
  },
})
