import * as echarts from '../../ec-canvas/echarts';
let chart = null;
const app = getApp()

Page({
  data: {
    ec: {
      onInit: initChart
    },
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
  //获取识别后的数据并进行处理
  let data_list = app.globalData.ingredient_list
  let node_list = []
  let link_list = []
  //根据OCR识别出来的结果生成nodes
  let first_node = {
    id: "饮料",
    name: "饮料",
    val: 16,
    color: "red",
    symbol: "diamond"
  }
  node_list.push(first_node)
  for (let index = 0; index < data_list.length; index++) {
    const element = data_list[index];
    const item = {
      id: element,
      name: element,
      val: 12,
      color: "skyblue"
    }
    node_list.push(item)
  }
  //根据OCR识别出来的结果生成links
  for (let index = 0; index < data_list.length; index++) {
    const element = data_list[index];
    const item = {
      'source': '饮料',
      'target': element
    }
    link_list.push(item)
  }
  //从全局变量中读取所需的数据
  let benefit = app.globalData.benefits
  let disease = app.globalData.diseases
  //在力导向图中添加疾病节点
  let disease_list = []//用于统计该饮料可能引起的所有疾病
  for (let index = 0; index < disease.length; index++) {
    const element = disease[index].Ingredient
    const disease1 = disease[index].Dis
    const disease2 = disease[index].Dis1
    for(let index = 0; index < data_list.length; index++){
      const data = data_list[index]
      if(data == element){
        const add_node1 = {
          id: disease1,
          name: disease1,
          val: 8,
          color: "green"
        }
        const add_node2 = {
          id: disease2,
          name: disease2,
          val: 8,
          color: "green"
        }
        disease_list.push(disease1,disease2)
        node_list.push(add_node1)
        node_list.push(add_node2)
        const add_link1 = {
          'source': data, 
          'target': disease1, 
          'colorkey': 'red'
        }
        const add_link2 = {
          'source': data, 
          'target': disease2, 
          'colorkey': 'red'
        }
        link_list.push(add_link1)
        link_list.push(add_link2)
      }
    }
  }
  app.globalData.disease_list = disease_list//设置为全局变量，用于传给下一页面
  //在力导向图中添加有益节点
  for (let index = 0; index < benefit.length; index++) {
    const element = benefit[index].Ingredient
    const benefit1 = benefit[index].Bene
    const benefit2 = benefit[index].Bene1
    for(let index = 0; index < data_list.length; index++){
      const data = data_list[index]
      if(data == element){
        console.log(benefit2)
        const add_node1 = {
          id: benefit1,
          name: benefit1,
          val: 8,
          color: "blue"
        }
        const add_node2 = {
          id: benefit2,
          name: benefit2,
          val: 8,
          color: "blue"
        }
        node_list.push(add_node1)
        node_list.push(add_node2)
        const add_link1 = {
          'source': data, 
          'target': benefit1, 
          'colorkey': 'blue',
        }
        const add_link2 = {
          'source': data, 
          'target': benefit2, 
          'colorkey': 'blue',
        }
        link_list.push(add_link1)
        link_list.push(add_link2)
      }
    }
  }
  let nodes = node_list
  let links = link_list
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
      roam: true, // 是否开启鼠标缩放和平移漫游
      focusNodeAdjacency: true, // 是否在鼠标移到节点上的时候突出显示节点以及节点的边和邻接节点
      edgeSymbol: ['', 'arrow'],
      cursor: 'pointer',
      zoom: 0.7, //缩放比列（默认为1）
      emphasis: { //  鼠标悬浮高亮图形的样式
        itemStyle: {
          borderColor: 'black',
          borderWidth: 1,
          borderType: 'solid',
          symbolSize: 40,
          color: 'red',
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
            if (links.data.relation != null) {
              return links.data.relation
            } else {
              return ''
            }
          }
        }
      },
      itemStyle: {
        normal: {
          color: function (nodes) {
            return nodes.data.color //设置节点颜色
          },
        }
      },
      symbolSize: function (value, params) { //改变节点大小
        return params.data.val * 3
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
      nodes: nodes, // 节点数据列表
      links: links, // 关系数据列表
    }],
  }
  chart.setOption(option);
  return chart;
}