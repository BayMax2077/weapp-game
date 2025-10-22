/**
 * 性能优化工具
 * 图片懒加载、数据分页、内存管理
 */

class PerformanceManager {
  constructor() {
    this.imageCache = new Map();
    this.dataCache = new Map();
    this.observer = null;
    this.pageSize = 20; // 默认分页大小
  }

  /**
   * 图片懒加载
   * @param {string} selector 选择器
   * @param {Object} options 配置选项
   */
  initLazyLoad(selector = '.lazy-image', options = {}) {
    const {
      rootMargin = '50px',
      threshold = 0.1,
      placeholder = '/assets/images/placeholder.png'
    } = options;

    // 创建交叉观察器
    this.observer = wx.createIntersectionObserver(this, {
      rootMargin,
      threshold
    });

    // 观察所有懒加载图片
    this.observer.relativeToViewport().observe(selector, (res) => {
      if (res.intersectionRatio > 0) {
        this.loadImage(res.target);
      }
    });
  }

  /**
   * 加载图片
   * @param {Element} element 图片元素
   */
  loadImage(element) {
    const src = element.dataset.src;
    if (!src) return;

    // 检查缓存
    if (this.imageCache.has(src)) {
      element.src = this.imageCache.get(src);
      return;
    }

    // 预加载图片
    wx.getImageInfo({
      src,
      success: (res) => {
        element.src = res.path;
        this.imageCache.set(src, res.path);
      },
      fail: () => {
        element.src = element.dataset.placeholder || '/assets/images/placeholder.png';
      }
    });
  }

  /**
   * 数据分页
   * @param {Array} data 原始数据
   * @param {number} page 页码
   * @param {number} pageSize 每页大小
   */
  paginateData(data, page = 1, pageSize = this.pageSize) {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    return {
      data: data.slice(start, end),
      total: data.length,
      page,
      pageSize,
      hasMore: end < data.length
    };
  }

  /**
   * 缓存数据
   * @param {string} key 缓存键
   * @param {any} data 数据
   * @param {number} ttl 过期时间（毫秒）
   */
  cacheData(key, data, ttl = 300000) { // 默认5分钟过期
    const cacheItem = {
      data,
      timestamp: Date.now(),
      ttl
    };
    this.dataCache.set(key, cacheItem);
  }

  /**
   * 获取缓存数据
   * @param {string} key 缓存键
   */
  getCachedData(key) {
    const cacheItem = this.dataCache.get(key);
    if (!cacheItem) return null;

    // 检查是否过期
    if (Date.now() - cacheItem.timestamp > cacheItem.ttl) {
      this.dataCache.delete(key);
      return null;
    }

    return cacheItem.data;
  }

  /**
   * 清理过期缓存
   */
  clearExpiredCache() {
    const now = Date.now();
    for (const [key, cacheItem] of this.dataCache.entries()) {
      if (now - cacheItem.timestamp > cacheItem.ttl) {
        this.dataCache.delete(key);
      }
    }
  }

  /**
   * 内存管理
   */
  manageMemory() {
    // 清理过期缓存
    this.clearExpiredCache();

    // 限制缓存大小
    if (this.dataCache.size > 100) {
      const entries = Array.from(this.dataCache.entries());
      entries.sort((a, b) => a[1].timestamp - b[1].timestamp);
      
      // 删除最旧的50%缓存
      const toDelete = entries.slice(0, Math.floor(entries.length / 2));
      toDelete.forEach(([key]) => this.dataCache.delete(key));
    }

    // 限制图片缓存大小
    if (this.imageCache.size > 50) {
      const entries = Array.from(this.imageCache.entries());
      const toDelete = entries.slice(0, Math.floor(entries.length / 2));
      toDelete.forEach(([key]) => this.imageCache.delete(key));
    }
  }

  /**
   * 获取内存使用情况
   */
  getMemoryInfo() {
    const systemInfo = wx.getSystemInfoSync();
    return {
      totalMemory: systemInfo.memory,
      dataCacheSize: this.dataCache.size,
      imageCacheSize: this.imageCache.size,
      timestamp: Date.now()
    };
  }

  /**
   * 销毁性能管理器
   */
  destroy() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
    
    this.imageCache.clear();
    this.dataCache.clear();
  }
}

// 创建单例
const performanceManager = new PerformanceManager();

module.exports = performanceManager;
