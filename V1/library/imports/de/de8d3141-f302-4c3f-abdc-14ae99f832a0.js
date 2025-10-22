"use strict";
cc._RF.push(module, 'de8d3FB8wJMP6vcFK6Z+DKg', 'prefabTool');
// resources/prefab/utils/prefabTool.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testingRotate = exports.hasScreenFringe = exports.offHide = exports.onHide = exports.offShow = exports.onShow = exports.screenFringe = exports.setAutoRecursively = exports.uploadFile = exports.shareAppMessage = exports.dateFrom = void 0;
/**
 *  格式化日期
 *  @param fmt 日期格式 如：yyyy-MM-dd HH:mm:ss
 *  @param form 指定时间 不传参 默认目前时间
 */
function dateFrom(fmt, form) {
    if (fmt === void 0) { fmt = 'yyyy-MM-dd HH:mm:ss'; }
    var date = form ? new Date(form) : new Date();
    var o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12,
        'H+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds(),
        'q+': Math.floor((date.getMonth() + 3) / 3),
        'S': date.getMilliseconds(),
    };
    var week = ['日', '一', '二', '三', '四', '五', '六'];
    var season = ['', '春', '夏', '秋', '冬'];
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    if (/(E+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? '星期' : '周') : '')
            + week[date.getDay()]);
    }
    if (/(q+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, season[o['q+']] + ((RegExp.$1.length > 1) ? '季' : ''));
    }
    var k;
    for (k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
        }
    }
    return fmt;
}
exports.dateFrom = dateFrom;
/**
 * 分享转发
 * @param title    转发标题，不传则默认使用当前小游戏的昵称
 * @param imageUrl 转发显示图片的链接，可以是网络图片路径或本地图片文件路径或相对代码包根目录的图片文件路径。显示图片长宽比是 5:4
 * @param query    查询字符串，从这条转发消息进入后，可通过 wx.getLaunchOptionsSync() 或 wx.onShow() 获取启动参数中的 query。必须是 key1=val1&key2=val2 的格式。
 */
var shareAppMessage = function (title, imageUrl, query) {
    if (CC_WECHATGAME) {
        wx.shareAppMessage({
            title: title,
            imageUrl: imageUrl,
            query: query,
        });
    }
};
exports.shareAppMessage = shareAppMessage;
/**
 * 上传文件
 * @param unit 文件单位
 */
var uploadFile = function (ossOption, fileName, unit) {
    return new Promise(function (reslove, reject) {
        console.log(ossOption);
        if (CC_WECHATGAME) {
            // 微信上传
            wx.chooseImage({
                success: function (res) {
                    var tempFilePaths = res.tempFilePaths;
                    console.log(tempFilePaths);
                    var suffix = tempFilePaths[0].match(/\.\w+$/);
                    ossOption.key = ossOption.startsWith + fileName + suffix;
                    if (!/^\.(png|jpg)/.test(suffix)) {
                        return reject('文件类型错误!');
                    }
                    if (res.tempFiles[0].size > 1024 * 500) {
                        return reject('文件不能大于500KB!');
                    }
                    Window.wx.uploadFile({
                        url: ossOption.host,
                        filePath: tempFilePaths[0],
                        name: 'file',
                        formData: ossOption,
                        header: {
                            'content-type': 'application/json',
                        },
                        success_action_status: '200',
                        success: reslove,
                        fial: reject,
                    });
                },
                fial: reject,
            });
        }
        else if (CC_PREVIEW) {
            var fileInput_1 = document.createElement('input');
            fileInput_1.type = 'file';
            fileInput_1.click();
            var formData_1 = new FormData();
            Object.keys(ossOption).forEach(function (key) {
                formData_1.append(key, ossOption[key]);
            });
            fileInput_1.onchange = function (e) {
                // reslove(fileInput.files);
                formData_1.append('file', fileInput_1.files[0]);
                console.log(fileInput_1.files);
                // axios.request('post', ossOption.host, {
                //     data: formData,
                // }).then(res => {
                //     console.log(res);
                // })
                var xhr = cc.loader.getXMLHttpRequest();
                xhr.open('post', ossOption.host, true);
                // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;');
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
                xhr.onreadystatechange = function () {
                };
                var dataStr = '';
                Object.keys(formData_1 || {}).forEach(function (key) {
                    dataStr += key + '=' + encodeURIComponent(formData_1[key]) + '&';
                });
                console.log(dataStr);
                xhr.send(formData_1);
            };
        }
    });
};
exports.uploadFile = uploadFile;
/**
 * 设置资源是否被释放
 * @param Recursively UID
 * @param Auto        是否自动释放
 */
var setAutoRecursively = function (Recursively, Auto) {
    if (Auto === void 0) { Auto = true; }
    Recursively.forEach(function (val) { return cc.loader.setAutoReleaseRecursively(val, Auto); });
};
exports.setAutoRecursively = setAutoRecursively;
/**
 * 如果为刘海屏则进行适配
 * @param node 节点
 */
var screenFringe = function (nodes) {
    var isFringe = exports.hasScreenFringe();
    if (isFringe) {
        nodes.forEach(function (node) {
            node.getComponent(cc.Widget).left += 60;
        });
    }
};
exports.screenFringe = screenFringe;
/**
 * 监听小游戏回到前台的事件
 * @param callback 回调
 * @param that     this指向
 */
var onShow = function (callback, that) {
    if (that === void 0) { that = null; }
    if (CC_WECHATGAME) {
        wx.onShow(callback.bind(that));
    }
};
exports.onShow = onShow;
/**
 * 监听小游戏回到前台的事件
 * @param callback 回调
 * @param that     this指向
 */
var offShow = function (callback, that) {
    if (that === void 0) { that = null; }
    if (CC_WECHATGAME) {
        wx.offShow(callback.bind(that));
    }
};
exports.offShow = offShow;
/**
 * 监听小游戏回到前台的事件
 * @param callback 回调
 * @param that     this指向
 */
var onHide = function (callback, that) {
    if (that === void 0) { that = null; }
    if (CC_WECHATGAME) {
        wx.onHide(callback.bind(that));
    }
};
exports.onHide = onHide;
/**
 * 监听小游戏回到前台的事件
 * @param callback 回调
 * @param that     this指向
 */
var offHide = function (callback, that) {
    if (that === void 0) { that = null; }
    if (CC_WECHATGAME) {
        wx.offHide(callback.bind(that));
    }
};
exports.offHide = offHide;
/**
 * 判断是否为刘海
 */
var fringeScreenModels = [
    'iPhone X', 'iPhone x', 'vivo X21A', 'ASUS Zenfone 5',
    'Ulefone T2 Pro', 'Leagoo S9', 'HUAWEI P20', 'DooGee V',
    'OPPO R15', 'LG G7', 'SAMSUNG S9', 'COR-AL00',
    'vivo Y83A', 'LLD-AL20', 'vivo Z1', 'PACM00', 'PAAM00'
];
var hasScreenFringe = function () {
    var systemInfo = CC_WECHATGAME ? wx.getSystemInfoSync() : { model: null };
    if (systemInfo.model != null) {
        for (var i in fringeScreenModels) {
            if (systemInfo.model.indexOf(fringeScreenModels[i]) > -1) {
                // 是已知机型里的刘海手机
                return true;
            }
        }
    }
    // 屏幕宽高比大于2，基本上90%的手机可以确定是刘海屏，就算个别手机不是也按刘海屏处理
    // 竖屏游戏判断：
    // if (systemInfo.windowHeight >= 800 || systemInfo.windowHeight / systemInfo.windowWidth > 2) {
    //     return true;
    // }
    // 横屏游戏判断：
    // if (this.systemInfo.windowWidth >= 800 || this.systemInfo.windowWidth / this.systemInfo.windowHeight > 2) {
    //     return true;
    // }
    return false;
};
exports.hasScreenFringe = hasScreenFringe;
/**
 * 检测旋转屏幕
 */
var testingRotate = function () {
    var _a = cc.view.getFrameSize(), width = _a.width, height = _a.height;
    cc.view.setFrameSize(width, width < height ? height / 3 : height);
    if (width < height) {
        alert('请横屏游玩!');
    }
};
exports.testingRotate = testingRotate;

cc._RF.pop();