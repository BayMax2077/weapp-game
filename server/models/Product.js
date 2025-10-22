/**
 * 商品数据模型
 */

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    maxlength: 50
  },
  description: {
    type: String,
    maxlength: 200
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  currency: {
    type: String,
    enum: ['CNY', 'USD', 'EUR'],
    default: 'CNY'
  },
  type: {
    type: String,
    enum: ['coin', 'gem', 'prop', 'skin', 'other'],
    required: true
  },
  categoryId: {
    type: Number,
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: 1
  },
  icon: {
    type: String,
    default: '/images/shop/default.png'
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'sold_out'],
    default: 'active'
  },
  sort: {
    type: Number,
    default: 0
  },
  settings: {
    isLimited: {
      type: Boolean,
      default: false
    },
    limitCount: {
      type: Number,
      default: 0
    },
    soldCount: {
      type: Number,
      default: 0
    },
    isHot: {
      type: Boolean,
      default: false
    },
    isNew: {
      type: Boolean,
      default: false
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
productSchema.index({ categoryId: 1 });
productSchema.index({ type: 1 });
productSchema.index({ status: 1 });
productSchema.index({ sort: 1 });
productSchema.index({ createTime: -1 });

// 虚拟字段
productSchema.virtual('isAvailable').get(function() {
  if (this.status !== 'active') return false;
  if (this.settings.isLimited && this.settings.soldCount >= this.settings.limitCount) {
    return false;
  }
  return true;
});

productSchema.virtual('remainingCount').get(function() {
  if (!this.settings.isLimited) return -1; // 无限制
  return Math.max(0, this.settings.limitCount - this.settings.soldCount);
});

// 中间件
productSchema.pre('save', function(next) {
  this.updateTime = new Date();
  next();
});

// 方法
productSchema.methods.sell = function(quantity = 1) {
  if (!this.isAvailable) {
    throw new Error('商品不可购买');
  }
  
  if (this.settings.isLimited) {
    if (this.settings.soldCount + quantity > this.settings.limitCount) {
      throw new Error('库存不足');
    }
    this.settings.soldCount += quantity;
  }
  
  return this.save();
};

productSchema.methods.restock = function(quantity) {
  if (this.settings.isLimited) {
    this.settings.limitCount += quantity;
  }
  return this.save();
};

// 静态方法
productSchema.statics.getActiveProducts = function(categoryId = null) {
  const query = { status: 'active' };
  if (categoryId) {
    query.categoryId = categoryId;
  }
  return this.find(query).sort({ sort: 1, createTime: -1 });
};

productSchema.statics.getHotProducts = function() {
  return this.find({
    status: 'active',
    'settings.isHot': true
  }).sort({ sort: 1, createTime: -1 });
};

module.exports = mongoose.model('Product', productSchema);
