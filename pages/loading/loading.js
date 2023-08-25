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
    }, 2000);
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
      if(item == '食品添加剂'){
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
    wx.request({
      url: 'http://47.120.36.255:80/result',
      method:'POST',
      success:function(res){
        that.setData({
          name:res.data[0],
          list:app.globalData.list
        })
      }
    }),
    wx.request({
      url: 'http://47.120.36.255:80/content',
      method:'POST',
      success:function(res){
        app.globalData.nodes = res.data[0]
        app.globalData.links = res.data[1]
        app.globalData.information = res.data[2]
      }
    }),
    wx.request({
      url: 'http://47.120.36.255:80/person',
      method:'POST',
      success:function(res){
        app.globalData.dieases = res.data[0]
      }
    })   
  }
})