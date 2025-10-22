// pages/index/index.js
const app = getApp();
const api = require('../../utils/api');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    userAssets: null,
    gameList: [],
    loading: false,
    refreshing: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log('首页加载');
    this.initPage();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.refreshUserInfo();
    this.loadGameList();
  },

  /**
   * 初始化页面
   */
  async initPage() {
    this.setData({ loading: true });
    
    try {
      await Promise.all([
        this.loadUserInfo(),
        this.loadGameList()
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
  async loadUserInfo() {
    try {
      const userInfo = app.globalData.userInfo;
      const userAssets = app.globalData.userAssets;
      
      this.setData({
        userInfo,
        userAssets
      });
    } catch (error) {
      console.error('加载用户信息失败:', error);
    }
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
   * 加载游戏列表
   */
  async loadGameList() {
    try {
      // 使用本地游戏配置，避免依赖后端
      const gameList = [
        {
          id: 'eliminating',
          name: '消消乐',
          icon: '🎮',
          description: '经典三消游戏，连接三个或更多相同颜色的方块来消除它们',
          minPlayers: 1,
          maxPlayers: 4,
          difficulty: 'easy',
          estimatedTime: '5-10分钟',
          category: 'puzzle',
          isHot: true,
          players: 1234
        },
        {
          id: 'flightChess',
          name: '飞行棋',
          icon: '✈️',
          description: '经典飞行棋游戏，掷骰子移动棋子，先到达终点的玩家获胜',
          minPlayers: 2,
          maxPlayers: 4,
          difficulty: 'medium',
          estimatedTime: '15-30分钟',
          category: 'board',
          isHot: true,
          players: 856
        },
        {
          id: 'fourCards',
          name: '四张牌',
          icon: '🃏',
          description: '经典扑克游戏，出完手牌的玩家获胜',
          minPlayers: 2,
          maxPlayers: 4,
          difficulty: 'medium',
          estimatedTime: '10-20分钟',
          category: 'card',
          isHot: false,
          players: 432
        },
        {
          id: 'gobang',
          name: '五子棋',
          icon: '⚫',
          description: '经典五子棋游戏，先连成五子的玩家获胜',
          minPlayers: 2,
          maxPlayers: 2,
          difficulty: 'easy',
          estimatedTime: '5-15分钟',
          category: 'strategy',
          isHot: false,
          players: 678
        }
      ];
      
      this.setData({ gameList });
    } catch (error) {
      console.error('加载游戏列表失败:', error);
      wx.showToast({
        title: '加载失败',
        icon: 'none'
      });
    }
  },

  /**
   * 选择游戏
   */
  onGameSelect(e) {
    const gameId = e.currentTarget.dataset.gameId;
    const game = this.data.gameList.find(g => g.id === gameId);
    
    if (!game) {
      wx.showToast({
        title: '游戏不存在',
        icon: 'none'
      });
      return;
    }

    // 跳转到游戏页面
    wx.navigateTo({
      url: `/pages/games/games?gameId=${gameId}&gameName=${game.name}`
    });
  },

  /**
   * 快速开始游戏
   */
  async quickStart(e) {
    const gameId = e.currentTarget.dataset.gameId;
    
    try {
      wx.showLoading({ title: '正在匹配...' });
      
      // 随机加入房间
      const roomData = await api.randomJoinRoom(gameId);
      
      wx.hideLoading();
      
      if (roomData && roomData.roomCode) {
        wx.navigateTo({
          url: `/pages/room/room?roomCode=${roomData.roomCode}&gameId=${gameId}`
        });
      } else {
        wx.showToast({
          title: '暂无可用房间',
          icon: 'none'
        });
      }
    } catch (error) {
      wx.hideLoading();
      console.error('快速开始失败:', error);
      wx.showToast({
        title: '匹配失败，请重试',
        icon: 'none'
      });
    }
  },

  /**
   * 随机游戏
   */
  onRandomGame() {
    if (this.data.gameList.length > 0) {
      const randomIndex = Math.floor(Math.random() * this.data.gameList.length);
      const randomGame = this.data.gameList[randomIndex];
      this.quickStart({ currentTarget: { dataset: { gameId: randomGame.id } } });
    } else {
      wx.showToast({
        title: '暂无游戏',
        icon: 'none'
      });
    }
  },

  /**
   * 加入房间
   */
  onJoinRoom() {
    wx.showModal({
      title: '加入房间',
      content: '请输入房间号',
      editable: true,
      placeholderText: '房间号',
      success: (res) => {
        if (res.confirm && res.content) {
          // 这里可以实现加入房间的逻辑
          wx.showToast({
            title: '功能开发中',
            icon: 'none'
          });
        }
      }
    });
  },

  /**
   * 最近游戏
   */
  onRecentGame(e) {
    const gameId = e.currentTarget.dataset.gameId;
    wx.navigateTo({
      url: `/pages/games/games?gameId=${gameId}`
    });
  },

  /**
   * 创建房间
   */
  createRoom(e) {
    const gameId = e.currentTarget.dataset.gameId;
    const game = this.data.gameList.find(g => g.id === gameId);
    
    wx.navigateTo({
      url: `/pages/games/games?gameId=${gameId}&action=create&gameName=${game.name}`
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
        this.loadGameList()
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
  },

  /**
   * 分享到朋友圈
   */
  onShareTimeline() {
    return {
      title: '我在游戏大厅等你！',
      imageUrl: '/assets/images/share.jpg'
    };
  }
})