// utils/gameValidator.js - 游戏数据验证器
class GameValidator {
  /**
   * 验证游戏类型
   */
  static validateGameType(gameType) {
    const validTypes = ['eliminating', 'flightChess', 'fourCards', 'gobang'];
    return validTypes.includes(gameType);
  }

  /**
   * 验证房间代码
   */
  static validateRoomCode(roomCode) {
    if (!roomCode || typeof roomCode !== 'string') {
      return { valid: false, error: '房间代码不能为空' };
    }
    
    if (roomCode.length !== 6) {
      return { valid: false, error: '房间代码长度必须为6位' };
    }
    
    if (!/^[A-Z0-9]+$/.test(roomCode)) {
      return { valid: false, error: '房间代码只能包含大写字母和数字' };
    }
    
    return { valid: true };
  }

  /**
   * 验证玩家数据
   */
  static validatePlayer(player) {
    if (!player || typeof player !== 'object') {
      return { valid: false, error: '玩家数据不能为空' };
    }
    
    if (!player.id || typeof player.id !== 'string') {
      return { valid: false, error: '玩家ID不能为空' };
    }
    
    if (!player.nickname || typeof player.nickname !== 'string') {
      return { valid: false, error: '玩家昵称不能为空' };
    }
    
    if (player.nickname.length > 20) {
      return { valid: false, error: '玩家昵称不能超过20个字符' };
    }
    
    if (player.avatarUrl && typeof player.avatarUrl !== 'string') {
      return { valid: false, error: '头像URL格式不正确' };
    }
    
    return { valid: true };
  }

  /**
   * 验证游戏动作
   */
  static validateGameAction(gameType, action, data) {
    switch (gameType) {
      case 'eliminating':
        return this.validateEliminatingAction(action, data);
      case 'flightChess':
        return this.validateFlightChessAction(action, data);
      case 'fourCards':
        return this.validateFourCardsAction(action, data);
      case 'gobang':
        return this.validateGobangAction(action, data);
      default:
        return { valid: false, error: '未知的游戏类型' };
    }
  }

  /**
   * 验证消消乐动作
   */
  static validateEliminatingAction(action, data) {
    switch (action) {
      case 'selectBlock':
        if (!data || typeof data.x !== 'number' || typeof data.y !== 'number') {
          return { valid: false, error: '选择方块坐标格式不正确' };
        }
        if (data.x < 0 || data.y < 0 || data.x >= 8 || data.y >= 8) {
          return { valid: false, error: '方块坐标超出范围' };
        }
        break;
      case 'swapBlocks':
        if (!data || !data.from || !data.to) {
          return { valid: false, error: '交换方块数据格式不正确' };
        }
        break;
      default:
        return { valid: false, error: '未知的消消乐动作' };
    }
    return { valid: true };
  }

  /**
   * 验证飞行棋动作
   */
  static validateFlightChessAction(action, data) {
    switch (action) {
      case 'rollDice':
        // 掷骰子不需要额外数据
        break;
      case 'movePiece':
        if (!data || typeof data.pieceIndex !== 'number') {
          return { valid: false, error: '移动棋子数据格式不正确' };
        }
        if (data.pieceIndex < 0 || data.pieceIndex >= 4) {
          return { valid: false, error: '棋子索引超出范围' };
        }
        break;
      default:
        return { valid: false, error: '未知的飞行棋动作' };
    }
    return { valid: true };
  }

  /**
   * 验证四张牌动作
   */
  static validateFourCardsAction(action, data) {
    switch (action) {
      case 'playCards':
        if (!data || !Array.isArray(data.cards)) {
          return { valid: false, error: '出牌数据格式不正确' };
        }
        if (data.cards.length === 0) {
          return { valid: false, error: '必须选择要出的牌' };
        }
        break;
      case 'skipTurn':
        // 跳过回合不需要额外数据
        break;
      default:
        return { valid: false, error: '未知的四张牌动作' };
    }
    return { valid: true };
  }

  /**
   * 验证五子棋动作
   */
  static validateGobangAction(action, data) {
    switch (action) {
      case 'placePiece':
        if (!data || typeof data.x !== 'number' || typeof data.y !== 'number') {
          return { valid: false, error: '落子坐标格式不正确' };
        }
        if (data.x < 0 || data.y < 0 || data.x >= 15 || data.y >= 15) {
          return { valid: false, error: '落子坐标超出范围' };
        }
        break;
      case 'undoMove':
        // 悔棋不需要额外数据
        break;
      default:
        return { valid: false, error: '未知的五子棋动作' };
    }
    return { valid: true };
  }

  /**
   * 验证游戏配置
   */
  static validateGameConfig(gameType, config) {
    if (!this.validateGameType(gameType)) {
      return { valid: false, error: '无效的游戏类型' };
    }
    
    if (!config || typeof config !== 'object') {
      return { valid: false, error: '游戏配置不能为空' };
    }
    
    // 验证玩家数量
    if (config.maxPlayers && (config.maxPlayers < 1 || config.maxPlayers > 4)) {
      return { valid: false, error: '最大玩家数必须在1-4之间' };
    }
    
    if (config.minPlayers && (config.minPlayers < 1 || config.minPlayers > 4)) {
      return { valid: false, error: '最小玩家数必须在1-4之间' };
    }
    
    if (config.minPlayers && config.maxPlayers && config.minPlayers > config.maxPlayers) {
      return { valid: false, error: '最小玩家数不能大于最大玩家数' };
    }
    
    // 验证时间限制
    if (config.timeLimit && (config.timeLimit < 30 || config.timeLimit > 3600)) {
      return { valid: false, error: '时间限制必须在30秒到1小时之间' };
    }
    
    return { valid: true };
  }

  /**
   * 验证房间配置
   */
  static validateRoomConfig(config) {
    if (!config || typeof config !== 'object') {
      return { valid: false, error: '房间配置不能为空' };
    }
    
    // 验证房间名称
    if (config.roomName && (config.roomName.length < 1 || config.roomName.length > 20)) {
      return { valid: false, error: '房间名称长度必须在1-20个字符之间' };
    }
    
    // 验证密码
    if (config.password && (config.password.length < 4 || config.password.length > 20)) {
      return { valid: false, error: '房间密码长度必须在4-20个字符之间' };
    }
    
    // 验证最大玩家数
    if (config.maxPlayers && (config.maxPlayers < 1 || config.maxPlayers > 4)) {
      return { valid: false, error: '最大玩家数必须在1-4之间' };
    }
    
    return { valid: true };
  }

  /**
   * 验证消息数据
   */
  static validateMessage(message) {
    if (!message || typeof message !== 'object') {
      return { valid: false, error: '消息数据不能为空' };
    }
    
    if (!message.content || typeof message.content !== 'string') {
      return { valid: false, error: '消息内容不能为空' };
    }
    
    if (message.content.length > 200) {
      return { valid: false, error: '消息内容不能超过200个字符' };
    }
    
    if (!message.senderId || typeof message.senderId !== 'string') {
      return { valid: false, error: '发送者ID不能为空' };
    }
    
    return { valid: true };
  }

  /**
   * 验证分数数据
   */
  static validateScore(score) {
    if (typeof score !== 'number') {
      return { valid: false, error: '分数必须是数字' };
    }
    
    if (score < 0) {
      return { valid: false, error: '分数不能为负数' };
    }
    
    if (score > 1000000) {
      return { valid: false, error: '分数不能超过1000000' };
    }
    
    return { valid: true };
  }

  /**
   * 验证时间数据
   */
  static validateTime(time) {
    if (typeof time !== 'number') {
      return { valid: false, error: '时间必须是数字' };
    }
    
    if (time < 0) {
      return { valid: false, error: '时间不能为负数' };
    }
    
    if (time > 3600) {
      return { valid: false, error: '时间不能超过1小时' };
    }
    
    return { valid: true };
  }

  /**
   * 验证坐标数据
   */
  static validatePosition(x, y, maxX = 15, maxY = 15) {
    if (typeof x !== 'number' || typeof y !== 'number') {
      return { valid: false, error: '坐标必须是数字' };
    }
    
    if (x < 0 || y < 0 || x >= maxX || y >= maxY) {
      return { valid: false, error: `坐标必须在0-${maxX-1}和0-${maxY-1}之间` };
    }
    
    return { valid: true };
  }

  /**
   * 验证卡牌数据
   */
  static validateCard(card) {
    if (!card || typeof card !== 'object') {
      return { valid: false, error: '卡牌数据不能为空' };
    }
    
    if (!card.suit || typeof card.suit !== 'string') {
      return { valid: false, error: '卡牌花色不能为空' };
    }
    
    if (!card.rank || typeof card.rank !== 'string') {
      return { valid: false, error: '卡牌点数不能为空' };
    }
    
    const validSuits = ['♠', '♥', '♦', '♣'];
    if (!validSuits.includes(card.suit)) {
      return { valid: false, error: '无效的卡牌花色' };
    }
    
    const validRanks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    if (!validRanks.includes(card.rank)) {
      return { valid: false, error: '无效的卡牌点数' };
    }
    
    return { valid: true };
  }
}

module.exports = GameValidator;
