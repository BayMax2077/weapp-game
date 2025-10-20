// pages/game-flight-chess/game-flight-chess.js
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
    boardCells: [],
    boardWidth: 400,
    boardHeight: 400,
    cellSize: 40,
    
    // 骰子
    diceValue: 0,
    diceRolling: false,
    
    // 游戏逻辑
    showHint: false,
    hintText: '',
    showMovablePlanes: false,
    movablePlanes: [],
    selectedPlane: null,
    
    // 弹窗状态
    showResult: false,
    showPause: false,
    gameResult: {
      title: '',
      subtitle: '',
      winner: {
        nickname: '',
        avatarUrl: ''
      },
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
    
    // 初始化棋盘
    this.initBoard();
    
    // 初始化玩家
    this.initPlayers();
    
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
   * 初始化棋盘
   */
  initBoard() {
    const { cellSize } = this.data;
    const boardCells = [];
    
    // 创建飞行棋棋盘 (简化版)
    const boardSize = 8;
    let cellIndex = 0;
    
    for (let row = 0; row < boardSize; row++) {
      for (let col = 0; col < boardSize; col++) {
        const isSpecial = (row === 0 && col === 0) || (row === boardSize - 1 && col === boardSize - 1);
        const isStart = row === 0 && col === 0;
        const isFinish = row === boardSize - 1 && col === boardSize - 1;
        
        boardCells.push({
          id: `cell-${row}-${col}`,
          index: cellIndex++,
          row,
          col,
          x: col * cellSize,
          y: row * cellSize,
          number: cellIndex,
          type: isStart ? 'start' : isFinish ? 'finish' : isSpecial ? 'special' : 'normal',
          specialText: isStart ? '起点' : isFinish ? '终点' : '',
          planes: []
        });
      }
    }
    
    this.setData({
      boardCells,
      boardWidth: boardSize * cellSize,
      boardHeight: boardSize * cellSize
    });
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
        color: 'red',
        planes: [
          { id: 1, name: '飞机1', status: 'waiting', position: 0 },
          { id: 2, name: '飞机2', status: 'waiting', position: 0 },
          { id: 3, name: '飞机3', status: 'waiting', position: 0 },
          { id: 4, name: '飞机4', status: 'waiting', position: 0 }
        ]
      },
      {
        id: 2,
        nickname: '玩家2',
        avatarUrl: '/assets/images/default-avatar.png',
        status: '等待中',
        color: 'blue',
        planes: [
          { id: 5, name: '飞机1', status: 'waiting', position: 0 },
          { id: 6, name: '飞机2', status: 'waiting', position: 0 },
          { id: 7, name: '飞机3', status: 'waiting', position: 0 },
          { id: 8, name: '飞机4', status: 'waiting', position: 0 }
        ]
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
   * 连接Socket
   */
  connectSocket() {
    // 监听游戏数据
    socket.on('flightChess/gameData', (data) => {
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
      case 'diceRolled':
        this.handleDiceRolled(data);
        break;
      case 'planeMoved':
        this.handlePlaneMoved(data);
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
   * 处理骰子投掷
   */
  handleDiceRolled(data) {
    this.setData({
      diceValue: data.value,
      diceRolling: false
    });
    
    if (data.playerIndex === this.data.myPlayerIndex) {
      this.showMovablePlanes();
    }
  },

  /**
   * 处理飞机移动
   */
  handlePlaneMoved(data) {
    const { players } = this.data;
    const player = players[data.playerIndex];
    const plane = player.planes.find(p => p.id === data.planeId);
    
    if (plane) {
      plane.position = data.newPosition;
      plane.status = data.newPosition > 0 ? 'flying' : 'waiting';
    }
    
    this.setData({ players });
    this.updateBoard();
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
        winner: data.winner,
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
    
    this.showHint('游戏开始！点击骰子投掷');
  },

  /**
   * 投掷骰子
   */
  rollDice() {
    if (!this.data.isMyTurn || this.data.diceRolling) {
      return;
    }
    
    this.setData({ diceRolling: true });
    
    // 发送投掷骰子事件
    socket.emit('flightChess/rollDice', {
      playerIndex: this.data.myPlayerIndex
    });
    
    // 模拟骰子动画
    setTimeout(() => {
      const diceValue = Math.floor(Math.random() * 6) + 1;
      this.setData({ diceValue });
      
      // 发送骰子结果
      socket.emit('flightChess/diceResult', {
        playerIndex: this.data.myPlayerIndex,
        value: diceValue
      });
    }, 1000);
  },

  /**
   * 显示可移动的飞机
   */
  showMovablePlanes() {
    const { players, myPlayerIndex } = this.data;
    const myPlayer = players[myPlayerIndex];
    const movablePlanes = myPlayer.planes.filter(plane => 
      plane.status === 'waiting' || plane.status === 'flying'
    );
    
    this.setData({
      showMovablePlanes: true,
      movablePlanes
    });
  },

  /**
   * 选择飞机
   */
  selectPlane(e) {
    const planeId = e.currentTarget.dataset.planeId;
    const { players, myPlayerIndex, diceValue } = this.data;
    const myPlayer = players[myPlayerIndex];
    const plane = myPlayer.planes.find(p => p.id === planeId);
    
    if (plane) {
      const newPosition = plane.position + diceValue;
      
      // 发送移动飞机事件
      socket.emit('flightChess/movePlane', {
        playerIndex: myPlayerIndex,
        planeId: planeId,
        newPosition: newPosition
      });
      
      this.setData({
        showMovablePlanes: false,
        selectedPlane: null
      });
    }
  },

  /**
   * 更新棋盘
   */
  updateBoard() {
    const { boardCells, players } = this.data;
    const updatedCells = boardCells.map(cell => ({
      ...cell,
      planes: []
    }));
    
    // 更新飞机位置
    players.forEach(player => {
      player.planes.forEach(plane => {
        if (plane.position > 0) {
          const cell = updatedCells.find(c => c.index === plane.position);
          if (cell) {
            cell.planes.push({
              planeId: plane.id,
              color: player.color,
              x: Math.random() * 20 - 10,
              y: Math.random() * 20 - 10
            });
          }
        }
      });
    });
    
    this.setData({ boardCells: updatedCells });
  },

  /**
   * 点击棋盘格子
   */
  onCellTap(e) {
    const { cellId, cellIndex } = e.currentTarget.dataset;
    console.log('点击格子:', cellId, cellIndex);
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
    socket.off('flightChess/gameData');
    socket.off('room/playerJoined');
    socket.off('room/playerLeft');
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    return {
      title: '一起来玩飞行棋吧！',
      path: `/pages/room/room?roomCode=${this.data.roomCode}`
    };
  }
});
