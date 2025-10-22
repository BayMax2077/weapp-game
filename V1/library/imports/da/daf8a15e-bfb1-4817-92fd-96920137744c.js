"use strict";
cc._RF.push(module, 'daf8aFev7FIF5L9lpIBN3RM', 'loginMessage');
// scripts/loginPage/script/loginMessage.ts

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
var LoginMessage = /** @class */ (function (_super) {
    __extends(LoginMessage, _super);
    function LoginMessage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 标题
        _this.title = null;
        // 内容
        _this.content = null;
        // 内容容器节点 续修改此节点长度达到可滚动
        _this.contentBox = null;
        return _this;
    }
    /**
     * 设置标题
     * @param spriteFrame 标题资源
     */
    LoginMessage.prototype.setTitle = function (spriteFrame) {
        this.title.spriteFrame = spriteFrame;
    };
    /**
     * 设置内容
     * @param content 文章内容
     */
    LoginMessage.prototype.setContent = function (content) {
        var _this = this;
        this.content.string = content;
        setTimeout(function () { return _this.contentBox.height = _this.content.node.height / 2 + 70; }, 500);
    };
    LoginMessage.prototype.close = function () {
        this.node.destroy();
    };
    __decorate([
        property(cc.Sprite)
    ], LoginMessage.prototype, "title", void 0);
    __decorate([
        property(cc.Label)
    ], LoginMessage.prototype, "content", void 0);
    __decorate([
        property(cc.Node)
    ], LoginMessage.prototype, "contentBox", void 0);
    LoginMessage = __decorate([
        ccclass
    ], LoginMessage);
    return LoginMessage;
}(cc.Component));
exports.default = LoginMessage;

cc._RF.pop();