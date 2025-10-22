"use strict";
cc._RF.push(module, 'aae41jn0ThLJpMwRgonXzxq', 'isarray');
// scripts/lib/asocket.ioLib/isarray.js

"use strict";

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

cc._RF.pop();