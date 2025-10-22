"use strict";
cc._RF.push(module, '181edxV42ZN9bQcrXck02cC', 'Block');
// scripts/Games/eliminating/script/Block.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Block = /** @class */ (function () {
    /**
     * 实例化方块
     * @param y           Y轴
     * @param x           X轴
     * @param type        类型
     * @param blockPrefab 方块资源
     */
    function Block(y, x, type, map, ccc, _mapScripts) {
        // 动物生成
        var prefab = cc.instantiate(ccc.blockPrefab);
        prefab.x = map.x - (prefab.width / 2);
        prefab.y = map.y + (prefab.height / 2);
        var prefabScript = prefab.getComponent('EliminatingBlock');
        var blockInfo = prefabScript.init({
            type: type,
        });
        ccc.blockBox.addChild(prefab);
        this.x = map.x - map.width / 2;
        this.y = map.y + map.height / 2;
        this.width = map.width;
        this.height = map.height;
        this.script = blockInfo.script;
        this.index = y + "-" + _mapScripts[y].length;
        this.map = map;
        this.key = {
            y: y,
            x: _mapScripts[y].length,
        };
    }
    return Block;
}());
exports.default = Block;

cc._RF.pop();