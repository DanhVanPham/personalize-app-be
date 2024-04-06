"use strict";
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
exports.updateCoin = exports.deleteCoin = exports.getCoins = exports.addCoin = void 0;
var trackingCoinService = __importStar(require("../services/TrackingCoin.service"));
var externals_api_1 = require("../utils/externals.api");
var constants_1 = require("../utils/constants");
function addCoin(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var data, trackingCoin;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    data = req.body;
                    return [4 /*yield*/, trackingCoinService.addCoin(data)];
                case 1:
                    trackingCoin = _a.sent();
                    return [2 /*return*/, res.json({
                            status: 200,
                            data: trackingCoin,
                            message: 'Tracking Coin Added successfully!',
                        })];
            }
        });
    });
}
exports.addCoin = addCoin;
function getCoins(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var status, trackingCoins, symbols, priceSymbols_1;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    status = ((_a = req.query) === null || _a === void 0 ? void 0 : _a.status) || constants_1.STATUS_COIN.created;
                    return [4 /*yield*/, trackingCoinService.getCoins(Number(status))];
                case 1:
                    trackingCoins = _b.sent();
                    symbols = trackingCoins === null || trackingCoins === void 0 ? void 0 : trackingCoins.reduce(function (result, currCoin) {
                        if (!result.includes(currCoin.digitalAsset))
                            result.push(currCoin.digitalAsset);
                        return result;
                    }, []);
                    if (!(Number(status) === constants_1.STATUS_COIN.created)) return [3 /*break*/, 3];
                    return [4 /*yield*/, (0, externals_api_1.getMarketPrice)({
                            symbols: JSON.stringify(symbols),
                        })];
                case 2:
                    priceSymbols_1 = _b.sent();
                    if (priceSymbols_1) {
                        trackingCoins = trackingCoins.map(function (coin) {
                            var _a;
                            return (__assign(__assign({}, coin), { currentPrice: ((_a = priceSymbols_1 === null || priceSymbols_1 === void 0 ? void 0 : priceSymbols_1.find(function (item) { return (item === null || item === void 0 ? void 0 : item.symbol) === coin.digitalAsset; })) === null || _a === void 0 ? void 0 : _a.price) || 0 }));
                        });
                    }
                    _b.label = 3;
                case 3: return [2 /*return*/, res.json({ status: 200, data: trackingCoins })];
            }
        });
    });
}
exports.getCoins = getCoins;
function deleteCoin(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var itemDeleted;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, trackingCoinService.deleteCoin(String((_a = req.params) === null || _a === void 0 ? void 0 : _a.id))];
                case 1:
                    itemDeleted = _b.sent();
                    if (!!itemDeleted)
                        return [2 /*return*/, res.json({ status: 200, message: 'Delete successfully' })];
                    return [2 /*return*/, res.json({ status: 400, message: 'Delete failed!' })];
            }
        });
    });
}
exports.deleteCoin = deleteCoin;
function updateCoin(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id, updateData, updatedData;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    id = String((_a = req.params) === null || _a === void 0 ? void 0 : _a.id);
                    if (!id)
                        return [2 /*return*/, res.json({ status: 400, message: 'Id is not valid!' })];
                    updateData = req.body;
                    console.log({ updateData: updateData });
                    return [4 /*yield*/, trackingCoinService.updateCoin(id, updateData)];
                case 1:
                    updatedData = _b.sent();
                    if (!!updatedData)
                        return [2 /*return*/, res.json({ status: 200, message: 'Update successfully' })];
                    return [2 /*return*/, res.json({ status: 400, message: 'Update failed!' })];
            }
        });
    });
}
exports.updateCoin = updateCoin;
