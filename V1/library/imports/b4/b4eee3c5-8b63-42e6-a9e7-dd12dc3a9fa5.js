"use strict";
cc._RF.push(module, 'b4eeePFi2NC5qnn3RLcOp+l', 'keyboard');
// resources/prefab/script/keyboard.ts

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
Object.defineProperty(exports, "__esModule", { value: true });
// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
/**
 * 键盘组件
 */
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var KeyBoard = /** @class */ (function (_super) {
    __extends(KeyBoard, _super);
    function KeyBoard() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * 内容标签
         */
        _this.Label = null;
        /**
         * 内容盒子
         */
        _this.ContentBox = null;
        /**
         * 父级类 调用者this
         */
        _this.parentClass = {};
        return _this;
        // update (dt) {}
    }
    KeyBoard.prototype.start = function () {
        // 展现动画
        this.ContentBox.scale = 0;
        this.ContentBox.runAction(cc.scaleTo(0.5, 1, 1).easing(cc.easeBackOut()));
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.keyDown, this);
    };
    /**
     * 键盘按下事件
     * @param event - 事件
     */
    KeyBoard.prototype.keyDown = function (event) {
        var code = event.keyCode;
        if (code >= 96 && code <= 105) {
            this.onClickContent(false, code - 96);
        }
        if (code === 110) {
            this.onClickDecimal(false, '.');
        }
        if (code === cc.macro.KEY.enter) {
            this.onClickSuccess();
        }
    };
    /**
     * 点击0-9的数值时
     * @param _event  - 事件体
     * @param content - 内容
     */
    KeyBoard.prototype.onClickContent = function (_event, content) {
        this.Label.string += content;
    };
    /**
     * 点击.
     * @param _event  - 事件体
     * @param content - 内容
     */
    KeyBoard.prototype.onClickDecimal = function (_event, content) {
        var Label = this.Label;
        if (Label.string.indexOf('.') === -1 && Label.string.length) {
            Label.string += content;
        }
    };
    /**
     * 删除键
     */
    KeyBoard.prototype.onClickDelete = function () {
        var Label = this.Label;
        if (Label.string.length) {
            Label.string = Label.string.substr(0, Label.string.length - 1);
        }
    };
    /**
     * 完成键
     */
    KeyBoard.prototype.onClickSuccess = function () {
        this.parentClass.emit && this.parentClass.emit(this.Label.string);
    };
    /**
     * 重置键
     */
    KeyBoard.prototype.onClickReset = function () {
        this.Label.string = '';
    };
    /**
     * 关闭键
     */
    KeyBoard.prototype.onClickClose = function () {
        var _this = this;
        this.parentClass.close && this.parentClass.close();
        this.ContentBox.runAction(cc.sequence(cc.scaleTo(0.5, .5, .5).easing(cc.easeBackIn()), cc.callFunc(function () { return _this.node.destroy(); }, this)));
    };
    __decorate([
        property(cc.Label)
    ], KeyBoard.prototype, "Label", void 0);
    __decorate([
        property(cc.Node)
    ], KeyBoard.prototype, "ContentBox", void 0);
    KeyBoard = __decorate([
        ccclass
    ], KeyBoard);
    return KeyBoard;
}(cc.Component));
exports.default = KeyBoard;

cc._RF.pop();