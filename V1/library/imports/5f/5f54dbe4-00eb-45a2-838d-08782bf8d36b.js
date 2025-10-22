"use strict";
cc._RF.push(module, '5f54dvkAOtFooONCHgr+NNr', 'Tips');
// resources/prefab/script/Tips.ts

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
var NewClass = /** @class */ (function (_super) {
    __extends(NewClass, _super);
    function NewClass() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.body = null;
        // 内容
        _this.text = null;
        // 音效
        _this.clip = null;
        // 图标节点
        _this.iconNode = null;
        // 图标合集
        _this.icons = [];
        return _this;
        // update (dt) {}
    }
    NewClass.prototype.onDestroy = function () {
        clearTimeout(this.clock);
    };
    /**
     * 设置内容
     * @param content 内容
     * @param timeout 消失时间
     * @param effect  是否播放音效
     * @param icon    图标（-1：不显示，1：成功，2：失败，3：警告）
     */
    NewClass.prototype.setContent = function (content, timeout, effect, icon) {
        var _this = this;
        if (effect === void 0) { effect = false; }
        if (icon === void 0) { icon = -1; }
        this.body.runAction(cc.moveTo(.7, 0, 230).easing(cc.easeBounceInOut()));
        this.text.string = content;
        effect && cc.audioEngine.playEffect(this.clip, false);
        if (icon !== -1)
            this.iconNode.spriteFrame = this.icons[icon];
        if (timeout) {
            clearTimeout(this.clock);
            this.clock = setTimeout(function () { return _this.close(); }, timeout * 1000);
        }
    };
    /**
     * 关闭
     */
    NewClass.prototype.close = function () {
        var _this = this;
        this.body.runAction(cc.sequence(cc.moveTo(.5, 0, 420), cc.callFunc(function () { return _this.node.destroy(); })));
    };
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "body", void 0);
    __decorate([
        property(cc.Label)
    ], NewClass.prototype, "text", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], NewClass.prototype, "clip", void 0);
    __decorate([
        property(cc.Sprite)
    ], NewClass.prototype, "iconNode", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], NewClass.prototype, "icons", void 0);
    NewClass = __decorate([
        ccclass
    ], NewClass);
    return NewClass;
}(cc.Component));
exports.default = NewClass;

cc._RF.pop();