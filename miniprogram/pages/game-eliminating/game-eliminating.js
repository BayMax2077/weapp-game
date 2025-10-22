// pages/game-eliminating/game-eliminating.js
const app = getApp();

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
    
    // 游戏数据
    score: 0,
    moves: 0,
    target: 1000,
    level: 1,
    
    // 棋盘数据
    gameBoard: [],
    boardWidth: 300,
    boardHeight: 300,
    cellSize: 50,
    rows: 6,
    cols: 6,
    
    // 游戏逻辑
    selectedCell: null,
    showHint: false,
    hintText: '',
    
    // 特殊道具
    showTools: false,
    tools: {
      bomb: 3,
      rainbow: 2,
      hammer: 1
    },
    
    // 弹窗状态
    showResult: false,
    showPause: false,
    gameResult: {
      title: '',
      subtitle: '',
      finalScore: 0,
      movesUsed: 0,
      eliminations: 0,
      rewards: []
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.initGame();
  },

  /**
   * 初始化游戏
   */
  initGame() {
    this.setData({ loading: true });
    
    // 初始化棋盘
    this.initBoard();
    
    // 开始游戏
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
    const { rows, cols, cellSize } = this.data;
    const gameBoard = [];
    const cellTypes = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];
    const cellIcons = ['🍎', '🍇', '🍏', '🍌', '🍇', '🍊'];
    
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const type = cellTypes[Math.floor(Math.random() * cellTypes.length)];
        const icon = cellIcons[cellTypes.indexOf(type)];
        
        gameBoard.push({
          id: `${row}-${col}`,
          row,
          col,
          x: col * cellSize,
          y: row * cellSize,
          type,
          icon,
          selected: false,
          eliminating: false
        });
      }
    }
    
    this.setData({
      gameBoard,
      boardWidth: cols * cellSize,
      boardHeight: rows * cellSize
    });
  },

  /**
   * 开始游戏
   */
  startGame() {
    this.setData({
      score: 0,
      moves: 0,
      gameEnded: false,
      showResult: false
    });
    
    // 检查初始棋盘是否有可消除的组合
    this.checkForMatches();
  },

  /**
   * 点击格子
   */
  onCellTap(e) {
    if (!this.data.gameStarted || this.data.gamePaused || this.data.gameEnded) {
      return;
    }
    
    const { cellId, row, col } = e.currentTarget.dataset;
    const { selectedCell, gameBoard } = this.data;
    
    // 如果已经选中了一个格子
    if (selectedCell) {
      // 检查是否可以交换
      if (this.canSwap(selectedCell, { row: parseInt(row), col: parseInt(col) })) {
        this.swapCells(selectedCell, { row: parseInt(row), col: parseInt(col) });
        this.setData({ selectedCell: null });
      } else {
        // 取消选择
        this.clearSelection();
        this.setData({ selectedCell: null });
      }
    } else {
      // 选择格子
      this.selectCell(parseInt(row), parseInt(col));
    }
  },

  /**
   * 选择格子
   */
  selectCell(row, col) {
    const gameBoard = this.data.gameBoard.map(cell => ({
      ...cell,
      selected: cell.row === row && cell.col === col
    }));
    
    this.setData({
      gameBoard,
      selectedCell: { row, col }
    });
  },

  /**
   * 清除选择
   */
  clearSelection() {
    const gameBoard = this.data.gameBoard.map(cell => ({
      ...cell,
      selected: false
    }));
    
    this.setData({ gameBoard });
  },

  /**
   * 检查是否可以交换
   */
  canSwap(cell1, cell2) {
    const rowDiff = Math.abs(cell1.row - cell2.row);
    const colDiff = Math.abs(cell1.col - cell2.col);
    
    // 只能交换相邻的格子
    return (rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1);
  },

  /**
   * 交换格子
   */
  swapCells(cell1, cell2) {
    const gameBoard = [...this.data.gameBoard];
    const index1 = gameBoard.findIndex(cell => cell.row === cell1.row && cell.col === cell1.col);
    const index2 = gameBoard.findIndex(cell => cell.row === cell2.row && cell.col === cell2.col);
    
    // 交换位置
    const temp = { ...gameBoard[index1] };
    gameBoard[index1] = { ...gameBoard[index2], row: cell1.row, col: cell1.col };
    gameBoard[index2] = { ...temp, row: cell2.row, col: cell2.col };
    
    this.setData({ gameBoard });
    
    // 检查是否有匹配
    setTimeout(() => {
      this.checkForMatches();
    }, 300);
  },

  /**
   * 检查匹配
   */
  checkForMatches() {
    const { gameBoard, rows, cols } = this.data;
    const matches = [];
    
    // 检查水平匹配
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols - 2; col++) {
        const cell1 = gameBoard.find(c => c.row === row && c.col === col);
        const cell2 = gameBoard.find(c => c.row === row && c.col === col + 1);
        const cell3 = gameBoard.find(c => c.row === row && c.col === col + 2);
        
        if (cell1 && cell2 && cell3 && 
            cell1.type === cell2.type && cell2.type === cell3.type) {
          matches.push(cell1, cell2, cell3);
        }
      }
    }
    
    // 检查垂直匹配
    for (let row = 0; row < rows - 2; row++) {
      for (let col = 0; col < cols; col++) {
        const cell1 = gameBoard.find(c => c.row === row && c.col === col);
        const cell2 = gameBoard.find(c => c.row === row + 1 && c.col === col);
        const cell3 = gameBoard.find(c => c.row === row + 2 && c.col === col);
        
        if (cell1 && cell2 && cell3 && 
            cell1.type === cell2.type && cell2.type === cell3.type) {
          matches.push(cell1, cell2, cell3);
        }
      }
    }
    
    if (matches.length > 0) {
      this.eliminateMatches(matches);
    } else {
      // 检查游戏是否结束
      this.checkGameEnd();
    }
  },

  /**
   * 消除匹配的格子
   */
  eliminateMatches(matches) {
    const gameBoard = this.data.gameBoard.map(cell => {
      const isMatch = matches.some(match => match.id === cell.id);
      return {
        ...cell,
        eliminating: isMatch,
        selected: false
      };
    });
    
    this.setData({ gameBoard });
    
    // 计算分数
    const scoreGain = matches.length * 10;
    const newScore = this.data.score + scoreGain;
    
    // 更新步数
    const newMoves = this.data.moves + 1;
    
    this.setData({
      score: newScore,
      moves: newMoves
    });
    
    // 延迟后移除消除的格子并填充新格子
    setTimeout(() => {
      this.removeEliminatedCells(matches);
    }, 500);
  },

  /**
   * 移除已消除的格子
   */
  removeEliminatedCells(eliminatedCells) {
    const { gameBoard, rows, cols } = this.data;
    const cellTypes = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];
    const cellIcons = ['🍎', '🍇', '🍏', '🍌', '🍇', '🍊'];
    
    // 移除消除的格子
    const updatedBoard = gameBoard.map(cell => {
      const isEliminated = eliminatedCells.some(eliminated => eliminated.id === cell.id);
      if (isEliminated) {
        const type = cellTypes[Math.floor(Math.random() * cellTypes.length)];
        const icon = cellIcons[cellTypes.indexOf(type)];
        return {
          ...cell,
          type,
          icon,
          eliminating: false
        };
      }
      return cell;
    });
    
    this.setData({ gameBoard: updatedBoard });
    
    // 继续检查匹配
    setTimeout(() => {
      this.checkForMatches();
    }, 300);
  },

  /**
   * 检查游戏结束
   */
  checkGameEnd() {
    const { score, target, moves } = this.data;
    
    if (score >= target) {
      this.endGame(true);
    } else if (moves >= 30) { // 假设最大步数为30
      this.endGame(false);
    }
  },

  /**
   * 结束游戏
   */
  endGame(won) {
    const { score, moves } = this.data;
    const rewards = [];
    
    if (won) {
      rewards.push(
        { type: 'coins', name: '金币', icon: '💰', count: Math.floor(score / 10) },
        { type: 'diamonds', name: '钻石', icon: '💎', count: Math.floor(score / 100) }
      );
    }
    
    this.setData({
      gameEnded: true,
      showResult: true,
      gameResult: {
        title: won ? '恭喜通关！' : '游戏结束',
        subtitle: won ? '你成功完成了目标！' : '很遗憾，没有达到目标',
        finalScore: score,
        movesUsed: moves,
        eliminations: Math.floor(score / 10),
        rewards
      }
    });
  },

  /**
   * 使用道具
   */
  useTool(e) {
    const tool = e.currentTarget.dataset.tool;
    const { tools } = this.data;
    
    if (tools[tool] <= 0) {
      wx.showToast({
        title: '道具不足',
        icon: 'none'
      });
      return;
    }
    
    // 减少道具数量
    const newTools = { ...tools };
    newTools[tool]--;
    
    this.setData({ tools: newTools });
    
    // 执行道具效果
    this.executeToolEffect(tool);
  },

  /**
   * 执行道具效果
   */
  executeToolEffect(tool) {
    const { gameBoard } = this.data;
    
    switch (tool) {
      case 'bomb':
        // 炸弹：消除3x3区域
        this.eliminateArea(1, 1, 3, 3);
        break;
      case 'rainbow':
        // 彩虹：消除所有同色格子
        this.eliminateAllSameColor();
        break;
      case 'hammer':
        // 锤子：消除单个格子
        this.showHint('点击要消除的格子');
        break;
    }
  },

  /**
   * 消除区域
   */
  eliminateArea(startRow, startCol, rows, cols) {
    const { gameBoard } = this.data;
    const cellsToEliminate = [];
    
    for (let row = startRow; row < startRow + rows; row++) {
      for (let col = startCol; col < startCol + cols; col++) {
        const cell = gameBoard.find(c => c.row === row && c.col === col);
        if (cell) {
          cellsToEliminate.push(cell);
        }
      }
    }
    
    this.eliminateMatches(cellsToEliminate);
  },

  /**
   * 消除所有同色格子
   */
  eliminateAllSameColor() {
    const { gameBoard } = this.data;
    const randomCell = gameBoard[Math.floor(Math.random() * gameBoard.length)];
    const sameColorCells = gameBoard.filter(cell => cell.type === randomCell.type);
    
    this.eliminateMatches(sameColorCells);
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
   * 重新开始游戏
   */
  restartGame() {
    this.setData({
      showResult: false,
      showPause: false,
      gameEnded: false,
      gamePaused: false,
      selectedCell: null
    });
    
    this.initGame();
  },

  /**
   * 隐藏结果弹窗
   */
  hideResult() {
    this.setData({ showResult: false });
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
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    return {
      title: '一起来玩消消乐吧！',
      path: '/pages/index/index'
    };
  }
});
