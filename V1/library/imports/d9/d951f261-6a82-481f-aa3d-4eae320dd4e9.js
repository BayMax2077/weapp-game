"use strict";
cc._RF.push(module, 'd951fJhaoJIH6o9Tq4yDdTp', 'indexof');
// scripts/lib/asocket.ioLib/indexof.js

"use strict";

var indexOf = [].indexOf;

module.exports = function (arr, obj) {
  if (indexOf) return arr.indexOf(obj);

  for (var i = 0; i < arr.length; ++i) {
    if (arr[i] === obj) return i;
  }

  return -1;
};

cc._RF.pop();