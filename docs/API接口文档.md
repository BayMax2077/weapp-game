# API接口文档

**最后更新**: 2025-10-20  
**项目状态**: ✅ 游戏迁移完成，功能开发完成，准备测试和上线

## 接口概述

微信小程序游戏平台V2.0使用RESTful API设计，支持用户管理、游戏管理、房间管理、支付管理、反馈管理、邮件管理、活动管理、进度跟踪、搜索、收藏、排行榜等功能。所有接口都通过统一的HTTP客户端进行调用。

### V2.0新增接口 ✅
- 反馈系统接口 (`/api/feedback`) ✅
- 邮件系统接口 (`/api/email`) ✅
- 活动系统接口 (`/api/activity`) ✅
- 进度管理接口 (`/api/progress`) ✅
- 搜索功能接口 (`/api/search`) ✅
- 收藏功能接口 (`/api/favorites`) ✅
- 排行榜接口 (`/api/leaderboard`) ✅
- 增强的认证机制 (JWT) ✅
- 数据库持久化支持 ✅

## 基础配置

### 接口基础地址 ✅
```javascript
// 开发环境 ✅
const API_BASE_URL = 'http://localhost:3000/api';

// 生产环境  
const API_BASE_URL = 'https://api.example.com/api';
```

### 请求头配置 ✅
```javascript
const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + token
};
```

## 用户相关接口

### 1. 用户注册
```typescript
POST /user/:registerCode
```

**请求参数**:
```typescript
interface RegisterRequest {
    phone: string;          // 手机号
    password: string;      // 密码
    verifyCode: string;   // 验证码
    registerCode: string; // 注册码
}
```

**响应数据**:
```typescript
interface RegisterResponse {
    success: boolean;
    message: string;
    data: {
        userId: string;
        token: string;
    };
}
```

### 2. 用户登录
```typescript
POST /user
```

**请求参数**:
```typescript
interface LoginRequest {
    phone: string;     // 手机号
    password: string;  // 密码
}
```

**响应数据**:
```typescript
interface LoginResponse {
    success: boolean;
    data: {
        userInfo: UserInfo;
        token: string;
    };
}
```

### 3. 微信登录
```typescript
POST /user/wx/:code
```

**请求参数**:
```typescript
interface WxLoginRequest {
    code: string;  // 微信授权码
}
```

### 4. 获取用户资产
```typescript
GET /user/assets
```

**响应数据**:
```typescript
interface UserAssets {
    coins: number;      // 金币数量
    gems: number;       // 宝石数量
    items: Item[];      // 道具列表
}
```

## 游戏相关接口

### 1. 获取游戏列表
```typescript
GET /game/home/list
```

**响应数据**:
```typescript
interface GameListResponse {
    games: GameInfo[];
}

interface GameInfo {
    id: string;
    name: string;
    icon: string;
    description: string;
    playerCount: number;  // 支持玩家数量
    isOnline: boolean;   // 是否在线游戏
}
```

### 2. 获取游戏战绩
```typescript
GET /game/record/:gameId
```

**响应数据**:
```typescript
interface GameRecord {
    gameId: string;
    totalGames: number;    // 总游戏次数
    winGames: number;      // 胜利次数
    winRate: number;       // 胜率
    bestScore: number;     // 最高分
    recentGames: GameHistory[];
}
```

## 房间相关接口

### 1. 创建房间
```typescript
POST /room/:gameName
```

**请求参数**:
```typescript
interface CreateRoomRequest {
    gameName: string;     // 游戏名称
    maxPlayers: number;    // 最大玩家数
    roomName?: string;     // 房间名称
    password?: string;     // 房间密码
}
```

**响应数据**:
```typescript
interface CreateRoomResponse {
    success: boolean;
    data: {
        roomCode: string;  // 房间号
        roomId: string;    // 房间ID
    };
}
```

### 2. 加入房间
```typescript
POST /room/join
```

**请求参数**:
```typescript
interface JoinRoomRequest {
    roomCode: string;     // 房间号
    password?: string;    // 房间密码
}
```

### 3. 退出房间
```typescript
POST /room/exit
```

**请求参数**:
```typescript
interface ExitRoomRequest {
    roomCode: string;     // 房间号
}
```

### 4. 获取房间信息
```typescript
GET /room/info
```

**响应数据**:
```typescript
interface RoomInfo {
    roomCode: string;
    gameName: string;
    players: PlayerInfo[];
    isStart: boolean;
    playerIndex: number;   // 当前玩家索引
}
```

### 5. 随机加入房间
```typescript
GET /room/random
```

**请求参数**:
```typescript
interface RandomJoinRequest {
    gameName: string;     // 游戏名称
}
```

## 商城相关接口

### 1. 获取商城菜单
```typescript
GET /shop/main
```

**响应数据**:
```typescript
interface ShopMenuResponse {
    menus: ShopMenu[];
}

interface ShopMenu {
    id: string;
    name: string;
    icon: string;
    description: string;
}
```

### 2. 获取商品列表
```typescript
GET /shop/main/:menuId
```

**响应数据**:
```typescript
interface ShopGoodsResponse {
    goods: ShopGood[];
}

interface ShopGood {
    id: string;
    name: string;
    price: number;
    currency: 'coins' | 'gems';  // 货币类型
    icon: string;
    description: string;
}
```

### 3. 购买商品
```typescript
POST /shop/buy/:goodsId
```

**请求参数**:
```typescript
interface BuyGoodsRequest {
    goodsId: string;
    quantity: number;     // 购买数量
}
```

## 邮件系统接口

### 1. 获取邮件列表
```typescript
GET /email
```

**响应数据**:
```typescript
interface EmailListResponse {
    emails: Email[];
}

interface Email {
    id: string;
    title: string;
    content: string;
    isRead: boolean;
    createTime: string;
    attachments: Attachment[];
}
```

### 2. 获取邮件内容
```typescript
GET /email/:emailId
```

**响应数据**:
```typescript
interface EmailContentResponse {
    email: Email;
    content: string;      // 详细内容
}
```

## 反馈系统接口

### 1. 获取反馈类型
```typescript
GET /api/feedback/types
```

**响应数据**:
```typescript
interface FeedbackTypesResponse {
    success: boolean;
    data: FeedbackType[];
}

interface FeedbackType {
    id: number;
    name: string;
    description: string;
}
```

### 2. 提交反馈
```typescript
POST /api/feedback/submit
```

**请求参数**:
```typescript
interface SubmitFeedbackRequest {
    typeId: number;
    content: string;
    images?: string[];
}
```

### 3. 获取用户反馈列表
```typescript
GET /api/feedback/list
```

## 邮件系统接口

### 1. 获取邮件列表
```typescript
GET /api/email
```

**响应数据**:
```typescript
interface EmailListResponse {
    success: boolean;
    data: Email[];
}

interface Email {
    id: string;
    title: string;
    content: string;
    type: 'system' | 'reward' | 'activity';
    isRead: boolean;
    createTime: number;
    expireTime: number;
}
```

### 2. 获取邮件详情
```typescript
GET /api/email/:emailId
```

### 3. 标记邮件为已读
```typescript
POST /api/email/:emailId/read
```

## 活动系统接口

### 1. 获取活动列表
```typescript
GET /api/activity
```

**响应数据**:
```typescript
interface ActivityResponse {
    success: boolean;
    data: Activity[];
}

interface Activity {
    id: string;
    title: string;
    description: string;
    type: 'newbie' | 'daily' | 'achievement';
    status: 'active' | 'inactive';
    startTime: number;
    endTime: number;
    image: string;
    rewards: Reward[];
    conditions: Condition[];
}
```

### 2. 参与活动
```typescript
POST /api/activity/:activityId/join
```

### 3. 获取活动进度
```typescript
GET /api/activity/:activityId/progress
```

## 商城系统接口

### 1. 获取商品分类
```typescript
GET /api/shop/categories
```

### 2. 获取商品列表
```typescript
GET /api/shop/products
```

**请求参数**:
```typescript
interface ShopProductsRequest {
    categoryId?: number;
    type?: string;
    status?: string;
}
```

### 3. 购买商品
```typescript
POST /api/shop/buy/:productId
```

### 4. 获取购买记录
```typescript
GET /api/shop/orders
```

## 进度管理接口

### 1. 获取用户游戏进度
```typescript
GET /api/progress/user/:userId
```

**查询参数**:
- `limit`: 限制返回数量 (默认20)
- `offset`: 偏移量 (默认0)

**响应数据**:
```typescript
interface UserProgressResponse {
    success: boolean;
    data: {
        userId: string;
        totalGames: number;
        totalWins: number;
        winRate: number;
        gameProgress: GameProgress[];
    };
}

interface GameProgress {
    gameId: string;
    gameName: string;
    totalGames: number;
    wins: number;
    losses: number;
    winRate: number;
    bestScore: number;
    totalScore: number;
    lastPlayTime: number;
}
```

### 2. 获取特定游戏进度
```typescript
GET /api/progress/game/:gameId/:userId
```

### 3. 更新游戏进度
```typescript
POST /api/progress/update
```

**请求参数**:
```typescript
interface UpdateProgressRequest {
    userId: string;
    gameId: string;
    result: 'win' | 'lose' | 'draw';
    score: number;
    duration: number;
    gameData: any;
}
```

### 4. 获取成就进度
```typescript
GET /api/progress/achievements/:userId
```

### 5. 获取用户统计
```typescript
GET /api/progress/stats/:userId
```

## 搜索功能接口

### 1. 全局搜索
```typescript
GET /api/search/global
```

**查询参数**:
- `keyword`: 搜索关键词
- `type`: 搜索类型 (all/games/users/rooms/products)
- `limit`: 限制返回数量 (默认20)

### 2. 游戏搜索
```typescript
GET /api/search/games
```

**查询参数**:
- `keyword`: 搜索关键词
- `category`: 游戏分类
- `difficulty`: 难度等级
- `limit`: 限制返回数量

### 3. 用户搜索
```typescript
GET /api/search/users
```

### 4. 房间搜索
```typescript
GET /api/search/rooms
```

### 5. 商品搜索
```typescript
GET /api/search/products
```

### 6. 获取搜索建议
```typescript
GET /api/search/suggestions
```

### 7. 获取热门搜索
```typescript
GET /api/search/trending
```

## 收藏功能接口

### 1. 获取用户收藏列表
```typescript
GET /api/favorites/:userId
```

**查询参数**:
- `type`: 收藏类型 (all/games/users/rooms/products)
- `limit`: 限制返回数量 (默认20)
- `offset`: 偏移量 (默认0)

### 2. 添加收藏
```typescript
POST /api/favorites/add
```

**请求参数**:
```typescript
interface AddFavoriteRequest {
    userId: string;
    type: 'game' | 'user' | 'room' | 'product';
    targetId: string;
    targetData: any;
}
```

### 3. 取消收藏
```typescript
DELETE /api/favorites/remove
```

### 4. 检查收藏状态
```typescript
GET /api/favorites/check/:userId
```

### 5. 批量操作收藏
```typescript
POST /api/favorites/batch
```

### 6. 获取收藏统计
```typescript
GET /api/favorites/stats/:userId
```

## 排行榜接口

### 1. 获取游戏排行榜
```typescript
GET /api/leaderboard/game/:gameId
```

**查询参数**:
- `type`: 排行类型 (score/winrate/games)
- `period`: 时间周期 (all/day/week/month/year)
- `limit`: 限制返回数量 (默认50)

### 2. 获取用户排行榜
```typescript
GET /api/leaderboard/users
```

### 3. 获取成就排行榜
```typescript
GET /api/leaderboard/achievements
```

### 4. 获取用户排名
```typescript
GET /api/leaderboard/user/:userId/rank
```

### 5. 获取排行榜统计
```typescript
GET /api/leaderboard/stats
```

## 错误处理

### 错误码定义
```typescript
enum ErrorCode {
    SUCCESS = 0,           // 成功
    INVALID_PARAMS = 1001, // 参数错误
    UNAUTHORIZED = 1002,   // 未授权
    FORBIDDEN = 1003,      // 禁止访问
    NOT_FOUND = 1004,      // 资源不存在
    SERVER_ERROR = 5000,   // 服务器错误
}
```

### 错误响应格式
```typescript
interface ErrorResponse {
    success: false;
    code: number;
    message: string;
    data?: any;
}
```

## 使用示例

### 1. 用户登录
```typescript
import axios from './utils/axiosUtils';

// 用户登录
const login = async (phone: string, password: string) => {
    try {
        const response = await axios.api('login', {
            data: { phone, password }
        });
        return response.data;
    } catch (error) {
        console.error('登录失败:', error);
        throw error;
    }
};
```

### 2. 创建房间
```typescript
const createRoom = async (gameName: string) => {
    try {
        const response = await axios.api('create_room', {
            data: { gameName, maxPlayers: 4 }
        });
        return response.data;
    } catch (error) {
        console.error('创建房间失败:', error);
        throw error;
    }
};
```

### 3. 加入房间
```typescript
const joinRoom = async (roomCode: string) => {
    try {
        const response = await axios.api('room_join', {
            data: { roomCode }
        });
        return response.data;
    } catch (error) {
        console.error('加入房间失败:', error);
        throw error;
    }
};
```

## 注意事项 ✅

1. **认证**: 大部分接口需要用户认证，请在请求头中携带token ✅
2. **频率限制**: API有请求频率限制，请合理控制请求频率 ✅
3. **数据格式**: 所有请求和响应都使用JSON格式 ✅
4. **错误处理**: 请妥善处理各种错误情况 ✅
5. **版本兼容**: 注意API版本兼容性，避免使用已废弃的接口 ✅

---

**文档更新时间**: 2025-10-20  
**项目状态**: ✅ 游戏迁移完成，功能开发完成，准备测试和上线  
**API状态**: ✅ 所有接口已实现，支持用户管理、游戏管理、房间管理、支付管理、反馈管理、邮件管理、活动管理等功能
