"use strict";
cc._RF.push(module, '0472fk3yqtKu40uurIS9mxe', 'EliminatingLand');
// scripts/Games/eliminatingScene/script/EliminatingLand.ts

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
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var EliminatingLand = /** @class */ (function (_super) {
    __extends(EliminatingLand, _super);
    function EliminatingLand() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 实体星星
        _this.starEntity = null;
        // 三星
        _this.stars = [];
        // 获得星星音效
        _this.starAudio = null;
        // 锁
        _this.lock = null;
        // 星父节点
        _this.Stars = null;
        // 关卡资源
        _this.Checkpoint = null;
        // 关卡名字
        _this.names = null;
        // 关卡ID
        _this.id = 0;
        return _this;
    }
    EliminatingLand.prototype.start = function () {
        this.lock.active = false;
    };
    /**
     * 初始化
     * @param recordData 历史数据
     * @param id         id
     * @param state      状态
     */
    EliminatingLand.prototype.init = function (recordData, id, state) {
        var _this = this;
        this.id = this.names.string = recordData ? recordData.id : id + 1;
        if (recordData) {
            this.recordData = recordData;
            this.setStar(recordData.star);
        }
        if (state) {
            setTimeout(function () {
                var isLand = _this.node.getComponent(cc.Button);
                isLand.enabled = true;
                isLand.interactable = false;
                _this.lock.active = true;
                _this.Stars.active = false;
            }, 100);
        }
    };
    /**
     * 设置岛屿的星数
     * @param starNumber  星数
     * @param index       当前星下标
     * @param audioEffect 是否播放音效
     */
    EliminatingLand.prototype.setStar = function (starNumber, index, audioEffect) {
        var _this = this;
        if (index === void 0) { index = 0; }
        if (audioEffect === void 0) { audioEffect = false; }
        var star = this.stars[index];
        star.spriteFrame = this.starEntity;
        var scale = star.node.scale;
        star.node.runAction(cc.sequence(cc.scaleTo(.2, scale + .5), cc.scaleTo(.2, scale), cc.callFunc(function () {
            if (--starNumber)
                _this.setStar(starNumber, ++index, audioEffect);
            audioEffect && cc.audioEngine.playEffect(_this.starAudio, false);
        })));
    };
    /**
     * 点开关卡
     */
    EliminatingLand.prototype.openCheckpoint = function () {
        var recordData = this.recordData;
        var _a = recordData || {}, id = _a.id, score = _a.score, star = _a.star;
        var Checkpoint = cc.instantiate(this.Checkpoint);
        var script = Checkpoint.getComponent('EliminatingPanel');
        script.init({
            names: id || this.id,
            star: star,
            score: score,
        });
        cc.director.getScene().addChild(Checkpoint);
    };
    __decorate([
        property(cc.SpriteFrame)
    ], EliminatingLand.prototype, "starEntity", void 0);
    __decorate([
        property(cc.Sprite)
    ], EliminatingLand.prototype, "stars", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], EliminatingLand.prototype, "starAudio", void 0);
    __decorate([
        property(cc.Node)
    ], EliminatingLand.prototype, "lock", void 0);
    __decorate([
        property(cc.Node)
    ], EliminatingLand.prototype, "Stars", void 0);
    __decorate([
        property(cc.Prefab)
    ], EliminatingLand.prototype, "Checkpoint", void 0);
    __decorate([
        property(cc.Label)
    ], EliminatingLand.prototype, "names", void 0);
    EliminatingLand = __decorate([
        ccclass
    ], EliminatingLand);
    return EliminatingLand;
}(cc.Component));
exports.default = EliminatingLand;

cc._RF.pop();