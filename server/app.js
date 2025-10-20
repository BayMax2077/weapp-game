/**
 * 微信小程序游戏服务端主入口
 * 使用Express.js + Socket.IO实现实时通信
 */

const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');
const mongoose = require('mongoose');
const redis = require('redis');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// 数据库连接 (可选)
const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/weapp_game_v2', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB 连接成功');
  } catch (err) {
    console.warn('MongoDB 连接失败，使用内存存储:', err.message);
  }
};

// Redis连接 (可选)
let redisClient = null;
const connectRedis = async () => {
  try {
    redisClient = redis.createClient({
      host: process.env.REDIS_HOST || 'localhost',
      port: process.env.REDIS_PORT || 6379,
      password: process.env.REDIS_PASSWORD || undefined
    });
    
    redisClient.on('connect', () => console.log('Redis 连接成功'));
    redisClient.on('error', (err) => {
      console.warn('Redis 连接失败，使用内存存储:', err.message);
      redisClient = null;
    });
  } catch (err) {
    console.warn('Redis 连接失败，使用内存存储:', err.message);
    redisClient = null;
  }
};

// 异步连接数据库
connectDatabase();
connectRedis();

// 中间件配置
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 路由导入
const userRoutes = require('./routes/user');
const gameRoutes = require('./routes/game');
const roomRoutes = require('./routes/room');
const paymentRoutes = require('./routes/payment');
const feedbackRoutes = require('./routes/feedback');
const emailRoutes = require('./routes/email');
const activityRoutes = require('./routes/activity');
const shopRoutes = require('./routes/shop');

// 路由注册
app.use('/api/user', userRoutes);
app.use('/api/game', gameRoutes);
app.use('/api/room', roomRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/email', emailRoutes);
app.use('/api/activity', activityRoutes);
app.use('/api/shop', shopRoutes);

// Socket.IO连接处理
const roomManager = new Map(); // 房间管理器
const userSockets = new Map(); // 用户Socket映射
const gameStates = new Map(); // 游戏状态管理

io.on('connection', (socket) => {
  console.log('用户连接:', socket.id);
  
  // 用户加入房间
  socket.on('joinRoom', (data) => {
    const { roomId, userId } = data;
    socket.join(roomId);
    userSockets.set(userId, socket.id);
    
    // 更新房间信息
    if (!roomManager.has(roomId)) {
      roomManager.set(roomId, {
        players: [],
        gameData: {},
        status: 'waiting'
      });
    }
    
    const room = roomManager.get(roomId);
    room.players.push({ userId, socketId: socket.id });
    
    // 通知房间内其他玩家
    socket.to(roomId).emit('playerJoined', { userId });
    socket.emit('joinedRoom', { roomId, players: room.players });
    
    console.log(`用户 ${userId} 加入房间 ${roomId}`);
  });
  
  // 用户离开房间
  socket.on('leaveRoom', (data) => {
    const { roomId, userId } = data;
    socket.leave(roomId);
    
    const room = roomManager.get(roomId);
    if (room) {
      room.players = room.players.filter(p => p.userId !== userId);
      
      // 如果房间为空，删除房间
      if (room.players.length === 0) {
        roomManager.delete(roomId);
      } else {
        // 通知房间内其他玩家
        socket.to(roomId).emit('playerLeft', { userId });
      }
    }
    
    userSockets.delete(userId);
    console.log(`用户 ${userId} 离开房间 ${roomId}`);
  });
  
  // 游戏数据同步
  socket.on('gameData', (data) => {
    const { roomId, gameData, gameType } = data;
    const room = roomManager.get(roomId);
    
    if (room) {
      room.gameData = { ...room.gameData, ...gameData };
      
      // 更新游戏状态
      if (!gameStates.has(roomId)) {
        gameStates.set(roomId, {
          gameType,
          currentPlayer: 0,
          gameData: {},
          history: []
        });
      }
      
      const gameState = gameStates.get(roomId);
      gameState.gameData = { ...gameState.gameData, ...gameData };
      gameState.history.push({
        timestamp: Date.now(),
        data: gameData,
        playerId: data.playerId
      });
      
      // 广播给房间内其他玩家
      socket.to(roomId).emit('gameData', gameData);
    }
  });
  
  // 游戏状态更新
  socket.on('gameStatus', (data) => {
    const { roomId, status, gameType } = data;
    const room = roomManager.get(roomId);
    
    if (room) {
      room.status = status;
      
      // 更新游戏状态
      if (status === 'playing') {
        if (!gameStates.has(roomId)) {
          gameStates.set(roomId, {
            gameType,
            currentPlayer: 0,
            gameData: {},
            history: []
          });
        }
      }
      
      // 广播给房间内所有玩家
      io.to(roomId).emit('gameStatus', { status, gameType });
    }
  });
  
  // 玩家操作
  socket.on('playerAction', (data) => {
    const { roomId, action, playerId } = data;
    const room = roomManager.get(roomId);
    
    if (room) {
      // 验证操作权限
      const gameState = gameStates.get(roomId);
      if (gameState && gameState.currentPlayer !== playerId) {
        socket.emit('actionRejected', { reason: '不是当前玩家' });
        return;
      }
      
      // 处理玩家操作
      socket.to(roomId).emit('playerAction', { action, playerId });
    }
  });
  
  // 游戏结束
  socket.on('gameEnd', (data) => {
    const { roomId, results } = data;
    const room = roomManager.get(roomId);
    
    if (room) {
      room.status = 'finished';
      gameStates.delete(roomId);
      
      // 广播游戏结果
      io.to(roomId).emit('gameEnd', results);
    }
  });
  
  // 断开连接
  socket.on('disconnect', () => {
    console.log('用户断开连接:', socket.id);
    
    // 清理用户数据
    for (const [userId, socketId] of userSockets.entries()) {
      if (socketId === socket.id) {
        userSockets.delete(userId);
        
        // 从所有房间中移除该用户
        for (const [roomId, room] of roomManager.entries()) {
          room.players = room.players.filter(p => p.socketId !== socket.id);
          if (room.players.length === 0) {
            roomManager.delete(roomId);
          } else {
            io.to(roomId).emit('playerLeft', { userId });
          }
        }
        break;
      }
    }
  });
});

// 健康检查端点
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: Date.now(),
    rooms: roomManager.size,
    connections: io.sockets.sockets.size
  });
});

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error('错误:', err);
  res.status(500).json({
    success: false,
    message: err.message || '服务器错误'
  });
});

// 启动服务器
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`服务器运行在端口 ${PORT}`);
  console.log(`环境: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = { app, io, server };

