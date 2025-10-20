// pages/room/room.js
const app = getApp();
const api = require('../../utils/api');
const socket = require('../../utils/socket');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    roomCode: '',
    gameId: '',
    roomInfo: null,
    players: [],
    gameStatus: 'waiting', // waiting, playing, finished
    currentPlayer: null,
    gameData: {},
    loading: false,
    isHost: false,
    canStart: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log('房间页面加载', options);
    
    const { roomCode, gameId } = options;
    
    this.setData({
      roomCode: roomCode || '',
      gameId: gameId || ''
    });
    
    this.initRoom();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.setupSocketListeners();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {
    // 页面隐藏时不断开Socket，保持连接
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    this.leaveRoom();
  },

  /**
   * 初始化房间
   */
  async initRoom() {
    this.setData({ loading: true });
    
    try {
      await this.loadRoomInfo();
      await this.joinRoom();
      this.setupSocketListeners();
    } catch (error) {
      console.error('房间初始化失败:', error);
      wx.showToast({
        title: '进入房间失败',
        icon: 'none'
      });
    } finally {
      this.setData({ loading: false });
    }
  },

  /**
   * 加载房间信息
   */
  async loadRoomInfo() {
    try {
      const roomInfo = await api.getRoomInfo(this.data.roomCode);
      this.setData({ roomInfo });
    } catch (error) {
      console.error('加载房间信息失败:', error);
    }
  },

  /**
   * 加入房间
   */
  async joinRoom() {
    try {
      const userId = app.globalData.userInfo?.id;
      if (!userId) {
        wx.showToast({
          title: '请先登录',
          icon: 'none'
        });
        return;
      }

      // 通过Socket加入房间
      socket.joinRoom(this.data.roomCode, userId);
      
      // 监听房间事件
      socket.onPlayerJoined((data) => {
        this.handlePlayerJoined(data);
      });
      
      socket.onPlayerLeft((data) => {
        this.handlePlayerLeft(data);
      });
      
      socket.onGameData((data) => {
        this.handleGameData(data);
      });
      
      socket.onGameStatus((data) => {
        this.handleGameStatus(data);
      });
      
    } catch (error) {
      console.error('加入房间失败:', error);
    }
  },

  /**
   * 设置Socket监听器
   */
  setupSocketListeners() {
    // 监听玩家加入
    socket.onPlayerJoined((data) => {
      this.handlePlayerJoined(data);
    });
    
    // 监听玩家离开
    socket.onPlayerLeft((data) => {
      this.handlePlayerLeft(data);
    });
    
    // 监听游戏数据
    socket.onGameData((data) => {
      this.handleGameData(data);
    });
    
    // 监听游戏状态
    socket.onGameStatus((data) => {
      this.handleGameStatus(data);
    });
  },

  /**
   * 处理玩家加入
   */
  handlePlayerJoined(data) {
    console.log('玩家加入:', data);
    // 更新玩家列表
    this.loadRoomInfo();
  },

  /**
   * 处理玩家离开
   */
  handlePlayerLeft(data) {
    console.log('玩家离开:', data);
    // 更新玩家列表
    this.loadRoomInfo();
  },

  /**
   * 处理游戏数据
   */
  handleGameData(data) {
    console.log('游戏数据更新:', data);
    this.setData({
      gameData: { ...this.data.gameData, ...data }
    });
  },

  /**
   * 处理游戏状态
   */
  handleGameStatus(data) {
    console.log('游戏状态更新:', data);
    this.setData({
      gameStatus: data.status
    });
  },

  /**
   * 开始游戏
   */
  async startGame() {
    try {
      wx.showLoading({ title: '开始游戏...' });
      
      // 更新游戏状态
      socket.updateGameStatus(this.data.roomCode, 'playing');
      
      wx.hideLoading();
      wx.showToast({
        title: '游戏开始',
        icon: 'success'
      });
      
      // 根据游戏类型跳转到对应的游戏页面
      this.navigateToGame();
      
    } catch (error) {
      wx.hideLoading();
      console.error('开始游戏失败:', error);
      wx.showToast({
        title: '开始游戏失败',
        icon: 'none'
      });
    }
  },

  /**
   * 跳转到游戏页面
   */
  navigateToGame() {
    const { gameId, roomCode } = this.data;
    
    let gamePage = '';
    switch (gameId) {
      case 'eliminating':
        gamePage = 'game-eliminating';
        break;
      case 'flightChess':
        gamePage = 'game-flight-chess';
        break;
      case 'fourCards':
        gamePage = 'game-four-cards';
        break;
      case 'gobang':
        gamePage = 'game-gobang';
        break;
      default:
        wx.showToast({
          title: '游戏类型不支持',
          icon: 'none'
        });
        return;
    }
    
    wx.navigateTo({
      url: `/pages/${gamePage}/${gamePage}?roomCode=${roomCode}&gameId=${gameId}`
    });
  },

  /**
   * 离开房间
   */
  async leaveRoom() {
    try {
      const userId = app.globalData.userInfo?.id;
      if (userId) {
        socket.leaveRoom(this.data.roomCode, userId);
      }
      
      // 跳转回游戏页面
      wx.navigateBack();
      
    } catch (error) {
      console.error('离开房间失败:', error);
    }
  },

  /**
   * 发送游戏数据
   */
  sendGameData(gameData) {
    try {
      socket.sendGameData(this.data.roomCode, gameData);
    } catch (error) {
      console.error('发送游戏数据失败:', error);
    }
  },

  /**
   * 邀请好友
   */
  inviteFriends() {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    return {
      title: `房间号：${this.data.roomCode}，一起来玩吧！`,
      path: `/pages/room/room?roomCode=${this.data.roomCode}&gameId=${this.data.gameId}`,
      imageUrl: '/assets/images/share.jpg'
    };
  }
})