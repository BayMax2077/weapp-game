"use strict";
cc._RF.push(module, '9d0402Z/e9OHp2H2+NAPOmk', 'popup');
// resources/prefab/script/popup.ts

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
var Popup = /** @class */ (function (_super) {
    __extends(Popup, _super);
    function Popup() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 内容文本
        _this.text = null;
        // 弹窗主体
        _this.popupBox = null;
        // 关闭按钮
        _this.closeButton = null;
        // 成功按钮
        _this.successButton = null;
        // 重置按钮
        _this.resetButton = null;
        // 音效
        _this.clip = null;
        // 关闭事件
        _this.closeEvent = null;
        // 确认事件
        _this.successEvent = null;
        // 重置事件
        _this.resetEvent = null;
        return _this;
    }
    Popup.prototype.start = function () {
        var popupBox = this.popupBox;
        popupBox.scale = 0;
        popupBox.runAction(cc.scaleTo(.3, 1, 1).easing(cc.easeBackInOut()));
    };
    /**
     * 初始化
     * @param message - 内容
     * @param option  - 参数
     */
    Popup.prototype.init = function (message) {
        this.text.string = message;
        cc.audioEngine.playEffect(this.clip, false);
    };
    /**
     * 设置事件
     * @param event - 事件体
     * @param show  - 是否显示
     */
    Popup.prototype.setEvent = function (buttonName, event, show) {
        this[buttonName + 'Event'] = event;
        var to = show !== undefined
            ? show
            : event === null ? 0 : 1.202;
        this[buttonName + 'Button'].runAction(cc.scaleTo(0.5, to, to).easing(cc.easeBackOut()));
    };
    Popup.prototype.message = function (message) {
        this.text.string = message;
    };
    Popup.prototype.reset = function () {
        this.resetEvent && this.resetEvent();
    };
    Popup.prototype.success = function () {
        this.successEvent && this.successEvent();
    };
    /**
     * 关闭时
     */
    Popup.prototype.close = function () {
        var _this = this;
        var popupBox = this.popupBox;
        popupBox.runAction(cc.sequence(cc.scaleTo(0.3, 0, 0).easing(cc.easeBackIn()), cc.callFunc(function () { return _this.node.destroy(); })));
        this.closeEvent && this.closeEvent();
    };
    __decorate([
        property(cc.Label)
    ], Popup.prototype, "text", void 0);
    __decorate([
        property(cc.Node)
    ], Popup.prototype, "popupBox", void 0);
    __decorate([
        property(cc.Node)
    ], Popup.prototype, "closeButton", void 0);
    __decorate([
        property(cc.Node)
    ], Popup.prototype, "successButton", void 0);
    __decorate([
        property(cc.Node)
    ], Popup.prototype, "resetButton", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], Popup.prototype, "clip", void 0);
    Popup = __decorate([
        ccclass
    ], Popup);
    return Popup;
}(cc.Component));
exports.default = Popup;

cc._RF.pop();