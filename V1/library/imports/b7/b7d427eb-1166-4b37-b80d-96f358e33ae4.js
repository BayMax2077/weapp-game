"use strict";
cc._RF.push(module, 'b7d42frEWZLN7gNlvNY4zrk', 'socketIO');
// scripts/lib/socketIO.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * socket-client 封装
 * author:  ShiLaiMu
 * version: v1.0.0
 * type:    TypeScript
 * encrypt: false
 *
 * 依赖:
 * @/config/default.config.ts
 * npm install @types/socket.io-clien --save
 *
 *
 * 全局:
 * [main.ts]
 *    import io from '@/utils/socketIO';
 *    io.use(Vue);
 *
 * 功能:
 * - 全局统一：  请求api配置中的接口，实现一改配置修改全部请求
 * - 内网连接：  内网访问及调试时，后端请求自动切换为内网域
 * - 多IO连接：  可同时连接多个IM系统并实现统一监听和发送
 *
 * 调用方法:
 * - 主IM:
 *     this.$socket.emit()
 *     this.$socket.on() 等 Socket 方法
 *
 * - 子IM:
 *     this.$io[配置内定义的IM名] 如配置内 io: { main: 'ws://127.0.0.1:7021', gameIM: 'ws://127.0.0.1:7022' }
 *     this.$io.gameIM.emit()
 *     this.$io.gameIM.on() 等 Socket 方法
 */
var io = require('./asocket.ioLib/asocket.io.js');
// import * as io from './asocket.ioLib/asocket.io.js';
// import State from './state';
var state_1 = require("../../scripts/utils/state");
var default_config_1 = require("../../scripts/config/default.config");
var axiosUtils_1 = require("../../scripts/utils/axiosUtils");
// IO配置文件引入
var IoConfig = default_config_1.default.io;
// 子IO
// const ioChilder: { [key: string]: typeof io.Socket; } = {};
// 账号token获取
// 当前域
var locaHostName = window.location.hostname;
var localRegExp = /127\.0\.0\.1|localhost/;
// let clock = null;
exports.default = {
    /**
     * 唯一连接
     */
    onlyConnect: false,
    init: function () {
        console.log('IO 机制加载成功!');
        cc.game.on('tokenUpdate', this.connect.bind(this));
        if (state_1.default.userInfo.token) {
            this.connect(state_1.default.userInfo.token);
        }
    },
    connect: function (token) {
        if (this.onlyConnect)
            return;
        console.log("IO \u8FDE\u63A5\u4E2D...", token);
        // 临时方案
        axiosUtils_1.default.api('get_games_list').then(function (res) { return state_1.default.games = res; });
        var socket = io.connect(((localRegExp.test(IoConfig.main) && !localRegExp.test(locaHostName)) || CC_DEV
            ? IoConfig.dev.main.replace(localRegExp, locaHostName)
            : IoConfig.main) + "/", {
            query: {
                token: token,
            },
            forceNew: true,
            transports: ['websocket'],
        });
        // 账号已在线检测
        socket.on('onLine', function (data) {
            state_1.default.io.online = true;
            cc.game.emit('onLine', data);
        });
        // 连接成功
        socket.on('connect', function () {
            state_1.default.io = socket;
            console.log("IO \u8FDE\u63A5\u6210\u529F!");
            cc.game.emit('socketConnect');
            socket.emit('connect/test');
        });
        // 链接处理
        socket.on('reconnect', function (data) { return console.log('IO重连中...', data); });
        // 断开连接
        socket.on('disconnect', function (data) {
            console.log(data);
            // 服务器关闭
            // if (data === 'transport close') {
            //   State.server.state = -1;
            //   cc.game.emit('serverClose');
            // }
        });
        // 自定义事件
        socket.reconnect = function () {
            socket.disconnect();
            socket.connect();
        };
        // 用户数据更新
        socket.on('updateUserData', function (data) { return cc.game.emit('updateUserData', data); });
        state_1.default.io = socket;
        window.socket = socket;
        this.onlyConnect = true;
    }
};

cc._RF.pop();