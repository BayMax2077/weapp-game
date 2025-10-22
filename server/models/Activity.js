/**
 * 活动数据模型
 */

const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true,
    maxlength: 50
  },
  description: {
    type: String,
    required: true,
    maxlength: 200
  },
  type: {
    type: String,
    enum: ['newbie', 'daily', 'achievement', 'event', 'seasonal'],
    required: true
  },
  status: {
    type: String,
    enum: ['draft', 'active', 'paused', 'ended'],
    default: 'draft'
  },
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },
  image: {
    type: String,
    default: '/images/activities/default.png'
  },
  rewards: [{
    type: {
      type: String,
      enum: ['coin', 'gem', 'item', 'other'],
      required: true
    },
    amount: Number,
    name: String,
    description: String
  }],
  conditions: [{
    type: {
      type: String,
      enum: ['register', 'daily', 'consecutive', 'game_count', 'score', 'custom'],
      required: true
    },
    value: Number,
    name: String,
    description: String
  }],
  settings: {
    maxParticipants: {
      type: Number,
      default: 0 // 0表示无限制
    },
    isRepeatable: {
      type: Boolean,
      default: false
    },
    priority: {
      type: Number,
      default: 0
    }
  },
  createTime: {
    type: Date,
    default: Date.now
  },
  updateTime: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// 索引
activitySchema.index({ type: 1 });
activitySchema.index({ status: 1 });
activitySchema.index({ startTime: 1 });
activitySchema.index({ endTime: 1 });
activitySchema.index({ createTime: -1 });

// 虚拟字段
activitySchema.virtual('isActive').get(function() {
  const now = new Date();
  return this.status === 'active' && now >= this.startTime && now <= this.endTime;
});

activitySchema.virtual('isUpcoming').get(function() {
  const now = new Date();
  return this.status === 'active' && now < this.startTime;
});

activitySchema.virtual('isEnded').get(function() {
  const now = new Date();
  return this.status === 'ended' || now > this.endTime;
});

// 中间件
activitySchema.pre('save', function(next) {
  this.updateTime = new Date();
  next();
});

// 方法
activitySchema.methods.activate = function() {
  this.status = 'active';
  return this.save();
};

activitySchema.methods.pause = function() {
  this.status = 'paused';
  return this.save();
};

activitySchema.methods.end = function() {
  this.status = 'ended';
  return this.save();
};

// 静态方法
activitySchema.statics.getActiveActivities = function() {
  const now = new Date();
  return this.find({
    status: 'active',
    startTime: { $lte: now },
    endTime: { $gte: now }
  }).sort({ priority: -1, createTime: -1 });
};

activitySchema.statics.getUpcomingActivities = function() {
  const now = new Date();
  return this.find({
    status: 'active',
    startTime: { $gt: now }
  }).sort({ startTime: 1 });
};

module.exports = mongoose.model('Activity', activitySchema);
