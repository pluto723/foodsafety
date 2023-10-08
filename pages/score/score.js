import * as echarts from '../../ec-canvas/echarts';
let chart = null;
Page({
  data: {
    loading:true,
    ec: {
      onInit: initChart
    },
    show:'',
  },
  onLoad(options) {
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#253334',
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
        { name: 'Sales', max: 6500 },
        { name: 'Administration', max: 16000 },
        { name: 'Information Technology', max: 30000 },
        { name: 'Customer Support', max: 38000 },
        { name: 'Development', max: 52000 },
        { name: 'Marketing', max: 25000 }
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