/**
 * 游戏记录数据模型
 */

const mongoose = require('mongoose');

const gameRecordSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  roomId: {
    type: String,
    required: true
  },
  gameId: {
    type: String,
    required: true
  },
  players: [{
    userId: String,
    nickname: String,
    avatarUrl: String,
    score: {
      type: Number,
      default: 0
    },
    rank: {
      type: Number,
      default: 0
    },
    isWinner: {
      type: Boolean,
      default: false
    }
  }],
  gameData: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  duration: {
    type: Number, // 游戏时长(秒)
    default: 0
  },
  startTime: {
    type: Date,
    default: Date.now
  },
  endTime: Date,
  status: {
    type: String,
    enum: ['playing', 'finished', 'abandoned'],
    default: 'playing'
  }
}, {
  timestamps: true
});

// 索引
gameRecordSchema.index({ roomId: 1 });
gameRecordSchema.index({ gameId: 1 });
gameRecordSchema.index({ 'players.userId': 1 });
gameRecordSchema.index({ startTime: -1 });

// 虚拟字段
gameRecordSchema.virtual('playerCount').get(function() {
  return this.players.length;
});

// 方法
gameRecordSchema.methods.addPlayer = function(playerInfo) {
  this.players.push({
    userId: playerInfo.userId,
    nickname: playerInfo.nickname,
    avatarUrl: playerInfo.avatarUrl,
    score: 0,
    rank: 0,
    isWinner: false
  });
  return this.save();
};

gameRecordSchema.methods.updatePlayerScore = function(userId, score) {
  const player = this.players.find(p => p.userId === userId);
  if (player) {
    player.score = score;
  }
  return this.save();
};

gameRecordSchema.methods.finishGame = function(results) {
  this.status = 'finished';
  this.endTime = new Date();
  this.duration = Math.floor((this.endTime - this.startTime) / 1000);
  
  // 更新玩家结果
  if (results && results.players) {
    results.players.forEach((result, index) => {
      const player = this.players.find(p => p.userId === result.userId);
      if (player) {
        player.score = result.score || 0;
        player.rank = result.rank || index + 1;
        player.isWinner = result.isWinner || false;
      }
    });
  }
  
  return this.save();
};

module.exports = mongoose.model('GameRecord', gameRecordSchema);
