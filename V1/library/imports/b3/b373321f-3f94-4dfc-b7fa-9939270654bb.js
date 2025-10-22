"use strict";
cc._RF.push(module, 'b3733IfP5RN/Lf6mTknBlS7', 'loadingPackage');
// scripts/Loading/loadingPackage.ts

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
/**
 * 加载子包
 * @param packages - 子包名数组
 * @param callback - 回调
 */
function packLoading(packages, callback) {
    return __awaiter(this, void 0, void 0, function () {
        var scene, sub, allCount, _loop_1, _a, _b, _i, subIndex, _loop_2, _c, _d, _e, sceneIndex;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    scene = packages.scene, sub = packages.sub;
                    allCount = scene.length + sub.length;
                    _loop_1 = function (subIndex) {
                        var subName;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    subName = sub[subIndex];
                                    return [4 /*yield*/, new Promise(function (resolve) {
                                            //   cc.loader.downloader.loadSubpackage(subName, (err) => {
                                            //       if (err) {
                                            //           return console.error(err);
                                            //       }
                                            //       resolve();
                                            //       callback && callback(
                                            //           subName,
                                            //           +subIndex + 1,
                                            //           allCount,
                                            //           `subPack/${subName}... [${+subIndex + 1}/${sub.length}]`
                                            //       );
                                            //   });
                                            cc.resources.loadDir(subName, function (err) {
                                                if (err) {
                                                    return console.error(err);
                                                }
                                                resolve();
                                                callback && callback(subName, +subIndex + 1, allCount, "subPack/" + subName + "... [" + (+subIndex + 1) + "/" + sub.length + "]");
                                            });
                                        })];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    };
                    _a = [];
                    for (_b in sub)
                        _a.push(_b);
                    _i = 0;
                    _f.label = 1;
                case 1:
                    if (!(_i < _a.length)) return [3 /*break*/, 4];
                    subIndex = _a[_i];
                    return [5 /*yield**/, _loop_1(subIndex)];
                case 2:
                    _f.sent();
                    _f.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4:
                    _loop_2 = function (sceneIndex) {
                        var sceneName;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    sceneName = scene[sceneIndex];
                                    return [4 /*yield*/, new Promise(function (resolve) {
                                            cc.director.preloadScene(sceneName, function (err) {
                                                if (err) {
                                                    return console.error(err);
                                                }
                                                resolve();
                                                callback && callback(sceneName, +sceneIndex + 1 + sub.length, allCount, "scene/" + sceneName + "... [" + (+sceneIndex + 1) + "/" + scene.length + "]");
                                            });
                                        })];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    };
                    _c = [];
                    for (_d in scene)
                        _c.push(_d);
                    _e = 0;
                    _f.label = 5;
                case 5:
                    if (!(_e < _c.length)) return [3 /*break*/, 8];
                    sceneIndex = _c[_e];
                    return [5 /*yield**/, _loop_2(sceneIndex)];
                case 6:
                    _f.sent();
                    _f.label = 7;
                case 7:
                    _e++;
                    return [3 /*break*/, 5];
                case 8: return [2 /*return*/];
            }
        });
    });
}
exports.default = packLoading;
;

cc._RF.pop();