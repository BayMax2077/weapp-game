"use strict";
cc._RF.push(module, '8c73aD9PHlGE5pBz8x8Jn86', 'gameSetting');
// scripts/utils/gameSetting.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var state_1 = require("../utils/state");
// 帧率设置
var storage = JSON.parse(localStorage.getItem('gameSetting') || '{}');
var _CONFIG_ = {
    /**
     * 背景音乐开关
     */
    bgm: true,
    /**
     * 音量
     */
    volume: {
        /**
         * 背景音乐
         */
        music: .4,
        /**
         * 音效
         */
        effects: 1,
    },
    /**
     * 游戏帧率
     * - -1: 无上限
     * - 60: 60帧
     * - 30: 30帧
     * - 15: 15帧
     */
    fps: -1,
};
var config = Object.keys(storage).length ? storage : _CONFIG_;
// cc.game.setFrameRate(60);
exports.default = new /** @class */ (function () {
    function System() {
        /**
         * 游戏配置
         */
        this.config = _CONFIG_;
        this.config = config;
        this.updateSetting();
    }
    /**
     * 触发游戏设置
     * @param reboot 是否重启游戏
     */
    System.prototype.updateSetting = function (reboot) {
        if (reboot === void 0) { reboot = false; }
        cc.game.emit('updateGameSetting', this);
        // 音乐音量
        cc.audioEngine.setMusicVolume(config.volume.music);
        // 音效音量
        // cc.audioEngine.setEffectsVolume(config.volume.effects);
        // 存储变更
        localStorage.setItem('gameSetting', JSON.stringify(this.config));
        // 判断是否重启
        reboot && cc.game.restart();
    };
    /**
     * 获取游戏信息
     * @param gameName 游戏名
     */
    System.prototype.info = function (gameName) {
        var games = state_1.default.games;
        for (var index in games) {
            var currentGame = games[index];
            if (currentGame.name === gameName || currentGame.name_en === gameName) {
                return currentGame;
            }
        }
    };
    return System;
}());

cc._RF.pop();