/**
 * 数据库初始化脚本
 * 创建初始数据和索引
 */

const mongoose = require('mongoose');
const User = require('../models/User');
const Room = require('../models/Room');
const Feedback = require('../models/Feedback');
const Email = require('../models/Email');
const Activity = require('../models/Activity');
const Product = require('../models/Product');

// 连接数据库
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/weapp_game_v2', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('数据库连接成功');
    return true;
  } catch (error) {
    console.warn('数据库连接失败，将使用内存存储:', error.message);
    return false;
  }
};

// 初始化数据
const initData = async () => {
  try {
    console.log('开始初始化数据...');

    // 创建初始活动
    const activities = [
      {
        id: 'activity_newbie',
        title: '新手福利',
        description: '新用户注册即送1000金币',
        type: 'newbie',
        status: 'active',
        startTime: new Date(),
        endTime: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30天后
        image: '/images/activities/newbie.png',
        rewards: [
          { type: 'coin', amount: 1000, name: '新手金币' }
        ],
        conditions: [
          { type: 'register', value: 1, name: '完成注册' }
        ]
      },
      {
        id: 'activity_daily',
        title: '每日签到',
        description: '每日签到可获得丰厚奖励',
        type: 'daily',
        status: 'active',
        startTime: new Date(),
        endTime: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1年后
        image: '/images/activities/daily.png',
        rewards: [
          { type: 'coin', amount: 100, name: '每日金币' },
          { type: 'gem', amount: 5, name: '每日宝石' }
        ],
        conditions: [
          { type: 'daily', value: 1, name: '每日签到' }
        ]
      }
    ];

    for (const activityData of activities) {
      const existingActivity = await Activity.findOne({ id: activityData.id });
      if (!existingActivity) {
        const activity = new Activity(activityData);
        await activity.save();
        console.log(`创建活动: ${activity.title}`);
      }
    }

    // 创建初始商品
    const products = [
      {
        id: 'coin_100',
        name: '100金币',
        description: '购买100金币',
        price: 1,
        currency: 'CNY',
        type: 'coin',
        categoryId: 1,
        amount: 100,
        icon: '/images/shop/coin_100.png',
        status: 'active',
        sort: 1
      },
      {
        id: 'coin_500',
        name: '500金币',
        description: '购买500金币',
        price: 5,
        currency: 'CNY',
        type: 'coin',
        categoryId: 1,
        amount: 500,
        icon: '/images/shop/coin_500.png',
        status: 'active',
        sort: 2
      },
      {
        id: 'gem_10',
        name: '10宝石',
        description: '购买10宝石',
        price: 6,
        currency: 'CNY',
        type: 'gem',
        categoryId: 2,
        amount: 10,
        icon: '/images/shop/gem_10.png',
        status: 'active',
        sort: 1
      }
    ];

    for (const productData of products) {
      const existingProduct = await Product.findOne({ id: productData.id });
      if (!existingProduct) {
        const product = new Product(productData);
        await product.save();
        console.log(`创建商品: ${product.name}`);
      }
    }

    // 创建系统邮件
    const systemEmails = [
      {
        id: 'email_welcome',
        title: '欢迎来到游戏平台',
        content: '欢迎您加入我们的游戏平台！我们为您准备了丰富的游戏内容和奖励。',
        type: 'system',
        attachments: [
          { type: 'coin', amount: 100, name: '新手奖励' }
        ]
      }
    ];

    // 为所有用户创建欢迎邮件
    const users = await User.find({});
    for (const user of users) {
      const existingEmail = await Email.findOne({ 
        id: `email_welcome_${user.id}`,
        userId: user.id 
      });
      if (!existingEmail) {
        const email = new Email({
          id: `email_welcome_${user.id}`,
          userId: user.id,
          title: '欢迎来到游戏平台',
          content: '欢迎您加入我们的游戏平台！我们为您准备了丰富的游戏内容和奖励。',
          type: 'system',
          attachments: [
            { type: 'coin', amount: 100, name: '新手奖励' }
          ]
        });
        await email.save();
        console.log(`为用户 ${user.nickname} 创建欢迎邮件`);
      }
    }

    console.log('数据初始化完成');
  } catch (error) {
    console.error('数据初始化失败:', error);
  }
};

// 创建索引
const createIndexes = async () => {
  try {
    console.log('开始创建索引...');
    
    // 用户索引
    await User.collection.createIndex({ phone: 1 });
    await User.collection.createIndex({ wxOpenId: 1 });
    await User.collection.createIndex({ createTime: -1 });
    
    // 房间索引
    await Room.collection.createIndex({ roomCode: 1 });
    await Room.collection.createIndex({ gameId: 1 });
    await Room.collection.createIndex({ status: 1 });
    
    // 反馈索引
    await Feedback.collection.createIndex({ userId: 1 });
    await Feedback.collection.createIndex({ typeId: 1 });
    await Feedback.collection.createIndex({ status: 1 });
    
    // 邮件索引
    await Email.collection.createIndex({ userId: 1 });
    await Email.collection.createIndex({ type: 1 });
    await Email.collection.createIndex({ isRead: 1 });
    
    // 活动索引
    await Activity.collection.createIndex({ type: 1 });
    await Activity.collection.createIndex({ status: 1 });
    await Activity.collection.createIndex({ startTime: 1 });
    
    // 商品索引
    await Product.collection.createIndex({ categoryId: 1 });
    await Product.collection.createIndex({ type: 1 });
    await Product.collection.createIndex({ status: 1 });
    
    console.log('索引创建完成');
  } catch (error) {
    console.error('索引创建失败:', error);
  }
};

// 主函数
const main = async () => {
  const dbConnected = await connectDB();
  if (dbConnected) {
    await createIndexes();
    await initData();
    console.log('数据库初始化完成');
  } else {
    console.log('数据库未连接，跳过初始化');
  }
  process.exit(0);
};

// 如果直接运行此脚本
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { connectDB, initData, createIndexes };
