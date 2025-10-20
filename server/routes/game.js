/**
 * 游戏相关路由
 */

const express = require('express');
const router = express.Router();

// 游戏列表
const games = [
  {
    id: 'flight_chess',
    name: '飞行棋',
    icon: '/images/games/flight-chess.png',
    description: '经典飞行棋游戏，2-4人对战',
    minPlayers: 2,
    maxPlayers: 4,
    isOnline: true,
    category: 'board'
  },
  {
    id: 'eliminating',
    name: '消消乐',
    icon: '/images/games/eliminating.png',
    description: '三消类休闲游戏',
    minPlayers: 1,
    maxPlayers: 1,
    isOnline: false,
    category: 'casual'
  },
  {
    id: 'gobang',
    name: '五子棋',
    icon: '/images/games/gobang.png',
    description: '经典五子棋游戏',
    minPlayers: 2,
    maxPlayers: 2,
    isOnline: true,
    category: 'board'
  },
  {
    id: 'four_cards',
    name: '四张牌',
    icon: '/images/games/four-cards.png',
    description: '卡牌类游戏',
    minPlayers: 2,
    maxPlayers: 4,
    isOnline: true,
    category: 'card'
  }
];

/**
 * 获取游戏列表
 */
router.get('/list', async (req, res) => {
  try {
    res.json({
      success: true,
      data: games
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

/**
 * 获取游戏详情
 */
router.get('/:gameId', async (req, res) => {
  try {
    const { gameId } = req.params;
    const game = games.find(g => g.id === gameId);
    
    if (!game) {
      return res.status(404).json({
        success: false,
        message: '游戏不存在'
      });
    }
    
    res.json({
      success: true,
      data: game
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

/**
 * 获取游戏战绩
 */
router.get('/record/:gameId', async (req, res) => {
  try {
    const { gameId } = req.params;
    
    // 这里应该从数据库获取战绩
    // 简化处理，返回模拟数据
    const record = {
      gameId,
      totalGames: 100,
      winGames: 60,
      winRate: 0.6,
      bestScore: 1500,
      recentGames: [
        {
          id: '1',
          time: Date.now() - 3600000,
          result: 'win',
          score: 1200
        },
        {
          id: '2',
          time: Date.now() - 7200000,
          result: 'lose',
          score: 800
        }
      ]
    };
    
    res.json({
      success: true,
      data: record
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;

