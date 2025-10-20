/**
 * 支付相关路由
 */

const express = require('express');
const router = express.Router();

// 订单数据存储
const orders = new Map();

// 商品列表
const products = [
  {
    id: 'coins_100',
    name: '100金币',
    price: 1,
    currency: 'CNY',
    type: 'consumable',
    coins: 100
  },
  {
    id: 'coins_500',
    name: '500金币',
    price: 5,
    currency: 'CNY',
    type: 'consumable',
    coins: 500
  },
  {
    id: 'coins_1000',
    name: '1000金币',
    price: 10,
    currency: 'CNY',
    type: 'consumable',
    coins: 1000
  },
  {
    id: 'gems_10',
    name: '10宝石',
    price: 6,
    currency: 'CNY',
    type: 'consumable',
    gems: 10
  },
  {
    id: 'gems_50',
    name: '50宝石',
    price: 30,
    currency: 'CNY',
    type: 'consumable',
    gems: 50
  }
];

/**
 * 创建订单
 */
router.post('/create', async (req, res) => {
  try {
    const { productId } = req.body;
    const token = req.headers.authorization?.replace('Bearer ', '');
    const userId = Buffer.from(token, 'base64').toString().split(':')[0];
    
    const product = products.find(p => p.id === productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: '商品不存在'
      });
    }
    
    const orderId = `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const order = {
      id: orderId,
      userId,
      productId,
      productName: product.name,
      amount: product.price,
      currency: product.currency,
      status: 'pending',
      createTime: Date.now()
    };
    
    orders.set(orderId, order);
    
    // 生成支付参数（这里简化处理）
    const paymentParams = {
      orderId,
      timeStamp: Date.now().toString(),
      nonceStr: Math.random().toString(36).substr(2, 9),
      package: `prepay_id=${orderId}`,
      signType: 'MD5',
      paySign: 'mock_sign'
    };
    
    res.json({
      success: true,
      data: {
        orderId,
        paymentParams
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
 * 支付回调
 */
router.post('/callback', async (req, res) => {
  try {
    const { orderId, status } = req.body;
    
    const order = orders.get(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: '订单不存在'
      });
    }
    
    order.status = status;
    order.payTime = Date.now();
    
    // 如果支付成功，发放商品
    if (status === 'paid') {
      const product = products.find(p => p.id === order.productId);
      if (product) {
        // 这里应该更新用户资产
        // 简化处理，只返回成功
      }
    }
    
    res.json({
      success: true,
      message: '支付成功'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

/**
 * 获取订单状态
 */
router.get('/status/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = orders.get(orderId);
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: '订单不存在'
      });
    }
    
    res.json({
      success: true,
      data: {
        orderId: order.id,
        status: order.status,
        amount: order.amount
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
 * 获取商品列表
 */
router.get('/products', async (req, res) => {
  try {
    res.json({
      success: true,
      data: products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;

