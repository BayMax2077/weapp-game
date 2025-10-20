/**
 * 统一错误处理机制
 * 处理网络错误、业务错误、用户提示
 */

class ErrorHandler {
  constructor() {
    this.errorTypes = {
      NETWORK_ERROR: 'NETWORK_ERROR',
      API_ERROR: 'API_ERROR',
      BUSINESS_ERROR: 'BUSINESS_ERROR',
      VALIDATION_ERROR: 'VALIDATION_ERROR',
      UNKNOWN_ERROR: 'UNKNOWN_ERROR'
    };
  }

  /**
   * 处理错误
   * @param {Error} error 错误对象
   * @param {Object} options 处理选项
   */
  handleError(error, options = {}) {
    const {
      showToast = true,
      showModal = false,
      logError = true,
      customMessage = null
    } = options;

    // 记录错误日志
    if (logError) {
      console.error('错误处理:', error);
    }

    // 确定错误类型和消息
    const errorInfo = this.analyzeError(error);
    
    // 显示用户提示
    if (showToast) {
      this.showErrorToast(errorInfo.message, customMessage);
    }
    
    if (showModal) {
      this.showErrorModal(errorInfo.message, customMessage);
    }

    return errorInfo;
  }

  /**
   * 分析错误类型
   * @param {Error} error 错误对象
   */
  analyzeError(error) {
    if (!error) {
      return {
        type: this.errorTypes.UNKNOWN_ERROR,
        message: '未知错误'
      };
    }

    // 网络错误
    if (error.message && error.message.includes('网络')) {
      return {
        type: this.errorTypes.NETWORK_ERROR,
        message: '网络连接失败，请检查网络设置'
      };
    }

    // API错误
    if (error.message && error.message.includes('请求失败')) {
      return {
        type: this.errorTypes.API_ERROR,
        message: '服务器连接失败，请稍后重试'
      };
    }

    // 业务错误
    if (error.message && error.message.includes('业务')) {
      return {
        type: this.errorTypes.BUSINESS_ERROR,
        message: error.message
      };
    }

    // 验证错误
    if (error.message && error.message.includes('验证')) {
      return {
        type: this.errorTypes.VALIDATION_ERROR,
        message: error.message
      };
    }

    // 默认错误
    return {
      type: this.errorTypes.UNKNOWN_ERROR,
      message: error.message || '操作失败，请重试'
    };
  }

  /**
   * 显示错误提示
   * @param {string} message 错误消息
   * @param {string} customMessage 自定义消息
   */
  showErrorToast(message, customMessage) {
    const displayMessage = customMessage || message;
    
    wx.showToast({
      title: displayMessage,
      icon: 'none',
      duration: 2000
    });
  }

  /**
   * 显示错误对话框
   * @param {string} message 错误消息
   * @param {string} customMessage 自定义消息
   */
  showErrorModal(message, customMessage) {
    const displayMessage = customMessage || message;
    
    wx.showModal({
      title: '错误提示',
      content: displayMessage,
      showCancel: false,
      confirmText: '知道了'
    });
  }

  /**
   * 处理网络错误
   * @param {Error} error 网络错误
   */
  handleNetworkError(error) {
    return this.handleError(error, {
      showToast: true,
      logError: true
    });
  }

  /**
   * 处理API错误
   * @param {Error} error API错误
   */
  handleApiError(error) {
    return this.handleError(error, {
      showToast: true,
      logError: true
    });
  }

  /**
   * 处理业务错误
   * @param {Error} error 业务错误
   */
  handleBusinessError(error) {
    return this.handleError(error, {
      showToast: true,
      logError: true
    });
  }

  /**
   * 处理验证错误
   * @param {Error} error 验证错误
   */
  handleValidationError(error) {
    return this.handleError(error, {
      showToast: true,
      logError: false
    });
  }

  /**
   * 创建错误对象
   * @param {string} message 错误消息
   * @param {string} type 错误类型
   */
  createError(message, type = this.errorTypes.UNKNOWN_ERROR) {
    const error = new Error(message);
    error.type = type;
    return error;
  }

  /**
   * 验证数据
   * @param {any} data 要验证的数据
   * @param {Object} rules 验证规则
   */
  validateData(data, rules) {
    for (const [field, rule] of Object.entries(rules)) {
      const value = data[field];
      
      // 必填验证
      if (rule.required && (!value || value === '')) {
        throw this.createError(`${rule.message || field}不能为空`, this.errorTypes.VALIDATION_ERROR);
      }
      
      // 类型验证
      if (value && rule.type) {
        if (rule.type === 'string' && typeof value !== 'string') {
          throw this.createError(`${rule.message || field}必须是字符串`, this.errorTypes.VALIDATION_ERROR);
        }
        if (rule.type === 'number' && typeof value !== 'number') {
          throw this.createError(`${rule.message || field}必须是数字`, this.errorTypes.VALIDATION_ERROR);
        }
        if (rule.type === 'array' && !Array.isArray(value)) {
          throw this.createError(`${rule.message || field}必须是数组`, this.errorTypes.VALIDATION_ERROR);
        }
      }
      
      // 长度验证
      if (value && rule.length) {
        if (typeof value === 'string' && value.length > rule.length) {
          throw this.createError(`${rule.message || field}长度不能超过${rule.length}`, this.errorTypes.VALIDATION_ERROR);
        }
      }
    }
    
    return true;
  }
}

// 创建单例
const errorHandler = new ErrorHandler();

module.exports = errorHandler;
