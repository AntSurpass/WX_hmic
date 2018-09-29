// pages/list/list.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotData: {},
    songList: {}
  },
  toplay: function(event) {
    var songmid = event.currentTarget.dataset.item.songmid;
    app.globalData.albummid = event.currentTarget.dataset.item.albummid;
    app.globalData.songname = event.currentTarget.dataset.item.songname;
    app.globalData.singername = event.currentTarget.dataset.item.singer[0].name;
    wx.navigateTo({
      url: `../play/play?songmic=${songmid}`
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    var hotid = options.hotid
    var that = this
    wx.request({
      url: `https://www.huyuechao.com/api/getSongList?hotid=${hotid}`,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var Data = res.data.cdlist[0];
        that.setData({
          hotData: Data,
          songList: Data.songlist
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})