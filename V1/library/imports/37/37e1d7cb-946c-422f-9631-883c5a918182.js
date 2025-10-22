"use strict";
cc._RF.push(module, '37e1dfLlGxCL5YxiDxakYGC', 'Eliminating');
// scripts/Games/eliminating/script/Eliminating.ts

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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Service_1 = require("./Service");
var state_1 = require("../../../utils/state");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
/**
 * 消消乐游戏场景类
 */
var Eliminating = /** @class */ (function (_super) {
    __extends(Eliminating, _super);
    function Eliminating() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 方格容器
        _this.blockBox = null;
        // 地图容器
        _this.mapBox = null;
        // 地图格资源
        _this.mapPrefab = null;
        // 方格资源
        _this.block = null;
        // 触摸位置存储
        _this.touch = {
            x: -1,
            y: -1,
        };
        // 是否正在交换
        _this.exchanging = false;
        return _this;
    }
    Eliminating.prototype.start = function () {
        // 为方格容器添加触摸事件
        this.blockBox.on(cc.Node.EventType.TOUCH_START, this.TOUCH_START, this);
        this.blockBox.on(cc.Node.EventType.TOUCH_END, this.TOUCH_END, this);
        // 生成随机性的地图
        var MapClass = Service_1.default.randomCreate(5, 11, {
            mapBox: this.mapBox,
            blockPrefab: this.block,
            mapPrefab: this.mapPrefab,
            blockBox: this.blockBox,
        });
        state_1.default.tips('消消乐功能正在开发和完善!', 5, false, 2);
        // MapClass.data.forEach((yItem, y) => {
        //     yItem.forEach((xItem, x) => this.createMapScript(++index, x, y, xItem));
        //     MapClass.MapScript = this.blocks;
        // });
        this.Map = MapClass;
    };
    /**
     * 触摸开始
     */
    Eliminating.prototype.TOUCH_START = function (event) {
        if (this.exchanging)
            return false;
        var touch = this.touch;
        var target = event.target;
        var _a = event.touch._point, x = _a.x, y = _a.y;
        touch.x = x -= target.x;
        touch.y = y -= target.y;
        this.currentBlock = this.targetBlock(touch.x, touch.y);
    };
    /**
     * 触摸结束
     */
    Eliminating.prototype.TOUCH_END = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var touch, target, _a, x, y, absX, absY, move, prevBlock, prevY, prevX, targetBlock, nextBlock, nextY, nextX, prev, p1Query, p2Query, asynData_1, destroyBlocks;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.exchanging)
                            return [2 /*return*/, false];
                        touch = this.touch;
                        target = event.target;
                        _a = event.touch._point, x = _a.x, y = _a.y;
                        x -= target.x;
                        y -= target.y;
                        absX = Math.abs(touch.x - x);
                        absY = Math.abs(touch.y - y);
                        move = {
                            x: absX > absY ? touch.x - x : 0,
                            y: absY > absX ? touch.y - y : 0,
                        };
                        prevBlock = this.currentBlock.index.split('-');
                        prevY = prevBlock[0], prevX = prevBlock[1];
                        targetBlock = this.Map.isAllowMove(Number(prevY), Number(prevX), __assign(__assign({}, move), { top: move.y < 0, bottom: move.y > 0, right: move.x < 0, left: move.x > 0 }));
                        if (!targetBlock) return [3 /*break*/, 7];
                        nextBlock = targetBlock.index.split('-');
                        nextY = nextBlock[0], nextX = nextBlock[1];
                        prev = this.Map.mapScript[prevY][prevX];
                        this.exchanging = true;
                        return [4 /*yield*/, this.Map.exchangeBlock(prev, targetBlock)];
                    case 1:
                        _b.sent();
                        p1Query = this.eliminateCheck(Number(nextY), Number(nextX));
                        p2Query = this.eliminateCheck(Number(prevY), Number(prevX));
                        if (!(!p1Query && !p2Query)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.Map.exchangeBlock(targetBlock, prev)];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 6];
                    case 3:
                        asynData_1 = {};
                        destroyBlocks = __spreadArrays((p1Query.destoryBlock || []), (p2Query.destoryBlock || [])).filter(function (item) {
                            if (item && !asynData_1[item.index]) {
                                return asynData_1[item.index] = true;
                            }
                        });
                        return [4 /*yield*/, this.destroyBlocks(destroyBlocks)];
                    case 4:
                        _b.sent();
                        return [4 /*yield*/, this.Map.destoryFall()];
                    case 5:
                        _b.sent();
                        _b.label = 6;
                    case 6:
                        this.exchanging = false;
                        _b.label = 7;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 定位block资源
     * @param x x轴
     * @param y y轴
     */
    Eliminating.prototype.targetBlock = function (x, y) {
        var mapScript = this.Map.mapScript;
        var target;
        for (var i = 0, len = mapScript.length; i < len; i++) {
            var currentBlock = mapScript[i];
            for (var _i = 0, currentBlock_1 = currentBlock; _i < currentBlock_1.length; _i++) {
                var block = currentBlock_1[_i];
                if (block) {
                    if ((block.x < x && block.x + block.width > x) && (block.y > y && block.y - block.height < y)) {
                        target = block;
                        break;
                    }
                }
                if (target)
                    break;
            }
        }
        return target;
    };
    /**
     * 移动方块操作
     */
    Eliminating.prototype.moveBlock = function (moveInfo) {
        var currentBlock = this.currentBlock;
        if (!currentBlock) {
            return false;
        }
        var point = currentBlock.toString().split('-');
        // 方向动作操作
        this.Map.moveAnimation(this.Map.mapScript[point[0]][point[1]], moveInfo);
        this.currentBlock = null;
        return true;
    };
    /**
     * 消除检测 [检测四各方向是否达成三连消除条件]
     * @param y 二维数组y轴
     * @param x 二维数组x轴
     */
    Eliminating.prototype.eliminateCheck = function (y, x) {
        var checkQuery = this.Map.checkLine(y, x);
        return checkQuery.destoryBlock.length ? checkQuery : false;
    };
    /**
     * 销毁方块
     * @param blocks 方块合集
     */
    Eliminating.prototype.destroyBlocks = function (blocks) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!blocks.length) return [3 /*break*/, 2];
                        // const hash = Math.random().toString(16).substr(-10);
                        // 顺序销毁
                        // console.warn(`-> ${hash} : eliminateCheck`);
                        // for (const target of blocks) {
                        //     console.log({ blocks, target })
                        //     await this.Map.destoryBlock(0, 0, target, hash);
                        // }
                        // console.log(`<- ${hash}`);
                        // 同步销毁
                        return [4 /*yield*/, Promise.all(blocks.map(function (block) { return _this.Map.destoryBlock(0, 0, block); }))];
                    case 1:
                        // const hash = Math.random().toString(16).substr(-10);
                        // 顺序销毁
                        // console.warn(`-> ${hash} : eliminateCheck`);
                        // for (const target of blocks) {
                        //     console.log({ blocks, target })
                        //     await this.Map.destoryBlock(0, 0, target, hash);
                        // }
                        // console.log(`<- ${hash}`);
                        // 同步销毁
                        _a.sent();
                        return [2 /*return*/, true];
                    case 2: return [2 /*return*/, false];
                }
            });
        });
    };
    /**
     * 返回首页
     */
    Eliminating.prototype.backHome = function () {
        cc.director.loadScene('Home');
    };
    __decorate([
        property(cc.Node)
    ], Eliminating.prototype, "blockBox", void 0);
    __decorate([
        property(cc.Node)
    ], Eliminating.prototype, "mapBox", void 0);
    __decorate([
        property(cc.Prefab)
    ], Eliminating.prototype, "mapPrefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], Eliminating.prototype, "block", void 0);
    Eliminating = __decorate([
        ccclass
    ], Eliminating);
    return Eliminating;
}(cc.Component));
exports.default = Eliminating;

cc._RF.pop();