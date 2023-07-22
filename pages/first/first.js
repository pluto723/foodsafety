Page({
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