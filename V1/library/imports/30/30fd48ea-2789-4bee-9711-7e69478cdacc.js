"use strict";
cc._RF.push(module, '30fd4jqJ4lL7pcRfmlHjNrM', 'Radio');
// scripts/perfab/script/Radio/Radio.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Radio = /** @class */ (function (_super) {
    __extends(Radio, _super);
    function Radio() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.value = null;
        _this.title = null;
        _this.string = null;
        _this.radio1 = null;
        _this.radio2 = null;
        _this.radio3 = null;
        _this.radio4 = null;
        return _this;
        // update (dt) {}
    }
    Radio.prototype.start = function () {
        var _a = this, radio1 = _a.radio1, radio2 = _a.radio2, radio3 = _a.radio3, radio4 = _a.radio4;
        var target = radio1.isChecked
            ? radio1 : radio2.isChecked
            ? radio2 : radio3.isChecked
            ? radio3 : radio4.isChecked
            ? radio4 : false;
        radio1.getComponent('toggle').parent = this;
        radio2.getComponent('toggle').parent = this;
        radio3.getComponent('toggle').parent = this;
        radio4.getComponent('toggle').parent = this;
        if (target) {
            var script = target.getComponent('toggle');
            script.onClick();
        }
    };
    /**
     * 初始化组合选项
     * @param title  - 标签
     * @param option - 参数
     */
    Radio.prototype.init = function (title, option) {
        var _this = this;
        [1, 2, 3, 4].forEach(function (index) {
            var targetRadio = _this["radio" + index];
            if (option[index - 1]) {
                var toggleScript = targetRadio.getComponent('toggle');
                toggleScript.text.string = option[index - 1];
            }
            else {
                targetRadio.node.scale = 0;
            }
        });
        this.title.string = title + ':';
    };
    /**
     * 切换选值事件
     * @param value  - 值
     * @param string - 字符串
     */
    Radio.prototype.toggleEvent = function (value, string) {
        this.value = value;
        this.string = string;
    };
    __decorate([
        property({ visible: !1 })
    ], Radio.prototype, "value", void 0);
    __decorate([
        property(cc.Label)
    ], Radio.prototype, "title", void 0);
    __decorate([
        property({ visible: !1 })
    ], Radio.prototype, "string", void 0);
    __decorate([
        property(cc.Toggle)
    ], Radio.prototype, "radio1", void 0);
    __decorate([
        property(cc.Toggle)
    ], Radio.prototype, "radio2", void 0);
    __decorate([
        property(cc.Toggle)
    ], Radio.prototype, "radio3", void 0);
    __decorate([
        property(cc.Toggle)
    ], Radio.prototype, "radio4", void 0);
    Radio = __decorate([
        ccclass
    ], Radio);
    return Radio;
}(cc.Component));
exports.default = Radio;

cc._RF.pop();