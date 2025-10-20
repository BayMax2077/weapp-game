/**
 * Socket通信封装
 * 处理实时通信功能
 */

class SocketManager {
  constructor() {
    this.socket = null;
    this.isConnected = false;
    this.listeners = new Map();
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.reconnectInterval = 3000;
    // 开发环境使用本地地址，生产环境需要配置实际域名
    this.url = 'ws://localhost:3000';
  }
  
  /**
   * 连接Socket
   */
  connect(userId) {
    return new Promise((resolve, reject) => {
      if (this.isConnected) {
        resolve();
        return;
      }
      
      this.socket = wx.connectSocket({
        url: this.url,
        success: () => {
          console.log('Socket连接中...');
        },
        fail: (error) => {
          console.error('Socket连接失败:', error);
          reject(error);
        }
      });
      
      // 连接打开
      this.socket.onOpen(() => {
        console.log('Socket连接成功');
        this.isConnected = true;
        this.reconnectAttempts = 0;
        
        // 发送用户ID
        this.send('auth', { userId });
        
        resolve();
      });
      
      // 接收消息
      this.socket.onMessage((res) => {
        try {
          const data = JSON.parse(res.data);
          this.handleMessage(data);
        } catch (error) {
          console.error('解析消息失败:', error);
        }
      });
      
      // 连接关闭
      this.socket.onClose(() => {
        console.log('Socket连接关闭');
        this.isConnected = false;
        this.attemptReconnect();
      });
      
      // 连接错误
      this.socket.onError((error) => {
        console.error('Socket连接错误:', error);
        this.isConnected = false;
      });
    });
  }
  
  /**
   * 断开连接
   */
  disconnect() {
    if (this.socket && this.isConnected) {
      this.socket.close();
      this.isConnected = false;
      this.socket = null;
    }
  }
  
  /**
   * 尝试重连
   */
  attemptReconnect() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.log('达到最大重连次数，停止重连');
      wx.showToast({
        title: '网络连接失败',
        icon: 'none'
      });
      return;
    }
    
    this.reconnectAttempts++;
    console.log(`尝试重连 (${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
    
    // 显示重连提示
    if (this.reconnectAttempts === 1) {
      wx.showToast({
        title: '网络连接中断，正在重连...',
        icon: 'loading',
        duration: 2000
      });
    }
    
    setTimeout(() => {
      const userId = wx.getStorageSync('userId');
      if (userId) {
        this.connect(userId).then(() => {
          console.log('重连成功');
          wx.showToast({
            title: '重连成功',
            icon: 'success'
          });
        }).catch((error) => {
          console.log('重连失败:', error);
          // 继续尝试重连
          this.attemptReconnect();
        });
      }
    }, this.reconnectInterval);
  }
  
  /**
   * 发送消息
   */
  send(event, data) {
    if (!this.isConnected) {
      console.error('Socket未连接');
      return false;
    }
    
    const message = {
      event,
      data,
      timestamp: Date.now()
    };
    
    this.socket.send({
      data: JSON.stringify(message),
      success: () => {
        console.log('消息发送成功:', event);
      },
      fail: (error) => {
        console.error('消息发送失败:', error);
      }
    });
    
    return true;
  }
  
  /**
   * 监听事件
   */
  on(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event).push(callback);
  }
  
  /**
   * 取消监听
   */
  off(event, callback) {
    if (!this.listeners.has(event)) {
      return;
    }
    
    const callbacks = this.listeners.get(event);
    const index = callbacks.indexOf(callback);
    if (index !== -1) {
      callbacks.splice(index, 1);
    }
  }
  
  /**
   * 处理消息
   */
  handleMessage(message) {
    const { event, data } = message;
    const callbacks = this.listeners.get(event) || [];
    
    callbacks.forEach(callback => {
      try {
        callback(data);
      } catch (error) {
        console.error('回调执行失败:', error);
      }
    });
  }
  
  // ========== 游戏相关方法 ==========
  
  /**
   * 加入房间
   */
  joinRoom(roomId, userId) {
    return this.send('joinRoom', { roomId, userId });
  }
  
  /**
   * 离开房间
   */
  leaveRoom(roomId, userId) {
    return this.send('leaveRoom', { roomId, userId });
  }
  
  /**
   * 发送游戏数据
   */
  sendGameData(roomId, gameData) {
    return this.send('gameData', { roomId, gameData });
  }
  
  /**
   * 更新游戏状态
   */
  updateGameStatus(roomId, status) {
    return this.send('gameStatus', { roomId, status });
  }
  
  /**
   * 监听玩家加入
   */
  onPlayerJoined(callback) {
    this.on('playerJoined', callback);
  }
  
  /**
   * 监听玩家离开
   */
  onPlayerLeft(callback) {
    this.on('playerLeft', callback);
  }
  
  /**
   * 监听游戏数据
   */
  onGameData(callback) {
    this.on('gameData', callback);
  }
  
  /**
   * 监听游戏状态
   */
  onGameStatus(callback) {
    this.on('gameStatus', callback);
  }
}

// 创建单例
const socket = new SocketManager();

module.exports = socket;

