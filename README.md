# 微信小程序游戏平台 V2.0

现代化微信小程序游戏平台，支持多人在线游戏、商城系统、广告系统等功能。

## 技术栈

### 前端
- 微信小程序原生开发
- Cocos Creator 3.8+ (游戏引擎)
- JavaScript ES2022

### 后端
- Node.js 18+ LTS
- Express.js 4.x
- Socket.IO 4.x
- MongoDB + Redis

## 项目结构

```
weapp-game-v2/
├── miniprogram/              # 微信小程序代码
│   ├── pages/                # 页面
│   ├── utils/                # 工具函数
│   ├── assets/               # 资源文件
│   ├── app.js                # 小程序入口
│   └── app.json              # 小程序配置
├── game-engine/              # 游戏引擎代码
│   ├── scenes/               # 游戏场景
│   ├── scripts/              # 游戏脚本
│   └── assets/               # 游戏资源
├── server/                   # 后端服务
│   ├── routes/               # 路由
│   ├── app.js                # 服务入口
│   └── ...
├── docs/                     # 文档
├── tests/                    # 测试
└── README.md                 # 项目说明
```

## 核心功能

### 1. 用户系统
- 微信登录
- 用户信息管理
- 用户资产管理

### 2. 游戏系统
- 飞行棋
- 消消乐
- 五子棋
- 四张牌

### 3. 房间系统
- 创建房间
- 加入房间
- 房间管理
- 实时通信

### 4. 商业化功能
- 广告系统（横幅、插屏、激励视频）
- 支付系统（微信支付）
- 虚拟货币系统
- 商城系统

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

创建 `.env` 文件：

```env
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/weapp-game
REDIS_URL=redis://localhost:6379
JWT_SECRET=your_secret_key
```

### 3. 启动后端服务

```bash
# 开发模式
npm run dev

# 生产模式
npm start
```

### 4. 启动小程序

1. 使用微信开发者工具打开 `miniprogram` 目录
2. 配置 `app.js` 中的 API 地址
3. 点击编译运行

## API接口

### 用户相关
- `POST /api/user/login` - 用户登录
- `POST /api/user/register` - 用户注册
- `POST /api/user/wx/:code` - 微信登录
- `GET /api/user/assets` - 获取用户资产

### 游戏相关
- `GET /api/game/list` - 获取游戏列表
- `GET /api/game/:gameId` - 获取游戏详情
- `GET /api/game/record/:gameId` - 获取游戏战绩

### 房间相关
- `POST /api/room/create` - 创建房间
- `POST /api/room/join` - 加入房间
- `POST /api/room/exit` - 退出房间
- `GET /api/room/info` - 获取房间信息
- `GET /api/room/random` - 随机加入房间

### 支付相关
- `POST /api/payment/create` - 创建订单
- `GET /api/payment/status/:orderId` - 获取订单状态
- `GET /api/payment/products` - 获取商品列表

## Socket事件

### 客户端发送
- `joinRoom` - 加入房间
- `leaveRoom` - 离开房间
- `gameData` - 游戏数据
- `gameStatus` - 游戏状态

### 服务端推送
- `playerJoined` - 玩家加入
- `playerLeft` - 玩家离开
- `gameData` - 游戏数据更新
- `gameStatus` - 游戏状态更新

## 部署

### Docker部署

```bash
# 构建镜像
docker build -t weapp-game .

# 运行容器
docker run -p 3000:3000 weapp-game
```

### PM2部署

```bash
# 启动服务
pm2 start server/app.js --name weapp-game

# 查看状态
pm2 status

# 查看日志
pm2 logs weapp-game

# 重启服务
pm2 restart weapp-game
```

## 开发指南

### 1. 代码规范
- 使用ESLint进行代码检查
- 使用Prettier进行代码格式化
- 遵循JavaScript标准规范

### 2. 提交规范
- feat: 新功能
- fix: 修复bug
- docs: 文档更新
- style: 代码格式调整
- refactor: 代码重构
- test: 测试相关
- chore: 构建/工具相关

### 3. 分支管理
- main: 主分支
- develop: 开发分支
- feature/*: 功能分支
- hotfix/*: 热修复分支

## 许可证

MIT License

## 联系方式

如有问题请联系开发团队。

