/**
 * 用户相关路由
 */

const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();

// JWT密钥
const JWT_SECRET = process.env.JWT_SECRET || 'weapp_game_secret_key_2024';

/**
 * 用户登录
 */
router.post('/login', async (req, res) => {
  try {
    const { phone, password } = req.body;
    
    // 查找用户
    const user = await User.findOne({ phone });
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: '用户名或密码错误'
      });
    }
    
    // 验证密码
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: '用户名或密码错误'
      });
    }
    
    // 更新最后登录时间
    user.lastLoginTime = new Date();
    await user.save();
    
    // 生成JWT token
    const token = jwt.sign(
      { 
        userId: user.id, 
        phone: user.phone,
        nickname: user.nickname 
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    res.json({
      success: true,
      data: {
        token,
        userInfo: user.userInfo
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
 * 用户注册
 */
router.post('/register', async (req, res) => {
  try {
    const { phone, password, verifyCode } = req.body;
    
    // 验证验证码（这里简化处理）
    if (verifyCode !== '123456') {
      return res.status(400).json({
        success: false,
        message: '验证码错误'
      });
    }
    
    // 检查用户是否已存在
    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: '用户已存在'
      });
    }
    
    // 创建新用户
    const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = new User({
      id: userId,
      phone,
      password: hashedPassword,
      nickname: `用户${phone.substr(-4)}`,
      avatarUrl: '/images/avatar/default.png',
      coins: 1000,
      gems: 100
    });
    
    await user.save();
    
    res.json({
      success: true,
      message: '注册成功'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

/**
 * 微信登录
 */
router.post('/wx/:code', async (req, res) => {
  try {
    const { code } = req.params;
    const { userInfo } = req.body;
    
    // 这里应该调用微信API验证code
    // 简化处理，直接创建或更新用户
    
    const wxOpenId = `wx_${code}`;
    let user = await User.findOne({ wxOpenId });
    
    if (!user) {
      const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      user = new User({
        id: userId,
        wxOpenId,
        nickname: userInfo.nickName || '微信用户',
        avatarUrl: userInfo.avatarUrl || '/images/avatar/default.png',
        coins: 1000,
        gems: 100
      });
      await user.save();
    } else {
      // 更新用户信息
      user.nickname = userInfo.nickName || user.nickname;
      user.avatarUrl = userInfo.avatarUrl || user.avatarUrl;
      user.lastLoginTime = new Date();
      await user.save();
    }
    
    // 生成JWT token
    const token = jwt.sign(
      { 
        userId: user.id, 
        wxOpenId: user.wxOpenId,
        nickname: user.nickname 
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    res.json({
      success: true,
      data: {
        token,
        userInfo: user.userInfo
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
 * 获取用户资产
 */
router.get('/assets', async (req, res) => {
  try {
    // 从token中获取用户ID
    const token = req.headers.authorization?.replace('Bearer ', '');
    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded.userId;
    
    const user = await User.findOne({ id: userId });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: '用户不存在'
      });
    }
    
    res.json({
      success: true,
      data: {
        coins: user.coins,
        gems: user.gems
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

