"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressLogger = void 0;
var uuid_1 = require("uuid");
/**
 * ExpressLogger
 */
var ExpressLogger = /** @class */ (function () {
    /**
     * Constructor
     * @param {Request} request
     * @param {Response} response
     * @param {string=} name
     * @param {StringHashMap=} metadata
     */
    function ExpressLogger(request, response, name, metadata) {
        if (metadata === void 0) { metadata = {}; }
        this.request = request;
        this.response = response;
        this.metadata = Object.assign({}, metadata, {
            Name: name || 'Logger',
            TraceID: (0, uuid_1.v4)(),
        });
        this.traces = [];
        this.timestamp = Date.now();
        this.duration = 0;
    }
    /**
     * Log a message with specified level
     * @param {'DEBUG' | 'INFO' | 'WARN' | 'ERROR'} level
     * @param {*} message
     */
    ExpressLogger.prototype.log = function (level, message) {
        var duration = Date.now() - this.timestamp;
        this.traces.push({
            Level: level,
            Message: message,
            Duration: duration,
        });
        this.timestamp = Date.now();
        this.duration += duration;
    };
    /**
     * Logs debug message
     * @param {*} message
     */
    ExpressLogger.prototype.debug = function (message) {
        this.log('DEBUG', message);
    };
    /**
     * Logs info message
     * @param {*} message
     */
    ExpressLogger.prototype.info = function (message) {
        this.log('INFO', message);
    };
    /**
     * Logs info message
     * @param {*} message
     */
    ExpressLogger.prototype.warn = function (message) {
        this.log('WARN', message);
    };
    /**
     * Logs info message
     * @param {*} message
     */
    ExpressLogger.prototype.error = function (message) {
        this.log('ERROR', message);
    };
    /**
     * Set meta
     * @param {StringHashMap} metadata
     * @param {boolean=} merge
     * @return {Logger}
     */
    ExpressLogger.prototype.with = function (metadata, merge) {
        if (merge === undefined || merge) {
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
    ExpressLogger.prototype.get = function (key) {
        return this.metadata[key] || '';
    };
    /**
     * Set a metadata key=value
     * @param {string} key
     * @param {string} value
     * @return {Logger}
     */
    ExpressLogger.prototype.set = function (key, value) {
        this.metadata[key] = value;
        return this;
    };
    /**
     * Flush the logs
     */
    ExpressLogger.prototype.flush = function () {
        var duration = Date.now() - this.timestamp;
        var data = Object.assign({}, this.metadata, {
            Request: this.getRequestInformation(),
            Response: this.getResponseInformation(),
            Duration: this.duration + duration,
            Traces: this.traces,
        });
        console.log(JSON.stringify(data));
    };
    /**
     * Returns request's information
     * @return {HashMap}
     */
    ExpressLogger.prototype.getRequestInformation = function () {
        return {
            Method: this.request.method,
            Url: this.request.originalUrl,
            Headers: this.request.headers,
            Body: this.request.body || {},
        };
    };
    /**
     * Returns response's information
     * @return {HashMap}
     */
    ExpressLogger.prototype.getResponseInformation = function () {
        return {
            StatusCode: this.response.statusCode,
            Headers: this.response.getHeaders(),
            Body: this.response.locals.body || {},
        };
    };
    return ExpressLogger;
}());
exports.ExpressLogger = ExpressLogger;
