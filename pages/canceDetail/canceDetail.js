// pages/canceDetail/canceDetail.js
//获取应用实例
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wrapperHeight:660,
    linkheight:0,
    bodyHeight:0,
    detailCont:'',
    sysScanCode:'',
    cleark_list: false,
    cancedetail: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that= this;
    let height = 0;
    const app = getApp()//初始化实例
    //创建选择器
    let query = wx.createSelectorQuery();
    //选择元素
    query.select('.link_sec').boundingClientRect()
    query.exec(function (res) {
      //res就是 所有标签为mjltest的元素的信息 的数组
      // console.log(res);
      //取高度
      // console.log(res[0].height);
        that.setData({ linkheight: res[0].height})
      wx.getSystemInfo({//获取页面高度
        success: function (res) {
          let height = res.windowHeight - that.data.linkheight;
          that.setData({
            wrapperHeight: height,
            bodyHeight: res.windowHeight
          });
          // console.log(res.model)
          // console.log(res.pixelRatio)
          // console.log(res.windowWidth)
          // console.log(res.windowHeight)
          // console.log(res.language)
          // console.log(res.version)
        }
      });
    });

    //调用异步请求
    that.markerList()
  },
  //修改详情显示
  changeDetailShow: function (e) {
    let con = this.data.detailCont;
    let code = e.currentTarget.dataset.code;
    // console.log(e.currentTarget.dataset)
    if (con === code){
      this.setData({
        detailCont: ''
      });
    }
    else{
      this.setData({
        detailCont: code
      });
    }
    console.log(con)
  },
  showSys: function () {
    let that = this
    wx.scanCode({
      success:function (res) {
        console.log(res)
        that.setData({
          sysScanCode: res.result
        });
        wx.navigateTo({
          url: '../plan/planCode'
        })
      }
    })
  },
  //店员 卡券 切换
  showDetail: function (e) {
    // 读取选项的code值
    let code = Number(e.currentTarget.dataset.code);
    console.log('点击切换功能', code)
    //处于卡券页面
    if (this.data.cancedetail && code){
      // console.log('切到店员')
      this.setData({ 
        cancedetail: false,
        cleark_list: true,
       })      
    }
    //店员列表
    else if (this.data.cleark_list && !code){
      // console.log('切到卡券')
      this.setData({
        cancedetail: true,
        cleark_list: false,
      })     
    }
  },

  //卡券列表
  markerList: function (e) {
    wx.request({
      url: 'http://minrog.com', //接口地址 /wxpub/coupon_controller/showMyCoupon
      // data: { },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
        // "Content-Type": "application/x-www-form-urlencoded"  //post 如果不成功 使用
      },
      success: function (res) {
        console.log(res.data)


        //判断请求结束
        wx.showToast({//显示提示框
          title: '成功',
          icon: 'success',
          duration: 2000
        })
        if (res == null || res.data == null) {
          console.error('网络请求失败');
          return;
        }
        setTimeout(function () {
          wx.hideToast()
        }, 1500)

      }
    })
  }

})