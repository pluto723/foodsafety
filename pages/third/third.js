Page({
  data: {
  },
  onLoad(){
    const { loadingSvg } = require('./loading.svg')
    const svgImg = loadingSvg(0.1,0,0)
    this.setData({svgImg})
  },
})



