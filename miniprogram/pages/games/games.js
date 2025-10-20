// pages/games/games.js
const app = getApp();
const api = require('../../utils/api');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    gameId: '',
    gameName: '',
    action: '', // create, join
    roomCode: '',
    maxPlayers: 4,
    roomName: '',
    loading: false,
    gameInfo: null,
    roomList: [],
    showRules: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log('游戏页面加载', options);
    
    const { gameId, gameName, action, roomCode } = options;
    
    this.setData({
      gameId: gameId || '',
      gameName: gameName || '',
      action: action || '',
      roomCode: roomCode || ''
    });
    
    this.initPage();
  },

  /**
   * 初始化页面
   */
  async initPage() {
    this.setData({ loading: true });
    
    try {
      await this.loadGameInfo();
      
      if (this.data.action === 'create') {
        this.showCreateRoomDialog();
      } else if (this.data.roomCode) {
        this.joinRoom(this.data.roomCode);
      } else {
        this.loadRoomList();
      }
    } catch (error) {
      console.error('页面初始化失败:', error);
    } finally {
      this.setData({ loading: false });
    }
  },

  /**
   * 加载游戏信息
   */
  async loadGameInfo() {
    try {
      // 使用本地游戏配置
      const gameConfigs = {
        eliminating: {
          id: 'eliminating',
          name: '消消乐',
          icon: '🎮',
          description: '经典三消游戏，连接三个或更多相同颜色的方块来消除它们',
          minPlayers: 1,
          maxPlayers: 4,
          difficulty: 'easy',
          estimatedTime: '5-10分钟',
          rules: [
            '点击选择方块',
            '交换相邻方块',
            '形成三个或更多相同颜色的连线',
            '消除方块获得分数',
            '在限定时间内获得最高分数'
          ]
        },
        flightChess: {
          id: 'flightChess',
          name: '飞行棋',
          icon: '✈️',
          description: '经典飞行棋游戏，掷骰子移动棋子，先到达终点的玩家获胜',
          minPlayers: 2,
          maxPlayers: 4,
          difficulty: 'medium',
          estimatedTime: '15-30分钟',
          rules: [
            '掷骰子决定移动步数',
            '棋子从基地起飞需要掷出6',
            '可以吃掉对手的棋子',
            '先到达终点的玩家获胜',
            '支持多人对战'
          ]
        },
        fourCards: {
          id: 'fourCards',
          name: '四张牌',
          icon: '🃏',
          description: '经典扑克游戏，出完手牌的玩家获胜',
          minPlayers: 2,
          maxPlayers: 4,
          difficulty: 'medium',
          estimatedTime: '10-20分钟',
          rules: [
            '每人发13张牌',
            '按顺序出牌',
            '可以出单张、对子、三张、四张',
            '出完手牌的玩家获胜',
            '支持多种出牌组合'
          ]
        },
        gobang: {
          id: 'gobang',
          name: '五子棋',
          icon: '⚫',
          description: '经典五子棋游戏，先连成五子的玩家获胜',
          minPlayers: 2,
          maxPlayers: 2,
          difficulty: 'easy',
          estimatedTime: '5-15分钟',
          rules: [
            '黑子先手',
            '轮流落子',
            '先连成五子的玩家获胜',
            '支持悔棋功能',
            '支持人机对战'
          ]
        }
      };
      
      const gameInfo = gameConfigs[this.data.gameId];
      if (gameInfo) {
        this.setData({ gameInfo });
      } else {
        throw new Error('游戏不存在');
      }
    } catch (error) {
      console.error('加载游戏信息失败:', error);
      wx.showToast({
        title: '游戏不存在',
        icon: 'none'
      });
    }
  },

  /**
   * 加载房间列表
   */
  async loadRoomList() {
    try {
      // 这里可以添加获取房间列表的API
      // const roomList = await api.getRoomList(this.data.gameId);
      // this.setData({ roomList });
    } catch (error) {
      console.error('加载房间列表失败:', error);
    }
  },

  /**
   * 显示创建房间对话框
   */
  showCreateRoomDialog() {
    wx.showModal({
      title: '创建房间',
      content: '请输入房间名称',
      editable: true,
      placeholderText: '房间名称',
      success: (res) => {
        if (res.confirm && res.content) {
          this.createRoom(res.content);
        }
      }
    });
  },

  /**
   * 创建房间
   */
  async createRoom(roomName) {
    try {
      wx.showLoading({ title: '创建中...' });
      
      const roomData = await api.createRoom(
        this.data.gameId,
        this.data.maxPlayers,
        roomName
      );
      
      wx.hideLoading();
      
      if (roomData && roomData.roomCode) {
        wx.showToast({
          title: '房间创建成功',
          icon: 'success'
        });
        
        // 跳转到房间页面
        wx.navigateTo({
          url: `/pages/room/room?roomCode=${roomData.roomCode}&gameId=${this.data.gameId}`
        });
      }
    } catch (error) {
      wx.hideLoading();
      console.error('创建房间失败:', error);
      wx.showToast({
        title: '创建失败，请重试',
        icon: 'none'
      });
    }
  },

  /**
   * 加入房间
   */
  async joinRoom(roomCode) {
    try {
      wx.showLoading({ title: '加入中...' });
      
      const roomData = await api.joinRoom(roomCode);
      
      wx.hideLoading();
      
      if (roomData && roomData.success) {
        wx.showToast({
          title: '加入成功',
          icon: 'success'
        });
        
        // 跳转到房间页面
        wx.navigateTo({
          url: `/pages/room/room?roomCode=${roomCode}&gameId=${this.data.gameId}`
        });
      } else {
        wx.showToast({
          title: '房间不存在或已满',
          icon: 'none'
        });
      }
    } catch (error) {
      wx.hideLoading();
      console.error('加入房间失败:', error);
      wx.showToast({
        title: '加入失败，请重试',
        icon: 'none'
      });
    }
  },

  /**
   * 快速匹配
   */
  async quickMatch() {
    try {
      wx.showLoading({ title: '匹配中...' });
      
      const roomData = await api.randomJoinRoom(this.data.gameId);
      
      wx.hideLoading();
      
      if (roomData && roomData.roomCode) {
        wx.navigateTo({
          url: `/pages/room/room?roomCode=${roomData.roomCode}&gameId=${this.data.gameId}`
        });
      } else {
        wx.showToast({
          title: '暂无可用房间',
          icon: 'none'
        });
      }
    } catch (error) {
      wx.hideLoading();
      console.error('快速匹配失败:', error);
      wx.showToast({
        title: '匹配失败，请重试',
        icon: 'none'
      });
    }
  },

  /**
   * 输入房间号
   */
  inputRoomCode() {
    wx.showModal({
      title: '加入房间',
      content: '请输入房间号',
      editable: true,
      placeholderText: '房间号',
      success: (res) => {
        if (res.confirm && res.content) {
          this.joinRoom(res.content.trim());
        }
      }
    });
  },

  /**
   * 显示游戏规则
   */
  showGameRules() {
    this.setData({ showRules: true });
  },

  /**
   * 隐藏游戏规则
   */
  hideGameRules() {
    this.setData({ showRules: false });
  },

  /**
   * 刷新房间列表
   */
  refreshRooms() {
    this.loadRoomList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    return {
      title: `一起来玩${this.data.gameName}吧！`,
      path: `/pages/games/games?gameId=${this.data.gameId}&gameName=${this.data.gameName}`,
      imageUrl: '/assets/images/share.jpg'
    };
  }
})