"use strict";
cc._RF.push(module, '6cb9aD02WRMR5mtyvRU5ZqV', 'to-array');
// scripts/lib/asocket.ioLib/to-array.js

"use strict";

module.exports = toArray;

function toArray(list, index) {
  var array = [];
  index = index || 0;

  for (var i = index || 0; i < list.length; i++) {
    array[i - index] = list[i];
  }

  return array;
}

cc._RF.pop();