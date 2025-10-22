"use strict";
cc._RF.push(module, 'a27b5zPSu5IHKpG4XARzbby', 'userCenter-info');
// scripts/Home/user/userCenter-info.ts

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
var state_1 = require("../../utils/state");
var tool_1 = require("../../../scripts/lib/tool");
var axiosUtils_1 = require("../../utils/axiosUtils");
var NewClass = /** @class */ (function (_super) {
    __extends(NewClass, _super);
    function NewClass() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 账号id
        _this.id = null;
        // 昵称
        _this.nickName = null;
        // 头像
        _this.avatar = null;
        // gender man
        _this.man = null;
        // gender woman
        _this.woman = null;
        // 账号
        _this.account = null;
        // 手机号
        _this.mobile = null;
        return _this;
        // update (dt) {}
    }
    NewClass.prototype.start = function () {
        var _this = this;
        var _a = state_1.default.userInfo, nickname = _a.nickname, id = _a.id, avatarUrl = _a.avatarUrl, account = _a.account, gender = _a.gender, mobile = _a.mobile;
        this.nickName.string = nickname;
        this.id.string = 'ID: ' + (id || '000000').toString();
        this.account.string = account.toString();
        tool_1.loadImg(avatarUrl, function (spriteFrame) {
            _this.avatar.spriteFrame = spriteFrame;
        }, 'avatar', id);
        var emptyRadio = this.woman.spriteFrame;
        gender === 1
            ? (this.woman.spriteFrame = this.man.spriteFrame) && (this.man.spriteFrame = emptyRadio)
            : null;
        this.mobile.string = mobile;
    };
    /**
     * 退出登录
     */
    NewClass.prototype.outLogin = function () {
        localStorage.clear();
        state_1.default.io.disconnect();
        cc.director.loadScene('loginPage');
    };
    /**
     * 更换头像
     */
    NewClass.prototype.resetAvatar = function () {
        axiosUtils_1.default.api('get_reset_avatar').then(function (res) {
            tool_1.uploadFile(res, state_1.default.userInfo.id)
                .then(function (res) {
                console.log(res);
            })
                .catch(function (err) {
                console.log(err);
            });
        });
    };
    NewClass.prototype.close = function () {
        this.node.destroy();
    };
    __decorate([
        property(cc.Label)
    ], NewClass.prototype, "id", void 0);
    __decorate([
        property(cc.EditBox)
    ], NewClass.prototype, "nickName", void 0);
    __decorate([
        property(cc.Sprite)
    ], NewClass.prototype, "avatar", void 0);
    __decorate([
        property(cc.Sprite)
    ], NewClass.prototype, "man", void 0);
    __decorate([
        property(cc.Sprite)
    ], NewClass.prototype, "woman", void 0);
    __decorate([
        property(cc.Label)
    ], NewClass.prototype, "account", void 0);
    __decorate([
        property(cc.Label)
    ], NewClass.prototype, "mobile", void 0);
    NewClass = __decorate([
        ccclass
    ], NewClass);
    return NewClass;
}(cc.Component));
exports.default = NewClass;

cc._RF.pop();