//app.js
App({
  onLaunch: function () {
    //引入公共请求配置
    var http = require('./utils/http.js');
    // http.post({
    //   uri: http.orderListUri,
    //   param: {
    //     third_session: wx.getStorageSync('third_session')
    //   },
    //   success: function (data) {
    //     that.setData({
    //       orderList: data
    //     });
    //   }
    // });
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    let _this =this
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: 'https://api.agrimedia.cn/wx_login/doLogin?code='+res.code, 
          method: 'GET',
          header: {
            'content-type': 'application/json' // 默认值
            // "Content-Type": "application/x-www-form-urlencoded"  //post 如果不成功 使用
          },
          success: function (res) {
            console.log(res ,'login')
          }
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            withCredentials:true,
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              console.log('进入小程序', res)
              wx.request({
                url: 'https://api.agrimedia.cn/wx_login/getUserInfo?iv=' + res.iv + '&encryptedData=' + res.encryptedData,
                method: 'GET',
                header: {
                  'content-type': 'application/json' // 默认值
                  // "Content-Type": "application/x-www-form-urlencoded"  //post 如果不成功 使用
                },
                success: function (res) {
                  console.log(res,'get')
                }
              })
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  onShow: function (options) {

    console.log(options.scene);

  },
  globalData: {
    userInfo: null,
    pageUrl:'https://api.agrimedia.cn/',
  }
})