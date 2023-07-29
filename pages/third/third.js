const app = getApp()
Page({
  data: {
    list:[]
  },
  onLoad(){
    const { loadingSvg } = require('./loading.svg')
    const svgImg = loadingSvg()
    this.setData({svgImg})
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#253334',
    })
  },
  onShow(){
    wx.hideHomeButton()
    this.setData({
      list:app.globalData.dieases
    })
  }
})



