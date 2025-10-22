"use strict";
cc._RF.push(module, '63bd0pG2+lIY7NLVqSDMBwd', 'registerAccount');
// scripts/loginPage/script/registerAccount.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var axiosUtils_1 = require("../../utils/axiosUtils");
var state_1 = require("../../utils/state");
var confusion_1 = require("../../utils/confusion");
var RegisterAccount = /** @class */ (function (_super) {
    __extends(RegisterAccount, _super);
    function RegisterAccount() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 账号输入框
        _this.accountInput = null;
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
            account: '',
            password: '',
            twoPassword: '',
        };
        return _this;
        // update (dt) {}
    }
    RegisterAccount.prototype.start = function () {
        var _this = this;
        this.accountInput.node.on('text-changed', function (e) { return _this.input.account = e.string; }, this);
        this.passwordInput.node.on('text-changed', function (e) { return _this.input.password = e.string; }, this);
        this.twoPasswordInput.node.on('text-changed', function (e) { return _this.input.twoPassword = e.string; }, this);
        this.mobileInput.node.on('text-changed', function (e) { return _this.input.mobile = e.string; }, this);
        this.codeInput.node.on('text-changed', function (e) { return _this.input.code = e.string; }, this);
    };
    /**
     * 点击注册事件
     */
    RegisterAccount.prototype.onRegisterEvent = function () {
        var _this = this;
        this.message.string = '';
        var _a = this.input, code = _a.code, mobile = _a.mobile, account = _a.account, password = _a.password, twoPassword = _a.twoPassword;
        if (!code || !mobile || !account || !password || !twoPassword) {
            return this.message.string = '请先填写完整的信息!';
        }
        // 校验
        if (password.length < 6 || password.length > 20) {
            return this.message.string = '密码长度6-20位!';
        }
        if (/[^a-zA-Z0-9]/.test(account)) {
            return this.message.string = '账号只能由字母和数字组成!';
        }
        if (password !== twoPassword) {
            return this.message.string = '两次输入的密码不相同!';
        }
        if (!this.code) {
            return this.message.string = '请先发送验证码';
        }
        // 发送注册
        axiosUtils_1.default.api('user_reg', {
            data: __assign({ nickname: this.input.account }, this.input),
            params: {
                registerCode: this.code,
            },
        }).then(function (res) {
            if (res.status !== false) {
                // 简单的混淆
                var p = confusion_1.confusion.encrypt(password);
                var a = confusion_1.confusion.encrypt(account);
                localStorage.setItem('account', JSON.stringify({ a: a, p: p }));
                localStorage.setItem('userInfo', JSON.stringify(res));
                state_1.default.userInfo = res;
                cc.game.emit('tokenUpdate', res.token);
                _this.parentClass.loadingScens();
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
    RegisterAccount.prototype.onSendCode = function () {
        var _this = this;
        var mobile = this.input.mobile;
        this.message.string = '正在发送验证码...';
        if (!mobile || !(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(mobile))) {
            return this.message.string = '手机号错误!';
        }
        axiosUtils_1.default.api('get_regCode', {
            params: {
                codeType: 'register',
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
     * 关闭登录按钮
     */
    RegisterAccount.prototype.onClose = function () {
        this.node.destroy();
    };
    __decorate([
        property(cc.EditBox)
    ], RegisterAccount.prototype, "accountInput", void 0);
    __decorate([
        property(cc.EditBox)
    ], RegisterAccount.prototype, "passwordInput", void 0);
    __decorate([
        property(cc.EditBox)
    ], RegisterAccount.prototype, "twoPasswordInput", void 0);
    __decorate([
        property(cc.EditBox)
    ], RegisterAccount.prototype, "mobileInput", void 0);
    __decorate([
        property(cc.EditBox)
    ], RegisterAccount.prototype, "codeInput", void 0);
    __decorate([
        property(cc.Label)
    ], RegisterAccount.prototype, "message", void 0);
    RegisterAccount = __decorate([
        ccclass
    ], RegisterAccount);
    return RegisterAccount;
}(cc.Component));
exports.default = RegisterAccount;

cc._RF.pop();