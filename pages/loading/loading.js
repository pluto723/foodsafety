Page({
  data: {
    loading:true,
    name:'',
    list:[]
  },
  PageTwo:function(){
    this.pageRouter.navigateTo({
      url: '../second/second'
    })
  },
  onShow(options) {
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
      url: 'http://127.0.0.1:2020/result',
      method:'POST',
      success:function(res){
        console.log(res.data)
        that.setData({
          name:res.data[0],
          list:res.data[1]
        })
      }
    })   
  }
})