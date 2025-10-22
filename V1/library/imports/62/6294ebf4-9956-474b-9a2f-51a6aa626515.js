"use strict";
cc._RF.push(module, '6294ev0mVZHS5ovUaaqYmUV', 'HomeGames');
// scripts/Home/script/HomeGames.ts

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
var axiosUtils_1 = require("../../utils/axiosUtils");
var tool_1 = require("../../lib/tool");
cc.view.setResizeCallback(function (e) {
    var _a = cc.winSize, width = _a.width, height = _a.height;
    console.log();
    if (width < height) {
        console.log(cc.macro.ORIENTATION_LANDSCAPE);
        cc.view.setOrientation(cc.macro.ORIENTATION_PORTRAIT);
    }
});
var HomeGames = /** @class */ (function (_super) {
    __extends(HomeGames, _super);
    function HomeGames() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 创建房间资源
        _this.createRoomPrefab = null;
        // 滚动消息条
        _this.MessageBox = null;
        // 滚动消息内容
        _this.MessageContent = null;
        // 游戏列表
        _this.GameList = null;
        // 滚动消息列表
        _this.messageList = [];
        // 当前消息ID
        _this.messageId = 0;
        return _this;
    }
    HomeGames.prototype.start = function () {
        var _this = this;
        axiosUtils_1.default.api('get_home_message').then(function (messageList) { return _this.messageList = messageList; });
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            tool_1.onShow(this.wxShow, this);
        }
        // 加入房间检测
        this.joinUserRoom();
    };
    /**
     * 销毁时
     */
    HomeGames.prototype.onDestroy = function () {
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            tool_1.offShow(this.wxShow, this);
        }
    };
    /**
     * 显示为前台时
     * @param option 参数
     */
    HomeGames.prototype.wxShow = function (option) {
        tool_1.luanchOptions.query = option.query;
        this.joinUserRoom();
    };
    /**
     * 跳转到指定页面
     * @param pageIndex 页面下标
     */
    HomeGames.prototype.jumpPage = function (_e, pageIndex) {
        this.GameList.scrollToPage(Number(pageIndex), .5);
        // this.GameList.setCurrentPageIndex(pageIndex);
    };
    /**
     * 加入用户房间检测
     */
    HomeGames.prototype.joinUserRoom = function () {
        if (tool_1.luanchOptions.query.fn === 'joinRoom' && tool_1.luanchOptions.query.roomCode) {
            this.joinRoomEvent(tool_1.luanchOptions.query.roomCode);
            tool_1.luanchOptions.query = {};
        }
    };
    /**
     * 加入房间
     */
    HomeGames.prototype.joinRoom = function () {
        var that = this;
        cc.loader.loadRes('prefab/keyboard', cc.Prefab, function (err, prefab) {
            if (prefab) {
                var joinRoomPopup = cc.instantiate(prefab);
                cc.director.getScene().addChild(joinRoomPopup);
                joinRoomPopup && (joinRoomPopup.getComponent('keyboard').parentClass = {
                    emit: that.joinRoomEvent,
                });
            }
        });
    };
    /**
     * 加入房间事件
     * @param roomCode 房间号
     */
    HomeGames.prototype.joinRoomEvent = function (roomCode) {
        axiosUtils_1.default.api('room_join', {
            data: {
                roomCode: roomCode,
            },
        }).then(function (_a) {
            var status = _a.status, msg = _a.msg;
            if (status && msg && msg.scene) {
                cc.director.loadScene(msg.scene);
            }
            else {
                cc.loader.loadRes('prefab/popup', cc.Prefab, function (_err, prefab) {
                    if (prefab) {
                        var popup = cc.instantiate(prefab);
                        cc.director.getScene().addChild(popup);
                        var scriptPopup = popup.getComponent('popup');
                        scriptPopup.init('加入房间失败!\n' + msg);
                        scriptPopup.setEvent('close', function () { });
                    }
                });
            }
        });
    };
    /**
     * 随机加入房间
     */
    HomeGames.prototype.roomRandom = function () {
        axiosUtils_1.default.api('room_random').then(function (_a) {
            var status = _a.status, msg = _a.msg;
            if (status && msg && msg.scene) {
                cc.director.loadScene(msg.scene);
            }
            else {
                cc.loader.loadRes('prefab/popup', cc.Prefab, function (_err, prefab) {
                    if (prefab) {
                        var popup = cc.instantiate(prefab);
                        cc.director.getScene().addChild(popup);
                        var scriptPopup = popup.getComponent('popup');
                        if (msg === '房间不存在!') {
                            msg = '没有可用的房间!';
                        }
                        scriptPopup.init('加入房间失败!\n' + msg);
                        scriptPopup.setEvent('close', function () { });
                    }
                });
            }
        });
    };
    /**
     * 创建房间点击事件
     */
    HomeGames.prototype.showCreateRoomPopup = function (_e, gameName) {
        var createRoomPrefab = cc.instantiate(this.createRoomPrefab);
        cc.director.getScene().addChild(createRoomPrefab);
        var prefabScript = createRoomPrefab.getComponent('Room');
        if (!gameName) {
            return prefabScript.typeRoomModel();
        }
        if (typeof gameName === 'string') {
            var createRoom = prefabScript.createNode;
            var Room_1 = createRoom.getComponent('CreateRoom');
            prefabScript.createRoomModel();
            Room_1.renderCallBack = function () {
                console.log(Room_1.listItems[gameName], gameName);
                var current = Room_1.listItems[gameName];
                if (current) {
                    current.onClick();
                    var popup_1 = Room_1.onCreateRoom(function () { return popup_1.success(); });
                }
            };
        }
    };
    HomeGames.prototype.update = function () {
        // 消息滚动逻辑
        var _a = this, messageId = _a.messageId, messageList = _a.messageList, MessageContent = _a.MessageContent;
        if (MessageContent && messageList[messageId]) {
            var node = MessageContent.node;
            var MessageBoxWidth = this.MessageBox.width;
            //  如果完全超出最右方
            if (node.x < -node.width) {
                MessageContent.string = messageList[messageId].content;
                node.x = MessageBoxWidth;
                this.messageId++;
            }
            else {
                node.x -= .5;
            }
        }
        else {
            this.messageId = 0;
        }
    };
    __decorate([
        property(cc.Prefab)
    ], HomeGames.prototype, "createRoomPrefab", void 0);
    __decorate([
        property(cc.Node)
    ], HomeGames.prototype, "MessageBox", void 0);
    __decorate([
        property(cc.Label)
    ], HomeGames.prototype, "MessageContent", void 0);
    __decorate([
        property(cc.PageView)
    ], HomeGames.prototype, "GameList", void 0);
    HomeGames = __decorate([
        ccclass
    ], HomeGames);
    return HomeGames;
}(cc.Component));
exports.default = HomeGames;

cc._RF.pop();