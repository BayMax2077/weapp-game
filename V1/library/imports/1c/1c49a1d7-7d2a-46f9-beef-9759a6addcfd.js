"use strict";
cc._RF.push(module, '1c49aHXfSpG+b7vl1mmrdz9', 'GroupLoading');
// resources/prefab/script/GroupLoading.ts

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
var GroupLoading = /** @class */ (function (_super) {
    __extends(GroupLoading, _super);
    function GroupLoading() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 点
        _this.spot = [];
        // 背景
        _this.backage = null;
        // 内容
        _this.info = null;
        return _this;
    }
    GroupLoading.prototype.start = function () {
        var _this = this;
        // 背景渐显
        this.backage.opacity = 0;
        this.backage.runAction(cc.fadeIn(.5));
        // 加载中效果
        var spotNum = 0;
        this.clock = setInterval(function () {
            _this.spot[spotNum].runAction(cc.sequence(cc.scaleTo(.5, 1.2, 1.2).easing(cc.easeSineInOut()), cc.scaleTo(.2, .6, .3).easing(cc.easeSineInOut())));
            _this.info.runAction(cc.rotateTo(.3, spotNum === 0 ? -5 : spotNum === 1 ? 0 : 5).easing(cc.easeSineInOut()));
            if (++spotNum === 3)
                spotNum = 0;
        }, 1000);
    };
    /**
     * 关计时器
     */
    GroupLoading.prototype.close = function () {
        var _this = this;
        clearInterval(this.clock);
        this.backage.runAction(cc.sequence(cc.fadeOut(.5), cc.callFunc(function () { return _this.node.destroy(); })));
    };
    GroupLoading.prototype.onDestroy = function () {
        clearInterval(this.clock);
    };
    __decorate([
        property(cc.Node)
    ], GroupLoading.prototype, "spot", void 0);
    __decorate([
        property(cc.Node)
    ], GroupLoading.prototype, "backage", void 0);
    __decorate([
        property(cc.Node)
    ], GroupLoading.prototype, "info", void 0);
    GroupLoading = __decorate([
        ccclass
    ], GroupLoading);
    return GroupLoading;
}(cc.Component));
exports.default = GroupLoading;

cc._RF.pop();