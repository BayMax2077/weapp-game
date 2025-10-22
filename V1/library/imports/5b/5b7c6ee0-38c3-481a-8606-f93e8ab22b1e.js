"use strict";
cc._RF.push(module, '5b7c67gOMNIGoYG+T6Ksise', 'axiosUtils');
// scripts/utils/axiosUtils.ts

"use strict";
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
/* tslint:disable */
/**
 * Axios 二次封装 [未启用加密版]
 * author:  ShiLaiMu
 * version: v1.2.1
 * type:    TypeScript
 * encrypt: false
 *
 * 依赖:
 * @/config/api.config.ts
 * @/config/default.config.ts
 * npm install @types/axios @types/qs --save
 *
 * 全局:
 * [main.ts] Vue.prototype.$axios = axios;
 *
 * 功能:
 * - 全局统一：  请求api配置中的接口，实现一改配置修改全部请求
 * - 统一配置化: 请求信息，分离 [服务器配置文件] 和 [请求配置文件]，实现可配置 [主和子服务器/请求延迟/请求路由/请求方式/请求的目标服务器]
 * - 身份携带：  token自动化加入请求头，读取本地缓存
 * - 请求权重：  调用时指定的请求信息必定覆盖配置内的请求信息
 * - 路由参数：  配置文件中支持路由
 * - 临时令牌：  如果response header内存在token则会将它作为临时token，下次请求时使用
 * - 线上线下域：生产模式下自动切换为线上请求域，开发模式自动切换为内网域或开发本地域   ——   V1.1.6+
 * - 全局监听：  全局监听axios的事件，统一处理请求指定事件并及时响应   ——   V1.2.0+
 * - 内网请求：  内网访问及调试时，后端请求自动切换为内网域   ——   V1.2.1+
 *
 * 调用方法:
 * - 推荐:
 *   this.$axios.api('login', RequestConfig).then(console.log).catch(console.error)
 *   请求「@/config/api.config.ts」文件中 login 路由，并携带RequestConfig内的参数
 *   此方法的请求主机和和方法均为配置中的指向，如 testServer1:post./user/login 默认指向 testServer1 主机，使用post方法请求/user/login
 *
 * - 权重法:
 *   this.$axios.api('login').get(RequestConfig).then(console.log).catch(console.error)
 *   请求 login 路由，并携带RequestConfig内的参数，但会强制使用get方法请求，并非配置中的post请求，此时post可视为默认请求，但get为指定所以权重更高
 *
 * - 路由参数:
 *   RequestConfig 内可传入 params 对象，如路由为 testServer1:post./user/:username/login
 *   传入 RequestConfig = { params: { username: 'slm' } } 则会被转换为 testServer1:post./user/slm/login
 *
 * - 内网请求
 *   当请求为127.0.0.1或loaclhost且前端的域非两者之一，自动将请求域替换为当前前端的域，以实现内网请求及调试
 *
 * - 全局监听
 *   this.$axios.observer.emit(EventKey, callback)  绑定
 *   this.$axios.observer.off(EventKey, callback)   解绑
 *   EventKey:
 *      + response.updateToken  请求响应更新token时
 *      + response.error        请求响应错误时
 *      + response.default      请求默认响应时
 *
 * 配置方法：
 * - @/config/api.config.ts
 *   {  路由名: '服务器名:请求方法.路由' } 如 { login: 'test1:post./user/:user' } 服务器名和请求方法均为可选参数
 *   如 'post./user/:user' 或 'test1:/user/:user' 或 '/user/:user' 当请求方法不存在时默认为GET请求，当服务器名不存在时默认为主服务器
 */
// api调用
var api_config_1 = require("../config/api.config");
// 配置文件
var default_config_1 = require("../config/default.config");
// 开发环境判断
var isDEV = CC_DEV;
// token存储
var token = false;
// 服务器配置
var serverConfig = default_config_1.default.server;
// 频繁请求处理
var requestClock = {};
// 观察者
var observer = {
    /**
     * 响应
     */
    response: {
        /**
         * 更新token时
         */
        updateToken: [],
        /**
         * 响应错误时
         */
        error: [],
        /**
         * 默认
         */
        default: [],
    },
};
// 当前域
var locaHostName = window.location.hostname;
var localRegExp = /127\.0\.0\.1|localhost/;
var ObserverKey;
var HttpUtil = /** @class */ (function () {
    function HttpUtil() {
    }
    /**
     * 发送WEB请求
     * @param method   - 请求方式
     * @param url      - 请求链接
     * @param config   - 请求参数
     */
    HttpUtil.request = function (method, url, config, api) {
        if (method === void 0) { method = 'get'; }
        if (config === void 0) { config = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var dataStr, data, params, key, targetServer, targetChild, requestKey, targetClock;
            return __generator(this, function (_a) {
                if (!token) {
                    token = localStorage.getItem('token') || JSON.parse(localStorage.getItem('userInfo') || '{}').token;
                    if (token) {
                        token = encodeURIComponent(token);
                        observer.response.updateToken.forEach(function (cb) { return cb(token); });
                    }
                }
                else
                    token = encodeURIComponent(token);
                dataStr = '';
                data = config.data;
                Object.keys(data || {}).forEach(function (key) {
                    dataStr += key + '=' + encodeURIComponent(data[key]) + '&';
                });
                if (dataStr !== '') {
                    dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
                    if (method === 'get') {
                        url += '?' + dataStr;
                    }
                }
                params = config.params || (data && data.params);
                if (params && url) {
                    for (key in params) {
                        if (params[key] !== undefined) {
                            url = url.replace(":" + key, params[key]);
                        }
                    }
                    delete config.params;
                    if (data)
                        delete data.params;
                }
                // 统一处理路由
                if (url && api) {
                    targetServer = (url.match(/^(\w+)(?=\:)/) || [])[0];
                    if (targetServer) {
                        targetChild = serverConfig.children[targetServer];
                        if (targetChild) {
                            url = url.replace(/^(\w+)\:/, '');
                            config.baseURL = !isDEV ? targetChild.host : targetChild.devHost;
                        }
                        else
                            throw Error(targetServer + " \u5B50\u670D\u52A1\u5668\u672A\u5728\u914D\u7F6E\u5185!");
                    }
                    url = url.replace(/^(post|get|put|delete)\./i, '');
                }
                requestKey = method + url;
                if (requestKey) {
                    targetClock = requestClock[requestKey];
                    if (targetClock && targetClock > Date.now()) {
                        return [2 /*return*/, Promise.reject({ error: '频繁请求拦截！', requestKey: requestKey })];
                    }
                    // requestClock[requestKey] = Date.now() + 400;
                    requestClock[requestKey] = Date.now() + 1;
                }
                if (api) {
                    url = HttpUtil.baseUrl + url;
                }
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var xhr = cc.loader.getXMLHttpRequest();
                        xhr.open(method.toLocaleUpperCase(), url, true);
                        xhr.setRequestHeader('Content-Type', (method !== 'get' ? 'application/x-www-form-urlencoded' : 'text/plain') + ";charset=UTF-8");
                        xhr.setRequestHeader('token', token);
                        xhr.onreadystatechange = function () {
                            if (xhr.readyState === 4) {
                                var response = xhr.responseText;
                                if (xhr.status >= 200 && xhr.status < 300) {
                                    var res_1 = JSON.parse(response) || xhr;
                                    var newToken = res_1.token || xhr.getResponseHeader('token');
                                    if (newToken) {
                                        token = newToken;
                                        localStorage.setItem('token', newToken);
                                    }
                                    resolve(res_1);
                                    observer.response.default.forEach(function (cb) { return cb(res_1, api); });
                                }
                                else {
                                    observer.response.error.forEach(function (cb) { return cb(xhr); });
                                    reject(xhr);
                                }
                            }
                        };
                        xhr.send(method !== 'get' ? dataStr : '');
                        xhr.onerror = reject;
                    })];
            });
        });
    };
    /**
     * 调用API请求
     * @param api          - api
     * @param axiosRequest - 请求体
     */
    HttpUtil.api = function (api, axiosRequest) {
        var _this = this;
        if (axiosRequest === void 0) { axiosRequest = {}; }
        var URL = api_config_1.default[api];
        // 未知API
        if (!URL)
            throw new Error("api: \u300C" + api + "\u300D\u5728\u914D\u7F6E\u5185\u672A\u5B9A\u4E49!");
        // // 动态API
        // if (typeof api === 'object' && URL) {
        //   for (const key in api.data) {
        //     api.data[key] && (URL = URL.replace(`:${key}`, api.data[key]));
        //   }
        //   api = api.key;
        // }
        return {
            then: function (res) { return __awaiter(_this, void 0, void 0, function () {
                var regExp, method;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            regExp = /((\w+)(?=\:))?(post|get|put|delete)(?=\.)/ig;
                            method = (URL.match(regExp) || [])[0];
                            return [4 /*yield*/, HttpUtil.request(method || 'get', URL, axiosRequest, api).then(res)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            }); },
        };
    };
    /**
     * axios observer
     * @param api - API库内的键
     * @param axiosRequest
     *        - 请求数据配置
     *        - 仅 api(*, *).then() 时生效
     * @return 链式操作请求方式，内部传入与axios相同，排除第一个URL
     */
    HttpUtil.observer = function () {
        return {
            emit: function (key, cb) {
                var split = key.split('.');
                var parent = split[0];
                var child = split[1] || 'default';
                observer[parent][child].push(cb);
                return HttpUtil;
            },
            off: function (key, cb) {
                var split = key.split('.');
                var parent = split[0];
                var child = split[1] || 'default';
                observer[parent][child].forEach(function (fn, index) {
                    if (cb === fn)
                        observer[parent][child].splice(index, 1);
                });
                ;
                return HttpUtil;
            },
        };
    };
    HttpUtil.baseUrl = !isDEV
        ? serverConfig.host
        : localRegExp.test(serverConfig.devHost) && !localRegExp.test(locaHostName)
            ? serverConfig.devHost.replace(localRegExp, locaHostName)
            : serverConfig.devHost;
    return HttpUtil;
}());
exports.default = HttpUtil;

cc._RF.pop();