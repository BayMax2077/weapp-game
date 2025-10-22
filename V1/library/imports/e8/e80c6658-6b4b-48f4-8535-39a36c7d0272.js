"use strict";
cc._RF.push(module, 'e80c6ZYa0tI9IU1OaNsfQJy', 'overScript');
// scripts/Games/over/overScript.ts

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
var tool_1 = require("../../../scripts/lib/tool");
var axiosUtils_1 = require("../../utils/axiosUtils");
var ItemData = cc.Class({
    name: 'itemData',
    properties: {
        key: cc.Label,
        value: cc.Label,
    },
});
var UserItem = cc.Class({
    name: 'userItem',
    properties: {
        nickname: cc.Label,
        avatarUrl: cc.Sprite,
        score: cc.Label,
        item: {
            default: [],
            type: ItemData,
        },
        winner: cc.Node,
        Node: cc.Node,
    },
});
var GameOver = /** @class */ (function (_super) {
    __extends(GameOver, _super);
    function GameOver() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.UserItem = [];
        // 房间ID
        _this.roomId = null;
        // 时间
        _this.Time = null;
        // 预览节点
        _this.preview = null;
        // 预览容器
        _this.previewBox = null;
        // 预览状态
        _this.privateState = false;
        // 预览节点 图像
        _this.previewSprite = [];
        return _this;
        // update (dt) {}
    }
    GameOver.prototype.onLoad = function () {
        this.UserItem.forEach(function (item) { return (item.Node.scale = 0); });
    };
    /**
     * 初始化
     * @param players - 玩家
     * @param time    - 结束时间
     * @param roomId  - 房间号
     */
    GameOver.prototype.init = function (initData) {
        var UserItem = this.UserItem;
        var players = initData.players;
        players.forEach(function (item, index) {
            var userItem = UserItem[index];
            setTimeout(function () {
                userItem.Node.runAction(cc.scaleTo(1, 0.314, 0.456).easing(cc.easeBackOut()));
            }, index * 100);
            userItem.nickname.string = item.nickname;
            console.log(item.score);
            userItem.score.string = String(item.score);
            userItem.avatarUrl.spriteFrame = item.avatarUrl;
            // 得分项目
            var params = item.item;
            var i = 0;
            for (var key in params) {
                var keyName = initData.itemKey[key] || key;
                var keyValue = params[key];
                userItem.item[i].key.string = keyName;
                userItem.item[i].value.string = keyValue;
                i++;
            }
            // 赢家
            if (item.winner) {
                userItem.winner.opacity = 255;
            }
        });
        this.roomId.string = '房间号：' + ('000000' + initData.roomId).substr(-6);
        this.Time.string = tool_1.dateFrom('yyyy/MM/dd HH:mm:ss', initData.time);
    };
    /**
     * 预览切换
     */
    GameOver.prototype.previewToggle = function () {
        var privateState = this.privateState;
        this.previewBox.active = privateState;
        this.preview.spriteFrame = this.previewSprite[privateState ? 0 : 1];
        this.privateState = !privateState;
    };
    /**
     * 返回大厅
     */
    GameOver.prototype.backHome = function () {
        cc.director.loadScene('Home');
        axiosUtils_1.default.api('room_exit', {
            data: {
                roomCode: this.roomId.string,
            },
        }).then(function () { });
    };
    __decorate([
        property(UserItem)
    ], GameOver.prototype, "UserItem", void 0);
    __decorate([
        property(cc.Label)
    ], GameOver.prototype, "roomId", void 0);
    __decorate([
        property(cc.Label)
    ], GameOver.prototype, "Time", void 0);
    __decorate([
        property(cc.Sprite)
    ], GameOver.prototype, "preview", void 0);
    __decorate([
        property(cc.Node)
    ], GameOver.prototype, "previewBox", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], GameOver.prototype, "previewSprite", void 0);
    GameOver = __decorate([
        ccclass
    ], GameOver);
    return GameOver;
}(cc.Component));
exports.default = GameOver;

cc._RF.pop();