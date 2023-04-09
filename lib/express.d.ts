import { StringHashMap } from '@icancode/base';
import { Request, Response } from 'express';
import { Logger } from './logger';
/**
 * ExpressLogger
 */
export declare class ExpressLogger implements Logger {
    private request;
    private response;
    private metadata;
    private traces;
    private timestamp;
    private duration;
    /**
     * Constructor
     * @param {Request} request
     * @param {Response} response
     * @param {string=} name
     * @param {StringHashMap=} metadata
     */
    constructor(request: Request, response: Response, name?: string, metadata?: StringHashMap);
    /**
     * Log a message with specified level
     * @param {'DEBUG' | 'INFO' | 'WARN' | 'ERROR'} level
     * @param {*} message
     */
    private log;
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
     * Logs info message
     * @param {*} message
     */
    warn(message: any): void;
    /**
     * Logs info message
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
    /**
     * Returns request's information
     * @return {HashMap}
     */
    private getRequestInformation;
    /**
     * Returns response's information
     * @return {HashMap}
     */
    private getResponseInformation;
}
