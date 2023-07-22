// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    var that = this
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    wx.request({
      url: 'http://47.120.36.255:80/content',
      method:'POST',
      success:function(res){
        console.log(res.data)
        that.globalData.nodes = res.data[0]
        that.globalData.links = res.data[1]
        that.globalData.information = res.data[2]
      }
    })
  },
  globalData: {
    nodes:'',
    links:'',
    information:'',
  },
})
