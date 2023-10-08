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
    diseases:'',
    ingredient_list:'',
    disease_list:''
  },
})
