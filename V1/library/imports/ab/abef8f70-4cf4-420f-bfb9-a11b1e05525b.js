"use strict";
cc._RF.push(module, 'abef89wTPRCD7+5oRseBVJb', 'stopGames');
// resources/prefab/script/stopGames.ts

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
var prefabTool_1 = require("../utils/prefabTool");
var ccclass = cc._decorator.ccclass;
var StopGames = /** @class */ (function (_super) {
    __extends(StopGames, _super);
    function StopGames() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.backEvent = null;
        _this.backHomeEvent = null;
        /**
         * 分享数据
         */
        _this.shareData = {
            title: '',
            imageUrl: undefined,
            query: undefined,
        };
        return _this;
    }
    /**
     * 继续按钮
     */
    StopGames.prototype.back = function () {
        this.node.destroy();
        this.backEvent && this.backEvent();
    };
    /**
     * 返回首页
     */
    StopGames.prototype.onHome = function () {
        this.back();
        this.backHomeEvent && this.backHomeEvent();
    };
    /**
     * 分享时
     */
    StopGames.prototype.onShare = function () {
        var _a = this.shareData, title = _a.title, imageUrl = _a.imageUrl, query = _a.query;
        prefabTool_1.shareAppMessage(title, imageUrl, query);
    };
    StopGames = __decorate([
        ccclass
    ], StopGames);
    return StopGames;
}(cc.Component));
exports.default = StopGames;

cc._RF.pop();