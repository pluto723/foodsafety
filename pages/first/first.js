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
    })
  },
  PageTwo:function(){
    this.pageRouter.navigateTo({
      url: '../second/second'
    })
  },
  PageThree:function(){
    this.pageRouter.navigateTo({
      url: '../third/third'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#a5b6a5',
    })
  }
})