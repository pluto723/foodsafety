// pages/first/first.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
  },
  takePhoto: function () {
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      camera: 'back',
      success:res =>{
        this.showLoading()
      }
    })
  },
  showLoading: function() {
    wx.redirectTo({
      url: '../loading/loading'
    })
  },
  PageTwo:function(){
    wx.redirectTo({
      url: '../second/second'
    })
  },
  PageThree:function(){
    wx.redirectTo({
      url: '../third/third'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#131509',
    })
  },
  onShow(){
    wx.hideHomeButton()
  }
})