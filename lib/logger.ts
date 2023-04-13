import {StringHashMap} from '@icancode/base';

/**
 * Logger
 */
export default interface Logger {
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
