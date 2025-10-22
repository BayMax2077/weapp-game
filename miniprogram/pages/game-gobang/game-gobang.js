// pages/game-gobang/game-gobang.js
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
    
    // 棋盘数据
    board: [],
    boardSize: 15,
    lastMove: null,
    canUndo: false,
    
    // 游戏逻辑
    timeLeft: 30,
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
      totalMoves: 0
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
    
    // 初始化棋盘
    this.initBoard();
    
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
        pieceType: 1 // 黑子
      },
      {
        id: 2,
        nickname: '玩家2',
        avatarUrl: '/assets/images/default-avatar.png',
        status: '等待中',
        score: 0,
        pieceType: 2 // 白子
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
   * 初始化棋盘
   */
  initBoard() {
    const board = [];
    const { boardSize } = this.data;
    
    for (let y = 0; y < boardSize; y++) {
      for (let x = 0; x < boardSize; x++) {
        board.push({
          x,
          y,
          piece: 0, // 0: 空, 1: 黑子, 2: 白子
          isLastMove: false
        });
      }
    }
    
    this.setData({ board });
  },

  /**
   * 连接Socket
   */
  connectSocket() {
    // 监听游戏数据
    socket.on('gobang/gameData', (data) => {
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
      case 'piecePlaced':
        this.handlePiecePlaced(data);
        break;
      case 'turnChanged':
        this.handleTurnChanged(data);
        break;
      case 'gameEnded':
        this.handleGameEnded(data);
        break;
      case 'boardUpdated':
        this.handleBoardUpdated(data);
        break;
    }
  },

  /**
   * 处理落子
   */
  handlePiecePlaced(data) {
    const { x, y, pieceType } = data;
    const board = this.data.board.map(cell => {
      if (cell.x === x && cell.y === y) {
        return { ...cell, piece: pieceType, isLastMove: true };
      }
      return { ...cell, isLastMove: false };
    });
    
    this.setData({ board, lastMove: { x, y, pieceType } });
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
        subtitle: data.winner ? `恭喜 ${data.winner} 获胜！` : '平局！',
        players: data.players,
        duration: data.duration,
        totalMoves: data.totalMoves
      }
    });
  },

  /**
   * 处理棋盘更新
   */
  handleBoardUpdated(data) {
    this.setData({ board: data.board });
  },

  /**
   * 开始游戏
   */
  startGame() {
    this.setData({
      gameStarted: true,
      gamePaused: false
    });
    
    this.showHint('游戏开始！请点击棋盘落子');
  },

  /**
   * 触摸开始
   */
  onTouchStart(e) {
    if (!this.data.isMyTurn || this.data.gameEnded) return;
    
    const touch = e.touches[0];
    const { x, y } = this.getBoardPosition(touch);
    
    if (x >= 0 && x < this.data.boardSize && y >= 0 && y < this.data.boardSize) {
      this.placePiece(x, y);
    }
  },

  /**
   * 触摸结束
   */
  onTouchEnd(e) {
    // 触摸结束处理
  },

  /**
   * 获取棋盘位置
   */
  getBoardPosition(touch) {
    const query = wx.createSelectorQuery();
    query.select('.board-container').boundingClientRect();
    
    return new Promise((resolve) => {
      query.exec((res) => {
        if (res[0]) {
          const rect = res[0];
          const x = Math.floor((touch.clientX - rect.left) / 30);
          const y = Math.floor((touch.clientY - rect.top) / 30);
          resolve({ x, y });
        } else {
          resolve({ x: -1, y: -1 });
        }
      });
    });
  },

  /**
   * 落子
   */
  placePiece(x, y) {
    const board = this.data.board;
    const cellIndex = y * this.data.boardSize + x;
    const cell = board[cellIndex];
    
    if (cell.piece !== 0) {
      wx.showToast({
        title: '此处已有棋子',
        icon: 'none'
      });
      return;
    }
    
    const pieceType = this.data.players[this.data.myPlayerIndex].pieceType;
    
    // 发送落子事件
    socket.emit('gobang/placePiece', {
      x,
      y,
      pieceType,
      playerIndex: this.data.myPlayerIndex
    });
    
    // 更新本地棋盘
    const newBoard = [...board];
    newBoard[cellIndex] = { ...cell, piece: pieceType, isLastMove: true };
    this.setData({ board: newBoard });
  },

  /**
   * 悔棋
   */
  undoMove() {
    if (!this.data.canUndo) return;
    
    // 发送悔棋事件
    socket.emit('gobang/undoMove', {
      playerIndex: this.data.myPlayerIndex
    });
  },

  /**
   * 重新开始
   */
  restartGame() {
    wx.showModal({
      title: '重新开始',
      content: '确定要重新开始游戏吗？',
      success: (res) => {
        if (res.confirm) {
          socket.emit('gobang/restartGame', {
            playerIndex: this.data.myPlayerIndex
          });
        }
      }
    });
  },

  /**
   * 开始计时器
   */
  startTimer() {
    let timeLeft = 30;
    this.setData({ timeLeft });
    
    const timer = setInterval(() => {
      timeLeft--;
      this.setData({ timeLeft });
      
      if (timeLeft <= 0) {
        clearInterval(timer);
        // 自动跳过
        this.skipTurn();
      }
    }, 1000);
  },

  /**
   * 跳过回合
   */
  skipTurn() {
    // 发送跳过事件
    socket.emit('gobang/skipTurn', {
      playerIndex: this.data.myPlayerIndex
    });
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
    socket.off('gobang/gameData');
    socket.off('room/playerJoined');
    socket.off('room/playerLeft');
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    return {
      title: '一起来玩五子棋吧！',
      path: `/pages/room/room?roomCode=${this.data.roomCode}`
    };
  }
});
