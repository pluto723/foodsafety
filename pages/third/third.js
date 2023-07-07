import * as echarts from '../../ec-canvas/echarts';

let chart = null;

Page({
  data: {
    ec: {
      onInit: initChart
    },
  },
})

// 初始化图表函数
function initChart(canvas, width, height, dpr) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr
  })

  canvas.setChart(chart)
  // 显示Echarts图表类型信息，可以去Echarts官网复制粘贴
  const person = require('../../utils/images/Veins_Medical_Diagram_clip_art.svg');
  echarts.registerMap('organ_diagram', { svg: person });
  let option = {
    tooltip: {},
    geo: {
      left: 10,
      right: '50%',
      map: 'organ_diagram',
      selectedMode: 'multiple',
      emphasis: {
        focus: 'self',
        itemStyle: {
          color: null
        },
        label: {
          position: 'bottom',
          distance: 0,
          textBorderColor: '#fff',
          textBorderWidth: 2
        }
      },
      blur: {},
      select: {
        itemStyle: {
          color: '#b50205'
        },
        label: {
          show: false,
          textBorderColor: '#fff',
          textBorderWidth: 2
        }
      }
    },
    grid: {
      left: '60%',
      top: '20%',
      bottom: '20%'
    },
    xAxis: {},
    yAxis: {
      data: [
        'heart',
        'large-intestine',
        'small-intestine',
        'spleen',
        'kidney',
        'lung',
        'liver'
      ]
    },
    series: [
      {
        type: 'bar',
        emphasis: {
          focus: 'self'
        },
        data: [121, 321, 141, 52, 198, 289, 139]
      }
    ]
  };
  chart.setOption(option);
  chart.on('mouseover', { seriesIndex: 0 }, function (event) {
    chart.dispatchAction({
      type: 'highlight',
      geoIndex: 0,
      name: event.name
    });
  });
  chart.on('mouseout', { seriesIndex: 0 }, function (event) {
    chart.dispatchAction({
      type: 'downplay',
      geoIndex: 0,
      name: event.name
    });
  });
  return chart;
}

