let app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showRating: false,
    showWish: false,
    inTheaters: {},
    category: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    let inTheatersURL = app.globalData.doubanBase + app.globalData.inTheaters + "?start=0&&count=10";

    this.getMovieListData(inTheatersURL, "inTheaters", "影院热映");
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  /** 获取电影列表 */
  getMovieListData: function (url, settedKey, categoryTitle) {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000
    });
    let that = this;
    // 请求电影数据
    wx.request({
      url: url,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "content-type": "json"
      }, // 设置请求的 header
      success: function (res) {
        // console.log(res)
        // 组装电影数据
        let data = res.data;
        that.processMovieListData(data, settedKey, categoryTitle);
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
        wx.hideToast();
      }
    })
  },
  /** 组装电影数据 */
  processMovieListData: function (data, settedKey, categoryTitle) {
    let movies = [];
    for (let idx in data.subjects) {
      let subject = data.subjects[idx];
      let showRating = false;
      let showWish = false;
      if ("inTheaters" == settedKey) {
        showRating = true;
        showWish = false;
      } else {
        showRating = true;
        showWish = false;
      }
      let temp = {
        id: subject.id,
        title: subject.title,
        rating: subject.rating,
        collect_count: subject.collect_count,
        images: subject.images,
        subtype: subject.subtype,
        directors: subject.directors,
        casts: subject.casts,
        year: subject.year,
        comments_count: subject.comments_count,
        showRating: showRating,
        showWish: showWish
      };
      movies.push(temp);
    }
    let readyData = {};
    readyData[settedKey] = {
      categoryTitle: categoryTitle,
      movies: movies,
      category:data.title
    };
    this.setData(readyData);
  },
  /** 显示更多电影列表 */
  bindMore: function (event) {
    let typeId = event.currentTarget.dataset.typeId;
    console.log(event)
    wx.navigateTo({
      url: '/pages/movie/movie-more/movie-more?typeId=' + typeId
    });
  },
  /** 跳转电影详情页 */
  bindMovieDetail: function (event) {
    let id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/movie/movie-detail/movie-detail?id=' + id
    });
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

  },

})
