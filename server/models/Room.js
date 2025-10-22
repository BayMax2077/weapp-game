/**
 * 房间数据模型
 */

const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  roomCode: {
    type: String,
    required: true,
    unique: true
  },
  gameId: {
    type: String,
    required: true
  },
  roomName: {
    type: String,
    default: function() {
      return `${this.roomCode}的房间`;
    }
  },
  maxPlayers: {
    type: Number,
    default: 4
  },
  players: [{
    userId: String,
    nickname: String,
    avatarUrl: String,
    joinTime: {
      type: Date,
      default: Date.now
    }
  }],
  hostId: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['waiting', 'playing', 'finished'],
    default: 'waiting'
  },
  gameData: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  createTime: {
    type: Date,
    default: Date.now
  },
  startTime: Date,
  endTime: Date,
  settings: {
    password: String,
    isPrivate: {
      type: Boolean,
      default: false
    }
  }
}, {
  timestamps: true
});

// 索引
roomSchema.index({ roomCode: 1 });
roomSchema.index({ gameId: 1 });
roomSchema.index({ status: 1 });
roomSchema.index({ createTime: -1 });

// 虚拟字段
roomSchema.virtual('playerCount').get(function() {
  return this.players.length;
});

roomSchema.virtual('isFull').get(function() {
  return this.players.length >= this.maxPlayers;
});

// 方法
roomSchema.methods.addPlayer = function(playerInfo) {
  if (this.players.length >= this.maxPlayers) {
    throw new Error('房间已满');
  }
  
  if (this.players.some(p => p.userId === playerInfo.userId)) {
    throw new Error('玩家已在房间中');
  }
  
  this.players.push({
    userId: playerInfo.userId,
    nickname: playerInfo.nickname,
    avatarUrl: playerInfo.avatarUrl,
    joinTime: new Date()
  });
  
  return this.save();
};

roomSchema.methods.removePlayer = function(userId) {
  this.players = this.players.filter(p => p.userId !== userId);
  return this.save();
};

roomSchema.methods.startGame = function() {
  this.status = 'playing';
  this.startTime = new Date();
  return this.save();
};

roomSchema.methods.endGame = function() {
  this.status = 'finished';
  this.endTime = new Date();
  return this.save();
};

module.exports = mongoose.model('Room', roomSchema);
