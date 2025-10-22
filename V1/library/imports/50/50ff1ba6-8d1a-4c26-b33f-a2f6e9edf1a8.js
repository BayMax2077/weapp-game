"use strict";
cc._RF.push(module, '50ff1umjRpMJrM/ovbp7fGo', 'EliminatingBlock');
// scripts/Games/eliminating/script/EliminatingBlock.ts

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
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
var Service_1 = require("./Service");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var EliminatingBlock = /** @class */ (function (_super) {
    __extends(EliminatingBlock, _super);
    function EliminatingBlock() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * icon资源类型
         * 1：熊
         * 2：狐狸
         * 3：老鼠
         * 4：青蛙
         * 5：鸟
         */
        _this.icons = [];
        /**
         * 发光状态的icon资源
         * 1：熊
         * 2：狐狸
         * 3：老鼠
         * 4：青蛙
         * 5：鸟
         */
        _this.iconsGon = [];
        // 竖轴资源
        _this.Hove = null;
        // 横轴资源
        _this.Vove = null;
        // icon Sprite 节点
        _this.icon = null;
        // 块类型
        _this.blockType = 0;
        // 资源下标
        _this.setFrameType = 0;
        return _this;
    }
    Object.defineProperty(EliminatingBlock.prototype, "type", {
        // 块类型
        get: function () {
            return this.node ? this.blockType : -1;
        },
        set: function (type) {
            this.blockType = type - 1;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * 初始化入口
     */
    EliminatingBlock.prototype.init = function (opt) {
        var node = this.node;
        var x = node.x, y = node.y, width = node.width, height = node.height;
        this.type = opt.type;
        this.icon.spriteFrame = this.icons[opt.type - 1];
        this.setFrameType = opt.type - 1;
        return {
            x: x,
            y: y,
            w: width,
            h: height,
            node: this.node,
            script: this,
        };
    };
    /**
     * 设置方块贴图
     * @param num 类型
     */
    EliminatingBlock.prototype.setFrame = function (num) {
        if (num === undefined)
            num = Service_1.default.randomNumber(Service_1.default.MAX - 1, Service_1.default.MIN, this.type);
        this.icon.spriteFrame = this.icons[num];
        this.setFrameType = num;
    };
    /**
     * 移动节点
     * @param offset   移动距离
     * @param duration 动画时间
     */
    EliminatingBlock.prototype.move = function (offset, duration, callbackFn) {
        if (duration === void 0) { duration = .5; }
        return __awaiter(this, void 0, void 0, function () {
            var _a, node, icon;
            return __generator(this, function (_b) {
                _a = this, node = _a.node, icon = _a.icon;
                if (node && icon.node) {
                    // const { width, height } = node;
                    // const x = offset.x < 0 ? 1 : -1;
                    // const y = offset.y < 0 ? 1 : -1;
                    return [2 /*return*/, new Promise(function (res, rej) {
                            icon.node.runAction(cc.sequence(cc.moveBy(duration, -offset.x, -offset.y).easing(cc.easeSineIn()), cc.callFunc(function () { return res(callbackFn ? callbackFn() : {}); })));
                        })];
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * 发光方法
     * @param toggle 是否发光
     */
    EliminatingBlock.prototype.toggleLuminescence = function (toggle) {
        this.icon.spriteFrame = this[toggle ? 'iconsGon' : 'icons'][this.blockType];
    };
    /**
     * 显示横轴或竖轴
     * @param ovrType
     * - false: 关闭显示
     * - h: 竖轴
     * - v: 横轴
     */
    EliminatingBlock.prototype.toggleOve = function (ovrType) {
        var node = new cc.Node();
        var sprite = node.addComponent(cc.Sprite);
        if (this.oveNode) {
            this.oveNode.destroy();
        }
        if (typeof ovrType === 'string') {
            sprite.spriteFrame = ovrType === 'h' ? this.Hove : this.Vove;
            this.icon.node.addChild(node);
            this.oveNode = node;
            // this.node.addChild(node);
            // node.height = this.node.height;
            // node.y -= node.height / 2;
            // node.x += this.node.width / 2;
        }
    };
    __decorate([
        property(cc.SpriteFrame)
    ], EliminatingBlock.prototype, "icons", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], EliminatingBlock.prototype, "iconsGon", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], EliminatingBlock.prototype, "Hove", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], EliminatingBlock.prototype, "Vove", void 0);
    __decorate([
        property(cc.Sprite)
    ], EliminatingBlock.prototype, "icon", void 0);
    EliminatingBlock = __decorate([
        ccclass
    ], EliminatingBlock);
    return EliminatingBlock;
}(cc.Component));
exports.default = EliminatingBlock;

cc._RF.pop();