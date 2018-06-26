// pages/movie/movie-detail/movie-detail.js
var app = getApp();
Page({
  data: {
    showAllDesc: false,
    movie: {}
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    var id = options.id;
    var url = app.globalData.doubanBase + app.globalData.subject + id;
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000
    });
    wx.request({
      url: url,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: { 'content-type': 'json' }, // 设置请求的 header
      success: function (res) {
        var data = res.data;
        var readyData = {};
        var directorsAndCasts = [];
        for (let i in data.directors) {
          directorsAndCasts.push(data.directors[i]);
        }
        for (let j in data.casts) {
          directorsAndCasts.push(data.casts[j]);
        }
        var genres = "";
        var separate = " / ";
        for (let k in data.genres) {
          genres += data.genres[k] + separate;
        }
        genres = genres.substring(0, genres.length - separate.length);
        var countries = "国家：";
        for (let g in data.countries) {
          countries += data.countries[g] + separate;
        }
        countries = countries.substring(0, countries.length - separate.length);
        readyData["movie"] = {
          id: data.id,
          title: data.title,
          images: data.images,
          directorsAndCasts: directorsAndCasts,
          collectCount: data.collect_count,
          commentsCount: data.comments_count,
          wishCount: data.wish_count,
          reviewsCount: data.reviews_count,
          countries: countries,
          doCount: data.do_count,
          genres: genres,
          originalTitle: "原名：" + data.original_title,
          rating: data.rating,
          ratingsCount: data.ratings_count + "人",
          subtype: data.subtype,
          summary: data.summary,
          shareUrl: data.share_url,
          year: data.year,
        };
        that.setData(readyData);
      },
      fail: function () {
        console.log("fail");
      },
      complete: function () {
        console.log("complete");
        wx.hideToast();
      }
    })
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  /** 展开简介   */
  handleExtensiontap: function (event) {
    var readyData = {
      "showAllDesc": true
    };
    this.setData(readyData);
  },
  /** 查看影人信息 */
  handleCelebrity: function (event) {
    var id = event.currentTarget.dataset.id;
    var avatar = event.currentTarget.dataset.avatar;
    wx.redirectTo({
      url: '/pages/movie/movie-detail/celebrity/celebrity?id=' + id + "&&avatar=" + avatar
    });
  }
})