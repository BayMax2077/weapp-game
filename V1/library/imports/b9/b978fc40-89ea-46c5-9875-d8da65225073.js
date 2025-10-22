"use strict";
cc._RF.push(module, 'b978fxAiepGxZh12NplIlBz', 'Home');
// scripts/Home/Home.ts

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
var tool_1 = require("../lib/tool");
var tool_2 = require("../lib/tool");
var state_1 = require("../utils/state");
var axiosUtils_1 = require("../utils/axiosUtils");
var socketIO_1 = require("../lib/socketIO");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
// socket初始化
socketIO_1.default.init();
// 是否为第一次打开
var onlyOpen = false;
var Home = /** @class */ (function (_super) {
    __extends(Home, _super);
    function Home() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 活动资源
        _this.ActivityPrefab = null;
        // 邮件资源
        _this.EmailPrefab = null;
        // 商城资源
        _this.ShopPrefab = null;
        // 用户中心
        _this.UserCenter = null;
        // 背景一
        _this.bg = null;
        // 背景二
        _this.bg2 = null;
        // 背景一 图标
        _this.bgIcon = null;
        // 背景二 图标
        _this.bg2Icon = null;
        // 右上角节点
        _this.rightTopBar = null;
        // 左侧栏目
        _this.leftBox = null;
        // 背景状态
        _this.bgStatus = true;
        return _this;
    }
    Home.prototype.onLoad = function () {
        // 登录检测
        var userInfo = localStorage.getItem('userInfo');
        if (!userInfo) {
            cc.director.loadScene('loginPage');
            return !1;
        }
        axiosUtils_1.default.api('room_exit').then(function () { });
        // 如果非微信小游戏则不进行填充
        if (!cc.sys.platform === cc.sys.WECHAT_GAME) {
            this.rightTopBar.getComponent(cc.Widget).right = 0;
        }
    };
    Home.prototype.start = function () {
        // 默认打开的内容
        if (!onlyOpen) {
            this.openPopup(false, 'ActivityPrefab', function () {
                setTimeout(function () {
                    // 回来提示
                    state_1.default.tips("\u6B22\u8FCE\u56DE\u6765, " + state_1.default.userInfo.nickname + "!", 5, true);
                }, 700);
            });
            onlyOpen = true;
        }
        // 刘海兼容适配
        tool_2.screenFringe([this.leftBox]);
        // BGM音量
        this.node.getComponent(cc.AudioSource).volume = state_1.default.system.config.volume.music;
    };
    /**
     * 打开游戏
     * @param _event   - 事件体
     * @param gameName - 游戏名
     */
    Home.prototype.openGame = function (_event, gameName) {
        cc.loader.loadRes('prefab/groupLoading', function (_err, prefab) {
            var instantiate = cc.instantiate(prefab);
            cc.director.getScene().addChild(instantiate);
            cc.director.preloadScene(gameName, function (_err) {
                instantiate.getComponent('GroupLoading').close();
                cc.director.loadScene(gameName);
            });
            // cc.director.loadScene(gameName);
        });
    };
    /**
     * 打开弹窗
     * @param _event    - 事件体
     * @param popupName - 弹窗名
     */
    Home.prototype.openPopup = function (_event, popupName, closeCallBack) {
        var instantiate = cc.instantiate(this[popupName]);
        var script = instantiate.getComponent(popupName.replace('Prefab', ''));
        if (closeCallBack && script)
            script.closeCallBack = closeCallBack;
        cc.director.getScene().addChild(instantiate);
    };
    /**
     * 背景切换
     */
    Home.prototype.backageSwitch = function () {
        this.bgStatus = !this.bgStatus;
        var bgStatus = this.bgStatus;
        this.bg.node.runAction(!bgStatus ? cc.fadeOut(1) : cc.fadeIn(1));
        this.bg2.node.runAction(bgStatus ? cc.fadeOut(1) : cc.fadeIn(1));
        this.bgIcon.scale = bgStatus ? 1 : 0;
        this.bg2Icon.scale = bgStatus ? 0 : 1;
    };
    /**
     * 打开商城
     * @param _e        - 事件
     * @param shopIndex - 商城菜单
     */
    Home.prototype.openShop = function (_e, shopIndex) {
        var instantiate = cc.instantiate(this.ShopPrefab);
        instantiate.getComponent('Shop').defaultTarget = shopIndex;
        cc.director.getScene().addChild(instantiate);
    };
    Home.prototype.onDestroy = function () {
        tool_1.setAutoRecursively([
            '68b61513-780a-4964-9622-adbea2867cda',
            '0b7da469-5226-4405-aad7-56210d04d191'
        ]);
    };
    __decorate([
        property(cc.Prefab)
    ], Home.prototype, "ActivityPrefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], Home.prototype, "EmailPrefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], Home.prototype, "ShopPrefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], Home.prototype, "UserCenter", void 0);
    __decorate([
        property(cc.Sprite)
    ], Home.prototype, "bg", void 0);
    __decorate([
        property(cc.Sprite)
    ], Home.prototype, "bg2", void 0);
    __decorate([
        property(cc.Node)
    ], Home.prototype, "bgIcon", void 0);
    __decorate([
        property(cc.Node)
    ], Home.prototype, "bg2Icon", void 0);
    __decorate([
        property(cc.Node)
    ], Home.prototype, "rightTopBar", void 0);
    __decorate([
        property(cc.Node)
    ], Home.prototype, "leftBox", void 0);
    Home = __decorate([
        ccclass
    ], Home);
    return Home;
}(cc.Component));
exports.default = Home;

cc._RF.pop();