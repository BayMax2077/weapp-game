// utils/gameConfig.js - 游戏配置
const GameConfig = {
  // 游戏类型配置
  gameTypes: {
    eliminating: {
      name: '消消乐',
      icon: '🎮',
      minPlayers: 1,
      maxPlayers: 4,
      description: '经典三消游戏，连接三个或更多相同颜色的方块来消除它们',
      rules: [
        '点击选择方块',
        '交换相邻方块',
        '形成三个或更多相同颜色的连线',
        '消除方块获得分数',
        '在限定时间内获得最高分数'
      ],
      difficulty: 'easy',
      estimatedTime: '5-10分钟'
    },
    flightChess: {
      name: '飞行棋',
      icon: '✈️',
      minPlayers: 2,
      maxPlayers: 4,
      description: '经典飞行棋游戏，掷骰子移动棋子，先到达终点的玩家获胜',
      rules: [
        '掷骰子决定移动步数',
        '棋子从基地起飞需要掷出6',
        '可以吃掉对手的棋子',
        '先到达终点的玩家获胜',
        '支持多人对战'
      ],
      difficulty: 'medium',
      estimatedTime: '15-30分钟'
    },
    fourCards: {
      name: '四张牌',
      icon: '🃏',
      minPlayers: 2,
      maxPlayers: 4,
      description: '经典扑克游戏，出完手牌的玩家获胜',
      rules: [
        '每人发13张牌',
        '按顺序出牌',
        '可以出单张、对子、三张、四张',
        '出完手牌的玩家获胜',
        '支持多种出牌组合'
      ],
      difficulty: 'medium',
      estimatedTime: '10-20分钟'
    },
    gobang: {
      name: '五子棋',
      icon: '⚫',
      minPlayers: 2,
      maxPlayers: 2,
      description: '经典五子棋游戏，先连成五子的玩家获胜',
      rules: [
        '黑子先手',
        '轮流落子',
        '先连成五子的玩家获胜',
        '支持悔棋功能',
        '支持人机对战'
      ],
      difficulty: 'easy',
      estimatedTime: '5-15分钟'
    }
  },

  // 游戏设置
  gameSettings: {
    // 通用设置
    common: {
      maxTimePerTurn: 30, // 每回合最大时间（秒）
      maxPlayers: 4, // 最大玩家数
      minPlayers: 1, // 最小玩家数
      autoStart: true, // 自动开始游戏
      allowSpectators: true, // 允许观战
      enableChat: true, // 启用聊天
      enableReplay: true, // 启用回放
      enableStatistics: true // 启用统计
    },

    // 消消乐设置
    eliminating: {
      boardSize: { width: 8, height: 8 },
      colors: ['red', 'blue', 'green', 'yellow', 'purple', 'orange'],
      minMatch: 3,
      maxMoves: 30,
      timeLimit: 300, // 5分钟
      scoreMultiplier: 1.0,
      specialEffects: true,
      soundEffects: true
    },

    // 飞行棋设置
    flightChess: {
      boardSize: { width: 15, height: 15 },
      maxPieces: 4,
      diceSides: 6,
      safeZones: [0, 8, 13, 21, 26, 34, 39, 47],
      homeZone: 52,
      allowMultipleRolls: false,
      enablePowerUps: false
    },

    // 四张牌设置
    fourCards: {
      deckSize: 52,
      cardsPerPlayer: 13,
      maxPlayers: 4,
      allowPass: true,
      enableJokers: false,
      scoringSystem: 'standard'
    },

    // 五子棋设置
    gobang: {
      boardSize: { width: 15, height: 15 },
      winCondition: 5,
      allowUndo: true,
      maxUndos: 3,
      enableAI: true,
      aiDifficulty: 'medium'
    }
  },

  // 房间设置
  roomSettings: {
    maxRooms: 100,
    roomCodeLength: 6,
    roomExpireTime: 3600000, // 1小时
    allowPrivateRooms: true,
    allowPasswordRooms: true,
    maxSpectators: 10
  },

  // 用户设置
  userSettings: {
    defaultAvatar: '/assets/images/default-avatar.png',
    maxNicknameLength: 20,
    allowGuestLogin: true,
    enableUserStatistics: true,
    enableAchievements: true
  },

  // 网络设置
  networkSettings: {
    reconnectAttempts: 5,
    reconnectDelay: 1000,
    heartbeatInterval: 30000,
    timeout: 10000,
    enableCompression: true
  },

  // 音效设置
  soundSettings: {
    masterVolume: 1.0,
    musicVolume: 0.8,
    sfxVolume: 0.9,
    enableMusic: true,
    enableSFX: true,
    sounds: {
      click: '/assets/sounds/click.mp3',
      success: '/assets/sounds/success.mp3',
      error: '/assets/sounds/error.mp3',
      win: '/assets/sounds/win.mp3',
      lose: '/assets/sounds/lose.mp3'
    }
  },

  // 主题设置
  themeSettings: {
    currentTheme: 'default',
    themes: {
      default: {
        name: '默认主题',
        primaryColor: '#667eea',
        secondaryColor: '#764ba2',
        backgroundColor: '#f5f5f5',
        textColor: '#333333',
        accentColor: '#ffd700'
      },
      dark: {
        name: '暗黑主题',
        primaryColor: '#2c3e50',
        secondaryColor: '#34495e',
        backgroundColor: '#1a1a1a',
        textColor: '#ffffff',
        accentColor: '#e74c3c'
      },
      colorful: {
        name: '彩色主题',
        primaryColor: '#ff6b6b',
        secondaryColor: '#4ecdc4',
        backgroundColor: '#f8f9fa',
        textColor: '#2c3e50',
        accentColor: '#f39c12'
      }
    }
  },

  // 动画设置
  animationSettings: {
    enableAnimations: true,
    animationDuration: 300,
    easing: 'ease-in-out',
    enableParticles: true,
    enableTransitions: true
  },

  // 调试设置
  debugSettings: {
    enableDebug: false,
    enableLogging: true,
    enablePerformanceMonitoring: true,
    enableErrorReporting: true
  }
};

module.exports = GameConfig;
