"use strict";
cc._RF.push(module, 'a6e9dWgwQ1Jf6k/yh81sYqM', 'Service');
// scripts/Games/eliminating/script/Service.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Map_1 = require("./Map");
// 方块最大类型
var MAX = 5;
// 方块最小类型
var MIN = 1;
var Service = /** @class */ (function () {
    function Service() {
    }
    /**
     * 随机生成地图
     * @param xSize  横轴数量
     * @param ySize  竖轴数量
     * @param mapBox 地图容器
     */
    Service.randomCreate = function (xSize, ySize, cccOptions) {
        return new Map_1.default(ySize, xSize, cccOptions);
    };
    /**
     * 转换数据模拟格式
     */
    Service.transformDataModel = function (data) {
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
    /**
     * 生成随机整数
     * @param max 最大
     * @param min 最小
     */
    Service.randomNumber = function (max, min, num) {
        if (min === void 0) { min = 0; }
        if (num === void 0) { num = false; }
        var randomNumber = (Math.random() * max + min) >> 0;
        if (num !== false && num === randomNumber) {
            this.randomNumber(max, min, num);
            // randomNumber = randomNumber === min ? max : min
        }
        return randomNumber;
    };
    /**
     * 方块最大类型
     */
    Service.MAX = MAX;
    /**
     * 方块最小类型
     */
    Service.MIN = MIN;
    return Service;
}());
exports.default = Service;
;

cc._RF.pop();