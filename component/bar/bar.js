Component({
  data: {
  },
  methods: {
    PageOne:function(){
      wx.redirectTo({
        url: '../../pages/first/first'
      })
    },
    PageTwo:function(){
      wx.redirectTo({
        url: '../../pages/second/second'
      })
    },
    PageThree:function(){
      wx.redirectTo({
        url: '../../pages/third/third'
      })
    },
    PageFour:function(){
      wx.redirectTo({
        url: '../../pages/score/score'
      })
    }
  },
})
