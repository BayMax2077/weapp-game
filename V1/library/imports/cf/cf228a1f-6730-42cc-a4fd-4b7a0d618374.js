"use strict";
cc._RF.push(module, 'cf228ofZzBCzKT9S3oNYYN0', 'FourCardsMain');
// scripts/Games/fourCards/FourCardsMain.ts

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
var state_1 = require("../../utils/state");
var tool_1 = require("../../../scripts/lib/tool");
/**
 * 扑克牌
 */
var CardItem = cc.Class({
    name: 'cardItem',
    properties: {
        plum: [cc.SpriteFrame],
        heart: [cc.SpriteFrame],
        block: [cc.SpriteFrame],
        Spade: [cc.SpriteFrame],
        joker: [cc.SpriteFrame],
    }
});
var FourCardsPlayersItem = cc.Class({
    name: 'FourCardsPlayers',
    properties: {
        nickname: cc.Label,
        score: cc.Label,
        noteScore: cc.Label,
        cardCount: cc.Label,
        avatarUrl: cc.Sprite,
        cardPoint: cc.Node,
    },
});
var clock = null; // 计时器
var cardList = {}; // 选中的扑克牌
var countDownClock = null; // 倒计时
var FourCardsGame = /** @class */ (function (_super) {
    __extends(FourCardsGame, _super);
    function FourCardsGame() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * 发牌位置
         */
        _this.cardBox = null;
        /**
         * 房间号节点
         */
        _this.roomIdLabel = null;
        /**
         * 玩家节点数据
         */
        _this.FourCardsPlayers = [];
        /**
         * 扑克牌遮罩节点
         */
        _this.cardsMask = null;
        /**
         * 结算界面资源
         */
        _this.chessPrefab = null;
        /**
         * 等待加入中 文字
         */
        _this.wait_player_join = null;
        /**
         * 弹窗资源
         */
        _this.popupPrefab = null;
        /**
         * 倒计时 时钟载体
         */
        _this.clockBox = null;
        /**
         * 倒计时 时钟内容
         */
        _this.clockContent = null;
        /**
         * 发牌按钮
         */
        _this.setpBtn = null;
        /**
         * 跳过的按钮
         */
        _this.skipBtn = null;
        /**
         * 不出文字
         */
        _this.skipSpriteFrame = null;
        /**
         * 桌面分数
         */
        _this.desktopScore = null;
        /**
         * 桌面机制
         */
        _this.desktop = {
            score: 0,
            card: [],
        };
        /**
         * 玩家数据
         */
        _this.playersData = [];
        /**
         * 房间数据
         */
        _this.roomInfoData = {};
        /**
         * 已有扑克牌
         */
        _this.cardList = [];
        _this.Card = {
            /**
             * 梅花
             */
            plum: [],
            /**
             * 红心
             */
            heart: [],
            /**
             * 方块
             */
            block: [],
            /**
             * 黑桃
             */
            Spade: [],
            /**
             * 大小王
             */
            joker: [],
        };
        _this.bindonGameData = function (data) { return _this.onGameData(data); };
        _this.bindfetchRoomInfo = function (data) { return _this.fetchRoomInfo(data); };
        _this.bindrommleave = function (data) { return _this.rommleave(data); };
        _this.history = [];
        return _this;
    }
    FourCardsGame.prototype.onLoad = function () {
        var that = this;
        var setpBtn = that.setpBtn, skipBtn = that.skipBtn;
        setpBtn.node.active = false;
        skipBtn.node.active = false;
        that.fetchRoomInfo(false);
        state_1.default.io.on('fourcard/gameData', that.bindonGameData);
        state_1.default.io.on('rommjoin', that.bindfetchRoomInfo);
        state_1.default.io.on('rommleave', that.bindrommleave);
        tool_1.setAutoRecursively([
            'c3a88e04-eee8-42e6-ade2-27c6e1896203',
            'db61dc3a-8854-4824-a19a-472e74d7aa03',
            'fc30fbe0-1668-4af2-8dcb-a798b469719b',
            '0b7da469-5226-4405-aad7-56210d04d191',
        ]);
    };
    /**
     * 游戏场景销毁时
     */
    FourCardsGame.prototype.onDestroy = function () {
        // 接触IM玩家加入房间事件绑定
        state_1.default.io.off('fourcard/gameData', this.bindonGameData);
        state_1.default.io.off('rommjoin', this.bindfetchRoomInfo);
        state_1.default.io.off('rommleave', this.bindrommleave);
    };
    /**
     * 接收到游戏数据时
     * @param data - IO数据
     */
    FourCardsGame.prototype.onGameData = function (data) {
        data = typeof data === 'string' ? JSON.parse(data) : data;
        data.callback && data.msg && this[data.callback](data.msg);
    };
    /**
     * 允许当前玩家发牌时
     */
    FourCardsGame.prototype.currentUser = function (data) {
        var _a = this, setpBtn = _a.setpBtn, skipBtn = _a.skipBtn;
        setpBtn.node.active = true;
        setpBtn.interactable = false;
        skipBtn.node.active = true;
        // 玩家不出牌时
        if (data && data.prveCard && !data.prveCard.length) {
            var history = this.history;
            data.prveCard = history[2] || history[1] || history[0] || [];
            console.log(data.prveCard, history);
        }
        // console.log(data);
        // 不可选择的扑克牌屏蔽
        if (data && data.prveCard && data.prveCard.length) {
            var prveMaskShow_1 = !1;
            var prveCardLength_1 = data.prveCard.length;
            var prveCardNumber_1 = data.prveCard[0];
            // console.log(data.prveCard);
            // 王炸处理[必须为7线及以上]    0为大王（红）   0.1为小王（黑）
            // (4个混王: 7线30分, 5个混王: 8线60分, 6个混王: 9线90分)
            // (4个纯王开始，多一个王加2线)(5个10线120分, 6个12线180分, 7个14线240分, 8个16线300分)
            if ((prveCardNumber_1 === 0 || prveCardNumber_1 === 0.1) && prveCardLength_1 >= 4) {
                var redJoker_1 = 0;
                var blackJoker_1 = 0;
                var lintScore = 0;
                data.prveCard.forEach(function (num) { return num === 0 ? redJoker_1++ : blackJoker_1++; });
                // 4纯王 + 其他王
                if ((redJoker_1 === 4 || blackJoker_1 === 4) && prveCardLength_1 >= 5) {
                    lintScore = 10 + ((prveCardLength_1 - 5) * 2);
                }
                else { // 混王
                    lintScore = 7 + (prveCardLength_1 - 4);
                }
                // 王炸模拟牌数 并调至最大牌
                data.prveCard = new Array(lintScore).fill(0);
                console.log(lintScore + '线');
            }
            // 普通扑克牌处理
            this.cardList.forEach(function (card) {
                if (card.node.children.length === 2) {
                    var label = card.node.children[1].getComponent(cc.Label);
                    if (label) {
                        var cardNumber = Number(label.string);
                        prveMaskShow_1 = !1;
                        if ((prveCardLength_1 >= 4 && // 炸弹: 牌数必须大于出牌者的炸弹数量
                            cardNumber < prveCardLength_1 //       如果牌数量大于等于出牌者 
                            || (cardNumber === prveCardLength_1 && prveCardNumber_1 <= card.number) //       如果牌数量等于出牌者，且牌值小于等于出牌者
                        ) || ((prveCardLength_1 < 4 && cardNumber < 4) // 小于4张非炸弹 且 不能组成炸弹
                            && (cardNumber !== prveCardLength_1 || prveCardNumber_1 <= card.number // 牌数必须与出牌者相等，并且值大于出牌者
                            ))) {
                            prveMaskShow_1 = !0;
                        }
                    }
                }
                if (prveMaskShow_1) {
                    card.node.children[0].active = true;
                    card.node.getComponent(cc.Button).interactable = false;
                }
            });
        }
    };
    /**
     * 玩家发牌时
     * @param data - IO数据
     */
    FourCardsGame.prototype.userSendCard = function (data) {
        var _this = this;
        var _a = this, clockBox = _a.clockBox, clockContent = _a.clockContent, playersData = _a.playersData, FourCardsPlayers = _a.FourCardsPlayers;
        var targetUserId = data.userId || 0;
        // const userPointId = this.playersData[targetUserId].index;
        // const targetUser = FourCardsPlayers[userPointId];
        // 上次出牌的玩家出牌显示
        if (targetUserId !== undefined && targetUserId !== this.roomInfoData.playerIndex) {
            this.outCardActuin(data.params, playersData[targetUserId]);
        }
        if (data.next.prveCard) {
            var history = this.history;
            var prevCard = data.next.prveCard;
            history.push(prevCard.length ? prevCard : '');
            if (history.length === playersData.length)
                history.shift();
            if (history.join('') === '')
                this.history = [];
        }
        var index = data.next.index;
        if (index !== undefined) {
            var outTime_1 = 60;
            // 倒计时时钟位置
            var dataIndex = this.playersData[index].index;
            var _b = dataIndex !== 0
                ? FourCardsPlayers[dataIndex].cardCount.node.parent
                : { x: -85, y: -50 }, x = _b.x, y = _b.y;
            clockBox.runAction(cc.moveTo(.5, x + (clockBox.width * (dataIndex === 1 ? -1 : 1)), y).easing(cc.easeBackOut()));
            // 房主负责与服务器通讯
            countDownClock && clearInterval(countDownClock);
            countDownClock = setInterval(function () {
                clockContent.string = (--outTime_1 < 0 ? 0 : outTime_1).toString();
                if (outTime_1 <= 0) {
                    // 如果为房主则执行io emit否则清除状态
                    if (playersData[0].id === state_1.default.userInfo.id) {
                        _this.skip();
                    }
                    else {
                        _this.resetCard();
                    }
                }
            }, 1000);
        }
        // 桌面分数显示
        if (data.desktopScore !== undefined) {
            this.desktopScore.string = data.desktopScore.toString();
        }
        // 判断是否为当前玩家发牌阶段
        if (data.next.index === this.roomInfoData.playerIndex) {
            this.currentUser(data.next);
        }
        // 分数修改
        if (data.score) {
            this.playersData.forEach(function (player, i) {
                var target = FourCardsPlayers[player.index];
                target.score.string = data.score[i].toString();
                target.noteScore.string = data.noteScore[i].toString();
                if (target.cardCount) {
                    target.cardCount.string = data.cardCount[i].toString();
                }
            });
        }
    };
    /**
     * 开始游戏
     * @param cardData - 卡牌数组
     */
    FourCardsGame.prototype.gameStart = function (cardData) {
        var _a;
        var Card = this.Card;
        var CardKey = Object.keys(Card);
        this.wait_player_join.active = !1;
        // 模拟发牌
        var _b = this, node = _b.node, cardList = _b.cardList;
        var screenHeight = node.height;
        // 扑克牌当前张数
        var cardCount = 0;
        // 排序
        var sortCard = [];
        if (cardData.length === 4) {
            cardData.push({});
        }
        for (var num = 0; num < 13; num++) {
            sortCard[num] = [];
            for (var row = 0; row < cardData.length - 1; row++) {
                var targetCard = cardData[row][num];
                targetCard && (_a = sortCard[num]).push.apply(_a, Array(targetCard).fill(row));
            }
        }
        // 大小王
        var jokers = cardData[4];
        if (jokers) {
            sortCard.unshift([]);
            Object.keys(jokers).forEach(function (num) {
                var _a;
                jokers[num] && (_a = sortCard[0]).push.apply(_a, Array(jokers[num]).fill(num));
            });
        }
        if (!Object.keys(cardData[0]).length) {
            sortCard[0] = [];
        }
        console.log(sortCard, cardData);
        for (var row = 0; row < sortCard.length; row++) {
            var rowItem = sortCard[row];
            for (var col = 0; col < rowItem.length; col++) {
                // 主颜色
                var mainColor = row !== 0 ? rowItem[col] : 4;
                // 子颜色
                var mainChildColor = row !== 0 ? row - 1 : rowItem[col];
                // 当前颜色的扑克牌张数
                var targetFrame = this.Card[CardKey[mainColor]][mainChildColor];
                var newNode = new cc.Node();
                var mask = cc.instantiate(this.cardsMask);
                newNode.addChild(mask);
                mask.active = false;
                newNode.scale = .6;
                var nodeSprice = newNode.addComponent(cc.Sprite);
                nodeSprice.spriteFrame = targetFrame;
                var x = void 0, y = 0;
                // 30: 每张牌可见距离， 0.5: 屏幕左侧开始  100: 安全距离
                x = (cardCount * 15) - 400;
                y = 50;
                // 三行判断
                var clickEventHandler = new cc.Component.EventHandler();
                //这个 node 节点是你的事件处理代码组件所属的节点
                clickEventHandler.target = this.node;
                //这个是代码文件名
                clickEventHandler.component = "FourCardsMain";
                clickEventHandler.handler = "onClickCard";
                clickEventHandler.customEventData = cardCount.toString();
                var newButton = newNode.addComponent(cc.Button);
                newButton.clickEvents.push(clickEventHandler);
                this.cardBox.addChild(newNode);
                // 放置到屏幕最上方
                newNode.y = newNode.height + (screenHeight * 2);
                newNode.x = x;
                newNode.y = y;
                // 显示数字
                if (col === 0 && row !== 0) {
                    this.addCardNumber(rowItem.length, newNode, row);
                }
                cardList.push({
                    node: newNode,
                    x: x,
                    y: y,
                    number: row,
                    row: mainColor,
                    col: mainChildColor,
                    buttonScipt: newButton,
                    clickEventHandler: clickEventHandler,
                    mask: mask,
                });
                // console.log(mainColor, mainChildColor, row);
                cardCount++;
            }
        }
        // let updatePoint = 0;
        // let clock = setInterval(() => {
        //     const target = cardList[updatePoint];
        //     if (target && updatePoint < cardList.length && target.node) {
        //         target.node.x = target.x;
        //         target.node.y = target.y;
        //         console.log(target.x);
        //         updatePoint++;
        //     } else {
        //         clearInterval(clock);
        //     }
        // }, 50);
        this.updateCardPoint();
    };
    /**
     * 扑克牌点击事件
     * @param e         - 事件体
     * @param cardIndex - 扑克牌下标
     */
    FourCardsGame.prototype.onClickCard = function (e, cardIndex) {
        var _this = this;
        // 判断是为当前玩家的回合
        if (!this.setpBtn.node.active && e)
            return;
        var groupCardList = this.cardList;
        var cardInfo = groupCardList[cardIndex];
        if (!cardInfo)
            return;
        // 如果之前未点击牌则全选当前种类的牌
        var cardListKeys = Object.keys(cardList);
        if (!cardListKeys.length && e) {
            this.cardList.forEach(function (card, index) {
                if (card.number === cardInfo.number) {
                    _this.onClickCard(false, index);
                }
            });
            return !0;
        }
        else {
            // 如果选中的牌不同则重选
            var first_1 = cardList[cardListKeys[0]];
            if (first_1 && first_1.number && first_1.number !== cardInfo.number) {
                this.cardList.forEach(function (card, index) {
                    if (card.number === first_1.number && groupCardList[index].isSelect) {
                        _this.onClickCard(e, index);
                    }
                });
                this.onClickCard(e, cardIndex);
                return !0;
            }
        }
        var targetNode = cardInfo.node;
        targetNode.runAction(cc.moveTo(.2, targetNode.x, targetNode.y + (cardInfo.isSelect ? -20 : 20)).easing(cc.easeBackOut()));
        (cardInfo.isSelect = !cardInfo.isSelect)
            ? cardList[cardIndex] = cardInfo
            : delete cardList[cardIndex];
        this.setpBtn.interactable = !!Object.keys(cardList).length;
    };
    /**
     * 发牌
     *  - 选中的牌进行发牌操作
     */
    FourCardsGame.prototype.dealCards = function () {
        // 销毁桌前的扑克牌
        if (this.desktop.card.length) {
            this.desktop.card.forEach(function (card) { return card.destroy(); });
            this.desktop.card = [];
        }
        var selectCard = [];
        var numberCard = [];
        this.cardList.forEach(function (item, index) {
            if (item.isSelect) {
                selectCard.push(index);
                numberCard.push({
                    r: item.row,
                    c: item.col,
                    n: item.number,
                });
            }
            item.node.children[0].active = false;
        });
        this.resetCard();
        cardList = {};
        state_1.default.io.emit('fourCards/setp', numberCard);
        this.outCardActuin(selectCard, this.playersData[this.roomInfoData.playerIndex]);
    };
    /**
     * 跳过本轮
     */
    FourCardsGame.prototype.skip = function () {
        this.resetCard();
        state_1.default.io.emit('fourCards/setp', '');
    };
    /**
     * 恢复初始状态
     */
    FourCardsGame.prototype.resetCard = function () {
        var _this = this;
        this.setpBtn.node.active = false;
        this.skipBtn.node.active = false;
        this.cardList.forEach(function (item, index) {
            item.node.children[0].active = false;
            item.node.getComponent(cc.Button).interactable = true;
            if (item.isSelect) {
                _this.onClickCard(false, index);
            }
        });
    };
    /**
     * 发牌动作
     */
    FourCardsGame.prototype.outCardActuin = function (cards, player) {
        var _this = this;
        if (!player)
            return;
        var index = player.index;
        var cardList = this.cardList;
        var cardPoint = this.FourCardsPlayers[index].cardPoint;
        var cardsReverse = [];
        if (index === 0) {
            console.log(cards);
            cards.reverse().forEach(function (card) {
                cardsReverse.push(cardList.splice(card, 1));
            });
            cardsReverse.reverse().forEach(function (card, offset) {
                if (card[0]) {
                    var node = card[0].node;
                    // 出牌后删除纸牌上的数字
                    if (node.children.length === 2) {
                        node.children[1].destroy();
                    }
                    // 扑克牌缓动效果
                    node.runAction(cc.moveTo(.2, cardPoint.x + (15 * offset) - 400, cardPoint.y).easing(cc.easeBackOut()));
                    _this.desktop.card.push(node);
                }
            });
        }
        else {
            var cardKey_1 = Object.keys(this.Card);
            cardPoint.removeAllChildren();
            (cards || []).forEach(function (card, offset) {
                // console.log(cardKey[card.r], cardKey, card.r, this.Card[cardKey[card.r]]);
                var targetFrame = _this.Card[cardKey_1[card.r]][card.c];
                var newNode = new cc.Node();
                newNode.scale = .4;
                newNode.x += 10 * offset;
                newNode.y = cardPoint.y;
                var nodeSprice = newNode.addComponent(cc.Sprite);
                nodeSprice.spriteFrame = targetFrame;
                cardPoint.addChild(newNode);
            });
        }
        if (!cards) {
            var newNode_1 = new cc.Node();
            newNode_1.addComponent(cc.Sprite).spriteFrame = this.skipSpriteFrame;
            newNode_1.scale = .6;
            cardPoint.addChild(newNode_1);
            if (index === 0) {
                newNode_1.x = 0;
                newNode_1.y = 0;
            }
            setTimeout(function () {
                newNode_1.destroy();
            }, 1500);
        }
        this.updateCardPoint();
    };
    /**
     * 重新刷新扑克牌位置
     */
    FourCardsGame.prototype.updateCardPoint = function () {
        var _this = this;
        var cardList = this.cardList;
        var prevNumber = -1; // 上类扑克牌标识
        var prevCount = 0; // 上类扑克牌数量
        var prevNode = null; // 上类扑克牌节点
        cardList.forEach(function (card, index) {
            // card.node.x = index * 15;
            var node = card.node;
            card.clickEventHandler.customEventData = index;
            // 如果判定到位最后一张非同类牌 进行重置
            if (prevNumber !== card.number || index === cardList.length - 1) {
                if (prevNode) {
                    // 如果为全部的最后一张牌
                    if (index == cardList.length - 1 && prevNumber !== card.number) {
                        if (card.node.children.length !== 2) {
                            _this.addCardNumber('1', card.node, prevNumber);
                        }
                        else {
                            var labelNode = card.node.children[1].getComponent(cc.Label);
                            if (labelNode.string && labelNode.string !== '1') {
                                labelNode.string = '1';
                            }
                        }
                    }
                    // 如果目标扑克牌存在文本节点则修改内容 否则 创建文本节点
                    var prevCountStr = prevCount.toString();
                    if (prevNode.node.children.length !== 2) {
                        _this.addCardNumber(prevCountStr, prevNode.node, prevNumber);
                    }
                    else {
                        var labelNode = prevNode.node.children[1].getComponent(cc.Label);
                        if (labelNode.string && labelNode.string !== prevCountStr) {
                            if (index == cardList.length - 1) {
                                prevCountStr = (++prevCount).toString();
                            }
                            labelNode.string = prevCountStr;
                        }
                    }
                }
                prevNumber = card.number;
                prevCount = 0;
                prevNode = card;
            }
            prevCount++;
            node.runAction(cc.moveTo(.5, index * 15 - 400, node.y).easing(cc.easeBackOut()));
        });
    };
    /**
     * 当玩家加入房间时
     */
    FourCardsGame.prototype.fetchRoomInfo = function (data) {
        var _this = this;
        var MyUserData = state_1.default.userInfo;
        axiosUtils_1.default.api('room_info').then(function (res) {
            _this.playersData = [];
            var myPlayer = _this.FourCardsPlayers[0];
            var outherPlayer = 1;
            tool_1.loadImg(MyUserData.avatarUrl, function (spriteFrame) {
                myPlayer.avatarUrl.spriteFrame = spriteFrame;
                myPlayer.noteScore.string = '0';
                myPlayer.cardCount && (myPlayer.cardCount.string = '54');
                myPlayer.score.string = '0';
            }, 'avatar', MyUserData.id);
            _this.playersData = res.players.map(function (player, index) {
                if (index !== res.playerIndex) {
                    var target_1 = _this.FourCardsPlayers[outherPlayer];
                    player.index = outherPlayer;
                    target_1.nickname.string = player.nickname;
                    tool_1.loadImg(player.avatarUrl, function (spriteFrame) {
                        target_1.avatarUrl.spriteFrame = spriteFrame;
                    }, 'avatar', player.id);
                    outherPlayer++;
                }
                else {
                    player.index = 0;
                }
                return player;
            });
            // 检测是否已经开始游戏
            if (res.isStart && res.players[res.playerIndex]) {
                _this.gameStart(res.players[res.playerIndex].card);
                // 判断自己是否可以先手出牌
                var sendData = {
                    next: {
                        index: res.gameData.target,
                    },
                };
                _this.userSendCard(sendData);
                if (res.gameData.target === res.playerIndex) {
                    _this.currentUser(false);
                }
            }
            _this.roomInfoData = res;
            _this.roomIdLabel.string = "\u623F\u95F4\u53F7: " + (res.roomCode || '错误');
        });
    };
    /**
     * 玩家离开游戏时
     * @param data - 数据
     */
    FourCardsGame.prototype.rommleave = function (ioData) {
        ioData = JSON.parse(ioData);
        if (ioData && ioData.data && ioData.data.id === this.playersData[0].id) {
            this.gameOver({ type: 0 });
        }
    };
    /**
     * 游戏结束
     * @param data
     *  - false: 房主离开游戏触发
     *
     */
    FourCardsGame.prototype.gameOver = function (data) {
        var _this = this;
        console.log(data);
        var _a = this, playersData = _a.playersData, node = _a.node, popupPrefab = _a.popupPrefab, FourCardsPlayers = _a.FourCardsPlayers;
        if (data && data.type !== 0) {
            this.gameOver = function () { };
            var chessPrefab = cc.instantiate(this.chessPrefab);
            var chessScript = chessPrefab.getComponent('overScript');
            var chessData_1 = [];
            var winner_1 = null;
            playersData.forEach(function (player, index) {
                var gamedata = data.gameData;
                var score = gamedata.score[index];
                chessData_1.push({
                    nickname: player.nickname,
                    avatarUrl: FourCardsPlayers[index].avatarUrl.spriteFrame,
                    score: score,
                    item: {
                        noteScore: gamedata.noteScore[index],
                    },
                });
                if (!winner_1 || winner_1.score < score) {
                    winner_1 = {
                        player: player,
                        score: score,
                    };
                }
            });
            // 赢家显示
            if (winner_1) {
                winner_1.player.winner = true;
            }
            chessScript.init({
                players: chessData_1,
                itemKey: {
                    noteScore: '抓分',
                },
                time: data.gameData.createTime,
                roomId: data.roomCode,
            });
            this.node.addChild(chessPrefab);
            this.roomExit();
        }
        else if (this.roomInfoData.playerIndex !== 0) {
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
        else if (this.playersData.length === 1) {
            this.roomExit();
            cc.director.loadScene('Home');
        }
        clock && clearInterval(clock);
        countDownClock && clearInterval(countDownClock);
        console.log(this.playersData.length);
    };
    /**
     * 退出房间
     */
    FourCardsGame.prototype.roomExit = function () {
        axiosUtils_1.default.api('room_exit', {
            data: {
                roomCode: this.roomInfoData.id,
            },
        }).then(function () { });
    };
    /**
     * 返回首页
     */
    FourCardsGame.prototype.backHome = function () {
        var _this = this;
        var _a = this, playersData = _a.playersData, node = _a.node, popupPrefab = _a.popupPrefab;
        // console.log(State, playersData);
        if (!playersData.length || playersData.length === 1) {
            return this.gameOver(false);
        }
        var popup = cc.instantiate(popupPrefab);
        var scriptPopup = popup.getComponent('popup');
        cc.director.getScene().addChild(popup);
        playersData.forEach(function (item, index) {
            if (item.id === state_1.default.userInfo.id) {
                console.log(index);
                scriptPopup.init('是否要返回大厅?\n' + (index ? '将退出房间' : '房间将被解散'));
                scriptPopup.setEvent('success', function () {
                    popup.destroy();
                    _this.roomExit();
                    cc.director.loadScene('Home');
                });
                scriptPopup.setEvent('close', function () { });
            }
        });
    };
    /**
     * 暂停游戏
     */
    FourCardsGame.prototype.stopGames = function () {
        var _this = this;
        cc.loader.loadRes('prefab/stopGames', cc.Prefab, function (err, prefab) {
            if (prefab) {
                var popup = cc.instantiate(prefab);
                cc.director.getScene().addChild(popup);
                var stopGames = popup.getComponent('stopGames');
                stopGames.backHomeEvent = function () {
                    _this.backHome();
                };
                // 设置分享
                var roomCode = _this.roomInfoData.roomCode;
                stopGames.shareData = {
                    title: "\u6211\u4EEC\u4E00\u8D77\u6765[" + roomCode + "]\u73A9\u56DB\u526F\u724C\u5427!",
                    imageUrl: state_1.default.OSS_BASE + '/H5Game/share/FourCards.jpg',
                    query: "fn=joinRoom&roomCode=" + roomCode,
                };
            }
        });
    };
    /**
     * 为扑克牌添加数量
     * @param number     - 扑克牌数量
     * @param newNode    - 扑克牌节点
     * @param cardNumber - 扑克牌点数
     */
    FourCardsGame.prototype.addCardNumber = function (number, newNode, cardNumber) {
        var labelNode = new cc.Node();
        var label = labelNode.addComponent(cc.Label);
        label.string = number;
        labelNode.x = -50;
        labelNode.y += 20;
        labelNode.color = cardNumber ? cc.color(63, 110, 146) : cc.color(222, 222, 222);
        label.fontSize = 30;
        newNode.addChild(labelNode);
    };
    __decorate([
        property(cc.Node)
    ], FourCardsGame.prototype, "cardBox", void 0);
    __decorate([
        property(cc.Label)
    ], FourCardsGame.prototype, "roomIdLabel", void 0);
    __decorate([
        property(FourCardsPlayersItem)
    ], FourCardsGame.prototype, "FourCardsPlayers", void 0);
    __decorate([
        property(cc.Prefab)
    ], FourCardsGame.prototype, "cardsMask", void 0);
    __decorate([
        property(cc.Prefab)
    ], FourCardsGame.prototype, "chessPrefab", void 0);
    __decorate([
        property(cc.Node)
    ], FourCardsGame.prototype, "wait_player_join", void 0);
    __decorate([
        property(cc.Prefab)
    ], FourCardsGame.prototype, "popupPrefab", void 0);
    __decorate([
        property(cc.Node)
    ], FourCardsGame.prototype, "clockBox", void 0);
    __decorate([
        property(cc.Label)
    ], FourCardsGame.prototype, "clockContent", void 0);
    __decorate([
        property(cc.Button)
    ], FourCardsGame.prototype, "setpBtn", void 0);
    __decorate([
        property(cc.Button)
    ], FourCardsGame.prototype, "skipBtn", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], FourCardsGame.prototype, "skipSpriteFrame", void 0);
    __decorate([
        property(cc.Label)
    ], FourCardsGame.prototype, "desktopScore", void 0);
    __decorate([
        property(CardItem)
    ], FourCardsGame.prototype, "Card", void 0);
    FourCardsGame = __decorate([
        ccclass
    ], FourCardsGame);
    return FourCardsGame;
}(cc.Component));
exports.default = FourCardsGame;

cc._RF.pop();