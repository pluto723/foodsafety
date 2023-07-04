import * as echarts from '../../ec-canvas/echarts';

let chart = null;

Page({
  data: {
    ec: {
      onInit: initChart
    }
  }
})

// 初始化图表函数
function initChart(canvas, width, height, dpr) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr
  })

  canvas.setChart(chart)
  let nodes = [
    {'id': 'AD钙奶', 'name': 'AD钙奶', 'val': 16, 'color': 'red'},
    {'id': '全脂乳粉', 'name': '全脂乳粉', 'val': 12, 'color': 'skyblue'},
    {'id': '浓缩乳清蛋白粉', 'name': '浓缩乳清蛋白粉', 'val': 12, 'color': 'skyblue'},
    {'id': '碳酸钙', 'name': '碳酸钙', 'val': 12, 'color': 'skyblue'}, 
    {'id': '食用香精', 'name': '食用香精', 'val': 12, 'color': 'skyblue'}, 
    {'id': '维生素A', 'name': '维生素A', 'val': 12, 'color': 'skyblue'}, 
    {'id': '维生素D', 'name': '维生素D', 'val': 12, 'color': 'skyblue'}, 
    {'id': '高血压', 'name': '高血压', 'val': 8, 'color': 'pink'}, 
    {'id': '高血脂', 'name': '高血脂', 'val': 8, 'color': 'pink'}, 
    {'id': '肾结石', 'name': '肾结石', 'val': 8, 'color': 'pink'}, 
    {'id': '胆结石', 'name': '胆结石', 'val': 8, 'color': 'pink'}, 
    {'id': '肝炎', 'name': '肝炎', 'val': 8, 'color': 'pink'}, 
    {'id': '夜盲症', 'name': '夜盲症', 'val': 8, 'color': 'pink'}, 
    {'id': '呼吸道炎症', 'name': '呼吸道炎症', 'val': 8, 'color': 'pink'}
  ]
  let links = [
    {'source': 'AD钙奶', 'target': '全脂乳粉'}, 
    {'source': 'AD钙奶', 'target': '浓缩乳清蛋白粉'}, 
    {'source': 'AD钙奶', 'target': '碳酸钙'}, 
    {'source': 'AD钙奶', 'target': '食用香精'}, 
    {'source': 'AD钙奶', 'target': '维生素A'}, 
    {'source': 'AD钙奶', 'target': '维生素D'}, 
    {'source': '全脂乳粉', 'target': '高血压', 'colorkey': 'red'}, 
    {'source': '全脂乳粉', 'target': '高血脂', 'colorkey': 'red'}, 
    {'source': '碳酸钙', 'target': '肾结石', 'colorkey': 'red'}, 
    {'source': '碳酸钙', 'target': '胆结石', 'colorkey': 'red'}, 
    {'source': '食用香精', 'target': '肝炎', 'colorkey': 'red'}, 
    {'source': '维生素A', 'target': '夜盲症', 'colorkey': 'blue', 'relation': '预防'}, 
    {'source': '维生素A', 'target': '呼吸道炎症', 'colorkey': 'blue', 'relation': '预防'}
  ]
  // 显示Echarts图表类型信息，可以去Echarts官网复制粘贴
  let option = {
    tooltip: {
      show: true,
      formatter: "{b}"
    },
    series: [{
      type: 'graph', // 声明绘制关系图
      layout: 'force', // 声明绘制关系图中的力导向图 
      draggable: true, // 节点是否可拖拽
      roam: true,  // 是否开启鼠标缩放和平移漫游
      focusNodeAdjacency: true, // 是否在鼠标移到节点上的时候突出显示节点以及节点的边和邻接节点
      edgeSymbol: ['', 'arrow'],
      cursor: 'pointer',
      zoom:0.7,//缩放比列（默认为1）
      emphasis: { //  鼠标悬浮高亮图形的样式
        itemStyle: {
          borderColor: 'black',
          borderWidth: 1,
          borderType: 'solid',
          symbolSize: 40,
          color:'red',
        },
        label: {
          show: true,
          formatter: (record) => {
            if (record.name.length > 10) {
              return record.name.substr(0, 5) + '...'
            } else {
              return record.name
            }
          }
        }
      },
      edgeLabel: { // 设置连线label样式
        normal: {
          show: true,
          textStyle: {
            fontSize: 12,
            color: 'red'
          },
          formatter(links) {
            if(links.data.relation != null){
              return links.data.relation
            }
            else{
              return ''
            }
          }
        }
      },
      itemStyle:{
        normal:{
              color: function(nodes) {
                return nodes.data.color    //设置节点颜色
              },
            }
      },
      lineStyle:{
        normal:{
          color:'red'
          }
      },
      
      symbolSize: function (value, params) {//改变节点大小
        return params.data.val*3
      },
      label: { // 节点label设置
        show: true,
        position: 'bottom',
        color: 'red',
        formatter: '{b}'
      },
      force: { // 力引导布局相关的配置项
        repulsion: 80, // 节点之间的斥力因子
        gravity: 0.02, // 节点受到的向中心的引力因子 越大越往中心靠拢
        edgeLength: 160, // 边的两个节点之间的距离
        layoutAnimation: true, // 显示布局的迭代动画
      },
      events: {
        // 点击事件
        click: function(params) {
          console.log(params.data.name)
        }
      },
      nodes:nodes,  // 节点数据列表
      links:links, // 关系数据列表
    }],
  }
  chart.setOption(option);
  return chart;
}