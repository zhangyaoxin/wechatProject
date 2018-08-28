//planCode.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    wrapperHeight:0,
    confirmBox:false,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    // 获取页面高度
    wx.getSystemInfo({
      success : function (res) {
        // console.log(res)
        that.setData({ wrapperHeight: res.windowHeight});
      }
    })
  },
  confirm: function (e) {
    // this.setData({ confirmBox: false });
    wx.showModal({
      title: '确认核销',
      content: '确定要核销此优惠券吗?',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.showToast({
            title: '核销成功',
            icon: 'success',
            duration: 2000
          })  
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })  
  },
  closed: function (e) {
    wx.reLaunch({
      url: '../canceDetail/canceDetail'
    })
  }
})