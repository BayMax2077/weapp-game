/**
 * 用户数据模型
 */

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    unique: true,
    sparse: true
  },
  password: {
    type: String,
    required: function() {
      return this.phone; // 只有手机号注册的用户才需要密码
    }
  },
  nickname: {
    type: String,
    required: true,
    default: '用户'
  },
  avatarUrl: {
    type: String,
    default: '/images/avatar/default.png'
  },
  coins: {
    type: Number,
    default: 1000
  },
  gems: {
    type: Number,
    default: 100
  },
  wxOpenId: {
    type: String,
    unique: true,
    sparse: true
  },
  wxUnionId: {
    type: String,
    unique: true,
    sparse: true
  },
  lastLoginTime: {
    type: Date,
    default: Date.now
  },
  createTime: {
    type: Date,
    default: Date.now
  },
  updateTime: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'banned'],
    default: 'active'
  }
}, {
  timestamps: true
});

// 索引
userSchema.index({ phone: 1 });
userSchema.index({ wxOpenId: 1 });
userSchema.index({ createTime: -1 });

// 虚拟字段
userSchema.virtual('userInfo').get(function() {
  return {
    id: this.id,
    nickname: this.nickname,
    avatarUrl: this.avatarUrl,
    coins: this.coins,
    gems: this.gems
  };
});

// 中间件
userSchema.pre('save', function(next) {
  this.updateTime = new Date();
  next();
});

module.exports = mongoose.model('User', userSchema);
