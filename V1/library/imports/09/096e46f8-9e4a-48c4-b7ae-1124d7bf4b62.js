"use strict";
cc._RF.push(module, '096e4b4nkpIxLeuESTXv0ti', 'Map');
// scripts/Games/eliminating/script/Map.ts

"use strict";
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
var Service_1 = require("./Service");
var Block_1 = require("./Block");
// TODO: 掉落后顺序可能错乱
// TODO: 掉落时如果出现三连等现象可能出现方块消失
var MapCreate = /** @class */ (function () {
    /**
     * 地图生成器
     * @param ySize      y轴
     * @param xSize      x轴
     * @param cccOptions ccc内置资源
     */
    function MapCreate(ySize, xSize, cccOptions) {
        /**
         * 地图数据
         */
        this._map = [];
        /**
         * 附带脚本的复杂地图数据
         */
        this._mapScript = [];
        /**
         * 下落检测事件
         */
        this.fallEvent = 0;
        this.destoryCount = 0;
        this.deepHash = {};
        /**
         * 下落方块
         */
        this.fallBlocks = [];
        /**
         * 任务列队
         */
        this.tasks = [];
        var Map = [];
        this.ccc = cccOptions;
        // 格子横轴最大宽度
        var maxX = ySize;
        // 显示区域
        for (var pointX = 0; pointX < xSize; pointX++) {
            var xMap = [];
            for (var pointY = 0; pointY < ySize; pointY++) {
                xMap.push(Service_1.default.randomNumber(Service_1.default.MAX, Service_1.default.MIN));
            }
            Map.push(xMap);
        }
        this._map = Map;
        this._mapScript = Map;
        // 顶部轴位置扩充
        this.fallBlocks = new Array(maxX).fill([]).map(function () { return []; });
        // 重复方块筛除
        var checkQuery;
        while (checkQuery = this.mapCheckLine()) {
            this.mapEliminateLine(checkQuery.y, checkQuery.x);
        }
        checkQuery = null;
        console.log('地图中是否有相连：' + this.mapCheckLine());
        // 执行删除地图方法
        this.mapCreate(Map);
    }
    Object.defineProperty(MapCreate.prototype, "data", {
        /**
         * 地图数据
         */
        get: function () {
            return this._map;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MapCreate.prototype, "mapScript", {
        /**
         * 附带脚本的复杂地图数据
         */
        get: function () {
            return this._mapScript;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * 创建地图
     * @param mapData 地图资源
     */
    MapCreate.prototype.mapCreate = function (mapData) {
        var _this = this;
        // 顶部偏移值
        var offsetTop = 50;
        // 左侧偏移值
        var screenWidth = cc.view.getFrameSize().width;
        var offsetLeft = ((screenWidth - 610) / 2) + 90;
        this._mapScript = [];
        var _mapScript = this._mapScript;
        mapData.forEach(function (yMap, y) {
            _mapScript.push([]);
            yMap.forEach(function (blockType, x) {
                var mapInter = cc.instantiate(_this.ccc.mapPrefab);
                var width = mapInter.width, height = mapInter.height;
                mapInter.x += x * width + offsetLeft;
                mapInter.y -= y * height + offsetTop;
                _this.ccc.mapBox.addChild(mapInter);
                _mapScript[y].push(new Block_1.default(y, x, blockType, mapInter, _this.ccc, _mapScript));
            });
        });
    };
    /**
     * 设置指定位置的方块
     * @param y         Y轴
     * @param x         x轴
     * @param blockType 方块类型
     */
    MapCreate.prototype.setBlock = function (y, x, blockType) {
        if (!this._map[y] || this._map[y][x] === undefined)
            return console.error('setBlock Set Error: ', this._map, y, x);
        this._map[y][x] = blockType + 1;
        var currentScript = this._mapScript[y][x].script;
        if (currentScript) {
            currentScript.type = blockType + 1;
            currentScript.setFrame(currentScript.setFrameType);
        }
    };
    /**
     * 地图已相连检测
     */
    MapCreate.prototype.mapCheckLine = function () {
        var _this = this;
        var isLine = false;
        this.earch(function (y, x) {
            var checkQuery = _this.checkLine(y, x);
            if (checkQuery.type !== 0) {
                isLine = { y: y, x: x, destoryBlock: checkQuery.destoryBlock };
                return true;
            }
        });
        return isLine;
    };
    /**
     * 地图消除已相连
     * @param y Y轴
     * @param x X轴
     */
    MapCreate.prototype.mapEliminateLine = function (y, x) {
        var _this = this;
        var _map = this._map;
        // 指定位置消除
        if (y !== undefined && x !== undefined) {
            return this.setBlock(y, x, Service_1.default.randomNumber(Service_1.default.MAX, Service_1.default.MIN, _map[y][x]) - 1);
        }
        // 全局扫描消除
        this.earch(function (y, x) {
            var checkQuery = _this.checkLine(y, x);
            if (checkQuery.type !== 0) {
                _this.setBlock(y, x, Service_1.default.randomNumber(Service_1.default.MAX, Service_1.default.MIN, checkQuery.index) - 1);
            }
        });
    };
    /**
     * 互换方块
     * @param Point1 方块1
     * @param Point2 方块2
     */
    MapCreate.prototype.exchangeBlock = function (Point1, Point2) {
        return __awaiter(this, void 0, void 0, function () {
            var move, Point1Script;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        move = {
                            x: Point1.x - Point2.x,
                            y: Point1.y - Point2.y,
                        };
                        // 移动方向的方块反向移动
                        return [4 /*yield*/, Promise.all([
                                this.moveAnimation(Point1, move, false, .3),
                                this.moveAnimation(Point2, move, true, .3),
                            ])];
                    case 1:
                        // 移动方向的方块反向移动
                        _a.sent();
                        Point1Script = Point1.script;
                        Point1.script = Point2.script;
                        Point2.script = Point1Script;
                        // 更新地图数据
                        this.setBlock(Point1.key.y, Point1.key.x, Point1.script.type);
                        this.setBlock(Point2.key.y, Point2.key.x, Point2.script.type);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 移动动画
     * @param currentNode 被移动节点
     * @param moveInfo    移动距离
     * @param reverse     是否逆向
     * @param noteMove    强制移动
     */
    MapCreate.prototype.moveAnimation = function (currentNode, moveInfo, reverse, duration, noteMove) {
        if (reverse === void 0) { reverse = false; }
        if (duration === void 0) { duration = .5; }
        if (noteMove === void 0) { noteMove = false; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (currentNode.script.type === -1 && !noteMove)
                            return [2 /*return*/, false];
                        return [4 /*yield*/, currentNode.script.move({
                                x: moveInfo.x * (reverse ? -1 : 1),
                                y: moveInfo.y * (reverse ? -1 : 1),
                            }, duration)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 销毁方块[动画]
     * @param y      Y轴
     * @param x      X轴
     * @param blocks 方块资源
     * @param hash   HASH
     * @param down   是否进行下降
     */
    MapCreate.prototype.destoryBlock = function (y, x, block, hash, down) {
        if (down === void 0) { down = true; }
        return __awaiter(this, void 0, void 0, function () {
            var cuurent, node_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cuurent = block || (this._mapScript[y] ? this._mapScript[y][x] : false);
                        if (!cuurent) return [3 /*break*/, 3];
                        // 异常Block Array处理
                        if (cuurent instanceof Array) {
                            console.error("  new ->" + hash + ": ");
                            return [2 /*return*/, cuurent.forEach(function (block) { return _this.destoryBlock(block.key.y, block.key.x, block, hash); })];
                        }
                        node_1 = cuurent.script.icon.node;
                        return [4 /*yield*/, new Promise(function (res) {
                                node_1.runAction(cc.sequence(cc.scaleTo(.05, 0).easing(cc.easeBounceOut()), cc.callFunc(res)));
                            })];
                    case 1:
                        _a.sent();
                        this.destoryCount--;
                        this.setBlock(cuurent.key.y, cuurent.key.x, -1);
                        return [4 /*yield*/, this.fallCreateCheck(cuurent, hash)];
                    case 2:
                        _a.sent();
                        // await this.destoryFall();
                        this.destoryCount++;
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 上升方块创建检测
     * @param y 二维数组y
     * @param x 二维数组x
     * @param hash   HASH
     */
    MapCreate.prototype.fallCreateCheck = function (cuurentBlock, hash) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, x, y, deepHash, node, prevIndex, hashNum;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = cuurentBlock.key, x = _a.x, y = _a.y;
                        deepHash = this.deepHash;
                        node = cuurentBlock.script.icon.node;
                        prevIndex = this.fallBlocks[x].push(cuurentBlock.script);
                        if (hash) {
                            if (!deepHash[hash])
                                deepHash[hash] = {};
                            if (deepHash[hash][x] === undefined)
                                deepHash[hash][x] = 0;
                            deepHash[hash][x]++;
                        }
                        hashNum = hash ? deepHash[hash][x] : 0;
                        node.scale = .7;
                        return [4 /*yield*/, this.moveAnimation(cuurentBlock, {
                                x: 0,
                                y: (y + (hash ? hashNum : prevIndex)) * -90,
                            }, false, 0, true)];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 消除下落逻辑
     * @param y 二维数组y
     * @param x 二维数组x
     * @param hash   HASH
     * @param down   是否进行下降
     */
    MapCreate.prototype.destoryFall = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _map, _mapScript, fallBlocks, x, xBlocks, y, start, lineType, downList, end, moveDown, key, target, moveY, destoryBlock, _i, destoryBlock_1, block;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this, _map = _a._map, _mapScript = _a._mapScript, fallBlocks = _a.fallBlocks;
                        for (x in fallBlocks) {
                            xBlocks = fallBlocks[x];
                            if (!xBlocks.length)
                                continue;
                            y = _map.length;
                            start = -1;
                            while (y >= 0) {
                                if (_map[y]) {
                                    lineType = _map[y][x];
                                    // 从下往上推算出起点0
                                    if (lineType === 0 && start === -1) {
                                        start = y;
                                    }
                                    // 整体下落计算 终点
                                    if ((lineType !== 0 || (y === 0 && lineType === 0)) && start != -1) {
                                        downList = [];
                                        end = y;
                                        // 消失方块上方的所有方块和不可见区域方块整体向下异步移动
                                        if (y > 0 || (y === 0 && lineType !== 0)) {
                                            while (y >= 0) {
                                                if (_mapScript[y] && _mapScript[y][x]) {
                                                    downList.push(_mapScript[y][x].script);
                                                    y--;
                                                }
                                            }
                                        }
                                        else {
                                            end--;
                                        }
                                        // 得到不可见区域中的方块
                                        downList.push.apply(downList, fallBlocks[x].map(function (block) {
                                            block.setFrame(Service_1.default.randomNumber(Service_1.default.MAX, Service_1.default.MIN, block.setFrameType) - 1);
                                            return block;
                                        }));
                                        fallBlocks[x] = [];
                                        moveDown = (start - end) || .5;
                                        for (key in downList) {
                                            target = downList[key];
                                            target.move({
                                                x: 0,
                                                y: moveDown * 90
                                            }, .1 * moveDown);
                                            moveY = start - Number(key);
                                            if (moveY < 0)
                                                moveY = 0;
                                            _mapScript[moveY][x].script = target;
                                            this.setBlock(moveY, Number(x), target.setFrameType);
                                            // 方案一：相连检测
                                            // const checkQuery = this.checkLine(moveY, Number(x));
                                            // if (checkQuery.destoryBlock.length) {
                                            // 	for (const block of checkQuery.destoryBlock) {
                                            // 		await this.destoryBlock(0, 0, block);
                                            // 	}
                                            // 	await this.destoryFall();
                                            // }
                                        }
                                    }
                                }
                                y--;
                            }
                        }
                        return [4 /*yield*/, new Promise(function (res) {
                                _this.earch(function (y, x) {
                                    var checkQuery = _this.checkLine(y, x);
                                    if (checkQuery.destoryBlock.length) {
                                        res(checkQuery.destoryBlock);
                                        return true;
                                    }
                                });
                                res();
                            })];
                    case 1:
                        destoryBlock = _b.sent();
                        if (!destoryBlock) return [3 /*break*/, 7];
                        _i = 0, destoryBlock_1 = destoryBlock;
                        _b.label = 2;
                    case 2:
                        if (!(_i < destoryBlock_1.length)) return [3 /*break*/, 5];
                        block = destoryBlock_1[_i];
                        return [4 /*yield*/, this.destoryBlock(0, 0, block)];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [4 /*yield*/, this.destoryFall()];
                    case 6:
                        _b.sent();
                        _b.label = 7;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 检测方块相连
     * @param y          目标x
     * @param x          目标y
     * @param targetType 目标类型
     */
    MapCreate.prototype.checkLine = function (y, x) {
        var _a = this, _map = _a._map, _mapScript = _a._mapScript;
        // 达成三连数量
        var xTarget = [];
        var yTarget = [];
        // 获取目标方块
        var index = _map[y] ? _map[y][x] : false;
        var query = {
            type: 0,
            xTarget: xTarget,
            yTarget: yTarget,
            index: index || -1,
            destoryBlock: [],
        };
        // 下标为空的情况下跳出
        if (!index)
            return query;
        // x轴三连检测
        for (var pX = x - 2; pX <= x + 2; pX++) {
            var chackBlock = _map[y][pX];
            if (chackBlock && chackBlock === index) {
                xTarget.push(_mapScript[y][pX]);
            }
            else if (xTarget.length < 3) {
                xTarget = [];
            }
            else {
                break;
            }
        }
        // y轴三连检测
        for (var pY = y - 2; pY <= y + 2; pY++) {
            var chackBlock = _map[pY] ? _map[pY][x] : false;
            if (chackBlock && chackBlock === index) {
                yTarget.push(_mapScript[pY][x]);
            }
            else if (yTarget.length < 3) {
                yTarget = [];
            }
            else {
                break;
            }
        }
        if (xTarget.length === 5 || yTarget.length === 5) { // 横或竖5连判断
            // console.log('彩色鸡');
            // query.type = 1;
        }
        else if (xTarget.length + yTarget.length > 5) { // L形判断
            // console.log('发光本体');
            // query.destoryBlock = [ ...xTarget, yTarget ];
            // query.type = 2;
        }
        else if (yTarget.length >= 3 || xTarget.length >= 3) { // 三连判断
            console.log('三连');
            if (xTarget.length >= 3) {
                query.destoryBlock = xTarget;
                query.type = 3.1;
            }
            else if (yTarget.length >= 3) {
                query.destoryBlock = yTarget;
                query.type = 3.2;
            }
        }
        query.xTarget = xTarget;
        query.yTarget = yTarget;
        return query;
    };
    /**
     * 是否允许指定方向移动
     */
    MapCreate.prototype.isAllowMove = function (y, x, moveInfo) {
        var targetBlock = false;
        var _a = this, _map = _a._map, _mapScript = _a._mapScript;
        var top = moveInfo.top, right = moveInfo.right, bottom = moveInfo.bottom, left = moveInfo.left;
        // 顶部检测
        if (top && _map[y - 1] && _map[y - 1][x]) {
            targetBlock = _mapScript[y - 1][x];
        }
        // 右侧检测
        else if (right && _map[y] && _map[y][x + 1]) {
            targetBlock = _mapScript[y][x + 1];
        }
        // 底部检测
        else if (bottom && _map[y + 1] && _map[y + 1][x]) {
            targetBlock = _mapScript[y + 1][x];
        }
        // 左侧检测
        else if (left && _map[y] && _map[y][x - 1]) {
            targetBlock = _mapScript[y][x - 1];
        }
        return targetBlock;
    };
    /**
     * 遍历地图数据
     * @param callback 回调 (返回true则结束遍历)
     * @param mapData  地图数据
     */
    MapCreate.prototype.earch = function (callback, mapData) {
        var _map = this._map;
        mapData = mapData || _map;
        for (var y = 0, yLen = mapData.length - 1; y <= yLen; y++) {
            var targetY = mapData[y];
            for (var x = 0, xLen = targetY.length - 1; x <= xLen; x++) {
                if (callback(y, x, mapData))
                    break;
            }
        }
    };
    /**
     * 转换数据模拟格式
     */
    MapCreate.prototype.transformDataModel = function (data) {
        return data.map(function (item) {
            return item.map(function (itemVal) {
                if (typeof itemVal === 'number') {
                    return {
                        script: {
                            type: itemVal,
                        },
                    };
                }
                else {
                    return itemVal.script.type;
                }
            });
        });
    };
    return MapCreate;
}());
exports.default = MapCreate;

cc._RF.pop();