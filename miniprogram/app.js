/**
 * 小程序入口文件
 */

const api = require('./utils/api');
const socket = require('./utils/socket');
const ad = require('./utils/ad');
const errorHandler = require('./utils/errorHandler');
const performance = require('./utils/performance');
const share = require('./utils/share');
const analytics = require('./utils/analytics');

App({
  // 全局数据
  globalData: {
    userInfo: null,
    userAssets: null,
    isLogin: false,
    currentRoom: null
  },
  
  /**
   * 小程序启动
   */
  onLaunch(options) {
    console.log('小程序启动', options);
    
    // 初始化分析
    analytics.track('app_launch', { options });
    
    // 检查更新
    this.checkUpdate();
    
    // 初始化用户信息
    this.initUserInfo();
    
    // 预加载广告
    ad.preloadRewardedVideoAd();
    
    // 初始化性能管理
    performance.initLazyLoad();
    
    // 设置分享菜单
    share.setupShareMenu();
  },
  
  /**
   * 小程序显示
   */
  onShow(options) {
    console.log('小程序显示', options);
    
    // 追踪页面显示
    analytics.track('app_show', { options });
    
    // 重连Socket
    if (this.globalData.isLogin) {
      this.connectSocket();
    }
    
    // 性能管理
    performance.manageMemory();
  },
  
  /**
   * 小程序隐藏
   */
  onHide() {
    console.log('小程序隐藏');
    
    // 追踪页面隐藏
    analytics.track('app_hide');
    
    // 断开Socket连接
    socket.disconnect();
    
    // 发送分析事件
    analytics.flushEvents();
  },
  
  /**
   * 检查更新
   */
  checkUpdate() {
    const updateManager = wx.getUpdateManager();
    
    updateManager.onCheckForUpdate((res) => {
      console.log('检查更新:', res.hasUpdate);
    });
    
    updateManager.onUpdateReady(() => {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success: (res) => {
          if (res.confirm) {
            updateManager.applyUpdate();
          }
        }
      });
    });
    
    updateManager.onUpdateFailed(() => {
      wx.showModal({
        title: '更新失败',
        content: '新版本下载失败，请检查网络后重试',
        showCancel: false
      });
    });
  },
  
  /**
   * 初始化用户信息
   */
  initUserInfo() {
    const userInfo = wx.getStorageSync('userInfo');
    const token = wx.getStorageSync('token');
    
    if (userInfo && token) {
      this.globalData.userInfo = userInfo;
      this.globalData.isLogin = true;
      api.setToken(token);
      
      // 获取用户资产
      this.getUserAssets();
    }
  },
  
  /**
   * 获取用户资产
   */
  async getUserAssets() {
    try {
      const assets = await api.getUserAssets();
      this.globalData.userAssets = assets;
      wx.setStorageSync('userAssets', assets);
    } catch (error) {
      console.error('获取用户资产失败:', error);
    }
  },
  
  /**
   * 微信登录
   */
  async wxLogin() {
    try {
      wx.showLoading({ title: '登录中...' });
      
      // 获取微信登录code
      const loginRes = await wx.login();
      const code = loginRes.code;
      
      // 获取用户信息
      const userRes = await wx.getUserProfile({
        desc: '用于完善用户资料'
      });
      const userInfo = userRes.userInfo;
      
      // 调用后端登录接口
      const data = await api.wxLogin(code, userInfo);
      
      // 保存用户信息
      this.globalData.userInfo = data.userInfo;
      this.globalData.isLogin = true;
      wx.setStorageSync('userInfo', data.userInfo);
      wx.setStorageSync('userId', data.userInfo.id);
      
      // 连接Socket
      await this.connectSocket();
      
      wx.hideLoading();
      wx.showToast({
        title: '登录成功',
        icon: 'success'
      });
      
      return true;
    } catch (error) {
      wx.hideLoading();
      wx.showToast({
        title: '登录失败',
        icon: 'none'
      });
      console.error('微信登录失败:', error);
      return false;
    }
  },
  
  /**
   * 连接Socket
   */
  async connectSocket() {
    if (!this.globalData.userInfo) {
      return;
    }
    
    try {
      await socket.connect(this.globalData.userInfo.id);
      console.log('Socket连接成功');
    } catch (error) {
      console.error('Socket连接失败:', error);
    }
  },
  
  /**
   * 退出登录
   */
  logout() {
    // 断开Socket连接
    socket.disconnect();
    
    // 清除用户信息
    this.globalData.userInfo = null;
    this.globalData.userAssets = null;
    this.globalData.isLogin = false;
    
    wx.removeStorageSync('userInfo');
    wx.removeStorageSync('token');
    wx.removeStorageSync('userId');
    wx.removeStorageSync('userAssets');
    
    // 跳转到登录页
    wx.reLaunch({
      url: '/pages/login/login'
    });
  }
});

