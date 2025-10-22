"use strict";
cc._RF.push(module, '9ea13rDiFRKWaNrKw4A8h/Y', 'Portrait');
// scripts/Home/script/Portrait.ts

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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var state_1 = require("../../utils/state");
var axiosUtils_1 = require("../../utils/axiosUtils");
var tool_1 = require("../../../scripts/lib/tool");
var Portrait = /** @class */ (function (_super) {
    __extends(Portrait, _super);
    function Portrait() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * 账号id
         */
        _this.id = null;
        /**
         * 昵称
         */
        _this.nickName = null;
        /**
         * 头像
         */
        _this.avatar = null;
        /**
         * 钻石
         */
        _this.diamond = null;
        /**
         * 金币
         */
        _this.gold = null;
        return _this;
    }
    Portrait.prototype.start = function () {
        this.updateUserData(state_1.default.userInfo);
        cc.game.on('updateUserData', this.updateUserData.bind(this));
    };
    Portrait.prototype.onDestroy = function () {
        cc.game.off('updateUserData', this.updateUserData.bind(this));
    };
    /**
     * 用户数据更新时
     * @param userData 用户信息, 如果不传入则会自动去服务器更新
     */
    Portrait.prototype.updateUserData = function (userData) {
        return __awaiter(this, void 0, void 0, function () {
            var res, nickname, id, diamond, gold, avatarUrl;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!userData) return [3 /*break*/, 2];
                        return [4 /*yield*/, axiosUtils_1.default.api('get_assets').then()];
                    case 1:
                        res = _a.sent();
                        userData = __assign(__assign({}, state_1.default.userInfo), res);
                        _a.label = 2;
                    case 2:
                        nickname = userData.nickname, id = userData.id, diamond = userData.diamond, gold = userData.gold, avatarUrl = userData.avatarUrl;
                        this.nickName.string = nickname;
                        this.id.string = 'ID: ' + (id || '000000').toString();
                        this.diamond.string = diamond.toString();
                        this.gold.string = gold.toString();
                        // 头像在线加载
                        // avatarUrl === 1 时加载ID的头像否则加载Default头像
                        tool_1.loadImg(avatarUrl, function (spriteFrame) {
                            if (spriteFrame && _this.avatar) {
                                _this.avatar.spriteFrame = spriteFrame;
                            }
                        }, 'avatar', id);
                        return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        property(cc.Label)
    ], Portrait.prototype, "id", void 0);
    __decorate([
        property(cc.Label)
    ], Portrait.prototype, "nickName", void 0);
    __decorate([
        property(cc.Sprite)
    ], Portrait.prototype, "avatar", void 0);
    __decorate([
        property(cc.Label)
    ], Portrait.prototype, "diamond", void 0);
    __decorate([
        property(cc.Label)
    ], Portrait.prototype, "gold", void 0);
    Portrait = __decorate([
        ccclass
    ], Portrait);
    return Portrait;
}(cc.Component));
exports.default = Portrait;

cc._RF.pop();