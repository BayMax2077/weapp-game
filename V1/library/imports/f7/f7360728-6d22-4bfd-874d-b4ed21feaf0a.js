"use strict";
cc._RF.push(module, 'f7360cobSJL/YdNtO0h/q8K', 'Shop');
// scripts/Home/shop/Shop.ts

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
var axiosUtils_1 = require("../../utils/axiosUtils");
var state_1 = require("../../utils/state");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Activity = /** @class */ (function (_super) {
    __extends(Activity, _super);
    function Activity() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 主盒子内容
        _this.mainContent = null;
        // 商品名
        _this.shopName = null;
        // 商品类型
        _this.shopType = null;
        // 商品价格
        _this.shopPrice = null;
        // 商品简介
        _this.shopDesc = null;
        // 商品图标
        _this.shopIcon = null;
        // 左侧内容盒子节点
        _this.leftBoxContent = null;
        // 内容可滚动区域
        _this.ScrollView = null;
        // 商城菜单列表prefab 资源
        _this.ShopMenuListPrefab = null;
        // 菜单物品资源
        _this.shopItemPrefab = null;
        // 弹窗资源
        _this.popup = null;
        // 没有商品字样
        _this.notGoods = null;
        // 物品数据
        _this.shopItemData = [];
        _this.defaultTarget = '';
        return _this;
    }
    Activity.prototype.init = function (option) {
        this.defaultTarget = option;
    };
    Activity.prototype.start = function () {
        var _this = this;
        this.notGoods.active = false;
        axiosUtils_1.default.api('shop_menu').then(function (data) {
            // 当前左侧列表目标
            var targetItem = null;
            // 当前聚焦的物品
            var focusItem = null;
            data.forEach(function (item, index) {
                var prefab = cc.instantiate(_this.ShopMenuListPrefab);
                var prefabScript = prefab.getComponent('ListItem');
                if (item.imgName) {
                    item.sprite = state_1.default.OSS_BASE + "/text/shop/" + item.imgName + ".png";
                }
                item.title = item.name;
                prefab.y = (prefab.y - index * 50) - prefab.height;
                _this.leftBoxContent.addChild(prefab);
                prefabScript.init(item, index, !0);
                prefab.scale = .8;
                // 左侧列表的点击事件处理
                prefabScript.clickEvent = function () { return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                    var _a, res, _b, mainContent_1, shopItemData_1, shopName_1, shopType_1, shopPrice_1, shopDesc_1, shopIcon_1, offsetX_1, col_1, i, len;
                    var _this = this;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                this.ScrollView.scrollToTop();
                                if (!!item.content) return [3 /*break*/, 2];
                                _a = item;
                                return [4 /*yield*/, axiosUtils_1.default.api('shop_menu_goods', {
                                        params: {
                                            menuId: item.id,
                                        },
                                    }).then(function (res) { return res; })];
                            case 1:
                                _a.content = _c.sent();
                                _c.label = 2;
                            case 2:
                                resolve(item);
                                if (targetItem)
                                    targetItem.blur();
                                targetItem = prefabScript;
                                res = item.content;
                                if (res instanceof Array) {
                                    _b = this, mainContent_1 = _b.mainContent, shopItemData_1 = _b.shopItemData, shopName_1 = _b.shopName, shopType_1 = _b.shopType, shopPrice_1 = _b.shopPrice, shopDesc_1 = _b.shopDesc, shopIcon_1 = _b.shopIcon;
                                    offsetX_1 = 0;
                                    col_1 = mainContent_1.width > 600 ? 5 : 4;
                                    res.forEach(function (item, index) {
                                        if (index % col_1 === 0) {
                                            offsetX_1 = 0;
                                        }
                                        offsetX_1++;
                                        if (shopItemData_1[index]) {
                                            // 重复渲染时重新初始化
                                            shopItemData_1[index].getComponent('shopItem').init(item);
                                            shopItemData_1[index].active = true;
                                        }
                                        else {
                                            var shopItemPrefab = cc.instantiate(_this.shopItemPrefab);
                                            mainContent_1.addChild(shopItemPrefab);
                                            var shopItemScript_1 = shopItemPrefab.getComponent('shopItem');
                                            shopItemScript_1.init(item);
                                            shopItemPrefab.x = (mainContent_1.width / col_1) * offsetX_1 - 80;
                                            shopItemPrefab.y = -Math.round(index / col_1 | 0) * 200 - 100;
                                            shopItemData_1.push(shopItemPrefab);
                                            shopItemScript_1.parentClass = _this;
                                            // 商品点击事件
                                            shopItemScript_1.clickEvent = function (data) {
                                                focusItem && focusItem.blur();
                                                shopItemScript_1.focus();
                                                focusItem = shopItemScript_1;
                                                shopName_1.string = data.name;
                                                shopType_1.string = '全部';
                                                shopPrice_1.string = data.price;
                                                shopDesc_1.string = data.desc;
                                                shopIcon_1.spriteFrame = shopItemScript_1.icon.spriteFrame;
                                            };
                                        }
                                        // // 点击第一个
                                        // if (index === 0) {
                                        //     shopItemData[0] && shopItemData[0].getComponent('shopItem').onClick();
                                        // }
                                    });
                                    // 重渲染 多余数据隐藏
                                    if (res.length < shopItemData_1.length) {
                                        for (i = res.length, len = shopItemData_1.length; i < len; i++) {
                                            shopItemData_1[i].active = false;
                                        }
                                    }
                                    this.notGoods.active = !res.length ? true : false;
                                }
                                return [2 /*return*/];
                        }
                    });
                }); }); };
                // 默认点击第一个
                if (_this.defaultTarget) {
                    if (_this.defaultTarget == item.name)
                        prefabScript.onClick();
                }
                else if (index === 0)
                    prefabScript.onClick();
            });
        });
    };
    /**
     * 购买商品时
     * @param goodsData - 商品数据
     */
    Activity.prototype.buyGoods = function (goodsData) {
        var popup = cc.instantiate(this.popup);
        var scriptPopup = popup.getComponent('popup');
        cc.director.getScene().addChild(popup);
        scriptPopup.init("\u5C06\u4F7F\u7528 " + (goodsData.price + goodsData.bay_currency_name) + " \u8D2D\u4E70,\n[ " + goodsData.name + " ]\n\u662F\u5426\u786E\u5B9A?");
        scriptPopup.setEvent('success', function () {
            scriptPopup.message('支付中...');
            scriptPopup.setEvent('success', null);
            scriptPopup.setEvent('close', null);
            axiosUtils_1.default
                .api('shop_buy', {
                params: {
                    goodsId: goodsData.id,
                },
            })
                .then(function (query) {
                if (query.status) {
                    scriptPopup.message("\u652F\u4ED8\u6210\u529F!\u83B7\u5F97\n[ " + goodsData.name + " ]");
                    cc.game.emit('updateUserData');
                }
                else {
                    scriptPopup.message('支付失败!\n' + query.msg);
                }
                scriptPopup.setEvent('success', function () {
                    popup.destroy();
                });
                scriptPopup.setEvent('close', function () { });
            })
                .catch(function () {
                scriptPopup.message('支付时发生错误!\n请稍后再试...');
                scriptPopup.setEvent('close', function () { });
            });
        });
        scriptPopup.setEvent('close', function () { });
    };
    Activity.prototype.close = function () {
        this.node.destroy();
    };
    __decorate([
        property(cc.Node)
    ], Activity.prototype, "mainContent", void 0);
    __decorate([
        property(cc.Label)
    ], Activity.prototype, "shopName", void 0);
    __decorate([
        property(cc.Label)
    ], Activity.prototype, "shopType", void 0);
    __decorate([
        property(cc.Label)
    ], Activity.prototype, "shopPrice", void 0);
    __decorate([
        property(cc.Label)
    ], Activity.prototype, "shopDesc", void 0);
    __decorate([
        property(cc.Sprite)
    ], Activity.prototype, "shopIcon", void 0);
    __decorate([
        property(cc.Node)
    ], Activity.prototype, "leftBoxContent", void 0);
    __decorate([
        property(cc.ScrollView)
    ], Activity.prototype, "ScrollView", void 0);
    __decorate([
        property(cc.Prefab)
    ], Activity.prototype, "ShopMenuListPrefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], Activity.prototype, "shopItemPrefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], Activity.prototype, "popup", void 0);
    __decorate([
        property(cc.Node)
    ], Activity.prototype, "notGoods", void 0);
    Activity = __decorate([
        ccclass
    ], Activity);
    return Activity;
}(cc.Component));
exports.default = Activity;

cc._RF.pop();