// pages/blog/blog.js
// 搜索的关键字
let keyword = ''
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 控制底部弹出层是否显示
    modalShow: false,
    musiclist: [],
    page: 0,
    keyword: null
  },
  onLoad: function(options) {

  },

  onSearch(event) {
    // console.log(event.detail.keyword)
    keyword = event.detail.keyword
    this.setData({
      keyword,
      page: 0,
      musiclist: []
    })
    this.getmuisclist()
  },
  getmuisclist() {
    wx.showLoading({})
    console.log(this.data.page)
    wx.request({
      url: `http://musicapi.xiecheng.live/search?keywords=${this.data.keyword}&offset=${this.data.page}`,
      success: (res) => {
        let musiclist = null
        if (this.data.page == 0) {
          musiclist = res.data.result.songs
          this.setData({
            musiclist,
            page: this.data.page + 1
          })
        } else {
          musiclist = [...this.data.musiclist, ...res.data.result.songs]
          this.setData({
            musiclist,
            page: this.data.page + 1
          })
        }
        wx.setStorageSync('musiclist', musiclist)
        wx.hideLoading()
      }
    })
  },
  //播放
  goplay(e) {
    console.log(e)
    wx.navigateTo({
      url: `../../pages/player/player?musicId=${e.currentTarget.dataset.id}&index=${e.currentTarget.dataset.index}`,
    })
  },
  onReachBottom: function() {
    // this.setData({
    //   blogList: []
    // })
    console.log('到底了')
    this.getmuisclist()
  }
})