"use strict";
cc._RF.push(module, '9ca39NtgeFMmpAcpXSt1FEi', 'userGameSetting');
// scripts/Home/user/userGameSetting.ts

"use strict";
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
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
var UserGameSetting = /** @class */ (function (_super) {
    __extends(UserGameSetting, _super);
    function UserGameSetting() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 音乐节点
        _this.musicVolume = null;
        // 音效节点
        _this.effectVolume = null;
        // 背景音乐是否开启节点
        _this.bgm = null;
        // 游戏帧数节点
        _this.fps = null;
        // 是否初始化结束
        _this.initState = false;
        return _this;
    }
    UserGameSetting.prototype.start = function () {
        var config = state_1.default.system.config;
        console.log(this.musicVolume);
        this.musicVolume.progress = config.volume.music;
        this.effectVolume.progress = config.volume.effects;
        this.setToggleFouse(this.bgm, config.bgm);
        this.setToggleFouse(this.fps, config.fps);
        this.initState = true;
    };
    UserGameSetting.prototype.setToggleFouse = function (ToggleContainer, value) {
        var children = ToggleContainer.node.children;
        for (var _i = 0, children_1 = children; _i < children_1.length; _i++) {
            var chi = children_1[_i];
            if (chi._name === value) {
                chi.getComponent(cc.Toggle).check();
                break;
            }
        }
    };
    /**
     * 修改音量时
     * @param e 参数
     */
    UserGameSetting.prototype.MusicVolumeChang = function (e) {
        var volume = state_1.default.system.config.volume;
        volume.music = e.progress;
        state_1.default.system.updateSetting();
    };
    /**
     * 修改音量时
     * @param e 参数
     */
    UserGameSetting.prototype.EffectVolumeChang = function (e) {
        var volume = state_1.default.system.config.volume;
        volume.effects = e.progress;
        state_1.default.system.updateSetting();
    };
    /**
     * 修改BGM时
     * @param e 参数
     */
    UserGameSetting.prototype.BgmChang = function (e) {
        state_1.default.system.config.bgm = e.target.name === 'on';
        state_1.default.system.updateSetting();
    };
    /**
     * 修改FPS选项时
     * @param e 参数
     */
    UserGameSetting.prototype.FpsChang = function (e) {
        state_1.default.system.config.fps = e.target.name;
        state_1.default.system.updateSetting(this.initState);
    };
    __decorate([
        property(cc.Slider)
    ], UserGameSetting.prototype, "musicVolume", void 0);
    __decorate([
        property(cc.Slider)
    ], UserGameSetting.prototype, "effectVolume", void 0);
    __decorate([
        property(cc.ToggleContainer)
    ], UserGameSetting.prototype, "bgm", void 0);
    __decorate([
        property(cc.ToggleContainer)
    ], UserGameSetting.prototype, "fps", void 0);
    UserGameSetting = __decorate([
        ccclass
    ], UserGameSetting);
    return UserGameSetting;
}(cc.Component));
exports.default = UserGameSetting;

cc._RF.pop();