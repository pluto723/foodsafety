const app = getApp()
Page({
  data: {
    loading:true,
    name:'',
    list:'',
  },
  //页面跳转
  PageTwo:function(){
    wx.redirectTo({
      url: '../second/second'
    })
  },
  //页面样式设置
  onShow(options) {
    wx.hideHomeButton()
    var that = this
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#a6d7ce',
    }),
    //计时器，设置加载时间
    setTimeout(function() {
      that.setData({
        loading:false
      })
    }, 1000);
    //对识别后的结果进行处理
    var initial_datas = app.globalData.ingredient_list
    var string = ''
    //将识别出来的列表拼接为字符串
    for (let index = 0; index < initial_datas.length; index++) {
      const element = initial_datas[index]
      string = string + element.words
    }
    //去除字符串中不需要的文字
    for (let index = 0; index < string.length; index++) {
      const element = string[index];
      if (element == ':' || element == '：') {
        string = string.substr(index+1)
      }
    }
    //将括号内的文字提取出来,并将字符串转为列表
    var lists = string.split(/[()（）、]/).filter(item => item.trim() !== '')
    //将列表中的“食品添加剂”删除
    lists.forEach(function(item,index,arr){
      if(item == '食品添加剂'||item == '水'){
        arr.splice(index,1)
      }
    })
    console.log(lists)
    //展示处理后的结果
    this.setData({
      list:lists
    }),
    //将结果传给网页二
    app.globalData.ingredient_list = lists
    //请求疾病和益处数据
    wx.request({
      url: 'http://47.120.36.255/',
      method:'GET',
      success:function(res){
        //设为全局变量，用于传给其他页面
        app.globalData.benefits = res.data.benefit_data
        app.globalData.diseases = res.data.disease_data
      }
    })
    //请求性质数据
    wx.request({
      url: 'http://47.120.36.255/quality',
      method:'GET',
      success:function(res){
        //设为全局变量，用于传给其他页面
        app.globalData.information = res.data.quality_data
      }
    })  
  }
})