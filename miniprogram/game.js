/**
 * 微信小游戏入口文件
 * 基于原有小程序逻辑改造的小游戏版本
 */

// 引入原有的工具模块
const api = require('./utils/api');
const socket = require('./utils/socket');
const ad = require('./utils/ad');

// 游戏全局状态
const gameState = {
  userInfo: null,
  userAssets: null,
  isLogin: false,
  currentRoom: null,
  gameCanvas: null,
  gameContext: null
};

// 游戏主循环
let gameLoop = null;
let lastTime = 0;

/**
 * 初始化游戏
 */
function initGame() {
  console.log('初始化小游戏');
  
  // 创建Canvas
  const canvas = wx.createCanvas();
  const context = canvas.getContext('2d');
  
  gameState.gameCanvas = canvas;
  gameState.gameContext = context;
  
  // 设置Canvas尺寸
  const systemInfo = wx.getSystemInfoSync();
  canvas.width = systemInfo.windowWidth;
  canvas.height = systemInfo.windowHeight;
  
  // 初始化用户信息
  initUserInfo();
  
  // 预加载广告
  ad.preloadRewardedVideoAd();
  
  // 开始游戏循环
  startGameLoop();
}

/**
 * 初始化用户信息
 */
function initUserInfo() {
  const userInfo = wx.getStorageSync('userInfo');
  const token = wx.getStorageSync('token');
  
  if (userInfo && token) {
    gameState.userInfo = userInfo;
    gameState.isLogin = true;
    api.setToken(token);
    
    // 获取用户资产
    getUserAssets();
    
    // 连接Socket
    connectSocket();
  }
}

/**
 * 获取用户资产
 */
async function getUserAssets() {
  try {
    const assets = await api.getUserAssets();
    gameState.userAssets = assets;
    wx.setStorageSync('userAssets', assets);
  } catch (error) {
    console.error('获取用户资产失败:', error);
  }
}

/**
 * 连接Socket
 */
async function connectSocket() {
  if (!gameState.userInfo) {
    return;
  }
  
  try {
    await socket.connect(gameState.userInfo.id);
    console.log('Socket连接成功');
  } catch (error) {
    console.error('Socket连接失败:', error);
  }
}

/**
 * 开始游戏循环
 */
function startGameLoop() {
  function loop(currentTime) {
    const deltaTime = currentTime - lastTime;
    lastTime = currentTime;
    
    // 更新游戏逻辑
    updateGame(deltaTime);
    
    // 渲染游戏画面
    renderGame();
    
    // 继续下一帧
    gameLoop = requestAnimationFrame(loop);
  }
  
  gameLoop = requestAnimationFrame(loop);
}

/**
 * 更新游戏逻辑
 */
function updateGame(deltaTime) {
  // 这里可以添加游戏逻辑更新
  // 例如：物理计算、AI逻辑、状态更新等
}

/**
 * 渲染游戏画面
 */
function renderGame() {
  const ctx = gameState.gameContext;
  const canvas = gameState.gameCanvas;
  
  // 清空画布
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // 绘制背景
  ctx.fillStyle = '#f0f0f0';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // 绘制游戏内容
  drawGameContent(ctx);
}

/**
 * 绘制游戏内容
 */
function drawGameContent(ctx) {
  // 绘制标题
  ctx.fillStyle = '#333';
  ctx.font = '24px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('游戏大厅', gameState.gameCanvas.width / 2, 50);
  
  // 绘制用户信息
  if (gameState.userInfo) {
    ctx.font = '16px Arial';
    ctx.fillText(`欢迎, ${gameState.userInfo.nickName}`, gameState.gameCanvas.width / 2, 100);
  } else {
    ctx.fillText('请先登录', gameState.gameCanvas.width / 2, 100);
  }
  
  // 绘制游戏按钮
  drawGameButtons(ctx);
}

/**
 * 绘制游戏按钮
 */
function drawGameButtons(ctx) {
  const centerX = gameState.gameCanvas.width / 2;
  const startY = 150;
  const buttonHeight = 40;
  const buttonSpacing = 50;
  
  const buttons = [
    { text: '开始游戏', action: 'startGame' },
    { text: '房间列表', action: 'roomList' },
    { text: '商城', action: 'shop' },
    { text: '个人中心', action: 'profile' }
  ];
  
  buttons.forEach((button, index) => {
    const y = startY + index * buttonSpacing;
    
    // 绘制按钮背景
    ctx.fillStyle = '#4CAF50';
    ctx.fillRect(centerX - 80, y - 20, 160, buttonHeight);
    
    // 绘制按钮文字
    ctx.fillStyle = '#fff';
    ctx.font = '16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(button.text, centerX, y + 5);
  });
}

/**
 * 处理触摸事件
 */
function handleTouch(e) {
  const touch = e.touches[0];
  const x = touch.clientX;
  const y = touch.clientY;
  
  // 检查按钮点击
  const centerX = gameState.gameCanvas.width / 2;
  const startY = 150;
  const buttonHeight = 40;
  const buttonSpacing = 50;
  
  const buttons = ['startGame', 'roomList', 'shop', 'profile'];
  
  buttons.forEach((action, index) => {
    const buttonY = startY + index * buttonSpacing;
    
    if (x >= centerX - 80 && x <= centerX + 80 && 
        y >= buttonY - 20 && y <= buttonY + 20) {
      handleButtonClick(action);
    }
  });
}

/**
 * 处理按钮点击
 */
function handleButtonClick(action) {
  console.log('按钮点击:', action);
  
  switch (action) {
    case 'startGame':
      // 开始游戏逻辑
      wx.showToast({ title: '开始游戏', icon: 'success' });
      break;
    case 'roomList':
      // 房间列表逻辑
      wx.showToast({ title: '房间列表', icon: 'success' });
      break;
    case 'shop':
      // 商城逻辑
      wx.showToast({ title: '商城', icon: 'success' });
      break;
    case 'profile':
      // 个人中心逻辑
      wx.showToast({ title: '个人中心', icon: 'success' });
      break;
  }
}

// 微信小游戏生命周期
wx.onShow(() => {
  console.log('小游戏显示');
  
  // 重连Socket
  if (gameState.isLogin) {
    connectSocket();
  }
});

wx.onHide(() => {
  console.log('小游戏隐藏');
  
  // 断开Socket连接
  socket.disconnect();
  
  // 暂停游戏循环
  if (gameLoop) {
    cancelAnimationFrame(gameLoop);
    gameLoop = null;
  }
});

wx.onError((err) => {
  console.error('小游戏错误:', err);
});

// 初始化游戏
initGame();

// 绑定触摸事件
wx.onTouchStart(handleTouch);


