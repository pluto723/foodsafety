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
    this.pageRouter.navigateTo({
      url: '../loading/loading'
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
      backgroundColor: '#131509',
    })
  }
})