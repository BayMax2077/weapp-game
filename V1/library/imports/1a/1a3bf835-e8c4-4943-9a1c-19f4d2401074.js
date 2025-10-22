"use strict";
cc._RF.push(module, '1a3bfg16MRJQ5ocGfTSQBB0', 'loading');
// scripts/Loading/loading.ts

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
var ProgressLoading = /** @class */ (function (_super) {
    __extends(ProgressLoading, _super);
    function ProgressLoading() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 进度条
        _this.ProgressBar = null;
        // 进度百分比节点
        _this.ProgressText = null;
        // 加载状态信息
        _this.ProgressMessage = null;
        // 当前进度
        _this.progress = 0;
        return _this;
    }
    // start () {
    //     // setInterval(() => {
    //     //     this.updateValue(this.progress > 1 ? 0 : this.progress += 0.01)
    //     // }, 50)
    // }
    /**
     * 完成时
     * @param callback 回调
     */
    ProgressLoading.prototype.startLoading = function (callback) {
        this.startLoadingCallBack = callback;
    };
    /**
     * 进度完成时
     * @param callback 回调函数
     */
    ProgressLoading.prototype.endLoading = function (callback) {
        this.endLoadingCallBack = callback;
    };
    /**
     * 更新进度
     * @param progress 进度值
     * @param message  进度内容
     */
    ProgressLoading.prototype.updateValue = function (progress, message) {
        this.progress = progress;
        this.progressRender();
        if (message) {
            this.ProgressMessage.string = message;
        }
    };
    /**
     * 加载渲染
     */
    ProgressLoading.prototype.progressRender = function () {
        var progress = this.progress > 1 ? 1 : this.progress;
        this.ProgressBar.progress = progress;
        this.ProgressText.string = String(Math.round(progress * 100));
    };
    __decorate([
        property(cc.ProgressBar)
    ], ProgressLoading.prototype, "ProgressBar", void 0);
    __decorate([
        property(cc.Label)
    ], ProgressLoading.prototype, "ProgressText", void 0);
    __decorate([
        property(cc.Label)
    ], ProgressLoading.prototype, "ProgressMessage", void 0);
    ProgressLoading = __decorate([
        ccclass
    ], ProgressLoading);
    return ProgressLoading;
}(cc.Component));
exports.default = ProgressLoading;

cc._RF.pop();