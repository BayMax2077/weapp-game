"use strict";
cc._RF.push(module, 'bce5byPBNpHkqKDC35WSjWM', 'qz');
// scripts/Games/wzq/qz.ts

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
var GoBangQz = /** @class */ (function (_super) {
    __extends(GoBangQz, _super);
    function GoBangQz() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.qzH = null;
        _this.qzB = null;
        _this.point = {
            // 行
            row: 0,
            // 列
            col: 0,
            // 棋子类型 0：黑子  1：白子
            pieceType: -1,
        };
        _this.pieceAudio = null;
        _this.pieceType = -1;
        return _this;
        // update (dt) {}
    }
    /**
     * 初始化
     */
    GoBangQz.prototype.init = function (point) {
        this.point = point;
    };
    /**
     * 点击事件
     * @param pieceType - 棋子类型 0：黑子  1：白子
     */
    GoBangQz.prototype.onClick = function (pieceType) {
        pieceType = typeof pieceType === 'number' ? pieceType : this.pieceType;
        var _a = this, point = _a.point, game = _a.game;
        var row = point.row, col = point.col;
        var pointObject = {
            x: col,
            y: row,
            s: pieceType,
        };
        if (point.pieceType === -1) {
            if (game.isMachine) {
                game.machineDownPiece(pointObject);
            }
            else {
                state_1.default.io.emit('goBang/setp', pointObject);
            }
        }
    };
    /**
     * io触发棋子显现
     * @param pieceType - 棋子类型 0：黑子  1：白子
     */
    GoBangQz.prototype.ioClick = function (pieceType) {
        pieceType = typeof pieceType === 'number' ? pieceType : this.pieceType;
        var point = this.point;
        if (point.pieceType === -1) {
            // pieceType = 1;
            point.pieceType = pieceType;
            this.qzB.scale = pieceType ? 1 : 0;
            this.qzH.scale = pieceType ? 0 : 1;
            cc.audioEngine.playEffect(this.pieceAudio, false);
            // 五子连通检测
            this.game.checkConnectivity(point, pieceType);
        }
    };
    __decorate([
        property(cc.Node)
    ], GoBangQz.prototype, "qzH", void 0);
    __decorate([
        property(cc.Node)
    ], GoBangQz.prototype, "qzB", void 0);
    __decorate([
        property({ visible: !1 })
    ], GoBangQz.prototype, "point", void 0);
    __decorate([
        property({
            type: cc.AudioClip,
        })
    ], GoBangQz.prototype, "pieceAudio", void 0);
    __decorate([
        property({ visible: !0 })
    ], GoBangQz.prototype, "pieceType", void 0);
    GoBangQz = __decorate([
        ccclass
    ], GoBangQz);
    return GoBangQz;
}(cc.Component));
exports.default = GoBangQz;

cc._RF.pop();