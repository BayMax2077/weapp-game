// pages/game-four-cards/game-four-cards.js
const app = getApp();
const socket = require('../../utils/socket');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 游戏状态
    loading: false,
    gameStarted: false,
    gamePaused: false,
    gameEnded: false,
    
    // 房间信息
    roomCode: '',
    currentPlayer: 0,
    currentPlayerName: '',
    isMyTurn: false,
    
    // 玩家数据
    players: [],
    myPlayerIndex: -1,
    
    // 卡牌数据
    myCards: [],
    selectedCards: [],
    desktopCards: [],
    desktopScore: 0,
    
    // 游戏逻辑
    showHint: false,
    hintText: '',
    
    // 弹窗状态
    showResult: false,
    showPause: false,
    gameResult: {
      title: '',
      subtitle: '',
      players: [],
      duration: '',
      totalTurns: 0
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const { roomCode, gameId } = options;
    this.setData({ roomCode });
    this.initGame();
  },

  /**
   * 初始化游戏
   */
  initGame() {
    this.setData({ loading: true });
    
    // 初始化玩家
    this.initPlayers();
    
    // 初始化卡牌
    this.initCards();
    
    // 连接Socket
    this.connectSocket();
    
    setTimeout(() => {
      this.setData({ 
        loading: false,
        gameStarted: true 
      });
      this.startGame();
    }, 1000);
  },

  /**
   * 初始化玩家
   */
  initPlayers() {
    const players = [
      {
        id: 1,
        nickname: '玩家1',
        avatarUrl: '/assets/images/default-avatar.png',
        status: '等待中',
        score: 0,
        noteScore: 0,
        cardCount: 13,
        timer: 0
      },
      {
        id: 2,
        nickname: '玩家2',
        avatarUrl: '/assets/images/default-avatar.png',
        status: '等待中',
        score: 0,
        noteScore: 0,
        cardCount: 13,
        timer: 0
      },
      {
        id: 3,
        nickname: '玩家3',
        avatarUrl: '/assets/images/default-avatar.png',
        status: '等待中',
        score: 0,
        noteScore: 0,
        cardCount: 13,
        timer: 0
      },
      {
        id: 4,
        nickname: '玩家4',
        avatarUrl: '/assets/images/default-avatar.png',
        status: '等待中',
        score: 0,
        noteScore: 0,
        cardCount: 13,
        timer: 0
      }
    ];
    
    this.setData({
      players,
      myPlayerIndex: 0,
      currentPlayer: 0,
      currentPlayerName: players[0].nickname,
      isMyTurn: true
    });
  },

  /**
   * 初始化卡牌
   */
  initCards() {
    const suits = ['♠', '♥', '♦', '♣'];
    const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    const myCards = [];
    
    // 生成13张手牌
    for (let i = 0; i < 13; i++) {
      const suit = suits[Math.floor(Math.random() * suits.length)];
      const rank = ranks[Math.floor(Math.random() * ranks.length)];
      
      myCards.push({
        id: `card-${i}`,
        suit,
        rank,
        selected: false,
        disabled: false
      });
    }
    
    this.setData({ myCards });
  },

  /**
   * 连接Socket
   */
  connectSocket() {
    // 监听游戏数据
    socket.on('fourCards/gameData', (data) => {
      this.handleGameData(data);
    });
    
    // 监听玩家加入
    socket.on('room/playerJoined', (data) => {
      this.handlePlayerJoined(data);
    });
    
    // 监听玩家离开
    socket.on('room/playerLeft', (data) => {
      this.handlePlayerLeft(data);
    });
  },

  /**
   * 处理游戏数据
   */
  handleGameData(data) {
    console.log('收到游戏数据:', data);
    
    switch (data.type) {
      case 'cardsDealt':
        this.handleCardsDealt(data);
        break;
      case 'cardsPlayed':
        this.handleCardsPlayed(data);
        break;
      case 'turnChanged':
        this.handleTurnChanged(data);
        break;
      case 'gameEnded':
        this.handleGameEnded(data);
        break;
    }
  },

  /**
   * 处理发牌
   */
  handleCardsDealt(data) {
    if (data.playerIndex === this.data.myPlayerIndex) {
      this.setData({ myCards: data.cards });
    }
  },

  /**
   * 处理出牌
   */
  handleCardsPlayed(data) {
    const { desktopCards, desktopScore } = this.data;
    
    // 更新桌面卡牌
    const newDesktopCards = [...desktopCards, ...data.cards];
    const newDesktopScore = desktopScore + data.score;
    
    this.setData({
      desktopCards: newDesktopCards,
      desktopScore: newDesktopScore
    });
    
    // 更新玩家手牌数量
    const players = this.data.players.map(player => {
      if (player.id === data.playerId) {
        return { ...player, cardCount: player.cardCount - data.cards.length };
      }
      return player;
    });
    
    this.setData({ players });
  },

  /**
   * 处理回合变化
   */
  handleTurnChanged(data) {
    this.setData({
      currentPlayer: data.currentPlayer,
      currentPlayerName: data.currentPlayerName,
      isMyTurn: data.currentPlayer === this.data.myPlayerIndex
    });
    
    if (data.currentPlayer === this.data.myPlayerIndex) {
      this.startTimer();
    }
  },

  /**
   * 处理游戏结束
   */
  handleGameEnded(data) {
    this.setData({
      gameEnded: true,
      showResult: true,
      gameResult: {
        title: '游戏结束',
        subtitle: '恭喜获胜！',
        players: data.players,
        duration: data.duration,
        totalTurns: data.totalTurns
      }
    });
  },

  /**
   * 开始游戏
   */
  startGame() {
    this.setData({
      gameStarted: true,
      gamePaused: false
    });
    
    this.showHint('游戏开始！请选择要出的牌');
  },

  /**
   * 选择卡牌
   */
  selectCard(e) {
    const cardId = e.currentTarget.dataset.cardId;
    const { myCards, selectedCards } = this.data;
    
    const cardIndex = myCards.findIndex(card => card.id === cardId);
    if (cardIndex === -1) return;
    
    const card = myCards[cardIndex];
    
    if (card.selected) {
      // 取消选择
      card.selected = false;
      const newSelectedCards = selectedCards.filter(id => id !== cardId);
      this.setData({ selectedCards: newSelectedCards });
    } else {
      // 选择卡牌
      card.selected = true;
      const newSelectedCards = [...selectedCards, cardId];
      this.setData({ selectedCards: newSelectedCards });
    }
    
    // 更新卡牌状态
    const newMyCards = [...myCards];
    newMyCards[cardIndex] = card;
    this.setData({ myCards: newMyCards });
  },

  /**
   * 出牌
   */
  playCards() {
    const { selectedCards, myCards } = this.data;
    
    if (selectedCards.length === 0) {
      wx.showToast({
        title: '请选择要出的牌',
        icon: 'none'
      });
      return;
    }
    
    // 获取选中的卡牌
    const cardsToPlay = myCards.filter(card => selectedCards.includes(card.id));
    
    // 发送出牌事件
    socket.emit('fourCards/playCards', {
      playerIndex: this.data.myPlayerIndex,
      cards: cardsToPlay
    });
    
    // 从手牌中移除已出的牌
    const newMyCards = myCards.filter(card => !selectedCards.includes(card.id));
    this.setData({
      myCards: newMyCards,
      selectedCards: []
    });
  },

  /**
   * 跳过回合
   */
  skipTurn() {
    // 发送跳过事件
    socket.emit('fourCards/skipTurn', {
      playerIndex: this.data.myPlayerIndex
    });
    
    this.setData({ selectedCards: [] });
  },

  /**
   * 开始计时器
   */
  startTimer() {
    let timeLeft = 30; // 30秒倒计时
    
    const timer = setInterval(() => {
      timeLeft--;
      
      const players = this.data.players.map((player, index) => {
        if (index === this.data.currentPlayer) {
          return { ...player, timer: timeLeft };
        }
        return { ...player, timer: 0 };
      });
      
      this.setData({ players });
      
      if (timeLeft <= 0) {
        clearInterval(timer);
        // 自动跳过
        this.skipTurn();
      }
    }, 1000);
  },

  /**
   * 暂停游戏
   */
  pauseGame() {
    this.setData({
      gamePaused: true,
      showPause: true
    });
  },

  /**
   * 恢复游戏
   */
  resumeGame() {
    this.setData({
      gamePaused: false,
      showPause: false
    });
  },

  /**
   * 隐藏暂停弹窗
   */
  hidePause() {
    this.setData({ showPause: false });
  },

  /**
   * 退出游戏
   */
  exitGame() {
    wx.showModal({
      title: '退出游戏',
      content: '确定要退出当前游戏吗？',
      success: (res) => {
        if (res.confirm) {
          socket.emit('room/leave');
          wx.navigateBack();
        }
      }
    });
  },

  /**
   * 隐藏结果弹窗
   */
  hideResult() {
    this.setData({ showResult: false });
  },

  /**
   * 再来一局
   */
  playAgain() {
    this.setData({
      showResult: false,
      gameEnded: false
    });
    
    this.initGame();
  },

  /**
   * 返回首页
   */
  backToHome() {
    wx.navigateBack();
  },

  /**
   * 显示提示
   */
  showHint(text) {
    this.setData({
      showHint: true,
      hintText: text
    });
    
    setTimeout(() => {
      this.setData({ showHint: false });
    }, 2000);
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    // 断开Socket连接
    socket.off('fourCards/gameData');
    socket.off('room/playerJoined');
    socket.off('room/playerLeft');
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    return {
      title: '一起来玩四张牌吧！',
      path: `/pages/room/room?roomCode=${this.data.roomCode}`
    };
  }
});
