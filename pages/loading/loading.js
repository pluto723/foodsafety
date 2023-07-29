const app = getApp()
Page({
  data: {
    loading:true,
    name:'',
    list:[]
  },
  PageTwo:function(){
    wx.redirectTo({
      url: '../second/second'
    })
  },
  onShow(options) {
    wx.hideHomeButton()
    var that = this
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#a6d7ce',
    }),
    setTimeout(function() {
      that.setData({
        loading:false
      })
    }, 2000);
    wx.request({
      url: 'http://47.120.36.255:80/result',
      method:'POST',
      success:function(res){
        that.setData({
          name:res.data[0],
          list:res.data[1]
        })
      }
    }),
    wx.request({
      url: 'http://47.120.36.255:80/content',
      method:'POST',
      success:function(res){
        app.globalData.nodes = res.data[0]
        app.globalData.links = res.data[1]
        app.globalData.information = res.data[2]
      }
    }),
    wx.request({
      url: 'http://47.120.36.255:80/person',
      method:'POST',
      success:function(res){
        app.globalData.dieases = res.data[0]
      }
    })   
  }
})