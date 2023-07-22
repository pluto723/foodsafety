Component({
  data: {
  },
  methods: {
    PageOne:function(){
      wx.redirectTo({
        url: '../first/first'
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
  },
})
