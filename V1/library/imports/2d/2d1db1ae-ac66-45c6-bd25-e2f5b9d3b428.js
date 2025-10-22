"use strict";
cc._RF.push(module, '2d1dbGurGZFxr0l4vW507Qo', 'state');
// scripts/utils/state.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Learn TypeScript:
// cc.assetManager.loadBundle('lib', (err, bundle) => {
//     // bundle.load('lib');
// });
/**
 * 缓存数据
 * 负责数据缓存npm install --save socket.io-wxapp-client
 */
var confusion_1 = require("../utils/confusion");
var gameSetting_1 = require("./gameSetting");
var userInfo = localStorage.getItem('userInfo');
console.log(gameSetting_1.default);
var State = {
    /**
     * 用户数据
     */
    userInfo: userInfo ? JSON.parse(userInfo) : {
        id: '0000',
        nickname: '* * * * * *',
        diamond: 0,
        gold: 0,
        token: false,
        avatarUrl: false,
        signal: 0,
    },
    /**
     * WebSocket IO
     */
    io: {
        connected: false,
        emit: function (k, c) { },
        on: function (k, c) { },
        off: function (k, c) { },
        /**
         * 是否被占线
         */
        online: false,
    },
    /**
     * 服务器数据
     */
    server: {
        /**
         * 状态:
         *  - -1: 关闭中
         *  -  0: 正常
         *  -  1: 维护中
         *  -  2: 拥挤
         *
         */
        state: 0,
    },
    /**
     * 服务器配置
     */
    serverConfig: {
        /**
         * 服务器状态
         */
        state: {
            value: 0,
        },
        /**
         * 启动内容
         */
        startMessage: {
            value: 0,
        }
    },
    /**
     * 游戏设置
     */
    games: [],
    /**
     * 游戏数据
     */
    gameData: {
    // id: -1,
    // gameName: '',
    // name: '',
    // peopleMax: 0,
    // frequency: 0,
    // payType: 0,
    // pwdType: 0,
    // roomCode: '',
    // roomPwd: -1,
    // gameData: { createTime: 1582084691210, blackSetp: 0, whiteSetp: 0, target: 0 },
    // players: [],
    // isStart: !0,
    },
    /**
     * 是否为微信游戏客户端
     */
    IS_WECHAT: cc.sys.platform === cc.sys.WECHAT_GAME,
    /**
     * 是否为浏览器
     */
    IS_BROWSER: cc.sys.isBrowser,
    /**
     * OSS对象加速
     */
    OSS_BASE: 'https://perfergame.oss-cn-beijing.aliyuncs.com',
    /**
     * 系统设置
     */
    system: gameSetting_1.default,
    /**
     * 弹出提示
     * @param content 内容
     * @param timeout 收起时间
     * @param effect  是否播放音效
     * @param icon    图标（-1：不显示，1：成功，2：失败，3：警告）
     */
    tips: function (content, timeout, effect, icon) {
        if (timeout === void 0) { timeout = 2; }
        if (effect === void 0) { effect = false; }
        if (icon === void 0) { icon = -1; }
        return new Promise(function (resolve, reject) {
            cc.loader.loadRes('prefab/tips', cc.Prefab, function (_err, prefab) {
                if (prefab) {
                    var popup = cc.instantiate(prefab);
                    cc.director.getScene().addChild(popup);
                    var scriptPopup = popup.getComponent('Tips');
                    scriptPopup.setContent(content, timeout, effect, icon);
                    resolve(scriptPopup);
                }
                else
                    reject(_err);
            });
        });
    }
};
exports.default = State;
/**
 * 全局重登机制 [Bate]
 */
var axiosUtils_1 = require("../utils/axiosUtils");
localStorage.getItem('account') && onLogin();
function onLogin() {
    var accountInputText = '';
    var passwordInputText = '';
    // 重新登录
    var _a = JSON.parse(localStorage.getItem('account') || '{}'), a = _a.a, p = _a.p;
    if (a && p) {
        passwordInputText = confusion_1.confusion.decrypt(p);
        accountInputText = confusion_1.confusion.decrypt(a);
    }
    if (!accountInputText || !passwordInputText)
        return;
    axiosUtils_1.default.api('login', {
        data: {
            account: accountInputText,
            password: passwordInputText,
        }
    })
        .then(function (res) {
        if (res.token) {
            localStorage.setItem('userInfo', JSON.stringify(res));
            State.userInfo = res;
            cc.game.emit('tokenUpdate', res.token);
        }
    });
}

cc._RF.pop();