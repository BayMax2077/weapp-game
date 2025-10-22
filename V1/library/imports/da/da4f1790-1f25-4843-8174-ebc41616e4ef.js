"use strict";
cc._RF.push(module, 'da4f1eQHyVIQ4F068QWFuTv', 'EliminatingPanel');
// scripts/Games/eliminatingScene/script/EliminatingPanel.ts

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
var state_1 = require("../../../utils/state");
var EliminatingPanel = /** @class */ (function (_super) {
    __extends(EliminatingPanel, _super);
    function EliminatingPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 实体星星
        _this.starEntity = null;
        // 三星
        _this.stars = [];
        // 获得星星音效
        _this.starAudio = null;
        // 背景
        _this.backage = null;
        // 容器
        _this.box = null;
        // 关卡名字
        _this.names = null;
        // 分数
        _this.score = null;
        return _this;
    }
    EliminatingPanel.prototype.start = function () {
        // 背景渐显
        this.backage.opacity = 0;
        this.backage.runAction(cc.fadeTo(.5, 125));
        // 容器弹出动画
        this.box.y += this.box.height;
        this.box.runAction(cc.moveBy(.5, 0, -this.box.height).easing(cc.easeBackInOut()));
    };
    /**
     * 初始化内容
     * @param options 参数
     */
    EliminatingPanel.prototype.init = function (options) {
        var _this = this;
        this.names.string = options.names;
        options.score && (this.score.string = options.score);
        options.star && setTimeout(function () { return _this.setStar(options.star); }, 500);
    };
    /**
     * 按下开始游戏
     */
    EliminatingPanel.prototype.playGame = function () {
        state_1.default.tips('功能暂未开放, 请选择 "无限模式"!', 5, false, 2);
        // TODO: 暂未开放的关卡内容
        // cc.loader.loadRes('prefab/GroupLoading', (_err, prefab) => {
        //     const instantiate = cc.instantiate(prefab);
        //     cc.director.getScene().addChild(instantiate);
        //     cc.director.preloadScene('gameEliminating', (_err) => {
        //         instantiate.getComponent('GroupLoading').close();
        //         cc.director.loadScene('gameEliminating');
        //     });
        //     cc.director.loadScene(gameName);
        // });
    };
    /**
     * 设置岛屿的星数
     * @param starNumber  星数
     * @param index       当前星下标
     * @param audioEffect 是否播放音效
     */
    EliminatingPanel.prototype.setStar = function (starNumber, index, audioEffect) {
        var _this = this;
        if (index === void 0) { index = 0; }
        if (audioEffect === void 0) { audioEffect = false; }
        var star = this.stars[index];
        var scale = star.node.scale;
        star.spriteFrame = this.starEntity;
        star.node.runAction(cc.sequence(cc.scaleTo(.2, scale + .5), cc.scaleTo(.2, scale), cc.callFunc(function () {
            if (--starNumber)
                _this.setStar(starNumber, ++index, audioEffect);
            audioEffect && cc.audioEngine.playEffect(_this.starAudio, false);
        })));
    };
    /**
     * 关闭
     */
    EliminatingPanel.prototype.close = function () {
        this.node.destroy();
    };
    __decorate([
        property(cc.SpriteFrame)
    ], EliminatingPanel.prototype, "starEntity", void 0);
    __decorate([
        property(cc.Sprite)
    ], EliminatingPanel.prototype, "stars", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], EliminatingPanel.prototype, "starAudio", void 0);
    __decorate([
        property(cc.Node)
    ], EliminatingPanel.prototype, "backage", void 0);
    __decorate([
        property(cc.Node)
    ], EliminatingPanel.prototype, "box", void 0);
    __decorate([
        property(cc.Label)
    ], EliminatingPanel.prototype, "names", void 0);
    __decorate([
        property(cc.Label)
    ], EliminatingPanel.prototype, "score", void 0);
    EliminatingPanel = __decorate([
        ccclass
    ], EliminatingPanel);
    return EliminatingPanel;
}(cc.Component));
exports.default = EliminatingPanel;

cc._RF.pop();