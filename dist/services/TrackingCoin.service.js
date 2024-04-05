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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCoin = exports.deleteCoin = exports.getCoins = exports.addCoin = void 0;
var db_config_1 = __importDefault(require("../db/db.config"));
var constants_1 = require("../utils/constants");
var externals_api_1 = require("../utils/externals.api");
function addCoin(coinData) {
    return __awaiter(this, void 0, void 0, function () {
        var newCoin;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db_config_1.default.trackingCoin.create({
                        data: {
                            digitalAsset: coinData.digitalAsset,
                            detail: coinData.detail,
                            price: coinData.price,
                            quantity: coinData.quantity,
                            img: coinData.img,
                            status: constants_1.STATUS_COIN.created,
                        },
                    })];
                case 1:
                    newCoin = _a.sent();
                    return [2 /*return*/, newCoin];
            }
        });
    });
}
exports.addCoin = addCoin;
function getCoins(status, whereFilter) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, db_config_1.default.trackingCoin.findMany({
                    where: __assign({ status: { equals: status } }, whereFilter),
                })];
        });
    });
}
exports.getCoins = getCoins;
function deleteCoin(id) {
    return __awaiter(this, void 0, void 0, function () {
        var itemDeleted;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db_config_1.default.trackingCoin.delete({
                        where: {
                            id: id,
                        },
                    })];
                case 1:
                    itemDeleted = _a.sent();
                    return [2 /*return*/, !!itemDeleted];
            }
        });
    });
}
exports.deleteCoin = deleteCoin;
function updateCoin(id, updateData) {
    return __awaiter(this, void 0, void 0, function () {
        var coin, priceSymbol, updatedCoin, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    return [4 /*yield*/, db_config_1.default.trackingCoin.findUnique({ where: { id: id } })
                        // If coin not found, return an error
                    ];
                case 1:
                    coin = _a.sent();
                    // If coin not found, return an error
                    if (!coin) {
                        throw new Error('Tracking coin not found');
                    }
                    if (!(!coin.closedPrice && (updateData === null || updateData === void 0 ? void 0 : updateData.status) === constants_1.STATUS_COIN.sold)) return [3 /*break*/, 3];
                    return [4 /*yield*/, (0, externals_api_1.getMarketPrice)({
                            symbol: coin.digitalAsset,
                        })];
                case 2:
                    priceSymbol = _a.sent();
                    if (priceSymbol)
                        updateData.closedPrice = Number(priceSymbol === null || priceSymbol === void 0 ? void 0 : priceSymbol.price);
                    _a.label = 3;
                case 3: return [4 /*yield*/, db_config_1.default.trackingCoin.update({
                        where: { id: id },
                        data: updateData,
                    })];
                case 4:
                    updatedCoin = _a.sent();
                    return [2 /*return*/, updatedCoin];
                case 5:
                    error_1 = _a.sent();
                    // Handle errors
                    console.error('Error updating coin:', error_1);
                    throw new Error('Failed to update coin');
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.updateCoin = updateCoin;
