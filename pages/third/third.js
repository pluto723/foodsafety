Page({
  data: {
  },
  PageOne:function(){
    this.pageRouter.navigateTo({
      url: '../first/first'
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
  onLoad(){
    const { loadingSvg } = require('./loading.svg')
    const svgImg = loadingSvg()
    this.setData({svgImg})
  },
})



