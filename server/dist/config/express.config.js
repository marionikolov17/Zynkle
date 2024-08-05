"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
function expressConfig(app) {
    app.use(express_1.default.urlencoded({ extended: false }));
    app.use(body_parser_1.default.json());
    return app;
}
exports.default = expressConfig;
//# sourceMappingURL=express.config.js.map