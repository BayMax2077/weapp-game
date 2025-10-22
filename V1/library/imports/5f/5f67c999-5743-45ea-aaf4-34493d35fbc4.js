"use strict";
cc._RF.push(module, '5f67cmZV0NF6qr0NEk9NfvE', 'Email');
// scripts/Home/script/Email.ts

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
Object.defineProperty(exports, "__esModule", { value: true });
var axiosUtils_1 = require("../../utils/axiosUtils");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Item = cc.Class({
    name: 'EmailItem',
    properties: {
        id: 0,
        itemName: '',
        itemPrice: 0,
        iconSF: cc.SpriteFrame
    },
});
var NewClass = /** @class */ (function (_super) {
    __extends(NewClass, _super);
    function NewClass() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.maskBox = null;
        /**
         * 主盒子
         */
        _this.mainBox = null;
        /**
         * Item Prefab 资源
         */
        _this.listPrefab = null;
        /**
         * 左上角盒子
         */
        _this.leftTopContent = null;
        /**
         * 主盒子内容
         */
        _this.mainContent = null;
        /**
         * 左侧盒子
         */
        _this.leftTopBox = null;
        /**
         * 左下角盒子
         */
        _this.leftBottomBox = null;
        /**
         * 活动数据
         */
        _this.emailData = [];
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    NewClass.prototype.start = function () {
        this.fetchEmailRequest();
    };
    /**
     * 邮件界面显示
     */
    NewClass.prototype.emailPopupShow = function () {
        this.fetchEmailRequest();
        var _a = this, leftTopBox = _a.leftTopBox, leftBottomBox = _a.leftBottomBox, maskBox = _a.maskBox;
        maskBox.scale = 1;
        leftTopBox.runAction(cc.moveBy(.5, cc.v2(-leftTopBox.width, 0)).easing(cc.easeCubicActionOut()));
        // 底部窗口弹出
        setTimeout(function () {
            leftBottomBox.scale = 1;
            // leftBottomBox.runAction(
            //     cc.moveBy(0.5, cc.v2(0, -leftBottomBox.height), 0).easing(cc.easeCubicActionOut()),
            // );
        }, 700);
    };
    /**
     * 邮件界面隐藏
     */
    NewClass.prototype.emailPopupHide = function () {
        this.node.destroy();
        // const { leftTopBox, leftBottomBox, maskBox } = this;
        // maskBox.scale = 0;
        // leftBottomBox.scale = 0;
        // leftTopBox.runAction(
        //     cc.moveBy(0, cc.v2(leftTopBox.width, 0)).easing(cc.easeCubicActionOut()),
        // );
        // leftBottomBox.runAction(
        //     cc.moveBy(0, cc.v2(0, leftBottomBox.height)).easing(cc.easeCubicActionOut()),
        // );
    };
    /**
     * 获取邮件消息
     */
    NewClass.prototype.fetchEmailRequest = function () {
        var _this = this;
        axiosUtils_1.default.api('home_email').then(function (data) {
            _this.emailData = data;
            data.forEach(function (item, index) {
                var newItem = cc.instantiate(_this.listPrefab);
                _this.leftTopContent.addChild(newItem);
                var newComponent = newItem.getComponent('emailActivityListItem');
                if (item.template) {
                    item = __assign(__assign({}, item), item.template);
                }
                newComponent.init(item);
                newComponent.clickEvent = function () { return new Promise(function (resolve, reject) {
                    if (!item.is_receive) {
                        axiosUtils_1.default.api('email_content', {
                            params: {
                                emailId: item.id,
                            },
                        }).then(function (res) {
                            item.content = res.content;
                            resolve();
                        });
                    }
                }); };
                newComponent.ParentClass = _this;
                newItem.y = (newItem.y - index * 40) - 200;
                _this.leftTopContent.height += 40;
                if (index === 0) {
                    newComponent.onClick();
                }
            });
        });
    };
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "maskBox", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "mainBox", void 0);
    __decorate([
        property(cc.Prefab)
    ], NewClass.prototype, "listPrefab", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "leftTopContent", void 0);
    __decorate([
        property(cc.Label)
    ], NewClass.prototype, "mainContent", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "leftTopBox", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "leftBottomBox", void 0);
    __decorate([
        property(Item)
    ], NewClass.prototype, "emailData", void 0);
    NewClass = __decorate([
        ccclass
    ], NewClass);
    return NewClass;
}(cc.Component));
exports.default = NewClass;

cc._RF.pop();