//planCode.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    wrapperHeight:0,
    confirmBox:true,
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
    this.setData({ confirmBox: false });
  },
  closed: function (e) {
    wx.reLaunch({
      url: '../canceDetail/canceDetail'
    })
  }
})