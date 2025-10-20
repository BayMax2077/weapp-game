// utils/gameEngine.js - 通用游戏引擎
const socket = require('./socket');
const api = require('./api');

class GameEngine {
  constructor() {
    this.gameType = '';
    this.roomCode = '';
    this.players = [];
    this.currentPlayer = 0;
    this.gameStatus = 'waiting'; // waiting, playing, paused, ended
    this.gameData = {};
    this.timer = null;
    this.timeLeft = 0;
    this.maxTime = 30;
    this.callbacks = {};
  }

  /**
   * 初始化游戏
   */
  init(gameType, roomCode, options = {}) {
    this.gameType = gameType;
    this.roomCode = roomCode;
    this.maxTime = options.maxTime || 30;
    
    // 设置Socket监听
    this.setupSocketListeners();
    
    console.log(`游戏引擎初始化: ${gameType}, 房间: ${roomCode}`);
  }

  /**
   * 设置Socket监听
   */
  setupSocketListeners() {
    // 通用游戏事件
    socket.on('game/playerJoined', (data) => {
      this.handlePlayerJoined(data);
    });
    
    socket.on('game/playerLeft', (data) => {
      this.handlePlayerLeft(data);
    });
    
    socket.on('game/statusChanged', (data) => {
      this.handleStatusChanged(data);
    });
    
    socket.on('game/timerUpdate', (data) => {
      this.handleTimerUpdate(data);
    });
    
    // 游戏特定事件
    socket.on(`${this.gameType}/gameData`, (data) => {
      this.handleGameData(data);
    });
  }

  /**
   * 处理玩家加入
   */
  handlePlayerJoined(data) {
    this.players.push(data.player);
    this.emit('playerJoined', data);
    console.log('玩家加入:', data.player.nickname);
  }

  /**
   * 处理玩家离开
   */
  handlePlayerLeft(data) {
    this.players = this.players.filter(p => p.id !== data.playerId);
    this.emit('playerLeft', data);
    console.log('玩家离开:', data.playerId);
  }

  /**
   * 处理状态变化
   */
  handleStatusChanged(data) {
    this.gameStatus = data.status;
    this.emit('statusChanged', data);
    console.log('游戏状态变化:', data.status);
  }

  /**
   * 处理计时器更新
   */
  handleTimerUpdate(data) {
    this.timeLeft = data.timeLeft;
    this.emit('timerUpdate', data);
  }

  /**
   * 处理游戏数据
   */
  handleGameData(data) {
    this.gameData = { ...this.gameData, ...data };
    this.emit('gameData', data);
  }

  /**
   * 开始游戏
   */
  startGame() {
    this.gameStatus = 'playing';
    this.emit('gameStarted');
    console.log('游戏开始');
  }

  /**
   * 暂停游戏
   */
  pauseGame() {
    this.gameStatus = 'paused';
    this.stopTimer();
    this.emit('gamePaused');
    console.log('游戏暂停');
  }

  /**
   * 恢复游戏
   */
  resumeGame() {
    this.gameStatus = 'playing';
    this.startTimer();
    this.emit('gameResumed');
    console.log('游戏恢复');
  }

  /**
   * 结束游戏
   */
  endGame(result) {
    this.gameStatus = 'ended';
    this.stopTimer();
    this.emit('gameEnded', result);
    console.log('游戏结束:', result);
  }

  /**
   * 开始计时器
   */
  startTimer() {
    this.timeLeft = this.maxTime;
    this.timer = setInterval(() => {
      this.timeLeft--;
      this.emit('timerUpdate', { timeLeft: this.timeLeft });
      
      if (this.timeLeft <= 0) {
        this.handleTimeOut();
      }
    }, 1000);
  }

  /**
   * 停止计时器
   */
  stopTimer() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  /**
   * 处理超时
   */
  handleTimeOut() {
    this.stopTimer();
    this.emit('timeOut');
    console.log('回合超时');
  }

  /**
   * 切换玩家
   */
  switchPlayer() {
    this.currentPlayer = (this.currentPlayer + 1) % this.players.length;
    this.emit('playerSwitched', { currentPlayer: this.currentPlayer });
    console.log('切换玩家:', this.currentPlayer);
  }

  /**
   * 发送游戏数据
   */
  sendGameData(data) {
    socket.emit(`${this.gameType}/gameData`, {
      roomCode: this.roomCode,
      data
    });
  }

  /**
   * 发送玩家动作
   */
  sendPlayerAction(action, data) {
    socket.emit(`${this.gameType}/playerAction`, {
      roomCode: this.roomCode,
      action,
      data
    });
  }

  /**
   * 事件监听
   */
  on(event, callback) {
    if (!this.callbacks[event]) {
      this.callbacks[event] = [];
    }
    this.callbacks[event].push(callback);
  }

  /**
   * 移除事件监听
   */
  off(event, callback) {
    if (this.callbacks[event]) {
      this.callbacks[event] = this.callbacks[event].filter(cb => cb !== callback);
    }
  }

  /**
   * 触发事件
   */
  emit(event, data) {
    if (this.callbacks[event]) {
      this.callbacks[event].forEach(callback => {
        callback(data);
      });
    }
  }

  /**
   * 获取游戏状态
   */
  getGameState() {
    return {
      gameType: this.gameType,
      roomCode: this.roomCode,
      players: this.players,
      currentPlayer: this.currentPlayer,
      gameStatus: this.gameStatus,
      gameData: this.gameData,
      timeLeft: this.timeLeft
    };
  }

  /**
   * 销毁游戏引擎
   */
  destroy() {
    this.stopTimer();
    this.callbacks = {};
    
    // 移除Socket监听
    socket.off('game/playerJoined');
    socket.off('game/playerLeft');
    socket.off('game/statusChanged');
    socket.off('game/timerUpdate');
    socket.off(`${this.gameType}/gameData`);
    
    console.log('游戏引擎销毁');
  }
}

module.exports = GameEngine;
