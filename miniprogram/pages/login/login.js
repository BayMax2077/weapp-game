// pages/login/login.js
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    isLogin: false,
    userInfo: null,
    loading: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log('登录页面加载');
    this.checkLoginStatus();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.checkLoginStatus();
  },

  /**
   * 检查登录状态
   */
  checkLoginStatus() {
    const isLogin = app.globalData.isLogin;
    const userInfo = app.globalData.userInfo;
    
    this.setData({
      isLogin,
      userInfo
    });

    // 如果已登录，跳转到首页
    if (isLogin && userInfo) {
      setTimeout(() => {
        wx.switchTab({
          url: '/pages/index/index'
        });
      }, 1000);
    }
  },

  /**
   * 微信登录
   */
  async handleWxLogin() {
    if (this.data.loading) return;
    
    this.setData({ loading: true });
    
    try {
      const success = await app.wxLogin();
      
      if (success) {
        this.setData({
          isLogin: true,
          userInfo: app.globalData.userInfo
        });
        
        wx.showToast({
          title: '登录成功',
          icon: 'success'
        });
        
        // 延迟跳转，让用户看到成功提示
        setTimeout(() => {
          wx.switchTab({
            url: '/pages/index/index'
          });
        }, 1500);
      }
    } catch (error) {
      console.error('登录失败:', error);
      wx.showToast({
        title: '登录失败，请重试',
        icon: 'none'
      });
    } finally {
      this.setData({ loading: false });
    }
  },

  /**
   * 游客模式登录
   */
  handleGuestLogin() {
    wx.showModal({
      title: '游客模式',
      content: '游客模式下部分功能受限，建议使用微信登录获得完整体验',
      confirmText: '继续',
      cancelText: '微信登录',
      success: (res) => {
        if (res.confirm) {
          // 设置游客模式标识
          wx.setStorageSync('isGuest', true);
          app.globalData.isLogin = true;
          app.globalData.userInfo = {
            id: 'guest_' + Date.now(),
            nickname: '游客用户',
            avatarUrl: '/assets/images/default-avatar.png'
          };
          
          this.setData({
            isLogin: true,
            userInfo: app.globalData.userInfo
          });
          
          wx.switchTab({
            url: '/pages/index/index'
          });
        } else {
          this.handleWxLogin();
        }
      }
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    return {
      title: '一起来玩游戏吧！',
      path: '/pages/index/index',
      imageUrl: '/assets/images/share.jpg'
    };
  }
})