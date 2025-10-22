"use strict";
cc._RF.push(module, 'f7ffaCO0QNGGo0CMwfBNiqy', 'Activity');
// scripts/Home/script/Activity.ts

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
var axiosUtils_1 = require("../../utils/axiosUtils");
var state_1 = require("../../utils/state");
var Item = cc.Class({
    name: 'Item',
    properties: {
        id: 0,
        itemName: '',
        itemPrice: 0,
        iconSF: cc.SpriteFrame
    },
});
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Activity = /** @class */ (function (_super) {
    __extends(Activity, _super);
    function Activity() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.maskBox = null;
        // 主盒子
        _this.mainBox = null;
        // 主盒子容器
        _this.mainContent = null;
        // 主盒子内容
        _this.mainText = null;
        // 左侧盒子
        _this.leftTopBox = null;
        // 左侧内容盒子节点
        _this.activityListBox = null;
        // prefab 资源
        _this.activityListPrefab = null;
        // 活动数据
        _this.activityData = [];
        // 只初始化一次
        _this.rendererOnly = !1;
        return _this;
    }
    Activity.prototype.start = function () {
        this.fetchactivityRequest();
        this.mainText.string = '活动内容获取失败!';
    };
    /**
     * 活动界面隐藏
     */
    Activity.prototype.activityPopupHide = function () {
        this.node.destroy();
        this.closeCallBack && this.closeCallBack();
    };
    /**
     * 获取活动消息
     */
    Activity.prototype.fetchactivityRequest = function () {
        var _this = this;
        !this.rendererOnly && axiosUtils_1.default.api('home_activity').then(function (data) {
            _this.activityData = data;
            var lastItem = null;
            data.forEach(function (item, index) {
                var newItem = cc.instantiate(_this.activityListPrefab);
                _this.activityListBox.addChild(newItem);
                var newComponent = newItem.getComponent('ListItem');
                if (newComponent) {
                    newComponent.init(item);
                    newComponent.clickEvent = function () {
                        _this.mainText.string = item.html || '活动获取失败!';
                        setTimeout(function () { return _this.mainContent.height = _this.mainText.node.height / 2; }, 100);
                        lastItem && lastItem.blur();
                        lastItem = newComponent;
                    };
                    newItem.y = (newItem.y - index * 50) - newItem.height;
                    _this.activityListBox.height += 40;
                    _this.rendererOnly = !_this.rendererOnly;
                    if (index === 0) {
                        newComponent.onClick();
                    }
                }
                else
                    state_1.default.tips('列表资源加载失败!', 5, false, 1);
            });
        });
    };
    __decorate([
        property(cc.Node)
    ], Activity.prototype, "maskBox", void 0);
    __decorate([
        property(cc.Node)
    ], Activity.prototype, "mainBox", void 0);
    __decorate([
        property(cc.Node)
    ], Activity.prototype, "mainContent", void 0);
    __decorate([
        property(cc.Label)
    ], Activity.prototype, "mainText", void 0);
    __decorate([
        property(cc.Node)
    ], Activity.prototype, "leftTopBox", void 0);
    __decorate([
        property(cc.Node)
    ], Activity.prototype, "activityListBox", void 0);
    __decorate([
        property(cc.Prefab)
    ], Activity.prototype, "activityListPrefab", void 0);
    __decorate([
        property(Item)
    ], Activity.prototype, "activityData", void 0);
    __decorate([
        property({ visible: !1 })
    ], Activity.prototype, "rendererOnly", void 0);
    Activity = __decorate([
        ccclass
    ], Activity);
    return Activity;
}(cc.Component));
exports.default = Activity;

cc._RF.pop();