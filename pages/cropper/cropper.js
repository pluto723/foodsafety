//获取应用实例
const app = getApp()
const screen_height = wx.getSystemInfoSync().windowHeight
const screen_width = wx.getSystemInfoSync().windowWidth
Page({
  data: {
    src: '',
    width: 200, //宽度
    height: 200, //高度
    max_width: 650,
    max_height: 650,
    min_height:20,
    disable_rotate: false, //是否禁用旋转
    disable_ratio: false, //锁定比例
    limit_move: false, //是否限制移动
  },
  onLoad: function (options) {
    this.cropper = this.selectComponent("#image-cropper");
    if (!options.imgSrc) {
      this.cropper.upload(); //上传图片
    }
  },
  cropperload(e) {
    console.log('cropper加载完成');
  },
  loadimage(e) {
    wx.hideLoading();
    console.log('图片');
    this.cropper.imgReset();
  },
  //图片裁剪预览效果
  clickcut(e) {
    console.log(e.detail);
    //图片预览
    wx.previewImage({
      current: e.detail.url, // 当前显示图片的http链接
      urls: [e.detail.url] // 需要预览的图片http链接列表
    })
  },
  //拍摄图片或从相册中选择图片
  upload() {
    let that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        wx.showLoading({
          title: '加载中',
        })
        const tempFilePaths = res.tempFilePaths[0];
        //重置图片角度、缩放、位置
        that.cropper.imgReset();
        that.setData({
          src: tempFilePaths
        });
      }
    })
  },
  end(e) {
    clearInterval(this.data[e.currentTarget.dataset.type]);
  },
  //将图片转为base64编码格式
  confirm(){
    const that = this
    this.cropper.getImg((obj) => {
      const tempFilePath = obj.url;
      wx.getFileSystemManager().readFile({
        filePath: tempFilePath,
        encoding: 'base64',
        success: function (res) {
          //调用方法
          that.getImgInfo(res.data)
        },
      })
  });
  },
  //跳转至加载页面
  showLoading: function () {
    wx.redirectTo({
      url: '../loading/loading'
    })
  },
  //根据图片的内容调用API获取图片文字`
  getImgInfo: function (imageData) {
    var that = this
    that.getBaiduToken().then(res => {
      //console.log(res)
      //获取token
      const token = res.data.access_token
      // console.log(token)
      const detectUrl = `https://aip.baidubce.com/rest/2.0/ocr/v1/general_basic?access_token=${token}` // baiduToken是已经获取的access_Token      
      wx.request({
        url: detectUrl,
        data: {
          image: imageData
        },
        method: 'POST',
        dataType: 'json',
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 必须的        
        },
        success: function (res, resolve) {
          //将 res.data.words_result数组中的内容加入到words中           
          that.showLoading()//识别完成后跳转至加载页面
          app.globalData.ingredient_list = res.data.words_result
          console.log(app.globalData.ingredient_list)
        },
        fail: function (res, reject) {
          console.log('get word fail：', res.data);
        }
      })
    })
  },
  // 获取百度access_token  
  getBaiduToken: function () {
    return new Promise(resolve => {
      var APIKEY = "645ZFxD3tRYxpYcHh4mdoI9i"
      var SECKEY = "X3GzP8GlG6sU0Nw0ywjdEVketsCawSbw"
      var tokenUrl = `https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=${APIKEY}&client_secret=${SECKEY}`
      var that = this;
      wx.request({
        url: tokenUrl,
        method: 'POST',
        dataType: 'json',
        header: {
          'content-type': 'application/json; charset-UTF-8'
        },
        success: function (res) {
          console.log("[BaiduToken获取成功]");
          return resolve(res)
        },
        fail: function (res) {
          console.log("[BaiduToken获取失败]");
          return resolve(res)
        }
      })
    })
  },
})