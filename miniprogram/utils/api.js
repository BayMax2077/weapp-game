/**
 * API接口封装
 * 统一处理微信小程序的网络请求
 */

class ApiManager {
  constructor() {
    // 开发环境使用本地地址，生产环境需要配置实际域名
    this.baseURL = 'http://localhost:3000/api';
    this.timeout = 10000;
    this.token = '';
  }
  
  /**
   * 设置Token
   */
  setToken(token) {
    this.token = token;
    wx.setStorageSync('token', token);
  }
  
  /**
   * 获取Token
   */
  getToken() {
    if (!this.token) {
      this.token = wx.getStorageSync('token') || '';
    }
    return this.token;
  }
  
  /**
   * 通用请求方法
   */
  request(options) {
    const { url, method = 'GET', data = {}, header = {} } = options;
    
    return new Promise((resolve, reject) => {
      wx.request({
        url: this.baseURL + url,
        method,
        data,
        header: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getToken()}`,
          ...header
        },
        timeout: this.timeout,
        success: (res) => {
          if (res.statusCode === 200) {
            if (res.data && res.data.success) {
              resolve(res.data.data);
            } else {
              reject(new Error(res.data?.message || '请求失败'));
            }
          } else {
            reject(new Error(`请求失败: ${res.statusCode}`));
          }
        },
        fail: (error) => {
          reject(new Error(error.errMsg || '网络错误'));
        }
      });
    });
  }
  
  /**
   * GET请求
   */
  get(url, data = {}) {
    return this.request({ url, method: 'GET', data });
  }
  
  /**
   * POST请求
   */
  post(url, data = {}) {
    return this.request({ url, method: 'POST', data });
  }
  
  /**
   * PUT请求
   */
  put(url, data = {}) {
    return this.request({ url, method: 'PUT', data });
  }
  
  /**
   * DELETE请求
   */
  delete(url, data = {}) {
    return this.request({ url, method: 'DELETE', data });
  }
  
  // ========== 用户相关API ==========
  
  /**
   * 用户登录
   */
  async login(phone, password) {
    const data = await this.post('/user/login', { phone, password });
    if (data.token) {
      this.setToken(data.token);
    }
    return data;
  }
  
  /**
   * 用户注册
   */
  async register(phone, password, verifyCode) {
    return this.post('/user/register', { phone, password, verifyCode });
  }
  
  /**
   * 微信登录
   */
  async wxLogin(code, userInfo) {
    const data = await this.post(`/user/wx/${code}`, { userInfo });
    if (data.token) {
      this.setToken(data.token);
    }
    return data;
  }
  
  /**
   * 获取用户资产
   */
  async getUserAssets() {
    return this.get('/user/assets');
  }
  
  // ========== 游戏相关API ==========
  
  /**
   * 获取游戏列表
   */
  async getGameList() {
    return this.get('/game/list');
  }
  
  /**
   * 获取游戏详情
   */
  async getGameDetail(gameId) {
    return this.get(`/game/${gameId}`);
  }
  
  /**
   * 获取游戏战绩
   */
  async getGameRecord(gameId) {
    return this.get(`/game/record/${gameId}`);
  }
  
  // ========== 房间相关API ==========
  
  /**
   * 创建房间
   */
  async createRoom(gameId, maxPlayers, roomName) {
    return this.post('/room/create', { gameId, maxPlayers, roomName });
  }
  
  /**
   * 加入房间
   */
  async joinRoom(roomCode) {
    return this.post('/room/join', { roomCode });
  }
  
  /**
   * 退出房间
   */
  async exitRoom(roomCode) {
    return this.post('/room/exit', { roomCode });
  }
  
  /**
   * 获取房间信息
   */
  async getRoomInfo(roomCode) {
    return this.get('/room/info', { roomCode });
  }
  
  /**
   * 随机加入房间
   */
  async randomJoinRoom(gameId) {
    return this.get('/room/random', { gameId });
  }
  
  // ========== 支付相关API ==========
  
  /**
   * 创建订单
   */
  async createOrder(productId) {
    return this.post('/payment/create', { productId });
  }
  
  /**
   * 获取订单状态
   */
  async getOrderStatus(orderId) {
    return this.get(`/payment/status/${orderId}`);
  }
  
  /**
   * 获取商品列表
   */
  async getProducts() {
    return this.get('/payment/products');
  }
}

// 创建单例
const api = new ApiManager();

module.exports = api;

