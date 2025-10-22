"use strict";
cc._RF.push(module, '7b15bBfijNMz78adj5qSheA', 'Room');
// scripts/Home/Room/Room.ts

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
var Room = /** @class */ (function (_super) {
    __extends(Room, _super);
    function Room() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 创建房间界面
        _this.createNode = null;
        // 公共房间界面
        _this.publicNode = null;
        // 加入房间类型选择界面
        _this.typesNode = null;
        return _this;
        // update (dt) {}
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    Room.prototype.onLoad = function () {
        this.createNode.opacity = 255;
        this.publicNode.opacity = 255;
        this.typesNode.opacity = 255;
        this.createNode.active = false;
        this.publicNode.active = false;
        this.typesNode.active = false;
    };
    /**
     * 创建房间模式
     */
    Room.prototype.createRoomModel = function () {
        this.onLoad();
        this.createNode.active = true;
    };
    /**
     * 加入模式
     */
    Room.prototype.typeRoomModel = function () {
        this.onLoad();
        console.log(1231456);
        this.typesNode.active = true;
    };
    Room.prototype.close = function () {
        this.node.destroy();
    };
    __decorate([
        property(cc.Node)
    ], Room.prototype, "createNode", void 0);
    __decorate([
        property(cc.Node)
    ], Room.prototype, "publicNode", void 0);
    __decorate([
        property(cc.Node)
    ], Room.prototype, "typesNode", void 0);
    Room = __decorate([
        ccclass
    ], Room);
    return Room;
}(cc.Component));
exports.default = Room;

cc._RF.pop();