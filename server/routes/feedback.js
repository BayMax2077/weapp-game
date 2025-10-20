 /**
 * 反馈相关路由
 */

const express = require('express');
const Feedback = require('../models/Feedback');
const router = express.Router();

// 反馈类型
const feedbackTypes = [
  { id: 1, name: '游戏bug', description: '游戏运行异常' },
  { id: 2, name: '功能建议', description: '功能改进建议' },
  { id: 3, name: '界面问题', description: '界面显示异常' },
  { id: 4, name: '其他问题', description: '其他问题反馈' }
];

// 反馈数据存储 (已迁移到数据库)

/**
 * 获取反馈类型
 */
router.get('/types', async (req, res) => {
  try {
    res.json({
      success: true,
      data: feedbackTypes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

/**
 * 提交反馈
 */
router.post('/submit', async (req, res) => {
  try {
    const { typeId, content, images } = req.body;
    const token = req.headers.authorization?.replace('Bearer ', '');
    const jwt = require('jsonwebtoken');
    const JWT_SECRET = process.env.JWT_SECRET || 'weapp_game_secret_key_2024';
    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded.userId;
    
    const feedbackId = `feedback_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const feedback = new Feedback({
      id: feedbackId,
      userId,
      typeId: parseInt(typeId),
      content,
      images: images || [],
      status: 'pending'
    });
    
    await feedback.save();
    
    res.json({
      success: true,
      message: '反馈提交成功',
      data: { feedbackId }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

/**
 * 获取用户反馈列表
 */
router.get('/list', async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    const jwt = require('jsonwebtoken');
    const JWT_SECRET = process.env.JWT_SECRET || 'weapp_game_secret_key_2024';
    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded.userId;
    
    const userFeedbacks = await Feedback.find({ userId })
      .sort({ createTime: -1 });
    
    res.json({
      success: true,
      data: userFeedbacks
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

/**
 * 获取反馈详情
 */
router.get('/:feedbackId', async (req, res) => {
  try {
    const { feedbackId } = req.params;
    const feedback = await Feedback.findOne({ id: feedbackId });
    
    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: '反馈不存在'
      });
    }
    
    res.json({
      success: true,
      data: feedback
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
