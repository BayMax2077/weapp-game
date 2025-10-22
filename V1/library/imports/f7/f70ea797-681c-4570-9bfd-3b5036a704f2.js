"use strict";
cc._RF.push(module, 'f70eaeXaBxFcJv9O1A2pwTy', 'CreateRoom');
// scripts/Home/script/CreateRoom.ts

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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var axiosUtils_1 = require("../../utils/axiosUtils");
var state_1 = require("../../utils/state");
/**
 * 游戏房间配置
 */
var gameOption = {
    gobang: {
        name: '五子棋',
        room: [
            ['人数', '2人'],
            ['局数', '1局'],
            ['支付', '房主支付'],
            ['密码', '公开'],
        ],
        keyword: ['people', 'frequency', 'payType', 'pwdType'],
        scene: 'gamesGoBang',
    },
    fourCards: {
        name: '四副牌',
        room: [
            ['人数', '4人', '2人(测试用)'],
            ['局数', '1局'],
            ['支付', '房主支付'],
            ['密码', '公开'],
        ],
        keyword: ['people', 'frequency', 'payType', 'pwdType'],
        scene: 'gameFourCards',
    },
    flightChess: {
        name: '飞行棋',
        room: [
            ['人数', '2人', '3人', '4人'],
            ['局数', '1局'],
            ['起飞', '6点', '3点', '3、6点'],
            ['密码', '公开'],
        ],
        keyword: ['people', 'frequency', 'takeOff', 'pwdType'],
        scene: 'gameFlightChess',
    },
};
/**
 * 选项实例
 */
var radioOption = [];
var CreateRoom = /** @class */ (function (_super) {
    __extends(CreateRoom, _super);
    function CreateRoom() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 主盒子
        _this.mainBox = null;
        // 左侧盒子
        _this.leftTopBox = null;
        // 大内容内容区域
        _this.ContentBoxView = null;
        // 选项组资源
        _this.radioGroup = null;
        // 列表资源
        _this.listItem = null;
        // 项目资源
        _this.itemSpriteFrame = [];
        // 弹窗
        _this.popupPrefab = null;
        // 当前选中的游戏名
        _this._ROOM_NAME_ = '';
        // 当前选中的GAME
        _this._GANE_ = {};
        // 项目节点列表
        _this.listItems = {};
        return _this;
    }
    CreateRoom.prototype.start = function () {
        var _this = this;
        var prveClick = null;
        // 创建按钮实例化
        Object.keys(gameOption).forEach(function (key, index) {
            var item = gameOption[key];
            var itemInstantiate = cc.instantiate(_this.listItem);
            var ListItem = itemInstantiate.getComponent('ListItem');
            ListItem.init({
                id: index,
                scale: .5,
                title: item.name,
                sprite: _this.itemSpriteFrame[index],
            });
            itemInstantiate.x -= itemInstantiate.x;
            itemInstantiate.y -= (index * 50) + itemInstantiate.height;
            _this.leftTopBox.addChild(itemInstantiate);
            ListItem.clickEvent = function () {
                prveClick && prveClick.blur();
                _this.loadPrefab(key);
                prveClick = ListItem;
                _this._ROOM_NAME_ = key;
            };
            if (index === 0) {
                ListItem.onClick();
            }
            _this.listItems[key] = ListItem;
        });
        // 渲染完成 回调
        this.renderCallBack && this.renderCallBack();
    };
    /**
     * 加载创建房间的设置资源
     * @param prefabName - 游戏名
     */
    CreateRoom.prototype.loadPrefab = function (prefabName) {
        var _this = this;
        this.ContentBoxView.destroyAllChildren();
        var gameOpt = gameOption[prefabName];
        if (gameOpt) {
            radioOption = [];
            this.ContentBoxView.height = 70;
            gameOpt.room.forEach(function (opt, index) {
                opt = Object.assign([], opt);
                var optGroup = cc.instantiate(_this.radioGroup);
                var radioScript = optGroup.getComponent('Radio');
                radioScript.init(opt.shift(), opt);
                _this.ContentBoxView.addChild(optGroup);
                optGroup.y -= index * 60 - 150;
                radioOption.push({
                    instantiate: optGroup,
                    script: radioScript,
                    config: opt[0],
                    keyword: gameOpt.keyword[index],
                });
                _this.ContentBoxView.height += 70;
            });
            this._GANE_ = gameOpt;
            cc.director.preloadScene(gameOpt.scene);
        }
    };
    /**
     * 界面隐藏
     * @param Action - 是否显示动画
     */
    CreateRoom.prototype.popupHide = function () {
        this.node.destroy();
    };
    /**
     * 创建房间按钮 按下事件
     */
    CreateRoom.prototype.onCreateRoom = function () {
        return __awaiter(this, void 0, void 0, function () {
            var query;
            var _this = this;
            return __generator(this, function (_a) {
                query = {};
                radioOption.forEach(function (item) {
                    query[item.keyword] = item.script.value - 1;
                });
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        axiosUtils_1.default
                            .api('create_room', {
                            params: {
                                gameName: _this._ROOM_NAME_,
                            },
                            data: query,
                        })
                            .then(function (res) {
                            var popup = cc.instantiate(_this.popupPrefab);
                            cc.director.getScene().addChild(popup);
                            var scriptPopup = popup.getComponent('popup');
                            scriptPopup.init('创建中...');
                            if (res.status) {
                                axiosUtils_1.default.api('room_info').then(function (res) {
                                    scriptPopup.message("\u521B\u5EFA\u6210\u529F!\n\u623F\u95F4\u53F7: " + res.roomCode);
                                    scriptPopup.setEvent('success', function () {
                                        popup.destroy();
                                        _this.node.destroy();
                                        cc.director.loadScene(_this._GANE_.scene);
                                    });
                                    resolve(scriptPopup);
                                });
                            }
                            else {
                                scriptPopup.message("\u521B\u5EFA\u5931\u8D25!\n" + res.msg);
                                // scriptPopup.setEvent('reset', () => {
                                //     this.createRoomClick();
                                // });
                                scriptPopup.setEvent('close', function () { });
                                reject(scriptPopup);
                            }
                        })
                            .catch(function () { return state_1.default.tips('界面打开失败!'); });
                    })];
            });
        });
    };
    __decorate([
        property(cc.Node)
    ], CreateRoom.prototype, "mainBox", void 0);
    __decorate([
        property(cc.Node)
    ], CreateRoom.prototype, "leftTopBox", void 0);
    __decorate([
        property(cc.Node)
    ], CreateRoom.prototype, "ContentBoxView", void 0);
    __decorate([
        property(cc.Prefab)
    ], CreateRoom.prototype, "radioGroup", void 0);
    __decorate([
        property(cc.Prefab)
    ], CreateRoom.prototype, "listItem", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], CreateRoom.prototype, "itemSpriteFrame", void 0);
    __decorate([
        property(cc.Prefab)
    ], CreateRoom.prototype, "popupPrefab", void 0);
    CreateRoom = __decorate([
        ccclass
    ], CreateRoom);
    return CreateRoom;
}(cc.Component));
exports.default = CreateRoom;

cc._RF.pop();