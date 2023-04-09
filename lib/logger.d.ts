import { StringHashMap } from '@icancode/base';
/**
 * Logger
 */
export interface Logger {
    /**
     * Logs debug message
     * @param {*} message
     * @return {Logger}
     */
    debug(message: any): void;
    /**
     * Logs info message
     * @param {*} message
     * @return {Logger}
     */
    info(message: any): void;
    /**
     * Logs info message
     * @param {*} message
     * @return {Logger}
     */
    warn(message: any): void;
    /**
     * Logs info message
     * @param {*} message
     * @return {Logger}
     */
    error(message: any): void;
    /**
     * Set meta
     * @param {StringHashMap} metadata
     * @param {boolean=} merge
     * @return {Logger}
     */
    with(metadata: StringHashMap, merge?: boolean): Logger;
    /**
     * Get a value of metadata
     * @param {string} key
     * @return {string}
     */
    get(key: string): string;
    /**
     * Set a metadata key=value
     * @param {string} key
     * @param {string} value
     * @return {Logger}
     */
    set(key: string, value: string): Logger;
    /**
     * Flush the logs
     */
    flush(): void;
}
/**
 * WinstonLogger
 */
export declare class WinstonLogger implements Logger {
    private engine;
    private metadata;
    private timestamp;
    /**
     * Constructor
     * @param {string} name
     * @param {StringHashMap=} metadata
     */
    constructor(name: string, metadata?: StringHashMap);
    /**
     * Create a logger instance
     * @param {string} name represents name of Logger
     * @param {StringHashMap} metadata additional string key-value pairs
     * @return {Logger} logger instance
     */
    static create(name: string, metadata?: StringHashMap): Logger;
    /**
     * Logs debug message
     * @param {*} message
     */
    debug(message: any): void;
    /**
     * Logs info message
     * @param {*} message
     */
    info(message: any): void;
    /**
     * Logs warn message
     * @param {*} message
     */
    warn(message: any): void;
    /**
     * Logs error message
     * @param {*} message
     */
    error(message: any): void;
    /**
     * Set meta
     * @param {StringHashMap} metadata
     * @param {boolean=} merge
     * @return {Logger}
     */
    with(metadata: StringHashMap, merge?: boolean): Logger;
    /**
     * Get a value of metadata
     * @param {string} key
     * @return {string}
     */
    get(key: string): string;
    /**
     * Set a metadata key=value
     * @param {string} key
     * @param {string} value
     * @return {Logger}
     */
    set(key: string, value: string): Logger;
    /**
     * Flush the logs
     */
    flush(): void;
}
