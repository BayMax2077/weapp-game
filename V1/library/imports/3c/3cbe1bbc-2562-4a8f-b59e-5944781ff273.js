"use strict";
cc._RF.push(module, '3cbe1u8JWJKj7WeWUR4H/Jz', 'signal');
// scripts/perfab/script/signal.ts

"use strict";
// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var tool_1 = require("../../../scripts/lib/tool");
var state_1 = require("../../utils/state");
var prveStatus = 20;
var statusUpdateTime = 0;
var clock = 0;
var Signal = /** @class */ (function (_super) {
    __extends(Signal, _super);
    function Signal() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * WIFI 连接正常
         */
        _this.wifiSuccessFrame = null;
        /**
         * WIFI 连接警告
         */
        _this.wifiErrorFrame = null;
        /**
         * WIFI 连接断开
         */
        _this.wifiUnLinkFrame = null;
        /**
         * WIFI
         */
        _this.wifi = null;
        /**
         * 时间文字
         */
        _this.time = null;
        /**
         * 延迟文字
         */
        _this.signal = null;
        /**
         * 弹窗
         */
        _this.popupPrefab = null;
        /**
         * 弹窗实例
         */
        _this.scriptPopup = null;
        return _this;
        // update (dt) {}
    }
    Signal.prototype.onLoad = function () {
        var _this = this;
        this.watch();
        cc.game.on('socketConnect', this.watch.bind(this));
        // cc.game.on('serverClose', this.serverCloseEvent.bind(this));
        console.log('signal loading ....');
        var onLine = function (content) {
            var popup = cc.instantiate(_this.popupPrefab);
            cc.director.getScene().addChild(popup);
            var scriptPopup = popup.getComponent('popup');
            scriptPopup.init(content);
            clearInterval(clock);
            scriptPopup.setEvent('close', function () {
                localStorage.clear();
                cc.director.loadScene('loginPage');
            });
        };
        // 账号在线监测
        cc.game.on('onLine', onLine);
        console.log({ online: state_1.default.io.online }, 1);
        // 提早得到在线通知时
        if (state_1.default.io.online)
            onLine('当前账号已在\n其他设备上登录!');
    };
    /**
     * 服务器关闭检测
     */
    // serverCloseEvent() {
    //     const popup = cc.instantiate(this.popupPrefab);
    //     cc.director.getScene().addChild(popup);
    //     const scriptPopup = popup.getComponent('popup');
    //     scriptPopup.init('服务器维护中...\n请退至首页!');
    //     scriptPopup.setEvent('success', () => {
    //         cc.director.loadScene('loginPage');
    //     });
    //     clearInterval(clock);
    // }
    /**
     * 监听数据回音事件
     */
    Signal.prototype.watch = function () {
        var _this = this;
        clock && clearInterval(clock);
        clock = setInterval(function () {
            _this.time.string = tool_1.dateFrom('HH:mm');
            state_1.default.io.emit('signal', '');
            var time = Date.now();
            if (statusUpdateTime === 0) {
                console.log('retrun statusUpdateTime');
                statusUpdateTime = Date.now();
                return;
            }
            if (statusUpdateTime + (10 * 1000) < Date.now()) {
                // 掉线二次检测
                _this.wifi.spriteFrame = _this.wifiUnLinkFrame;
                prveStatus = 2000;
                _this.unonline();
                _this.signal.string = '已掉线';
            }
            else if (statusUpdateTime + (4 * 1000) < time) {
                // 警告状态
                _this.wifi.spriteFrame = _this.wifiErrorFrame;
                prveStatus = 700 + (Math.random() * 300 >> 1);
                _this.signal.node.color = cc.color(255, 160, 36);
                _this.signal.string = prveStatus.toString();
            }
            // 颜色修改
            if (prveStatus > 1000) {
                _this.signal.node.color = cc.color(197, 27, 6);
            }
        }, 1000);
        // 延迟接收
        state_1.default.io.on('signal', this.onSignal.bind(this));
    };
    /**
     * 接收到延迟数据时
     * @param signal - 延迟
     */
    Signal.prototype.onSignal = function (signal) {
        if (typeof signal === 'number' && this.signal) {
            statusUpdateTime = Date.now();
            this.signal.string = signal + 'ms';
            state_1.default.userInfo.signal = signal;
            this.scriptPopup && this.scriptPopup.close();
            // 状态正常恢复
            if (prveStatus >= 500 && prveStatus <= 2000 && signal < 500) {
                this.wifi.spriteFrame = this.wifiSuccessFrame;
                this.signal.node.color = cc.color(30, 255, 127);
            }
            // 延迟状态
            if (signal > 500 && signal < 1000) {
                this.wifi.spriteFrame = this.wifiErrorFrame;
                this.signal.node.color = cc.color(255, 160, 36);
                prveStatus = signal;
            }
            // 掉线状态
            if (signal > 1000) {
                this.wifi.spriteFrame = this.wifiUnLinkFrame;
                prveStatus = signal;
            }
        }
    };
    /**
     * 掉线弹窗处理
     */
    Signal.prototype.unonline = function () {
        var _this = this;
        if (!this.scriptPopup) {
            console.log('与服务器失去连接');
            var popup = cc.instantiate(this.popupPrefab);
            cc.director.getScene().addChild(popup);
            var scriptPopup = popup.getComponent('popup');
            scriptPopup.init('与服务器失去连接!\n重新连接中...');
            scriptPopup.setEvent('close', function () {
                _this.scriptPopup = null;
            });
            this.scriptPopup = scriptPopup;
        }
    };
    /**
     * 销毁场景时进行清理
     */
    Signal.prototype.onDestroy = function () {
        state_1.default.io.off('signal', this.onSignal.bind(this));
        cc.game.off('socketConnect', this.watch.bind(this));
        clock && clearInterval(clock);
        statusUpdateTime = 0;
    };
    __decorate([
        property(cc.SpriteFrame)
    ], Signal.prototype, "wifiSuccessFrame", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], Signal.prototype, "wifiErrorFrame", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], Signal.prototype, "wifiUnLinkFrame", void 0);
    __decorate([
        property(cc.Sprite)
    ], Signal.prototype, "wifi", void 0);
    __decorate([
        property(cc.Label)
    ], Signal.prototype, "time", void 0);
    __decorate([
        property(cc.Label)
    ], Signal.prototype, "signal", void 0);
    __decorate([
        property(cc.Prefab)
    ], Signal.prototype, "popupPrefab", void 0);
    Signal = __decorate([
        ccclass
    ], Signal);
    return Signal;
}(cc.Component));
exports.default = Signal;

cc._RF.pop();