"use strict";
cc._RF.push(module, 'ddd93nvCDVDYozZ0JWOkj77', 'onWxLogin');
// scripts/loginPage/script/onWxLogin.ts

"use strict";
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
var ccclass = cc._decorator.ccclass;
var axiosUtils_1 = require("../../utils/axiosUtils");
var state_1 = require("../../utils/state");
var tool_1 = require("../../../scripts/lib/tool");
var WxLogin = /** @class */ (function (_super) {
    __extends(WxLogin, _super);
    function WxLogin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WxLogin.prototype.start = function () {
        var width = 210;
        var height = 96;
        var x = -284;
        var y = -161.41;
        var that = this;
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            var sysInfo = window.wx.getSystemInfoSync();
            //获取微信界面大小
            var screenWidth_1 = sysInfo.screenWidth;
            var screenHeight_1 = sysInfo.screenHeight;
            window.wx.getSetting({
                success: function (res) {
                    if (res.authSetting["scope.userInfo"]) {
                        window.wx.getUserInfo({
                            success: function (res) {
                                that.userInfo = res.userInfo;
                                //此时可进行登录操作
                                if (localStorage.getItem('userInfo') && !localStorage.getItem('account')) {
                                    that.onWxLogin(res.userInfo);
                                }
                            }
                        });
                    }
                    else {
                        var button_1 = window.wx.createUserInfoButton({
                            type: 'text',
                            text: '',
                            style: {
                                left: (screenWidth_1 / 2 + (width * .4) / 2) + x,
                                top: (screenHeight_1 / 2 - (height * 1.3)) - y,
                                width: width * .8,
                                height: height * .8,
                                backgroundColor: '#00000000',
                                color: '#ffffff',
                                fontSize: 20,
                                textAlign: "center",
                                lineHeight: height,
                            }
                        });
                        button_1.onTap(function (res) {
                            if (res.userInfo) {
                                that.onWxLogin(res.userInfo);
                                //此时可进行登录操作
                                button_1.destroy();
                            }
                        });
                    }
                }
            });
        }
        else {
            tool_1.testingRotate();
            cc.view.setResizeCallback(tool_1.testingRotate);
        }
    };
    /**
     * 点击用户登录按钮时
     */
    WxLogin.prototype.onClickLoginButton = function () {
        if (this.userInfo) {
            this.onWxLogin(this.userInfo);
        }
        else if (!cc.sys.platform === cc.sys.WECHAT_GAME) {
            this.node.getComponent('loginPage').popupMiniContent('此功能只允许在\n微信小游戏或微信中使用!', 3000);
        }
    };
    /**
     * 微信授权登录
     */
    WxLogin.prototype.onWxLogin = function (userInfo) {
        var popup = this.node.getComponent('loginPage');
        var that = this;
        // 服务器状态检测
        if (state_1.default.server.state !== 0) {
            popup.popupMiniContent(state_1.default.serverConfig.state.note ||
                '关服维护中...\n请稍后再试!');
            return false;
        }
        // const success = popup.popupMiniContent('获取授权成功!登录中...');
        window.wx.login({
            success: function (res) {
                if (res.errMsg === 'login:ok') {
                    axiosUtils_1.default
                        .api('wxLogin', {
                        params: {
                            code: res.code,
                        },
                        data: userInfo,
                    })
                        .then(function (res) {
                        if (res.token) {
                            state_1.default.userInfo = res;
                            localStorage.setItem('userInfo', JSON.stringify(res));
                            cc.game.emit('tokenUpdate', res.token);
                            popup.loadingScens();
                        }
                    })
                        .catch(function () {
                        success.destroy();
                        popup.popupMiniContent('授权数据接口错误!\n请稍后再试!');
                    });
                }
            }
        });
    };
    WxLogin = __decorate([
        ccclass
    ], WxLogin);
    return WxLogin;
}(cc.Component));
exports.default = WxLogin;

cc._RF.pop();