
/**
 * 支付管理器
 * 处理微信支付功能
 */

const api = require('./api');

class PaymentManager {
  constructor() {
    this.currentOrder = null;
  }
  
  /**
   * 创建支付订单
   */
  async createPayment(productId) {
    try {
      wx.showLoading({ title: '正在创建订单...' });
      
      // 创建订单
      const orderData = await api.createOrder(productId);
      this.currentOrder = orderData;
      
      wx.hideLoading();
      return orderData;
    } catch (error) {
      wx.hideLoading();
      wx.showToast({
        title: '创建订单失败',
        icon: 'none'
      });
      throw error;
    }
  }
  
  /**
   * 发起微信支付
   */
  async processPayment(orderData) {
    return new Promise((resolve, reject) => {
      wx.requestPayment({
        timeStamp: orderData.paymentParams.timeStamp,
        nonceStr: orderData.paymentParams.nonceStr,
        package: orderData.paymentParams.package,
        signType: orderData.paymentParams.signType,
        paySign: orderData.paymentParams.paySign,
        success: (res) => {
          console.log('支付成功:', res);
          this.handlePaymentSuccess(orderData.orderId);
          resolve(true);
        },
        fail: (error) => {
          console.error('支付失败:', error);
          if (error.errMsg === 'requestPayment:fail cancel') {
            wx.showToast({
              title: '支付已取消',
              icon: 'none'
            });
          } else {
            wx.showToast({
              title: '支付失败',
              icon: 'none'
            });
          }
          reject(error);
        }
      });
    });
  }
  
  /**
   * 处理支付成功
   */
  async handlePaymentSuccess(orderId) {
    try {
      // 查询订单状态
      const status = await api.getOrderStatus(orderId);
      
      if (status && status.status === 'paid') {
        wx.showToast({
          title: '支付成功',
          icon: 'success'
        });
        
        // 刷新用户资产
        const assets = await api.getUserAssets();
        wx.setStorageSync('userAssets', assets);
        
        // 更新全局用户资产
        const app = getApp();
        app.globalData.userAssets = assets;
        
        // 触发支付成功事件
        wx.eventChannel && wx.eventChannel.emit('paymentSuccess', { orderId });
        
        return true;
      } else {
        wx.showToast({
          title: '支付状态异常',
          icon: 'none'
        });
        return false;
      }
    } catch (error) {
      console.error('处理支付成功失败:', error);
      wx.showToast({
        title: '支付验证失败',
        icon: 'none'
      });
      return false;
    }
  }
  
  /**
   * 购买商品
   */
  async buyProduct(productId) {
    try {
      // 创建订单
      const orderData = await this.createPayment(productId);
      
      // 发起支付
      await this.processPayment(orderData);
      
      return true;
    } catch (error) {
      console.error('购买商品失败:', error);
      return false;
    }
  }
  
  /**
   * 获取商品列表
   */
  async getProducts() {
    try {
      return await api.getProducts();
    } catch (error) {
      console.error('获取商品列表失败:', error);
      return [];
    }
  }
  
  /**
   * 检查订单状态
   */
  async checkOrderStatus(orderId) {
    try {
      return await api.getOrderStatus(orderId);
    } catch (error) {
      console.error('检查订单状态失败:', error);
      return null;
    }
  }
}

// 创建单例
const payment = new PaymentManager();

module.exports = payment;

