"use strict";
cc._RF.push(module, 'b702acSjzVPT6p5ypKA35ta', 'Business');
// scripts/Home/script/Business.ts

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
// 第一次切换
// let onlyToggle = true;
/**
 * 首页左侧商家脚本
 */
var HomeBusiness = /** @class */ (function (_super) {
    __extends(HomeBusiness, _super);
    function HomeBusiness() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 侧边栏容器
        _this.sideBox = null;
        // 侧边栏箭头
        _this.sideArrow = null;
        // 侧边栏状态
        _this.sideState = true;
        // 移动状态
        _this.sideMoveState = false;
        return _this;
        // update (dt) {}
    }
    HomeBusiness.prototype.start = function () {
        this.toggleSide();
    };
    /**
     * 侧栏切换
     */
    HomeBusiness.prototype.toggleSide = function (_e, eventType) {
        var _this = this;
        var sideState = this.sideState;
        if (this.sideMoveState === false) {
            this.sideMoveState = true;
            var duration = eventType === 'userEvent' ? .5 : 0;
            this.sideArrow.runAction(cc.rotateTo(duration, sideState ? 0 : 180));
            this.sideBox.runAction(cc.sequence(cc.moveTo(duration / 2, sideState ? 60 : 180, 0).easing(cc.easeBackIn()), cc.callFunc(function () {
                _this.sideState = !sideState;
                _this.sideMoveState = false;
            })));
        }
    };
    __decorate([
        property(cc.Node)
    ], HomeBusiness.prototype, "sideBox", void 0);
    __decorate([
        property(cc.Node)
    ], HomeBusiness.prototype, "sideArrow", void 0);
    HomeBusiness = __decorate([
        ccclass
    ], HomeBusiness);
    return HomeBusiness;
}(cc.Component));
exports.default = HomeBusiness;

cc._RF.pop();