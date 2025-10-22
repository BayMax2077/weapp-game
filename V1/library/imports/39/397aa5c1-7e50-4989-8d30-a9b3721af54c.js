"use strict";
cc._RF.push(module, '397aaXBflBJiY0wqbNyGvVM', 'ListItem');
// scripts/perfab/script/ListItem.ts

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
var tool_1 = require("../../../scripts/lib/tool");
var ListItem = /** @class */ (function (_super) {
    __extends(ListItem, _super);
    function ListItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 标识ID
        _this.id = 0;
        // 商品价格
        _this.itemPrice = null;
        // 选中状态样式
        _this.itemTarget = null;
        _this.ParentClass = null;
        _this.datas = {};
        _this.Sprite = null;
        return _this;
    }
    /**
     * 点击事件
     */
    ListItem.prototype.onClick = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, datas, id, clickEvent, _b, html, content, Sprite;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this, datas = _a.datas, id = _a.id, clickEvent = _a.clickEvent;
                        _b = clickEvent;
                        if (!_b) return [3 /*break*/, 2];
                        return [4 /*yield*/, clickEvent(datas, id)];
                    case 1:
                        _b = (_c.sent());
                        _c.label = 2;
                    case 2:
                        _b;
                        html = datas.html, content = datas.content;
                        if ((html || content) && typeof content === 'string') {
                            this.ParentClass.mainContent.string = html || content;
                        }
                        Sprite = this.node.getComponent(cc.Sprite);
                        if (!this.Sprite) {
                            this.Sprite = Sprite.spriteFrame;
                        }
                        Sprite.spriteFrame = this.itemTarget;
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 失焦
     */
    ListItem.prototype.blur = function () {
        this.node.getComponent(cc.Sprite).spriteFrame = this.Sprite;
    };
    /**
     * 初始化数据
     * @param data  - 初始出具
     * @param index - 下标
     * @param auto  - 是否自适应
     */
    ListItem.prototype.init = function (data, index, auto) {
        if (auto === void 0) { auto = !1; }
        var id = data.id, title = data.title, sprite = data.sprite, scale = data.scale;
        if (auto) {
            // 大小适配
            var parentWidth = this.node.parent.width;
            this.node.width *= parentWidth / 140;
            this.node.height *= parentWidth / 140;
        }
        this.id = id;
        // 图片加载
        if (sprite) {
            typeof sprite === 'string' ? tool_1.loadImg(sprite, this.setSprite.bind(this)) : this.setSprite(sprite, scale || .5);
        }
        else {
            this.itemPrice.string = title.length > 5 ? title.substr(0, 5) + '...' : title;
        }
        data.index = index;
        this.datas = data;
    };
    /**
     * 创建精灵图
     */
    ListItem.prototype.setSprite = function (SpriteFrame, scale) {
        if (scale === void 0) { scale = .5; }
        var node = new cc.Node();
        var Sprite = node.addComponent(cc.Sprite);
        Sprite.spriteFrame = SpriteFrame;
        node.scale = scale;
        this.node.addChild(node);
    };
    __decorate([
        property()
    ], ListItem.prototype, "id", void 0);
    __decorate([
        property(cc.Label)
    ], ListItem.prototype, "itemPrice", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], ListItem.prototype, "itemTarget", void 0);
    ListItem = __decorate([
        ccclass
    ], ListItem);
    return ListItem;
}(cc.Component));
exports.default = ListItem;

cc._RF.pop();