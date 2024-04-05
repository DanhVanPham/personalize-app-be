"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var TrackingCoint_routes_1 = __importDefault(require("./routes/TrackingCoint.routes"));
var app = (0, express_1.default)();
var PORT = 3000;
app.use((0, cors_1.default)({}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api/v1.0', TrackingCoint_routes_1.default);
if (process.env.BUILD_MODE === 'production') {
    app.listen(process.env.PORT, function () {
        console.log("Production App listening on port ".concat(process.env.PORT));
    });
}
else {
    app.listen(PORT, function () {
        console.log("App listening on port ".concat(PORT));
    });
}
