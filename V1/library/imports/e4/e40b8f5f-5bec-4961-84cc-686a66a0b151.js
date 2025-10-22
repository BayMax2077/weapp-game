"use strict";
cc._RF.push(module, 'e40b89fW+xJYYTMaGpmoLFR', 'userCenter-popup');
// scripts/Home/user/userCenter-popup.ts

"use strict";
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
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
var UserCenterPopup = /** @class */ (function (_super) {
    __extends(UserCenterPopup, _super);
    function UserCenterPopup() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.content = null;
        _this.itemUI = [];
        return _this;
    }
    UserCenterPopup.prototype.onLoad = function () {
        this.ItemOnClick(false, 0);
    };
    /**
     * item点击事件
     * @param loadPrefabIndex 加载资源下标
     */
    UserCenterPopup.prototype.ItemOnClick = function (_e, loadPrefabIndex) {
        this.content.removeAllChildren();
        var instantiate = cc.instantiate(this.itemUI[loadPrefabIndex]);
        this.content.addChild(instantiate);
        this.content.height = instantiate.height;
        instantiate.width = this.content.width;
    };
    UserCenterPopup.prototype.close = function () {
        this.node.destroy();
    };
    __decorate([
        property(cc.Node)
    ], UserCenterPopup.prototype, "content", void 0);
    __decorate([
        property(cc.Prefab)
    ], UserCenterPopup.prototype, "itemUI", void 0);
    UserCenterPopup = __decorate([
        ccclass
    ], UserCenterPopup);
    return UserCenterPopup;
}(cc.Component));
exports.default = UserCenterPopup;

cc._RF.pop();