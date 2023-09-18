const app = getApp()
Page({
  data: {
    list:[],
    assess:`
对人体脏器影响：
    1、全脂乳粉：全脂乳粉含有丰富的蛋白质、脂肪和钙等营养物质，能够提供能量和促进骨骼健康。蛋白质对身体组织的修复和生长非常重要，而脂肪是能量的来源之一。此外，钙对于骨骼和牙齿的健康也至关重要。
    2、浓缩乳清：浓缩乳清是从乳制品中提取出的富含蛋白质的成分。蛋白质对于身体的发育、修复和免疫功能起着重要作用。浓缩乳清可以帮助增加肌肉质量，并提供必要的氨基酸。
禁忌人群：
    1、乳制品过敏者：全脂乳粉和浓缩乳清都是乳制品，可能含有乳蛋白，对于乳制品过敏者来说是禁忌食物。
适用人群：
    1、健康人群：对于没有特殊禁忌或过敏的健康人群来说，全脂乳粉和浓缩乳清都是可适用的食品。
    2、需要增加营养的人群：全脂乳粉和浓缩乳清都富含蛋白质和其他营养物质，可以为需要增加营养的人群提供必要的营养补充。
    3、需要增加肌肉质量的人群：浓缩乳清富含优质蛋白质，可以作为运动员、健身爱好者或需要增加肌肉质量的人群的补充品。
    `
  },
  onLoad(){
    const { loadingSvg } = require('./loading.svg')
    const svgImg = loadingSvg()
    this.setData({svgImg})
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#253334',
    })
  },
  onShow(){
    wx.hideHomeButton()
    this.setData({
      list:app.globalData.dieases
    })
  },
  toScore(){
    wx.redirectTo({
      url: '../score/score'
    })
  }
})



