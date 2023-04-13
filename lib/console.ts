import {StringHashMap} from '@icancode/base';
import Logger from './logger';

/**
 * ConsoleLogger
 */
export default class ConsoleLogger implements Logger {
  private readonly autoFlush: boolean;
  private data: string;

  /**
   * Constructor
   * @param {boolean=} autoFlush
   */
  constructor(autoFlush: boolean = true) {
    this.autoFlush = autoFlush;
    this.data = '';
  }

  /**
   * Log a message
   * @param {string} level
   * @param {*} message
   */
  private log(level: string, message: any): void {
    let data = '';
    if (typeof message === 'object') {
      try {
        data = JSON.stringify(message, null, 2);
      } catch (e) {
        if (typeof message['toString'] === 'function') {
          data = message.toString();
        } else {
          throw new Error('Unable to log this type of message');
        }
      }
    } else if (typeof message === 'string') {
      data = message;
    } else {
      throw new Error('Unable to log this type of message');
    }

    if (this.autoFlush) {
      console.log(`[${new Date().toISOString()}][${level}] ${data}`);
    } else {
      this.data = `${this.data}[${new Date().toISOString()}][${level}] ${data}\n`; // eslint-disable-line
    }
  }

  /**
   * Logs debug message
   * @param {*} message
   */
  debug(message: any) {
    this.log('debug', message);
  }

  /**
   * Logs info message
   * @param {*} message
   */
  info(message: any) {
    this.log('info', message);
  }

  /**
   * Logs warn message
   * @param {*} message
   */
  warn(message: any) {
    this.log('warn', message);
  }

  /**
   * Logs error message
   * @param {*} message
   */
  error(message: any) {
    this.log('error', message);
  }

  /**
   * Set meta
   * @param {StringHashMap} metadata
   * @param {boolean=} merge
   * @return {Logger}
   */
  with(metadata: StringHashMap, merge?: boolean | undefined): Logger {
    return this;
  }

  /**
   * Get a value of metadata
   * @param {string} key
   * @return {string}
   */
  get(key: string): string {
    return '';
  }

  /**
   * Set a metadata key=value
   * @param {string} key
   * @param {string} value
   * @return {Logger}
   */
  set(key: string, value: string): Logger {
    return this;
  }

  /**
   * Flush the logs
   */
  flush(): void {
    console.log(this.data);
  }
}
