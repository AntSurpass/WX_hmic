// pages/play/play.js

const innerAudioContext = wx.createInnerAudioContext();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    playsrc: '',
    songmid: '',
    imagesrc: '',
    aniState: 'running',
    playimage: 'https://www.huyuechao.com/public/img?name=stop.svg',
    curtime: 0,
    datime: 0,
    sheowcurtime: '',
    showdatime:'',
    songname:'',
    singername:''

  },
  audioPlay: function() {
    console.log(innerAudioContext.paused);
    if (!innerAudioContext.paused) {
      innerAudioContext.pause()
      this.setData({
        playimage: 'https://www.huyuechao.com/public/img?name=play.svg',
        aniState: 'paused'
      })
    } else {
      innerAudioContext.play()
      this.setData({
        playimage: 'https://www.huyuechao.com/public/img?name=stop.svg',
        aniState: 'running'
      })
    }
  },
  audioPause: function() {
    innerAudioContext.pause()
  },
  audio14: function() {
    innerAudioContext.seek(14)
  },
  audioStart: function() {
    innerAudioContext.seek(0)
  },
  sliderchange: function(e) {
    console.log(e.detail.value)

    innerAudioContext.seek(e.detail.value *100);
    this.setData({
      playimage: 'https://www.huyuechao.com/public/img?name=stop.svg',
      aniState: 'running'
    })

  },
  timeUpdate:function() {
    var that = this;
    innerAudioContext.onTimeUpdate(function (res) {
      var ct = (innerAudioContext.currentTime / 100).toFixed(2);
      var dt = (innerAudioContext.duration / 100).toFixed(2);
      var d = dt.toString().split('.');
      var showdt = `${d[0]}:${d[1]}`;
      var s = ct.toString().split('.');
      var showct = `${s[0]}:${s[1]}`;
      that.setData({
        curtime: ct,
        datime: dt,
        showdatime: showdt,
        sheowcurtime: showct
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var songmid = options.songmic;
    var lab = getApp().globalData.albummid;
    var songname = getApp().globalData.songname;
    var singername = getApp().globalData.singername;
    wx.request({
      url: `https://www.huyuechao.com/api/getKey?songmid=${songmid}`,
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        var name = res.data.data.items[0].filename;
        var key = res.data.data.items[0].vkey;
        var playurl = `http://dl.stream.qqmusic.qq.com/${name}?vkey=${key}&guid=1066282750&uin=0&fromtag=38`;
        var imageurl = `https://y.gtimg.cn/music/photo_new/T002R300x300M000${lab}.jpg?max_age=2592000`;
        innerAudioContext.src = playurl;
        that.setData({
          playsrc: playurl,
          imagesrc: imageurl,
          songname: songname,
          singername: singername
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    var that = this;
    innerAudioContext.onPlay((res) => {
     this.timeUpdate();
    })
    // innerAudioContext.autoplay = true;
    innerAudioContext.onCanplay((res) => {
      innerAudioContext.play();
    })
    innerAudioContext.onSeeking((res) => {
      this.timeUpdate();
    })
    innerAudioContext.onEnded(() => {
      this.setData({
        curtime: 0,
        sheowcurtime: '0:00',
        playimage: 'https://www.huyuechao.com/public/img?name=play.svg',
        aniState: 'paused'
      })
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    innerAudioContext.pause()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})