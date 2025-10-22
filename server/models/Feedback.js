/**
 * 反馈数据模型
 */

const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  userId: {
    type: String,
    required: true
  },
  typeId: {
    type: Number,
    required: true
  },
  content: {
    type: String,
    required: true,
    maxlength: 1000
  },
  images: [{
    type: String,
    validate: {
      validator: function(v) {
        return v.length <= 9; // 最多9张图片
      },
      message: '最多只能上传9张图片'
    }
  }],
  status: {
    type: String,
    enum: ['pending', 'processing', 'resolved', 'rejected'],
    default: 'pending'
  },
  replyInfo: {
    content: String,
    replyTime: Date,
    adminId: String
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
feedbackSchema.index({ userId: 1 });
feedbackSchema.index({ typeId: 1 });
feedbackSchema.index({ status: 1 });
feedbackSchema.index({ createTime: -1 });

// 中间件
feedbackSchema.pre('save', function(next) {
  this.updateTime = new Date();
  next();
});

// 方法
feedbackSchema.methods.reply = function(content, adminId) {
  this.replyInfo = {
    content,
    replyTime: new Date(),
    adminId
  };
  this.status = 'resolved';
  return this.save();
};

module.exports = mongoose.model('Feedback', feedbackSchema);
