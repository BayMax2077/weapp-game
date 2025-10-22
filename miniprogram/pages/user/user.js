// pages/user/user.js
const app = getApp();
const api = require('../../utils/api');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    userAssets: null,
    gameRecords: [],
    loading: false,
    refreshing: false,
    showSettings: false,
    settings: {
      sound: true,
      music: true,
      vibration: true,
      notification: true
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log('用户页面加载');
    this.initPage();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.refreshUserInfo();
  },

  /**
   * 初始化页面
   */
  async initPage() {
    this.setData({ loading: true });
    
    try {
      await Promise.all([
        this.loadUserInfo(),
        this.loadUserAssets(),
        this.loadGameRecords()
      ]);
    } catch (error) {
      console.error('页面初始化失败:', error);
    } finally {
      this.setData({ loading: false });
    }
  },

  /**
   * 加载用户信息
   */
  loadUserInfo() {
    const userInfo = app.globalData.userInfo;
    this.setData({ userInfo });
  },

  /**
   * 刷新用户信息
   */
  refreshUserInfo() {
    const userInfo = app.globalData.userInfo;
    const userAssets = app.globalData.userAssets;
    
    this.setData({
      userInfo,
      userAssets
    });
  },

  /**
   * 加载用户资产
   */
  loadUserAssets() {
    const userAssets = app.globalData.userAssets;
    this.setData({ userAssets });
  },

  /**
   * 加载游戏记录
   */
  async loadGameRecords() {
    try {
      // 这里可以添加获取游戏记录的API
      // const gameRecords = await api.getGameRecords();
      // this.setData({ gameRecords });
    } catch (error) {
      console.error('加载游戏记录失败:', error);
    }
  },

  /**
   * 查看游戏记录
   */
  onGameRecordTap() {
    wx.showToast({
      title: '功能开发中',
      icon: 'none'
    });
  },

  /**
   * 查看资产详情
   */
  onAssetsTap() {
    wx.showModal({
      title: '我的资产',
      content: `金币：${this.data.userAssets?.coins || 0}\n钻石：${this.data.userAssets?.diamonds || 0}`,
      showCancel: false,
      confirmText: '知道了'
    });
  },

  /**
   * 设置
   */
  onSettingsTap() {
    wx.showActionSheet({
      itemList: ['清除缓存', '关于我们', '意见反馈'],
      success: (res) => {
        switch (res.tapIndex) {
          case 0:
            this.clearCache();
            break;
          case 1:
            this.showAbout();
            break;
          case 2:
            this.showFeedback();
            break;
        }
      }
    });
  },

  /**
   * 清除缓存
   */
  clearCache() {
    wx.showModal({
      title: '清除缓存',
      content: '确定要清除所有缓存吗？',
      success: (res) => {
        if (res.confirm) {
          wx.clearStorageSync();
          wx.showToast({
            title: '缓存已清除',
            icon: 'success'
          });
        }
      }
    });
  },

  /**
   * 关于我们
   */
  showAbout() {
    wx.showModal({
      title: '关于我们',
      content: '微信小程序游戏平台 V2.0\n版本：2.0.0\n开发者：游戏开发团队',
      showCancel: false,
      confirmText: '知道了'
    });
  },

  /**
   * 设置点击
   */
  onSettingsTap() {
    this.setData({ showSettings: true });
  },

  /**
   * 隐藏设置
   */
  hideSettings() {
    this.setData({ showSettings: false });
  },

  /**
   * 音效设置
   */
  onSoundChange(e) {
    const sound = e.detail.value;
    this.setData({
      'settings.sound': sound
    });
    // 保存到本地存储
    wx.setStorageSync('settings', this.data.settings);
  },

  /**
   * 音乐设置
   */
  onMusicChange(e) {
    const music = e.detail.value;
    this.setData({
      'settings.music': music
    });
    // 保存到本地存储
    wx.setStorageSync('settings', this.data.settings);
  },

  /**
   * 震动设置
   */
  onVibrationChange(e) {
    const vibration = e.detail.value;
    this.setData({
      'settings.vibration': vibration
    });
    // 保存到本地存储
    wx.setStorageSync('settings', this.data.settings);
  },

  /**
   * 通知设置
   */
  onNotificationChange(e) {
    const notification = e.detail.value;
    this.setData({
      'settings.notification': notification
    });
    // 保存到本地存储
    wx.setStorageSync('settings', this.data.settings);
  },

  /**
   * 意见反馈
   */
  showFeedback() {
    wx.showModal({
      title: '意见反馈',
      content: '如有问题或建议，请联系客服',
      showCancel: false,
      confirmText: '知道了'
    });
  },

  /**
   * 意见反馈点击
   */
  onFeedbackTap() {
    this.showFeedback();
  },

  /**
   * 关于我们点击
   */
  onAboutTap() {
    this.showAbout();
  },

  /**
   * 退出登录
   */
  onLogoutTap() {
    wx.showModal({
      title: '退出登录',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          app.logout();
        }
      }
    });
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  async onPullDownRefresh() {
    this.setData({ refreshing: true });
    
    try {
      await Promise.all([
        this.loadUserInfo(),
        this.loadUserAssets(),
        this.loadGameRecords()
      ]);
    } catch (error) {
      console.error('刷新失败:', error);
    } finally {
      this.setData({ refreshing: false });
      wx.stopPullDownRefresh();
    }
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