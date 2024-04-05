"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMarketPrice = void 0;
var axios_1 = __importDefault(require("axios"));
var API_BINANCE_URL = 'https://www.binance.com/api/v3';
axios_1.default.defaults.baseURL = API_BINANCE_URL;
var getMarketPrice = function (params) {
    return axios_1.default
        .get('/ticker/price', {
        params: params,
    })
        .then(function (res) { return res.data; })
        .catch(function (error) { return console.log(error); });
};
exports.getMarketPrice = getMarketPrice;
