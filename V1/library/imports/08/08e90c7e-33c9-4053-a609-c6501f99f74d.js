"use strict";
cc._RF.push(module, '08e90x+M8lAU6YJxlAfmfdN', 'confusion');
// scripts/utils/confusion.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.confusion = void 0;
/**
 * 混淆内容
 */
exports.confusion = {
    encrypt: function (content) { return content.split('').map(function (pwd) { return pwd.charCodeAt(0) + 10; }).join('-'); },
    decrypt: function (content) { return content.split('-').map(function (pwd) { return String.fromCharCode(+pwd - 10); }).join(''); },
};

cc._RF.pop();