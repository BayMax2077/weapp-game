# 微信小程序游戏平台 V1.0

## 项目概述

这是微信小程序游戏平台的V1.0版本，基于Cocos Creator 2.4.4开发，包含多种小游戏和完整的用户系统。

## 技术栈

- **游戏引擎**: Cocos Creator 2.4.4
- **开发语言**: TypeScript
- **网络通信**: Socket.IO + Axios
- **微信集成**: wx-ts-sdk
- **构建工具**: Vite (用于开发环境)

## 项目结构

```
V1/
├── assets/                 # 游戏资源目录
│   ├── scripts/            # 游戏脚本
│   ├── images/             # 图片资源
│   ├── audio/              # 音频资源
│   ├── scene/              # 场景文件
│   └── resources/          # 资源文件
├── interface/              # 类型定义
├── library/                # 库文件
├── local/                  # 本地配置
├── packages/               # 包文件
├── profiles/               # 配置文件
├── settings/               # 设置文件
├── temp/                   # 临时文件
├── node_modules/           # 依赖包
├── package.json           # 项目配置
├── project.json           # Cocos Creator项目配置
├── tsconfig.json          # TypeScript配置
├── jsconfig.json          # JavaScript配置
├── creator.d.ts           # Creator类型定义
├── build.sh               # 构建脚本
├── 1.html                 # 测试页面
└── README.md              # 项目说明
```

## 核心功能

### 1. 游戏系统
- **飞行棋**: 2-4人实时对战
- **消消乐**: 三消类休闲游戏
- **五子棋**: 策略类棋类游戏
- **四张牌**: 卡牌类游戏

### 2. 用户系统
- 用户注册/登录
- 微信登录
- 用户信息管理
- 用户资产管理

### 3. 房间系统
- 创建/加入房间
- 实时通信
- 房间管理
- 随机匹配

### 4. 商业化功能
- 广告系统
- 支付系统
- 虚拟货币系统
- 商城系统

## 开发环境

### 环境要求
- Cocos Creator 2.4.4+
- Node.js 12+
- TypeScript 支持
- 微信开发者工具

### 安装步骤
```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

### 构建部署
```bash
# 使用构建脚本
./build.sh
```

## 项目特点

1. **模块化设计**: 每个游戏独立模块
2. **实时通信**: 使用Socket.IO进行实时数据同步
3. **商业化**: 完整的广告和支付系统
4. **跨平台**: 支持微信小程序和网页端

## 注意事项

- 这是V1.0版本，已升级到V2.0版本
- V2.0版本采用更现代的技术栈
- 如需开发新功能，请使用V2.0版本

## 版本历史

- **V1.0**: 基于Cocos Creator 2.4.4的初始版本
- **V2.0**: 基于Cocos Creator 3.8+的现代化版本

---

**注意**: 此版本已归档，新开发请使用V2.0版本。