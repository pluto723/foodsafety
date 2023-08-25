import * as echarts from '../../ec-canvas/echarts';
let chart = null;
const app = getApp()

Page({
  data: {
    ec: {
      onInit: initChart
    },
    show:'',
  },
  //关系图放大效果（网页跳转实现）
  fullShow:function () {
    this.pageRouter.navigateTo({
      url: '../full/full'
    })
  },
  //设置网页样式
  onLoad(options) {
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#253334',
    })
  },
  onShow(){
    wx.hideHomeButton()
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
  let nodes = app.globalData.nodes
  let links = app.globalData.links
  //获取识别后的数据并进行处理
  let data_list = app.globalData.ingredient_list
  console.log(data_list)
  let node_list = []
  let first_node = {id:"饮料", name:"饮料", val: 16, color: "red", symbol: "diamond"}
  node_list.push(first_node)
  for (let index = 0; index < data_list.length; index++) {
    const element = data_list[index];
    const item = {id:element,name:element,val:12, color:"skyblue"}
    node_list.push(item)
  }
  console.log(node_list)

  //定义连线的颜色
  links.forEach(link => {
    link.lineStyle = {
      normal: {
        color: link.colorkey
      }
    };
  });
  // 显示Echarts图表类型信息，可以去Echarts官网复制粘贴
  let option = {
    tooltip: {
      show: true,
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
      symbolSize: function (value, params) {//改变节点大小
        return params.data.val*3
      },
      label: { // 节点label设置
        show: true,
        position: 'bottom',
        color: '#a5b6a5',
        formatter: '{b}'
      },
      force: { // 力引导布局相关的配置项
        repulsion: 200, // 节点之间的斥力因子
        gravity: 0.02, // 节点受到的向中心的引力因子 越大越往中心靠拢
        edgeLength: 100, // 边的两个节点之间的距离
        layoutAnimation: true, // 显示布局的迭代动画
      },
      nodes:nodes,  // 节点数据列表
      links:links, // 关系数据列表
    }],
  }
  chart.setOption(option);
  chart.on('click',function(nodes){
    if (nodes.data.name == undefined) {
      return;
    }
    let page = getCurrentPages().pop();
    if (page == undefined || page == null) {
      return;
    }
    for (var index in app.globalData.information) {
      if (app.globalData.information[index][0] == nodes.data.name) {
        page.setData({
          show:app.globalData.information[index][1]
        })        
      }
    }
  })
  return chart;
}