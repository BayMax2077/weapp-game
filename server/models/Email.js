/**
 * 邮件数据模型
 */

const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  userId: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true,
    maxlength: 100
  },
  content: {
    type: String,
    required: true,
    maxlength: 2000
  },
  type: {
    type: String,
    enum: ['system', 'reward', 'activity', 'notice'],
    default: 'system'
  },
  isRead: {
    type: Boolean,
    default: false
  },
  attachments: [{
    type: {
      type: String,
      enum: ['coin', 'gem', 'item', 'other'],
      required: true
    },
    amount: Number,
    name: String,
    description: String
  }],
  expireTime: {
    type: Date,
    default: function() {
      return new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7天后过期
    }
  },
  createTime: {
    type: Date,
    default: Date.now
  },
  readTime: Date
}, {
  timestamps: true
});

// 索引
emailSchema.index({ userId: 1 });
emailSchema.index({ type: 1 });
emailSchema.index({ isRead: 1 });
emailSchema.index({ createTime: -1 });
emailSchema.index({ expireTime: 1 });

// 虚拟字段
emailSchema.virtual('isExpired').get(function() {
  return new Date() > this.expireTime;
});

// 方法
emailSchema.methods.markAsRead = function() {
  this.isRead = true;
  this.readTime = new Date();
  return this.save();
};

emailSchema.methods.claimAttachments = function() {
  // 这里应该处理附件领取逻辑
  // 简化处理，直接返回附件信息
  return this.attachments;
};

// 静态方法
emailSchema.statics.createSystemEmail = function(userId, title, content, attachments = []) {
  return this.create({
    id: `email_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    userId,
    title,
    content,
    type: 'system',
    attachments
  });
};

emailSchema.statics.createRewardEmail = function(userId, title, content, attachments = []) {
  return this.create({
    id: `email_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    userId,
    title,
    content,
    type: 'reward',
    attachments
  });
};

module.exports = mongoose.model('Email', emailSchema);
