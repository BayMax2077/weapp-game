"use strict";
cc._RF.push(module, '3d2e9i1+lFA6L5xu9IJTsO0', 'resetPassword');
// scripts/loginPage/script/resetPassword.ts

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
var axiosUtils_1 = require("../../utils/axiosUtils");
var NewClass = /** @class */ (function (_super) {
    __extends(NewClass, _super);
    function NewClass() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 密码输入框
        _this.passwordInput = null;
        // 确认密码输入框
        _this.twoPasswordInput = null;
        // 手机号输入框
        _this.mobileInput = null;
        // 验证码输入框
        _this.codeInput = null;
        // 消息提示内容
        _this.message = null;
        // 验证码发送冷却时间
        _this.codeCooling = 0;
        // 短信code
        _this.code = '';
        _this.input = {
            code: '',
            mobile: '',
            password: '',
            twoPassword: '',
        };
        return _this;
        // update (dt) {}
    }
    NewClass.prototype.start = function () {
        var _this = this;
        this.passwordInput.node.on('text-changed', function (e) { return _this.input.password = e.string; }, this);
        this.twoPasswordInput.node.on('text-changed', function (e) { return _this.input.twoPassword = e.string; }, this);
        this.mobileInput.node.on('text-changed', function (e) { return _this.input.mobile = e.string; }, this);
        this.codeInput.node.on('text-changed', function (e) { return _this.input.code = e.string; }, this);
    };
    /**
     * 点击注册事件
     */
    NewClass.prototype.onRegisterEvent = function () {
        var _this = this;
        this.message.string = '';
        var _a = this.input, code = _a.code, mobile = _a.mobile, password = _a.password, twoPassword = _a.twoPassword;
        if (!code || !mobile || !password || !twoPassword) {
            return this.message.string = '请先填写完整的信息!';
        }
        // 校验
        if (password.length < 6 || password.length > 20) {
            return this.message.string = '密码长度6-20位!';
        }
        if (password !== twoPassword) {
            return this.message.string = '两次输入的密码不相同!';
        }
        if (!this.code) {
            return this.message.string = '请先发送验证码';
        }
        // 发送注册
        axiosUtils_1.default.api('reset_pwd', {
            data: {
                newPassword: this.input.password,
                mobile: this.input.mobile,
                code: this.input.code,
            },
            params: {
                resetPasswordCode: this.code,
            },
        }).then(function (res) {
            if (res.status !== false) {
                _this.message.string = '密码修改成功, 请返回登录!';
                setTimeout(function () {
                    _this.node.destroy();
                }, 2000);
            }
            else {
                _this.message.string = res.msg;
            }
        }).catch(function () {
            _this.message.string = '账号系统繁忙, 请稍后再试!';
        });
    };
    /**
     * 发送验证码
     */
    NewClass.prototype.onSendCode = function () {
        var _this = this;
        var mobile = this.input.mobile;
        this.message.string = '正在发送验证码...';
        if (!mobile || !(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(mobile))) {
            return this.message.string = '手机号错误!';
        }
        axiosUtils_1.default.api('get_regCode', {
            params: {
                codeType: 'resetPassword',
                sendType: 'sms',
            },
            data: {
                recipient: this.input.mobile,
            },
        }).then(function (res) {
            if (res.status)
                _this.code = res.msg;
            _this.message.string = res.status ? '发送成功!' : res.msg;
        }).catch(function () {
            _this.message.string = '短信系统繁忙, 请稍后再试!';
        });
    };
    /**
     * 点击登录事件
     */
    NewClass.prototype.onLogingEvent = function () {
    };
    /**
     * 关闭登录按钮
     */
    NewClass.prototype.onClose = function () {
        this.node.destroy();
    };
    __decorate([
        property(cc.EditBox)
    ], NewClass.prototype, "passwordInput", void 0);
    __decorate([
        property(cc.EditBox)
    ], NewClass.prototype, "twoPasswordInput", void 0);
    __decorate([
        property(cc.EditBox)
    ], NewClass.prototype, "mobileInput", void 0);
    __decorate([
        property(cc.EditBox)
    ], NewClass.prototype, "codeInput", void 0);
    __decorate([
        property(cc.Label)
    ], NewClass.prototype, "message", void 0);
    NewClass = __decorate([
        ccclass
    ], NewClass);
    return NewClass;
}(cc.Component));
exports.default = NewClass;

cc._RF.pop();