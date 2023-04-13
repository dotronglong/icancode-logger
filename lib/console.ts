import { StringHashMap } from "@icancode/base";
import Logger from "./logger";

export default class ConsoleLogger implements Logger {
  private readonly autoFlush: boolean;
  private data: string;

  constructor(autoFlush: boolean = true) {
    this.autoFlush = autoFlush;
    this.data = '';
  }

  private log(level: string, message: any): void {
    let data = '';
    if (typeof message === 'object') {
      try {
        data = JSON.stringify(message, null, 2);
      } catch (e) {
        if (typeof message['toString'] === 'function') {
          data = message.toString();
        } else {
          throw new Error("Unable to log this type of message");
        }
      }
    } else if (typeof message === 'string') {
      data = message;
    } else {
      throw new Error("Unable to log this type of message");
    }

    if (this.autoFlush) {
      console.log(`[${new Date().toISOString()}][${level}] ${data}`);
    } else {
      this.data = `${this.data}[${new Date().toISOString()}][${level}] ${data}\n`;
    }
  }

  debug(message: any): void {
    this.log('debug', message);
  }

  info(message: any): void {
    this.log('info', message);
  }

  warn(message: any): void {
    this.log('warn', message);
  }

  error(message: any): void {
    this.log('error', message);
  }

  with(metadata: StringHashMap, merge?: boolean | undefined): Logger {
    return this;
  }

  get(key: string): string {
    return '';
  }

  set(key: string, value: string): Logger {
    return this;
  }

  flush(): void {
    console.log(this.data);
  }
}