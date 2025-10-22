"use strict";
cc._RF.push(module, 'ba2a2DV64NCt4VQ/X8iIFmo', 'EliminatingScene');
// scripts/Games/eliminating/script/EliminatingScene.ts

"use strict";
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
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
var axiosUtils_1 = require("../../../utils/axiosUtils");
var state_1 = require("../../../utils/state");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var EliminatingScene = /** @class */ (function (_super) {
    __extends(EliminatingScene, _super);
    function EliminatingScene() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 岛屿
        _this.isLand = null;
        // 地图区域
        _this.mapBox = null;
        // 地图数据
        _this.mapData = [
            [480, -80],
            [800, 85],
            [1090, -180],
            [1300, 105],
            [1470, -200],
            [1657, 135],
            [1880, -70],
            [2138, 120],
        ];
        return _this;
    }
    Object.defineProperty(EliminatingScene.prototype, "info", {
        /**
         * 游戏信息
         */
        get: function () {
            return state_1.default.system.info('消消乐');
        },
        enumerable: false,
        configurable: true
    });
    EliminatingScene.prototype.start = function () {
        var _this = this;
        // this.node.on(cc.Node.EventType.TOUCH_START, event => {
        //     console.log(event);
        // }, this);
        axiosUtils_1.default
            .api('game_record', {
            params: {
                gameId: this.info.id,
            },
        })
            .then(function (res) { return _this.updateIsLand(res); })
            .catch(function (err) {
            console.log(err);
            state_1.default.tips('战绩数据加载失败', 5, false, 2);
        });
        cc.director.preloadScene('gameEliminating');
    };
    /**
     * 加载岛屿
     * @param recordData 战绩信息
     */
    EliminatingScene.prototype.updateIsLand = function (recordData) {
        var _this = this;
        console.log(recordData);
        // 是否被锁
        var lock = false;
        // 生成岛屿
        this.mapData.forEach(function (point, index) {
            var island = cc.instantiate(_this.isLand);
            // 初始化岛屿，EliminatingLand脚本在子节点下
            island.children[0].getComponent('EliminatingLand').init(recordData[index] || undefined, index, lock);
            if (!recordData[index])
                lock = true;
            island.x = point[0] - 190;
            island.y = point[1];
            _this.mapBox.addChild(island);
        });
    };
    /**
     * 无限模式
     */
    EliminatingScene.prototype.infiniteModel = function () {
        cc.loader.loadRes('prefab/GroupLoading', function (_err, prefab) {
            cc.director.loadScene('gameEliminating');
        });
    };
    /**
     * 返回大厅
     */
    EliminatingScene.prototype.backHome = function () {
        cc.director.loadScene('Home');
    };
    /**
     * 滚动场景时
     * @param e 事件
     */
    EliminatingScene.prototype.scrollScent = function (e) {
        // console.log(e);
    };
    __decorate([
        property(cc.Prefab)
    ], EliminatingScene.prototype, "isLand", void 0);
    __decorate([
        property(cc.Node)
    ], EliminatingScene.prototype, "mapBox", void 0);
    EliminatingScene = __decorate([
        ccclass
    ], EliminatingScene);
    return EliminatingScene;
}(cc.Component));
exports.default = EliminatingScene;

cc._RF.pop();