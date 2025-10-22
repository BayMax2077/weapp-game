/**
 * 房间相关路由
 */

const express = require('express');
const router = express.Router();

// 房间数据存储
const rooms = new Map();

/**
 * 生成房间号
 */
function generateRoomCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * 创建房间
 */
router.post('/create', async (req, res) => {
  try {
    const { gameId, maxPlayers = 4, roomName } = req.body;
    const token = req.headers.authorization?.replace('Bearer ', '');
    const userId = Buffer.from(token, 'base64').toString().split(':')[0];
    
    const roomCode = generateRoomCode();
    const roomId = `room_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const room = {
      id: roomId,
      roomCode,
      gameId,
      roomName: roomName || `${roomCode}的房间`,
      maxPlayers,
      players: [userId],
      hostId: userId,
      status: 'waiting',
      createTime: Date.now(),
      gameData: {}
    };
    
    rooms.set(roomId, room);
    
    res.json({
      success: true,
      data: {
        roomId,
        roomCode
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

/**
 * 加入房间
 */
router.post('/join', async (req, res) => {
  try {
    const { roomCode } = req.body;
    const token = req.headers.authorization?.replace('Bearer ', '');
    const userId = Buffer.from(token, 'base64').toString().split(':')[0];
    
    // 查找房间
    const room = Array.from(rooms.values()).find(r => r.roomCode === roomCode);
    
    if (!room) {
      return res.status(404).json({
        success: false,
        message: '房间不存在'
      });
    }
    
    if (room.players.length >= room.maxPlayers) {
      return res.status(400).json({
        success: false,
        message: '房间已满'
      });
    }
    
    if (room.players.includes(userId)) {
      return res.status(400).json({
        success: false,
        message: '已在房间中'
      });
    }
    
    room.players.push(userId);
    
    res.json({
      success: true,
      data: {
        roomId: room.id,
        roomCode: room.roomCode,
        players: room.players
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

/**
 * 退出房间
 */
router.post('/exit', async (req, res) => {
  try {
    const { roomCode } = req.body;
    const token = req.headers.authorization?.replace('Bearer ', '');
    const userId = Buffer.from(token, 'base64').toString().split(':')[0];
    
    const room = Array.from(rooms.values()).find(r => r.roomCode === roomCode);
    
    if (!room) {
      return res.status(404).json({
        success: false,
        message: '房间不存在'
      });
    }
    
    room.players = room.players.filter(p => p !== userId);
    
    // 如果房间为空或房主退出，删除房间
    if (room.players.length === 0 || room.hostId === userId) {
      rooms.delete(room.id);
    }
    
    res.json({
      success: true,
      message: '已退出房间'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

/**
 * 获取房间信息
 */
router.get('/info', async (req, res) => {
  try {
    const { roomCode } = req.query;
    const room = Array.from(rooms.values()).find(r => r.roomCode === roomCode);
    
    if (!room) {
      return res.status(404).json({
        success: false,
        message: '房间不存在'
      });
    }
    
    res.json({
      success: true,
      data: room
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

/**
 * 随机加入房间
 */
router.get('/random', async (req, res) => {
  try {
    const { gameId } = req.query;
    const token = req.headers.authorization?.replace('Bearer ', '');
    const userId = Buffer.from(token, 'base64').toString().split(':')[0];
    
    // 查找可用房间
    const availableRooms = Array.from(rooms.values()).filter(
      r => r.gameId === gameId && 
      r.status === 'waiting' && 
      r.players.length < r.maxPlayers &&
      !r.players.includes(userId)
    );
    
    if (availableRooms.length === 0) {
      return res.status(404).json({
        success: false,
        message: '暂无可用房间'
      });
    }
    
    // 随机选择一个房间
    const room = availableRooms[Math.floor(Math.random() * availableRooms.length)];
    room.players.push(userId);
    
    res.json({
      success: true,
      data: {
        roomId: room.id,
        roomCode: room.roomCode
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;

