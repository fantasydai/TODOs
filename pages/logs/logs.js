Page({

  /**
   * 页面的初始数据
   */
  data: {
    logs:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    var logs=wx.getStorageSync('todo_logs')
    this.setData({
      logs:logs||[]
    })
  }
})
