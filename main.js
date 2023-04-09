"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressLogger = exports.WinstonLogger = void 0;
var logger_1 = require("./lib/logger");
Object.defineProperty(exports, "WinstonLogger", { enumerable: true, get: function () { return logger_1.WinstonLogger; } });
var express_1 = require("./lib/express");
Object.defineProperty(exports, "ExpressLogger", { enumerable: true, get: function () { return express_1.ExpressLogger; } });
