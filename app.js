// app.js
App({
  onLaunch() {
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  globalData: {
    information:'',
    benefits:'',
    dieases:'',
    ingredient_list:''
  },
})
