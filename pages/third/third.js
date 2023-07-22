Page({
  data: {
    list:[]
  },
  onLoad(){
    var that = this
    const { loadingSvg } = require('./loading.svg')
    const svgImg = loadingSvg()
    this.setData({svgImg})
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#253334',
    }),
    wx.request({
      url: 'http://127.0.0.1:2020/person',
      method:'POST',
      success:function(res){
        that.setData({
          list:res.data[0]
        })
      }
    })
  },
  onShow(){
    wx.hideHomeButton()
  }
})



