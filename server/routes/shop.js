/**
 * 商城相关路由
 */

const express = require('express');
const router = express.Router();

// 商品数据存储
const products = new Map();

// 商品分类
const categories = [
  { id: 1, name: '金币', icon: '/images/shop/coin.png' },
  { id: 2, name: '宝石', icon: '/images/shop/gem.png' },
  { id: 3, name: '道具', icon: '/images/shop/prop.png' },
  { id: 4, name: '皮肤', icon: '/images/shop/skin.png' }
];

// 模拟商品数据
const mockProducts = [
  // 金币类
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
    id: 'coin_1000',
    name: '1000金币',
    description: '购买1000金币',
    price: 10,
    currency: 'CNY',
    type: 'coin',
    categoryId: 1,
    amount: 1000,
    icon: '/images/shop/coin_1000.png',
    status: 'active',
    sort: 3
  },
  // 宝石类
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
  },
  {
    id: 'gem_50',
    name: '50宝石',
    description: '购买50宝石',
    price: 30,
    currency: 'CNY',
    type: 'gem',
    categoryId: 2,
    amount: 50,
    icon: '/images/shop/gem_50.png',
    status: 'active',
    sort: 2
  },
  // 道具类
  {
    id: 'prop_double',
    name: '双倍经验卡',
    description: '使用后获得双倍经验',
    price: 20,
    currency: 'gem',
    type: 'prop',
    categoryId: 3,
    amount: 1,
    icon: '/images/shop/prop_double.png',
    status: 'active',
    sort: 1
  },
  {
    id: 'prop_lucky',
    name: '幸运符',
    description: '增加游戏幸运值',
    price: 15,
    currency: 'gem',
    type: 'prop',
    categoryId: 3,
    amount: 1,
    icon: '/images/shop/prop_lucky.png',
    status: 'active',
    sort: 2
  }
];

// 初始化商品数据
mockProducts.forEach(product => {
  products.set(product.id, product);
});

/**
 * 获取商品分类
 */
router.get('/categories', async (req, res) => {
  try {
    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

/**
 * 获取商品列表
 */
router.get('/products', async (req, res) => {
  try {
    const { categoryId, type, status } = req.query;
    
    let filteredProducts = Array.from(products.values());
    
    if (categoryId) {
      filteredProducts = filteredProducts.filter(p => p.categoryId === parseInt(categoryId));
    }
    
    if (type) {
      filteredProducts = filteredProducts.filter(p => p.type === type);
    }
    
    if (status) {
      filteredProducts = filteredProducts.filter(p => p.status === status);
    }
    
    // 按排序字段排序
    filteredProducts.sort((a, b) => a.sort - b.sort);
    
    res.json({
      success: true,
      data: filteredProducts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

/**
 * 获取商品详情
 */
router.get('/products/:productId', async (req, res) => {
  try {
    const { productId } = req.params;
    const product = products.get(productId);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: '商品不存在'
      });
    }
    
    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

/**
 * 购买商品
 */
router.post('/buy/:productId', async (req, res) => {
  try {
    const { productId } = req.params;
    const token = req.headers.authorization?.replace('Bearer ', '');
    const userId = Buffer.from(token, 'base64').toString().split(':')[0];
    
    const product = products.get(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: '商品不存在'
      });
    }
    
    // 检查商品状态
    if (product.status !== 'active') {
      return res.status(400).json({
        success: false,
        message: '商品已下架'
      });
    }
    
    // 这里应该检查用户余额和扣除费用
    // 简化处理，直接返回成功
    
    res.json({
      success: true,
      message: '购买成功',
      data: {
        productId,
        amount: product.amount,
        type: product.type
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
 * 获取用户购买记录
 */
router.get('/orders', async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    const userId = Buffer.from(token, 'base64').toString().split(':')[0];
    
    // 模拟购买记录
    const orders = [
      {
        id: 'order_1',
        productId: 'coin_100',
        productName: '100金币',
        amount: 1,
        currency: 'CNY',
        status: 'completed',
        createTime: Date.now() - 86400000
      },
      {
        id: 'order_2',
        productId: 'gem_10',
        productName: '10宝石',
        amount: 6,
        currency: 'CNY',
        status: 'completed',
        createTime: Date.now() - 3600000
      }
    ];
    
    res.json({
      success: true,
      data: orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
