// utils/gameUtils.js - 游戏工具类
class GameUtils {
  /**
   * 生成随机数
   */
  static random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * 生成随机颜色
   */
  static randomColor() {
    const colors = [
      '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
      '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'
    ];
    return colors[this.random(0, colors.length - 1)];
  }

  /**
   * 格式化时间
   */
  static formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  /**
   * 计算距离
   */
  static calculateDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }

  /**
   * 检查点是否在矩形内
   */
  static isPointInRect(x, y, rect) {
    return x >= rect.x && x <= rect.x + rect.width && 
           y >= rect.y && y <= rect.y + rect.height;
  }

  /**
   * 检查点是否在圆形内
   */
  static isPointInCircle(x, y, circle) {
    const distance = this.calculateDistance(x, y, circle.x, circle.y);
    return distance <= circle.radius;
  }

  /**
   * 数组洗牌
   */
  static shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

  /**
   * 生成唯一ID
   */
  static generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  /**
   * 深拷贝对象
   */
  static deepClone(obj) {
    if (obj === null || typeof obj !== 'object') return obj;
    if (obj instanceof Date) return new Date(obj.getTime());
    if (obj instanceof Array) return obj.map(item => this.deepClone(item));
    if (typeof obj === 'object') {
      const clonedObj = {};
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          clonedObj[key] = this.deepClone(obj[key]);
        }
      }
      return clonedObj;
    }
  }

  /**
   * 防抖函数
   */
  static debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  /**
   * 节流函数
   */
  static throttle(func, limit) {
    let inThrottle;
    return function executedFunction(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  /**
   * 动画缓动函数
   */
  static easeInOut(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }

  /**
   * 线性插值
   */
  static lerp(start, end, factor) {
    return start + (end - start) * factor;
  }

  /**
   * 角度转弧度
   */
  static degToRad(degrees) {
    return degrees * (Math.PI / 180);
  }

  /**
   * 弧度转角度
   */
  static radToDeg(radians) {
    return radians * (180 / Math.PI);
  }

  /**
   * 检查两个矩形是否相交
   */
  static rectsIntersect(rect1, rect2) {
    return !(rect1.x + rect1.width < rect2.x || 
             rect2.x + rect2.width < rect1.x || 
             rect1.y + rect1.height < rect2.y || 
             rect2.y + rect2.height < rect1.y);
  }

  /**
   * 检查点是否在多边形内
   */
  static isPointInPolygon(x, y, polygon) {
    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      if (((polygon[i].y > y) !== (polygon[j].y > y)) &&
          (x < (polygon[j].x - polygon[i].x) * (y - polygon[i].y) / (polygon[j].y - polygon[i].y) + polygon[i].x)) {
        inside = !inside;
      }
    }
    return inside;
  }

  /**
   * 生成随机字符串
   */
  static randomString(length = 8) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  /**
   * 格式化数字
   */
  static formatNumber(num, decimals = 0) {
    return num.toFixed(decimals);
  }

  /**
   * 格式化文件大小
   */
  static formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  /**
   * 验证邮箱
   */
  static validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  /**
   * 验证手机号
   */
  static validatePhone(phone) {
    const re = /^1[3-9]\d{9}$/;
    return re.test(phone);
  }

  /**
   * 获取设备信息
   */
  static getDeviceInfo() {
    const systemInfo = wx.getSystemInfoSync();
    return {
      platform: systemInfo.platform,
      version: systemInfo.version,
      model: systemInfo.model,
      pixelRatio: systemInfo.pixelRatio,
      screenWidth: systemInfo.screenWidth,
      screenHeight: systemInfo.screenHeight,
      windowWidth: systemInfo.windowWidth,
      windowHeight: systemInfo.windowHeight
    };
  }

  /**
   * 获取网络状态
   */
  static getNetworkType() {
    return new Promise((resolve, reject) => {
      wx.getNetworkType({
        success: (res) => resolve(res.networkType),
        fail: (err) => reject(err)
      });
    });
  }

  /**
   * 显示加载提示
   */
  static showLoading(title = '加载中...') {
    wx.showLoading({
      title,
      mask: true
    });
  }

  /**
   * 隐藏加载提示
   */
  static hideLoading() {
    wx.hideLoading();
  }

  /**
   * 显示成功提示
   */
  static showSuccess(title, duration = 2000) {
    wx.showToast({
      title,
      icon: 'success',
      duration
    });
  }

  /**
   * 显示错误提示
   */
  static showError(title, duration = 2000) {
    wx.showToast({
      title,
      icon: 'none',
      duration
    });
  }

  /**
   * 显示确认对话框
   */
  static showConfirm(title, content) {
    return new Promise((resolve) => {
      wx.showModal({
        title,
        content,
        success: (res) => resolve(res.confirm),
        fail: () => resolve(false)
      });
    });
  }

  /**
   * 振动反馈
   */
  static vibrate(type = 'short') {
    if (type === 'short') {
      wx.vibrateShort();
    } else if (type === 'long') {
      wx.vibrateLong();
    }
  }

  /**
   * 播放音效
   */
  static playSound(soundPath) {
    const audioContext = wx.createInnerAudioContext();
    audioContext.src = soundPath;
    audioContext.play();
    audioContext.onEnded(() => {
      audioContext.destroy();
    });
  }

  /**
   * 保存到本地存储
   */
  static setStorage(key, data) {
    try {
      wx.setStorageSync(key, data);
      return true;
    } catch (error) {
      console.error('保存数据失败:', error);
      return false;
    }
  }

  /**
   * 从本地存储读取
   */
  static getStorage(key, defaultValue = null) {
    try {
      return wx.getStorageSync(key) || defaultValue;
    } catch (error) {
      console.error('读取数据失败:', error);
      return defaultValue;
    }
  }

  /**
   * 删除本地存储
   */
  static removeStorage(key) {
    try {
      wx.removeStorageSync(key);
      return true;
    } catch (error) {
      console.error('删除数据失败:', error);
      return false;
    }
  }
}

module.exports = GameUtils;
