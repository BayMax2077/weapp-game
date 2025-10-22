/**
 * 数据分析工具
 * 用户行为追踪、游戏数据统计、错误监控
 */

class AnalyticsManager {
  constructor() {
    this.events = [];
    this.sessionId = this.generateSessionId();
    this.userId = null;
    this.startTime = Date.now();
  }

  /**
   * 生成会话ID
   */
  generateSessionId() {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  /**
   * 设置用户ID
   * @param {string} userId 用户ID
   */
  setUserId(userId) {
    this.userId = userId;
  }

  /**
   * 追踪事件
   * @param {string} eventName 事件名称
   * @param {Object} properties 事件属性
   */
  track(eventName, properties = {}) {
    const event = {
      eventName,
      properties: {
        ...properties,
        userId: this.userId,
        sessionId: this.sessionId,
        timestamp: Date.now(),
        platform: 'miniprogram'
      }
    };

    this.events.push(event);
    console.log('Analytics Event:', event);

    // 发送到服务器（实际项目中需要实现）
    this.sendEvent(event);
  }

  /**
   * 页面访问追踪
   * @param {string} pageName 页面名称
   * @param {Object} properties 页面属性
   */
  trackPageView(pageName, properties = {}) {
    this.track('page_view', {
      pageName,
      ...properties
    });
  }

  /**
   * 用户行为追踪
   * @param {string} action 行为动作
   * @param {Object} properties 行为属性
   */
  trackUserAction(action, properties = {}) {
    this.track('user_action', {
      action,
      ...properties
    });
  }

  /**
   * 游戏数据统计
   * @param {string} gameId 游戏ID
   * @param {Object} gameData 游戏数据
   */
  trackGameData(gameId, gameData = {}) {
    this.track('game_data', {
      gameId,
      ...gameData
    });
  }

  /**
   * 错误监控
   * @param {Error} error 错误对象
   * @param {Object} context 错误上下文
   */
  trackError(error, context = {}) {
    this.track('error', {
      errorMessage: error.message,
      errorStack: error.stack,
      ...context
    });
  }

  /**
   * 性能监控
   * @param {string} metric 性能指标
   * @param {number} value 指标值
   * @param {Object} properties 属性
   */
  trackPerformance(metric, value, properties = {}) {
    this.track('performance', {
      metric,
      value,
      ...properties
    });
  }

  /**
   * 发送事件到服务器
   * @param {Object} event 事件对象
   */
  sendEvent(event) {
    // 实际项目中需要发送到分析服务器
    // 这里只是模拟发送
    try {
      // 可以发送到后端API
      // wx.request({
      //   url: 'https://analytics-api.com/events',
      //   method: 'POST',
      //   data: event
      // });
    } catch (error) {
      console.error('发送分析事件失败:', error);
    }
  }

  /**
   * 批量发送事件
   */
  flushEvents() {
    if (this.events.length === 0) return;

    try {
      // 批量发送事件
      // wx.request({
      //   url: 'https://analytics-api.com/events/batch',
      //   method: 'POST',
      //   data: { events: this.events }
      // });
      
      // 清空事件队列
      this.events = [];
    } catch (error) {
      console.error('批量发送分析事件失败:', error);
    }
  }

  /**
   * 获取会话统计
   */
  getSessionStats() {
    const duration = Date.now() - this.startTime;
    const eventCount = this.events.length;
    
    return {
      sessionId: this.sessionId,
      userId: this.userId,
      duration,
      eventCount,
      startTime: this.startTime
    };
  }

  /**
   * 重置分析器
   */
  reset() {
    this.events = [];
    this.sessionId = this.generateSessionId();
    this.startTime = Date.now();
  }
}

// 创建单例
const analytics = new AnalyticsManager();

module.exports = analytics;
