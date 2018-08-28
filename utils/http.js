var HOST = 'https://api.agrimedia.cn/';
// 网站请求接口
function post(req) {
  //发起网络请求
  wx.request({
    url: HOST + req.uri,
    data: req.param,
    header: {
      "content-type": "application/x-www-form-urlencoded"
    },
    method: 'POST',
    success: function (res) {
      req.success(res.data)
    },
    fail: function (res) {
      console.log(res);
    }
  })
}

function get(req){
  wx.request({
    url: HOST + req.uri,
    header:{
      'content-type': 'application/json' // 默认值
    },
    method:'GET',
    success:function(res){
      req.success(res.data)     //进行登录状态判断 当返回7777执行登录操作 
    },
    fail: function (res) {
      console.log(res);
    }
  })
}

// 导出模块
module.exports = {
  post: post,
  get: get
}