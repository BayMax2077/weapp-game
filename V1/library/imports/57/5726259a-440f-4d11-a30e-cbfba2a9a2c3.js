"use strict";
cc._RF.push(module, '57262WaRA9NEaMOy/uiqaLD', 'loginPage');
// scripts/loginPage/script/loginPage.ts

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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var axiosUtils_1 = require("../../utils/axiosUtils");
var state_1 = require("../../utils/state");
var confusion_1 = require("../../utils/confusion");
var loadingPackage_1 = require("../../Loading/loadingPackage");
var Login = /** @class */ (function (_super) {
    __extends(Login, _super);
    function Login() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 登录弹窗节点
        _this.LoginPopup = null;
        // 登录弹窗遮罩节点
        _this.LoginPopupMask = null;
        // 登录按钮
        _this.LoginButton = null;
        // 注册按钮
        _this.registerButton = null;
        // label 登录状态节点
        _this.LoginStatus = null;
        // 忘记密码文字节点
        _this.resetPasswordNode = null;
        // 加载资源
        _this.loadingPrefab = null;
        // 重设密码资源
        _this.resetPassword = null;
        // 注册资源
        _this.registerAccount = null;
        // 弹窗资源
        _this.popupPrefab = null;
        // 账户输入框
        _this.accountInput = null;
        // 密码输入框
        _this.passwordInput = null;
        // 弹窗消息内容资源
        _this.messagePrefab = null;
        // 弹窗标题图片资源
        _this.messageTitle = [];
        // 账号输入框
        _this.accountInputText = '';
        // 密码输入框
        _this.passwordInputText = '';
        // 当前登录弹窗状态
        _this.LoginPopupState = !0;
        // 缓冲计时器
        _this.befferClock = null;
        // BGM
        _this.bgm = null;
        return _this;
        // update (dt) {}
    }
    Login.prototype.onLoad = function () {
        var _this = this;
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.keyDown, this);
        // 服务器配置数据获取
        axiosUtils_1.default
            .api('server_config')
            .then(function (res) {
            state_1.default.serverConfig = res;
            // 服务器状态过滤
            if (res.state.value !== '0') {
                state_1.default.server.state = Number(res.state.value);
                _this.showMessage();
                return _this.popupMiniContent(res.state.note);
            }
            // 如果之前未登录 则 显示弹窗
            !localStorage.getItem('userInfo') && _this.showMessage();
            // 如果本地存在 account 数据 则尝试进行自动登录
            localStorage.getItem('account') && _this.onLogin();
        })
            .catch(function () {
            state_1.default.server.state = -1;
            _this.popupMiniContent('关服维护中...\n请稍后再试!');
        });
    };
    Login.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.LoginPopupMask.scale = 0;
                this.accountInput.node.on('text-changed', function (e) { return _this.accountInputText = e.string; }, this);
                this.passwordInput.node.on('text-changed', function (e) { return _this.passwordInputText = e.string; }, this);
                // BGM音量
                this.node.getComponent(cc.AudioSource).volume = state_1.default.system.config.volume.music || .4;
                return [2 /*return*/];
            });
        });
    };
    /**
     * 显示通知弹窗
     * - 此弹窗展示：
     *   + 未登录
     *   + 登录失败
     *   + 服务器状态异常
     * @param content 内容
     */
    Login.prototype.showMessage = function (content, titleIndex) {
        if (typeof content !== 'string')
            content = '';
        // 启动时需展现内容
        var startMessage = state_1.default.serverConfig.startMessage;
        if (startMessage && startMessage.value) {
            var popupMessage = cc.instantiate(this.messagePrefab);
            var loginMsgScript = popupMessage.getComponent('loginMessage');
            if (this.messageTitle[startMessage.value]) {
                var title = titleIndex || (!content ? startMessage.value : false);
                title && loginMsgScript.setTitle(this.messageTitle[title]);
            }
            loginMsgScript.setContent(content || startMessage.note);
            this.node.addChild(popupMessage);
        }
        this.node.getComponent(cc.AudioSource).play();
    };
    /**
     * 重置资源
     */
    Login.prototype.reset = function () {
        state_1.default.io.disconnect && state_1.default.io.disconnect();
        localStorage.clear();
        var popup = this.popupMiniContent('资源 (重置/修复) 成功!', 2000).setEvent('success', function () {
            popup.destroy();
        });
        cc.game.restart();
    };
    /**
     * 弹出小弹窗
     * @param content   内容
     * @param closeTime 自动关闭时间
     */
    Login.prototype.popupMiniContent = function (content, closeTime) {
        var popup = cc.instantiate(this.popupPrefab);
        cc.director.getScene().addChild(popup);
        var scriptPopup = popup.getComponent('popup');
        scriptPopup.init(content);
        scriptPopup.setEvent('success', function () {
            popup.destroy();
        });
        // 自动关闭时间
        if (closeTime) {
            setTimeout(function () { return popup.destroy(); }, closeTime);
        }
        return scriptPopup;
    };
    /**
     * 显示 关于
     */
    Login.prototype.showAbout = function () {
        this.showMessage("    \u672C\u6E38\u620F\u5927\u90E8\u5206\u8D44\u6E90\u6765\u81EA \u539F\u521B\u53CA\u57FA\u4E8ECC0 1-4\u534F\u8BAE\uFF0C\u5982\u90E8\u5206\u8D44\u6E90\u6D89\u53CA\u7248\u6743\u8BF7\u8054\u7CFB\u6211\u4EEC\u7684\u5F00\u53D1\u4EBA\u5458\uFF08\u53F2\u83B1\u59C6\uFF09\uFF0C\u6211\u4EEC\u5C06\u7B2C\u4E00\u65F6\u95F4\u5BF9\u8D44\u6E90\u8FDB\u884C\u6838\u5B9E\u5BA1\u67E5\u540E\u4FEE\u6539\u3002\n\n    \u90AE\u4EF6\uFF1Aadmin@slmblog.com\n    Q Q\uFF1A478889187");
    };
    /**
     * 按键按下时
     */
    Login.prototype.keyDown = function (event) {
        if (event.keyCode === cc.macro.KEY.enter) {
            this.onLogin();
        }
    };
    /**
     * 登录按钮点击
     */
    Login.prototype.onLoginClick = function () {
        var _a = this, LoginPopup = _a.LoginPopup, LoginPopupMask = _a.LoginPopupMask;
        LoginPopupMask.runAction(cc.scaleTo(0.1, 1).easing(cc.easeBackInOut()));
        LoginPopup.runAction(cc.scaleTo(0.4, 1).easing(cc.easeBackInOut()));
    };
    /**
     * 注册按钮点击
     */
    Login.prototype.createPrefab = function (_e, prefabName) {
        var instantiate = cc.instantiate(this[prefabName]);
        var script = instantiate.getComponent(prefabName);
        if (script) {
            script.parentClass = this;
        }
        this.node.addChild(instantiate);
    };
    /**
     * 关闭登录按钮
     */
    Login.prototype.onLoginClose = function () {
        var _a = this, LoginPopup = _a.LoginPopup, LoginPopupMask = _a.LoginPopupMask;
        LoginPopup.runAction(cc.scaleTo(1, 0).easing(cc.easeBackInOut()));
        LoginPopupMask.scale = 0;
    };
    /**
     * 加载界面
     */
    Login.prototype.loadingScens = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loading, loadingScript, timeout;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // 服务器状态检测
                        console.log(state_1.default.server.state);
                        if (state_1.default.server.state !== 0) {
                            this.popupMiniContent(state_1.default.serverConfig.state.note ||
                                '关服维护中...\n请稍后再试!');
                            return [2 /*return*/, false];
                        }
                        loading = cc.instantiate(this.loadingPrefab);
                        loadingScript = loading.getComponent('loading');
                        this.node.addChild(loading);
                        timeout = null;
                        return [4 /*yield*/, loadingPackage_1.default({
                                sub: [
                                    'lib', 'resPrefabSub', 'perfabScript', 'HomeScript', 'GamesScript',
                                ],
                                scene: [
                                    'Home',
                                ],
                            }, function (_packname, count, all, message) {
                                var nextValue = ((count + 1) / all * 100) / 100;
                                var currentValue = (count / all * 100) / 100;
                                var averageValue = (nextValue - currentValue) / 20;
                                var befferIndex = 0;
                                loadingScript.updateValue(currentValue, message);
                                // 缓冲效果
                                _this.befferClock && clearInterval(_this.befferClock);
                                if (nextValue < 1) {
                                    _this.befferClock = setInterval(function () {
                                        if (befferIndex < 19) {
                                            befferIndex++;
                                            loadingScript.updateValue(currentValue + befferIndex * averageValue);
                                        }
                                        else
                                            clearInterval(_this.befferClock);
                                    }, Math.random() * 200);
                                }
                                // 资源加载完成
                                if (count === all) {
                                    timeout && clearTimeout(timeout);
                                    cc.director.loadScene('Home');
                                    return !0;
                                }
                                // 资源加载超时 1s
                                timeout && clearTimeout(timeout);
                                timeout = setTimeout(function () {
                                    _this.LoginStatus.string = '资源加载超时\n请稍后再试!';
                                    loading.destroy();
                                }, 60000);
                                return !0;
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 登录账户
     */
    Login.prototype.onLogin = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, accountInput, passwordInput, LoginStatus, LoginButton, registerButton, resetPasswordNode, _b, accountInputText, passwordInputText, _c, a, p, buys;
            var _this = this;
            return __generator(this, function (_d) {
                // console.log(await axios.api('xxx').then((res) => console.log(res)));
                // 已自动登录则拒绝登录
                if (Date.now() - state_1.default.userInfo.last_login_time < 10000) {
                    return [2 /*return*/, this.loadingScens()];
                }
                _a = this, accountInput = _a.accountInput, passwordInput = _a.passwordInput, LoginStatus = _a.LoginStatus, LoginButton = _a.LoginButton, registerButton = _a.registerButton, resetPasswordNode = _a.resetPasswordNode;
                _b = this, accountInputText = _b.accountInputText, passwordInputText = _b.passwordInputText;
                _c = JSON.parse(localStorage.getItem('account') || '{}'), a = _c.a, p = _c.p;
                if (a && p) {
                    passwordInputText = passwordInputText || confusion_1.confusion.decrypt(p);
                    accountInputText = accountInputText || confusion_1.confusion.decrypt(a);
                    this.onLoginClick();
                }
                if (!accountInputText || !passwordInputText) {
                    return [2 /*return*/];
                }
                LoginStatus.string = '登录中...';
                accountInput.node.scale = 0;
                passwordInput.node.scale = 0;
                registerButton.active = false;
                LoginButton.active = false;
                resetPasswordNode.node.active = false;
                buys = setTimeout(function () {
                    LoginStatus.string = '登录失败\n服务器超时!';
                    setTimeout(_this.resetLoginUI.bind(_this), 1500);
                }, 7000);
                axiosUtils_1.default
                    .api('login', {
                    data: {
                        account: accountInputText,
                        password: passwordInputText,
                    }
                })
                    .then(function (res) {
                    clearTimeout(buys);
                    if (res.token) {
                        LoginStatus.string = "\u767B\u5F55\u6210\u529F!\n\u6B22\u8FCE\u56DE\u6765\n" + res.nickname;
                        localStorage.setItem('userInfo', JSON.stringify(res));
                        state_1.default.userInfo = res;
                        _this.loadingScens();
                        // 自动关闭并重置布局
                        setTimeout(function () {
                            _this.onLoginClose();
                            _this.resetLoginUI();
                        }, 2000);
                        // 简单的混淆
                        var account = confusion_1.confusion.encrypt(accountInputText);
                        var password = confusion_1.confusion.encrypt(passwordInputText);
                        localStorage.setItem('account', JSON.stringify({
                            a: account,
                            p: password,
                        }));
                        cc.game.emit('tokenUpdate', res.token);
                    }
                    else {
                        LoginStatus.string = "\u767B\u5F55\u5931\u8D25\n" + (res.msg || '服务器繁忙');
                        setTimeout(_this.resetLoginUI.bind(_this), 1500);
                    }
                });
                return [2 /*return*/];
            });
        });
    };
    /**
     * 重置登录界面
     */
    Login.prototype.resetLoginUI = function () {
        this.LoginStatus.string = '';
        this.accountInput.node.scale = 1;
        this.passwordInput.node.scale = 1;
        this.resetPasswordNode.node.active = true;
        this.LoginButton.active = true;
        this.registerButton.active = true;
    };
    __decorate([
        property(cc.Node)
    ], Login.prototype, "LoginPopup", void 0);
    __decorate([
        property(cc.Node)
    ], Login.prototype, "LoginPopupMask", void 0);
    __decorate([
        property(cc.Node)
    ], Login.prototype, "LoginButton", void 0);
    __decorate([
        property(cc.Node)
    ], Login.prototype, "registerButton", void 0);
    __decorate([
        property(cc.Label)
    ], Login.prototype, "LoginStatus", void 0);
    __decorate([
        property(cc.Label)
    ], Login.prototype, "resetPasswordNode", void 0);
    __decorate([
        property(cc.Prefab)
    ], Login.prototype, "loadingPrefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], Login.prototype, "resetPassword", void 0);
    __decorate([
        property(cc.Prefab)
    ], Login.prototype, "registerAccount", void 0);
    __decorate([
        property(cc.Prefab)
    ], Login.prototype, "popupPrefab", void 0);
    __decorate([
        property(cc.EditBox)
    ], Login.prototype, "accountInput", void 0);
    __decorate([
        property(cc.EditBox)
    ], Login.prototype, "passwordInput", void 0);
    __decorate([
        property(cc.Prefab)
    ], Login.prototype, "messagePrefab", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], Login.prototype, "messageTitle", void 0);
    Login = __decorate([
        ccclass
    ], Login);
    return Login;
}(cc.Component));
exports.default = Login;

cc._RF.pop();