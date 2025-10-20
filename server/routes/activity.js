/**
 * 活动相关路由
 */

const express = require('express');
const router = express.Router();

// 活动数据存储
const activities = new Map();

// 模拟活动数据
const mockActivities = [
  {
    id: 'activity_1',
    title: '新手福利',
    description: '新用户注册即送1000金币',
    type: 'newbie',
    status: 'active',
    startTime: Date.now() - 86400000,
    endTime: Date.now() + 86400000 * 30,
    image: '/images/activities/newbie.png',
    rewards: [
      { type: 'coin', amount: 1000, name: '新手金币' }
    ],
    conditions: [
      { type: 'register', value: 1, name: '完成注册' }
    ]
  },
  {
    id: 'activity_2',
    title: '每日签到',
    description: '每日签到可获得丰厚奖励',
    type: 'daily',
    status: 'active',
    startTime: Date.now() - 86400000,
    endTime: Date.now() + 86400000 * 365,
    image: '/images/activities/daily.png',
    rewards: [
      { type: 'coin', amount: 100, name: '每日金币' },
      { type: 'gem', amount: 5, name: '每日宝石' }
    ],
    conditions: [
      { type: 'daily', value: 1, name: '每日签到' }
    ]
  },
  {
    id: 'activity_3',
    title: '游戏达人',
    description: '连续游戏7天可获得特殊奖励',
    type: 'achievement',
    status: 'active',
    startTime: Date.now() - 86400000,
    endTime: Date.now() + 86400000 * 7,
    image: '/images/activities/achievement.png',
    rewards: [
      { type: 'coin', amount: 500, name: '达人金币' },
      { type: 'gem', amount: 20, name: '达人宝石' }
    ],
    conditions: [
      { type: 'consecutive', value: 7, name: '连续游戏7天' }
    ]
  }
];

// 初始化活动数据
mockActivities.forEach(activity => {
  activities.set(activity.id, activity);
});

/**
 * 获取活动列表
 */
router.get('/', async (req, res) => {
  try {
    const { type, status } = req.query;
    
    let filteredActivities = Array.from(activities.values());
    
    if (type) {
      filteredActivities = filteredActivities.filter(a => a.type === type);
    }
    
    if (status) {
      filteredActivities = filteredActivities.filter(a => a.status === status);
    }
    
    // 按开始时间排序
    filteredActivities.sort((a, b) => b.startTime - a.startTime);
    
    res.json({
      success: true,
      data: filteredActivities
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

/**
 * 获取活动详情
 */
router.get('/:activityId', async (req, res) => {
  try {
    const { activityId } = req.params;
    const activity = activities.get(activityId);
    
    if (!activity) {
      return res.status(404).json({
        success: false,
        message: '活动不存在'
      });
    }
    
    res.json({
      success: true,
      data: activity
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

/**
 * 参与活动
 */
router.post('/:activityId/join', async (req, res) => {
  try {
    const { activityId } = req.params;
    const token = req.headers.authorization?.replace('Bearer ', '');
    const userId = Buffer.from(token, 'base64').toString().split(':')[0];
    
    const activity = activities.get(activityId);
    if (!activity) {
      return res.status(404).json({
        success: false,
        message: '活动不存在'
      });
    }
    
    // 检查活动状态
    const now = Date.now();
    if (now < activity.startTime || now > activity.endTime) {
      return res.status(400).json({
        success: false,
        message: '活动未开始或已结束'
      });
    }
    
    // 这里应该检查用户是否满足活动条件
    // 简化处理，直接返回成功
    
    res.json({
      success: true,
      message: '参与活动成功',
      data: {
        activityId,
        rewards: activity.rewards
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
 * 获取用户活动进度
 */
router.get('/:activityId/progress', async (req, res) => {
  try {
    const { activityId } = req.params;
    const token = req.headers.authorization?.replace('Bearer ', '');
    const userId = Buffer.from(token, 'base64').toString().split(':')[0];
    
    // 模拟用户活动进度
    const progress = {
      activityId,
      userId,
      progress: 3,
      maxProgress: 7,
      isCompleted: false,
      lastUpdateTime: Date.now()
    };
    
    res.json({
      success: true,
      data: progress
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
