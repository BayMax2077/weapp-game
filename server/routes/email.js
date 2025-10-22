/**
 * 邮件相关路由
 */

const express = require('express');
const router = express.Router();

// 邮件数据存储
const emails = new Map();

/**
 * 获取邮件列表
 */
router.get('/', async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    const userId = Buffer.from(token, 'base64').toString().split(':')[0];
    
    // 模拟邮件数据
    const userEmails = [
      {
        id: 'email_1',
        title: '欢迎来到游戏平台',
        content: '欢迎您加入我们的游戏平台！',
        type: 'system',
        isRead: false,
        createTime: Date.now() - 86400000,
        expireTime: Date.now() + 86400000 * 7
      },
      {
        id: 'email_2',
        title: '每日签到奖励',
        content: '完成每日签到可获得100金币奖励！',
        type: 'reward',
        isRead: true,
        createTime: Date.now() - 3600000,
        expireTime: Date.now() + 86400000 * 3
      },
      {
        id: 'email_3',
        title: '活动通知',
        content: '新活动即将开始，敬请期待！',
        type: 'activity',
        isRead: false,
        createTime: Date.now() - 7200000,
        expireTime: Date.now() + 86400000 * 5
      }
    ];
    
    res.json({
      success: true,
      data: userEmails
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

/**
 * 获取邮件详情
 */
router.get('/:emailId', async (req, res) => {
  try {
    const { emailId } = req.params;
    
    // 模拟邮件详情
    const email = {
      id: emailId,
      title: '欢迎来到游戏平台',
      content: '欢迎您加入我们的游戏平台！我们为您准备了丰富的游戏内容和奖励。',
      type: 'system',
      isRead: true,
      createTime: Date.now() - 86400000,
      expireTime: Date.now() + 86400000 * 7,
      attachments: [
        {
          type: 'coin',
          amount: 100,
          name: '新手奖励'
        }
      ]
    };
    
    res.json({
      success: true,
      data: email
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

/**
 * 标记邮件为已读
 */
router.post('/:emailId/read', async (req, res) => {
  try {
    const { emailId } = req.params;
    
    // 这里应该更新数据库中的邮件状态
    // 简化处理，直接返回成功
    
    res.json({
      success: true,
      message: '邮件已标记为已读'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

/**
 * 删除邮件
 */
router.delete('/:emailId', async (req, res) => {
  try {
    const { emailId } = req.params;
    
    // 这里应该从数据库中删除邮件
    // 简化处理，直接返回成功
    
    res.json({
      success: true,
      message: '邮件已删除'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
