"use strict";

const JsonCircularStringify = require('toolkit-json');

/**
 * Class for LoggerService
 */
class LoggerService {
  constructor() {
    // level of logs
    this.levelLogs = {
      TRACE: "TRACE",
      INFO: "INFO",
      DEBUG: "DEBUG",
      WARN: "WARN",
      ERROR: "ERROR"
    };
    // levele defined by user
    this.definedLevel = "";
    // boolean to see upper level or not
    this.seeUpperLevel = false;
  }

  /**
   * Setup variable to use logger
   * @param {string} definedLevel 
   * @param {boolean} seeUpperLevel 
   */
  setup(definedLevel, seeUpperLevel = false) {
    if (Object.keys(this.levelLogs).includes(definedLevel.toUpperCase())) {
      this.seeUpperLevel = seeUpperLevel;
      this.definedLevel = definedLevel.toUpperCase();
    }
  }

  /** 
   * @param {int} indexLevel 
   * @param {array} arrayOfLevel 
   * @returns if seeUpperlevel filter by index else find index 
   */
  getLevelAuthorized(indexLevel, arrayOfLevel) {
    if (indexLevel >= 0) {
      return this.seeUpperLevel
        ? arrayOfLevel.filter((_, i) => i >= indexLevel)
        : [arrayOfLevel.find((_, i) => i >= indexLevel)];
    } else {
      return false;
    }
  };

  /**
   * @param {string} level 
   * @param {any} arg 
   * @returns console.log equal level 
   */
  seeLogLevel = (level, arg) => {
    const date = new Date().toUTCString();
    if (level === this.levelLogs.TRACE) {
      return console.trace(`[ ${date} | TYPE: TRACE ] =>`, arg);
    }
    if (level === this.levelLogs.INFO) {
      return console.info(`[ ${date} | TYPE: INFO ] => `, arg);
    }
    if (level === this.levelLogs.DEBUG) {
      return console.debug(`[ ${date} | TYPE: DEBUG ] =>`, arg);
    }
    if (level === this.levelLogs.WARN) {
      return console.warn(`[ ${date} | TYPE: WARN ] =>`, arg);
    }
    if (level === this.levelLogs.ERROR) {
      return console.error(`[ ${date} | TYPE: ERRO ] =>`, arg);
    }
  };

  /**
   * @param {any} args 
   * @returns arg circular stringify
   */
  formatLog = (args) => {
    let m = "";
    args.forEach((arg) => {
      if (typeof arg === "object") {
        m += JsonCircularStringify(arg);
      } else {
        m += `${arg} `;
      }
    });
    return m;
  };

  /**
   * Check type of logger to return this
   * @param {any} arg 
   * @param {string} typeLevel 
   * @returns 
   */
  loggerType(arg, typeLevel) {
    // get index in levellog
    const index = Object.keys(this.levelLogs).indexOf(this.definedLevel);
    // get level autorized based index
    const authorizedLevels = this.getLevelAuthorized(
      index,
      Object.keys(this.levelLogs)
    );
    // loop in autorizedlevel to render console 
    if (authorizedLevels) {
      return authorizedLevels.forEach((level) => {
        if (level === typeLevel) {
          this.seeLogLevel(level, this.formatLog(arg));
        }
      });
    }
    return null;
  }

  /**
   * Output trace console
   * @param  {...any} args 
   */
  trace(...args) {
    this.loggerType(args, this.levelLogs.TRACE);
  }

  /**
   * Output info console
   * @param  {...any} args 
   */
  info(...args) {
    this.loggerType(args, this.levelLogs.INFO);
  }

  /**
   * Output debug console
   * @param  {...any} args 
   */
  debug(...args) {
    this.loggerType(args, this.levelLogs.DEBUG);
  }

  /**
   * Output warn console
   * @param  {...any} args 
   */
  warn(...args) {
    this.loggerType(args, this.levelLogs.WARN);
  }

  /**
   * Output error console
   * @param  {...any} args 
   */
  error(...args) {
    this.loggerType(args, this.levelLogs.ERROR);
  }
}

// export new logger service
export const logger = new LoggerService();
