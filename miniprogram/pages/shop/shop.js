// pages/shop/shop.js
const app = getApp();
const payment = require('../../utils/payment');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    products: [],
    userAssets: null,
    loading: false,
    refreshing: false,
    selectedCategory: 'all',
    categories: [
      { id: 'all', name: '全部', icon: '🎮' },
      { id: 'currency', name: '货币', icon: '💰' },
      { id: 'items', name: '道具', icon: '🎁' },
      { id: 'special', name: '特惠', icon: '🔥' }
    ],
    currentCategory: { id: 'all', name: '全部' },
    filteredProducts: [],
    showProductDetail: false,
    selectedProduct: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log('商城页面加载');
    this.initPage();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.refreshUserAssets();
  },

  /**
   * 初始化页面
   */
  async initPage() {
    this.setData({ loading: true });
    
    try {
      await Promise.all([
        this.loadProducts(),
        this.loadUserAssets()
      ]);
    } catch (error) {
      console.error('页面初始化失败:', error);
    } finally {
      this.setData({ loading: false });
    }
  },

  /**
   * 加载商品列表
   */
  async loadProducts() {
    try {
      const products = await payment.getProducts();
      this.setData({ products });
    } catch (error) {
      console.error('加载商品列表失败:', error);
      wx.showToast({
        title: '加载失败',
        icon: 'none'
      });
    }
  },

  /**
   * 加载用户资产
   */
  loadUserAssets() {
    const userAssets = app.globalData.userAssets;
    this.setData({ userAssets });
  },

  /**
   * 刷新用户资产
   */
  refreshUserAssets() {
    const userAssets = app.globalData.userAssets;
    this.setData({ userAssets });
  },

  /**
   * 选择商品分类
   */
  onCategorySelect(e) {
    const category = e.currentTarget.dataset.category;
    this.setData({ selectedCategory: category });
    this.filterProducts();
  },

  /**
   * 筛选商品
   */
  filterProducts() {
    const { products, selectedCategory } = this.data;
    
    if (selectedCategory === 'all') {
      this.setData({ filteredProducts: products });
    } else {
      const filteredProducts = products.filter(product => 
        product.category === selectedCategory
      );
      this.setData({ filteredProducts });
    }
  },

  /**
   * 显示商品详情
   */
  showProductDetail(e) {
    const productId = e.currentTarget.dataset.productId;
    const product = this.data.products.find(p => p.id === productId);
    if (product) {
      this.setData({
        showProductDetail: true,
        selectedProduct: product
      });
    }
  },

  /**
   * 隐藏商品详情
   */
  hideProductDetail() {
    this.setData({
      showProductDetail: false,
      selectedProduct: null
    });
  },

  /**
   * 购买商品
   */
  async onProductBuy(e) {
    const productId = e.currentTarget.dataset.productId;
    const product = this.data.products.find(p => p.id === productId);
    
    if (!product) {
      wx.showToast({
        title: '商品不存在',
        icon: 'none'
      });
      return;
    }

    // 确认购买
    wx.showModal({
      title: '确认购买',
      content: `确定要购买 ${product.name} 吗？`,
      success: async (res) => {
        if (res.confirm) {
          await this.buyProduct(productId);
        }
      }
    });
  },

  /**
   * 购买商品
   */
  async buyProduct(productId) {
    try {
      wx.showLoading({ title: '处理中...' });
      
      const success = await payment.buyProduct(productId);
      
      wx.hideLoading();
      
      if (success) {
        wx.showToast({
          title: '购买成功',
          icon: 'success'
        });
        
        // 刷新用户资产
        this.refreshUserAssets();
      }
    } catch (error) {
      wx.hideLoading();
      console.error('购买失败:', error);
      wx.showToast({
        title: '购买失败，请重试',
        icon: 'none'
      });
    }
  },

  /**
   * 查看商品详情
   */
  onProductDetail(e) {
    const productId = e.currentTarget.dataset.productId;
    const product = this.data.products.find(p => p.id === productId);
    
    if (product) {
      wx.showModal({
        title: product.name,
        content: product.description,
        showCancel: false,
        confirmText: '知道了'
      });
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  async onPullDownRefresh() {
    this.setData({ refreshing: true });
    
    try {
      await Promise.all([
        this.loadProducts(),
        this.loadUserAssets()
      ]);
    } catch (error) {
      console.error('刷新失败:', error);
    } finally {
      this.setData({ refreshing: false });
      wx.stopPullDownRefresh();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    return {
      title: '游戏商城，超值商品等你来！',
      path: '/pages/shop/shop',
      imageUrl: '/assets/images/share.jpg'
    };
  }
})