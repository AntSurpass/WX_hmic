//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    hotSong: []
  },
  //事件处理函数
  tolist: function(event) {
    var id = event.currentTarget.dataset.hi;
    wx.navigateTo({
      url: `../list/list?hotid=${id}`
    })
  },
  bindSYS: function() {

  },
  onLoad: function() {
    var that = this
    wx.request({
      url: 'https://www.huyuechao.com/api/WxDistList',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var resdata = res.data.data.list;
        that.setData({
          hotSong: resdata
        })
      }
    })
  }
})