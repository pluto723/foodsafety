Page({
  data: {
    src:''
  },
  //跳转至照片裁剪页面
  toCropper() {
    wx.redirectTo({
      url: '../cropper/cropper'
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
  },
})