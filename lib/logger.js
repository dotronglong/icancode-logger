"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WinstonLogger = void 0;
var uuid_1 = require("uuid");
var winston_1 = require("winston");
/**
 * WinstonLogger
 */
var WinstonLogger = /** @class */ (function () {
    /**
     * Constructor
     * @param {string} name
     * @param {StringHashMap=} metadata
     */
    function WinstonLogger(name, metadata) {
        if (metadata === void 0) { metadata = {}; }
        var _this = this;
        this.metadata = Object.assign({}, {
            TraceID: (0, uuid_1.v4)(),
        }, metadata);
        this.timestamp = Date.now();
        /* eslint-disable max-len, no-invalid-this */
        this.engine = (0, winston_1.createLogger)({
            format: winston_1.format.combine(winston_1.format.printf(function (_a) {
                var level = _a.level, message = _a.message;
                var now = Date.now();
                var duration = 0;
                if (_this.timestamp !== undefined) {
                    duration = now - _this.timestamp;
                }
                _this.timestamp = now;
                return JSON.stringify(Object.assign({}, {
                    Timestamp: (new Date()).toISOString(),
                    Level: level,
                    Logger: name,
                    Duration: duration,
                    Message: message,
                }, _this.metadata));
            })),
            transports: new winston_1.transports.Console({
                level: process.env.LOGGER_LEVEL || (process.env.NODE_ENV === 'local' ? 'debug' : 'info'),
            }),
        });
        /* eslint-enable max-len, no-invalid-this */
    }
    /**
     * Create a logger instance
     * @param {string} name represents name of Logger
     * @param {StringHashMap} metadata additional string key-value pairs
     * @return {Logger} logger instance
     */
    WinstonLogger.create = function (name, metadata) {
        return new WinstonLogger(name, metadata);
    };
    /**
     * Logs debug message
     * @param {*} message
     */
    WinstonLogger.prototype.debug = function (message) {
        this.engine.debug(message);
    };
    /**
     * Logs info message
     * @param {*} message
     */
    WinstonLogger.prototype.info = function (message) {
        this.engine.info(message);
    };
    /**
     * Logs warn message
     * @param {*} message
     */
    WinstonLogger.prototype.warn = function (message) {
        this.engine.warn(message);
    };
    /**
     * Logs error message
     * @param {*} message
     */
    WinstonLogger.prototype.error = function (message) {
        this.engine.error(message);
    };
    /**
     * Set meta
     * @param {StringHashMap} metadata
     * @param {boolean=} merge
     * @return {Logger}
     */
    WinstonLogger.prototype.with = function (metadata, merge) {
        if (merge) {
            this.metadata = Object.assign({}, this.metadata, metadata);
        }
        else {
            this.metadata = metadata;
        }
        return this;
    };
    /**
     * Get a value of metadata
     * @param {string} key
     * @return {string}
     */
    WinstonLogger.prototype.get = function (key) {
        return this.metadata[key] || '';
    };
    /**
     * Set a metadata key=value
     * @param {string} key
     * @param {string} value
     * @return {Logger}
     */
    WinstonLogger.prototype.set = function (key, value) {
        this.metadata[key] = value;
        return this;
    };
    /**
     * Flush the logs
     */
    WinstonLogger.prototype.flush = function () {
        // do nothing
    };
    return WinstonLogger;
}());
exports.WinstonLogger = WinstonLogger;
