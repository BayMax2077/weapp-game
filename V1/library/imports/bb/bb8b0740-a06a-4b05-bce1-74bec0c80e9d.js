"use strict";
cc._RF.push(module, 'bb8b0dAoGpLBbzhdL7AyA6d', 'flightChess');
// scripts/Games/flightChess/flightChess.ts

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
var flightGameData_1 = require("./flightGameData");
var axiosUtils_1 = require("../../utils/axiosUtils");
var state_1 = require("../../utils/state");
var tool_1 = require("../../../scripts/lib/tool");
var FlightPlayer = cc.Class({
    name: 'FlightPlayer',
    properties: {
        id: -1,
        box: cc.Node,
        nickName: cc.Label,
        pedestal: [cc.Sprite],
        avatarUrl: null,
    },
});
// 临时测试用例
var index = 0;
// 聚焦计时器
var pedestalFouse = null;
var FlightChess = /** @class */ (function (_super) {
    __extends(FlightChess, _super);
    function FlightChess() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 玩家坐标数据
        _this.FlightPlayer = [];
        // 加一掷骰子的机会
        _this.addDiceCount = null;
        // 游戏开始字样
        _this.gameStartNode = null;
        // 完成状态的图片
        _this.complete = null;
        // // 爆炸动画
        // @property(cc.Node) exploade: cc.Node = null;
        // 箭头节点
        _this.arraw = null;
        // 骰子
        _this.dice = null;
        // 房间号
        _this.roomCode = null;
        // 玩家数据
        _this.playersData = [];
        // 弹窗资源
        _this.popupPrefab = null;
        // 结算界面资源
        _this.chessPrefab = null;
        // 玩家数据
        _this.roomInfo = {
            gameData: {
                chess: [],
            },
            players: [],
            roomCode: '',
            playerIndex: 1,
        };
        // 棋子出生点
        _this.chessSpawn = [];
        // 允许起飞点数
        _this.takeOff = [];
        // 行走点数       
        _this.setpNumber = -1;
        // 骰子状态
        _this.diceState = false;
        // 中间步数下标
        _this.centerChessIndex = [[], [], [], []];
        _this.bindonGameData = function (data) { return _this.onGameData(data); };
        _this.bindfetchRoomInfo = function () { return _this.fetchRoomInfo(); };
        _this.bindrommleave = function (data) { return _this.rommleave(data); };
        return _this;
    }
    FlightChess.prototype.onLoad = function () {
        tool_1.setAutoRecursively([
            'fc30fbe0-1668-4af2-8dcb-a798b469719b',
        ]);
        // console.log(this.FlightPlayer);
        // console.log('load');
        var that = this;
        state_1.default.io.on('flightChess/gameData', that.bindonGameData);
        state_1.default.io.on('rommjoin', that.bindfetchRoomInfo);
        state_1.default.io.on('rommleave', that.bindrommleave);
        this.dice.getComponent('dice').onClickEvent = this.diceOut.bind(this);
        this.dice.getComponent(cc.Button).enabled = false;
        this.fetchRoomInfo();
        this.dice.getComponent('dice').event = function () {
            // const state = this.diceState;
            // if (state) {
            //     this.diceState = false;
            // }
            // return state;
            return true;
        };
        // 模拟测试
        // this.gameStart(this.roomInfo);
    };
    /**
     * 接收到游戏数据时
     * @param data - IO数据
     */
    FlightChess.prototype.onGameData = function (data) {
        data = typeof data === 'string' ? JSON.parse(data) : data;
        console.log(data);
        data.callback && data.msg && this[data.callback](data.msg);
    };
    /**
     * 当玩家加入房间时
     */
    FlightChess.prototype.fetchRoomInfo = function () {
        var _this = this;
        axiosUtils_1.default.api('room_info').then(function (res) {
            res.players.forEach(function (player, index) {
                console.log(_this.FlightPlayer);
                var target = _this.FlightPlayer[index];
                target.nickName.string = player.nickname;
                tool_1.loadImg(player.avatarUrl, function (spriteFrame) {
                    target.avatarUrl = spriteFrame;
                }, 'avatar', player.id);
            });
            _this.roomCode.string = '房间号: ' + res.roomCode;
            _this.roomInfo = res;
            if (res.isStart)
                _this.gameStart(res);
        });
    };
    /**
     * 被销毁时
     */
    FlightChess.prototype.onDestroy = function () {
        clearInterval(pedestalFouse);
        state_1.default.io.off('flightChess/gameData', this.bindonGameData);
        state_1.default.io.off('rommjoin', this.bindfetchRoomInfo);
        state_1.default.io.off('rommleave', this.bindrommleave);
    };
    /**
     * 玩家进行下一步操作时
     * @param ioData 数据
     */
    FlightChess.prototype.setp = function (ioData, isPlayer) {
        if (isPlayer === void 0) { isPlayer = false; }
        var romm = this.roomInfo;
        // 获取目标棋子
        ioData.dice++;
        // 为自己的回合
        // console.log(romm.playerIndex, ioData.index , isPlayer);
        if (romm.playerIndex === ioData.index && isPlayer) {
            // 如果还有未起飞的棋子 且当前骰子点数为起飞点
            this.setpNumber = ioData.dice;
        }
    };
    /**
     * 点击飞机事件
     */
    FlightChess.prototype.chessTakeOff = function (_e, chessIndex, playerIndex, setpNumber) {
        var _a = this, roomInfo = _a.roomInfo, takeOff = _a.takeOff;
        var gameData = roomInfo.gameData;
        playerIndex = playerIndex !== undefined ? playerIndex : roomInfo.playerIndex;
        setpNumber = setpNumber || this.setpNumber;
        // console.log('chessTakeOff.click ===============>', chessIndex);
        // 隐藏聚焦圈
        if (_e)
            this.clearFouseState();
        // console.log(_e);
        // console.log(setpNumber);
        if (setpNumber !== -1) {
            var targetChess = gameData.chess[playerIndex][chessIndex];
            var targetSprite = this.FlightPlayer[playerIndex].pedestal[chessIndex];
            // 检测是否允许玩家出棋
            if (targetChess === -2 && takeOff.indexOf(setpNumber) !== -1) {
                // console.log(gameData.chess[playerIndex], gameData);
                var tStartPoint = flightGameData_1.startPoint[playerIndex];
                this.moveChess(targetSprite, tStartPoint);
                gameData.chess[playerIndex][chessIndex] = -1;
                // console.log('出棋',chessIndex, targetChess === -2, takeOff.indexOf(setpNumber) !== -1);
                // console.log(gameData.chess[playerIndex], gameData);
            }
            else if (targetChess > -2) {
                var outIndex = flightGameData_1.notePoint[playerIndex].out - 1;
                var nextIndex = (targetChess === -1 ? outIndex : targetChess) + setpNumber;
                if (targetChess === -1) {
                    gameData.chess[playerIndex][chessIndex] = outIndex;
                }
                this.moveChess(targetSprite, false, .5, {
                    to: nextIndex,
                    from: gameData.chess[playerIndex],
                    index: chessIndex,
                }, playerIndex);
                // gameData.chess[playerIndex][chessIndex] = nextIndex;
            }
            else {
                // console.log('skip');
                return false;
            }
            if (playerIndex === roomInfo.playerIndex) {
                // 通讯下一步
                state_1.default.io.emit('flightChess/setp', {
                    to: setpNumber,
                    chessIndex: chessIndex,
                    index: playerIndex,
                });
                this.setpNumber = -1;
            }
        }
    };
    /**
     * 允许玩家发牌时
     * @param data io数据
     */
    FlightChess.prototype.userSendChess = function (data) {
        var next = data.next;
        var playerIndex = this.roomInfo.playerIndex;
        // console.log(data);
        if (next) {
            index = next.index;
            // 如果为当前玩家回合
            this.dice.getComponent(cc.Button).enabled = index === playerIndex;
            // 其他玩家数据更新
            if (next.prveChess && next.prveChess.index !== playerIndex) {
                var prveChess = next.prveChess;
                if (prveChess) {
                    this.dice.getComponent('dice').onClick(prveChess.to - 1);
                    this.chessTakeOff(false, prveChess.chessIndex, prveChess.index, prveChess.to);
                }
            }
        }
        var nextPlayer = this.FlightPlayer[index];
        var _a = nextPlayer.box, x = _a.x, y = _a.y;
        // 移动骰子
        this.dice.runAction(cc.moveTo(1, x + 45, y - 5).easing(cc.easeBackIn()));
        // 移动箭头
        this.arraw.runAction(cc.moveTo(1, x + 60, y + 45).easing(cc.easeBackIn()));
        if (index === playerIndex) {
            this.diceState = true;
        }
    };
    /**
     * 玩家离开游戏时
     * @param data - 数据
     */
    FlightChess.prototype.rommleave = function (ioData) {
        ioData = JSON.parse(ioData);
        if (ioData && ioData.data && ioData.data.id === this.roomInfo.players[0].id) {
            this.gameOver({ type: 0 });
        }
    };
    /**
     * 开始游戏
     * @param roomInfo - 卡牌数组
     */
    FlightChess.prototype.gameStart = function (roomInfo) {
        var _this = this;
        console.log(roomInfo);
        this.roomCode.string = '房间号: ' + roomInfo.roomCode;
        var startNode = this.gameStartNode;
        this.takeOff = roomInfo.gameData.takeOff;
        startNode.y = -startNode.height;
        startNode.runAction(cc.sequence(cc.moveTo(3, 0, 0).easing(cc.easeBounceIn()), cc.callFunc(function () { return startNode.active = false; })));
        // 初始化
        this.FlightPlayer[roomInfo.playerIndex].pedestal.forEach(function (pedestal, index) {
            var eventHandler = new cc.Component.EventHandler();
            eventHandler.target = _this.node;
            eventHandler.component = 'flightChess';
            eventHandler.handler = 'chessTakeOff';
            eventHandler.customEventData = index.toString();
            var newButton = pedestal.node.addComponent(cc.Button);
            newButton.clickEvents.push(eventHandler);
            // console.log(index);
        });
        // 初始化房主信息
        this.userSendChess({
            next: {
                index: 0,
            },
        });
        // 隐藏聚焦圈
        this.FlightPlayer.forEach(function (player, index) {
            player.pedestal.forEach(function (pedestal, o) {
                pedestal.node.children[0].active = false;
                // 保存棋子重生点
                if (!_this.chessSpawn[index]) {
                    _this.chessSpawn.push([]);
                }
                _this.chessSpawn[index].push([pedestal.node.x, pedestal.node.y]);
                // pedestal.node.x = this.chessSpawn[index][o][0];
                // pedestal.node.y = this.chessSpawn[index][o][1];
            });
        });
        // console.log(this.chessSpawn);
    };
    /**
     * 退出房间
     */
    FlightChess.prototype.roomExit = function () {
        axiosUtils_1.default.api('room_exit', {
            data: {
                roomCode: this.roomInfo.roomCode,
            },
        }).then(function () { });
    };
    /**
     * 清除棋子聚焦状态
     */
    FlightChess.prototype.clearFouseState = function () {
        this.FlightPlayer[this.roomInfo.playerIndex].pedestal.forEach(function (pedestal) { return pedestal.node.children[0].active = false; });
        clearInterval(pedestalFouse);
    };
    /**
     * 投骰子时
     * @param diceNumber 数值
     */
    FlightChess.prototype.diceOut = function (dice, event) {
        var _this = this;
        var _a = this, takeOff = _a.takeOff, roomInfo = _a.roomInfo;
        var playerIndex = roomInfo.playerIndex;
        this.diceState = false;
        // 如果 非出棋的点数 且 无棋可走
        if (typeof event !== 'number' && takeOff.indexOf(dice + 1) === -1 && roomInfo.gameData.chess[playerIndex].every(function (num) { return num === -2; })) {
            // 通讯下一步
            state_1.default.io.emit('flightChess/setp', {
                to: dice + 1,
                chessIndex: -1,
                index: playerIndex,
            });
            this.setpNumber = -1;
            this.clearFouseState();
            return;
        }
        // 显示聚焦圈
        this.FlightPlayer[playerIndex].pedestal.forEach(function (pedestal, index) {
            var targetChessIndex = _this.roomInfo.gameData.chess[playerIndex][index];
            if ((_this.takeOff.indexOf(dice) !== -1 && targetChessIndex !== -3) || targetChessIndex > -1) {
                pedestal.node.children[0].active = true;
            }
        });
        var focseState = 0;
        // this.takeOff.indexOf(ioData.dice) !== -1 && targetChess.some(num => num === -2)
        // 聚焦闪动
        clearInterval(pedestalFouse);
        pedestalFouse = setInterval(function () {
            _this.FlightPlayer[playerIndex].pedestal.forEach(function (pedestal, index) {
                var targetChessIndex = _this.roomInfo.gameData.chess[playerIndex][index];
                if ((_this.takeOff.indexOf(dice) !== -1 && targetChessIndex !== -3) || targetChessIndex > -1) {
                    pedestal.node.children[0].runAction(focseState ? cc.fadeOut(1) : cc.fadeIn(1));
                }
                else {
                    pedestal.node.children[0].active = false;
                }
            });
            focseState = focseState ? 0 : 1;
        }, 1000);
        this.setp({
            dice: dice,
            index: index,
            flyIndex: -1,
        }, typeof event !== 'number');
    };
    /**
     * 移动棋子到指定位置
     * @param chess    棋子
     * @param point    坐标 [x, y, rotate?, duration?]
     * @param duration 动画过度时间
     */
    FlightChess.prototype.moveChess = function (chess, point, duration, move, playerTarget) {
        var _this = this;
        if (duration === void 0) { duration = .5; }
        this.flyOver();
        // console.log(move);
        var playerIndex = playerTarget === undefined ? this.roomInfo.playerIndex : playerTarget;
        var tNotePoint = flightGameData_1.notePoint[playerIndex];
        var clock;
        // 定位移动
        if (move) {
            var moveSpace_1 = move.to - move.from[move.index];
            // console.log('////////////////////////////////', this.roomInfo);
            // console.log(moveSpace);
            moveSpace_1 = moveSpace_1 > 1 ? moveSpace_1 + 1 : moveSpace_1;
            // console.log(moveSpace);
            // console.log('move ', 
            //     '到: ' + move.to,
            //     '格' + (move.to - move.from[move.index]),
            //     move.from[move.index],
            //     '棋子下标: ' + move.index
            // );
            var moveSetp_1 = 1;
            var centerChessIndex = this.centerChessIndex;
            var targetCenterChess_1 = centerChessIndex[playerIndex];
            var moveTo = function () {
                var moveIndex = move.from[move.index];
                // 前往中央转折
                if (moveIndex === tNotePoint.in) {
                    if (!targetCenterChess_1[move.index]) {
                        targetCenterChess_1[move.index] = 0;
                        if (moveSpace_1 > 2)
                            moveSpace_1 -= 1;
                        // console.log(moveSpace);
                    }
                    if (moveSpace_1 > 8)
                        moveSpace_1 -= 4; // 跳格修复
                    // 超出底部进行回退
                    // if (moveIndex >= tNotePoint.in + .5) moveSetp = -0.1;
                    if (targetCenterChess_1[move.index] >= 5)
                        moveSetp_1 = -1;
                    // 通过刚进来则改为小数点
                    // if (moveSetp === 1) {
                    //     moveSetp = 0.1;
                    //     // playerIndex === 1 && moveSpace++;
                    // };
                    var moveI = targetCenterChess_1[move.index] += moveSetp_1;
                    // console.log(moveIndex);
                    // let moveI = (Math.ceil(((moveIndex * 100) / 10) - tNotePoint.in * 10)) - 1;
                    // if (moveI === -1) moveI = 0;
                    // console.log(
                    //     '剩余：'  + moveSpace,
                    //     '位置：'  + moveIndex,
                    //     '绝对位:' + moveI,
                    // );
                    var centerPoint = flightGameData_1.centerPedestal[playerIndex][moveI];
                    // 如果当前剩余2次（因为延迟-1）或投中1点 进入最后一个位置则判定完成
                    if ((moveSpace_1 === 1 || moveSpace_1 === 2) && moveI === 5) {
                        console.log('fly over');
                        move.from[move.index] = -3;
                        chess.spriteFrame = _this.complete;
                        _this.moveChess(chess, _this.chessSpawn[playerIndex][move.index]);
                        clearInterval(clock);
                        _this.flyOver();
                        // console.log(this.roomInfo.gameData);
                        return true;
                    }
                    _this.moveChess(chess, centerPoint);
                    moveSpace_1--;
                    if (moveSpace_1 <= 1)
                        clearInterval(clock);
                    return;
                }
                move.from[move.index] += moveSetp_1;
                moveSpace_1--;
                moveIndex = move.from[move.index];
                // console.log(
                //     '玩家:' + playerIndex,
                //     '移动下标:' + moveIndex,
                //     '移动个数:' + moveSpace,
                //     '中:' + tNotePoint.in
                // );
                if (moveIndex > flightGameData_1.chessPoint.length - 1) {
                    moveIndex = move.from[move.index] = 1;
                }
                // 飞行结束
                if (moveSpace_1 <= 1) {
                    clearInterval(clock);
                    // 起飞点检测
                    if (moveIndex === tNotePoint.start) {
                        // 跳到起飞点后再起飞
                        setTimeout(function () {
                            var flyData = flightGameData_1.chessPoint[tNotePoint.end];
                            var i = playerIndex;
                            flyData[2] = i === 0
                                ? 90 : i === 1
                                ? 180 : i === 2
                                ? -90 : 0;
                            _this.moveChess(chess, flyData, 1.5);
                            move.from[move.index] = tNotePoint.end;
                            // 降落后跳四格
                            setTimeout(function () {
                                move.to = tNotePoint.end + 4;
                                move.noJump = true;
                                _this.moveChess(chess, point, duration, move, playerIndex);
                            }, 1500);
                        }, 500);
                    }
                    // 如果操作的飞机为自己的飞机 则判为操作者 否则为数据同步
                    // 检测是否覆盖到其他飞机上方
                    // 如果覆盖则吃掉下方的飞机 并 同步数据
                    // let existsChess = false;
                    _this.roomInfo.gameData.chess.forEach(function (chessArr, index) {
                        // console.log(playerTarget);
                        if (index !== playerTarget) {
                            chessArr.forEach(function (chessValue, chessIndex) {
                                // console.log(chessIndex, move.to);
                                if (chessValue === move.to) {
                                    // 覆盖中
                                    // console.log(move.from, chessArr, chessIndex, move.to, playerTarget, this.roomInfo.playerIndex, move);
                                    // move.from[chessIndex] = -2;
                                    _this.roomInfo.gameData.chess[index][chessIndex] = -2;
                                    // console.log('覆盖');
                                    // console.log(move.from, this.chessSpawn[index], index, chessIndex);
                                    var backPoint = _this.chessSpawn[index][chessIndex];
                                    backPoint[2] = index === 0
                                        ? 90 : index === 1
                                        ? 180 : index === 2
                                        ? -90 : 0;
                                    _this.moveChess(_this.FlightPlayer[index].pedestal[chessIndex], backPoint);
                                    // existsChess = true;
                                    // console.log('玩家' + index + '被吃', chessArr, chessIndex, move.to);
                                }
                            });
                        }
                    });
                    // console.log('----> ', move.from);
                    // console.log('----|', this.roomInfo.gameData.chess);
                    // if (existsChess) return true;
                    // console.log('降落完毕');
                    // console.log(move, this.roomInfo.gameData.chess);
                }
                _this.moveChess(chess, flightGameData_1.chessPoint[moveIndex]);
            };
            // 判断是否跳跃
            var endIndex = move.from[move.index] + moveSpace_1 + (moveSpace_1 > 1 ? -1 : 0);
            if ((endIndex) % 4 === playerIndex
                && endIndex !== tNotePoint.start
                && !move.noJump
                && move.from[move.index] + moveSpace_1 - 1 !== tNotePoint.in
                && move.from[move.index] !== tNotePoint.in
                && endIndex !== tNotePoint.in) {
                var jumpSize = 4 + (moveSpace_1 > 1 ? 0 : 1);
                moveSpace_1 += jumpSize;
                move.to += jumpSize;
            }
            if (moveSpace_1 !== 1) {
                clock = setInterval(moveTo, 500);
            }
            return moveTo();
        }
        if (point) {
            chess.node.runAction(cc.moveTo(point[3] || duration, point[0], point[1]));
            if (point[2] !== undefined) {
                chess.node.runAction(cc.rotateTo(duration, point[2]));
            }
        }
    };
    /**
     * 暂停游戏
     */
    FlightChess.prototype.stopGames = function () {
        var _this = this;
        cc.loader.loadRes('prefab/stopGames', cc.Prefab, function (_err, prefab) {
            if (prefab) {
                var popup = cc.instantiate(prefab);
                cc.director.getScene().addChild(popup);
                var stopGames = popup.getComponent('stopGames');
                stopGames.backHomeEvent = function () {
                    _this.backHome();
                };
                // 设置分享
                // stopGames.shareData = {
                //     title: `一起来玩飞行棋吧!`,
                //     imageUrl: State.OSS_BASE + '/H5Game/share/gobang.jpg',
                //     query: !this.isMachine ? `fn=joinRoom&roomCode=${State.gameData.roomCode}` : '',
                // }
            }
        });
    };
    /**
     * 返回首页
     */
    FlightChess.prototype.backHome = function () {
        var _a = this, roomInfo = _a.roomInfo, node = _a.node, popupPrefab = _a.popupPrefab;
        // cc.director.loadScene('Home');
        // return;
        // console.log(State, playersData);
        if (!roomInfo.players.length || roomInfo.players.length === 1) {
            return this.gameOver(false);
        }
        var popup = cc.instantiate(popupPrefab);
        var scriptPopup = popup.getComponent('popup');
        cc.director.getScene().addChild(popup);
        roomInfo.players.forEach(function (item, index) {
            if (item.id === state_1.default.userInfo.id) {
                // console.log(index);
                scriptPopup.init('是否要返回大厅?\n' + (index ? '将退出房间' : '房间将被解散'));
                scriptPopup.setEvent('success', function () {
                    popup.destroy();
                    // this.roomExit();
                    cc.director.loadScene('Home');
                });
                scriptPopup.setEvent('close', function () { });
            }
        });
    };
    /**
     * 游戏结束
     * @param data
     *  - false: 房主离开游戏触发
     */
    FlightChess.prototype.gameOver = function (data) {
        var _this = this;
        var _a = this, node = _a.node, popupPrefab = _a.popupPrefab, FlightPlayer = _a.FlightPlayer, roomInfo = _a.roomInfo;
        // console.log(data);
        if (data && data.type !== 0) {
            this.gameOver = function () { };
            var chessPrefab = cc.instantiate(this.chessPrefab);
            var chessScript = chessPrefab.getComponent('overScript');
            var chessData_1 = [];
            // console.log(data.gameData, data.gameData.score);
            roomInfo.players.forEach(function (player, index) {
                // console.log(index);
                chessData_1.push({
                    nickname: player.nickname,
                    avatarUrl: FlightPlayer[index].avatarUrl,
                    score: 0,
                    item: {
                    // noteScore: gamedata.noteScore[index],
                    },
                });
            });
            chessScript.init({
                players: chessData_1,
                // itemKey: {
                //     noteScore: '抓分',
                // },
                time: data.gameData.createTime,
                roomId: data.roomCode,
            });
            this.node.addChild(chessPrefab);
        }
        else if (roomInfo.playerIndex !== 0) {
            var popup_1 = cc.instantiate(popupPrefab);
            var scriptPopup = popup_1.getComponent('popup');
            cc.director.getScene().addChild(popup_1);
            scriptPopup.init('房主已将房间解散!');
            scriptPopup.setEvent('success', function () {
                popup_1.destroy();
                _this.roomExit();
                cc.director.loadScene('Home');
            });
        }
        else if (roomInfo.players.length === 1) {
            this.roomExit();
            cc.director.loadScene('Home');
        }
    };
    /**
     * 棋子走到终点时
     */
    FlightChess.prototype.flyOver = function () {
        var roomInfo = this.roomInfo;
        // 如果为房主则需要同步数据
        if (roomInfo.playerIndex === 0) {
            // 游戏结束检测
            roomInfo.players.forEach(function (player, index) {
                console.log(roomInfo.gameData.chess[index].every((function (num) { return num !== -3; })));
                if (roomInfo.gameData.chess[index].every((function (num) { return num === -3; }))) {
                    state_1.default.io.emit('flightChess/over', roomInfo.gameData.chess);
                    return;
                }
            });
        }
    };
    __decorate([
        property(FlightPlayer)
    ], FlightChess.prototype, "FlightPlayer", void 0);
    __decorate([
        property(cc.Node)
    ], FlightChess.prototype, "addDiceCount", void 0);
    __decorate([
        property(cc.Node)
    ], FlightChess.prototype, "gameStartNode", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], FlightChess.prototype, "complete", void 0);
    __decorate([
        property(cc.Node)
    ], FlightChess.prototype, "arraw", void 0);
    __decorate([
        property(cc.Node)
    ], FlightChess.prototype, "dice", void 0);
    __decorate([
        property(cc.Label)
    ], FlightChess.prototype, "roomCode", void 0);
    __decorate([
        property(cc.Prefab)
    ], FlightChess.prototype, "popupPrefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], FlightChess.prototype, "chessPrefab", void 0);
    FlightChess = __decorate([
        ccclass
    ], FlightChess);
    return FlightChess;
}(cc.Component));
exports.default = FlightChess;

cc._RF.pop();