import * as echarts from '../../ec-canvas/echarts';
let chart = null;
Page({
  data: {
    loading:true,
    ec: {
      onInit: initChart
    },
    show:'',
    nickName: '',
    avatarUrl: '',
    isCanDraw: false
  },
  onLoad(options) {
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#253334',
    })
    this.setData({
      nickName: wx.getStorageSync('nickName') || '',
      avatarUrl: wx.getStorageSync('avatarUrl') || ''
    })
  },
  onShow(options){
    wx.hideHomeButton()
    var that = this
    setTimeout(function() {
      that.setData({
        loading:false
      })
    }, 2000);
  },
  getUserInfo(e) {
    this.setData({
      nickName: e.detail.userInfo.nickName,
      avatarUrl: e.detail.userInfo.avatarUrl
    })
    wx.setStorageSync('avatarUrl', e.detail.userInfo.avatarUrl)
    wx.setStorageSync('nickName', e.detail.userInfo.nickName)
  },
  createShareImage() {
    this.setData({
      isCanDraw: !this.data.isCanDraw
    })
  }
})
function initChart(canvas, width, height, dpr) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr
  })
  canvas.setChart(chart)
  let option = {
    radar: {
      indicator: [
        { name: '含糖量', max: 6500 },
        { name: '能量', max: 16000 },
        { name: '食品添加剂剂量', max: 30000 },
        { name: '营养成分', max: 38000 },
        { name: '防腐剂', max: 52000 }
      ]
    },
    series: [
      {
        type: 'radar',
        data: [
          {
            value: [4200, 3000, 20000, 35000, 50000, 18000],
          }
        ]
      }
    ]
  }
  chart.setOption(option);
  return chart;
}