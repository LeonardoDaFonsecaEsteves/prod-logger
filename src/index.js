"use strict";
const JsonCircularStringify = require('toolkit-json');
class LoggerService {
  constructor() {
    this.levelLogs = {
      TRACE: "TRACE",
      INFO: "INFO",
      DEBUG: "DEBUG",
      WARN: "WARN",
      ERROR: "ERROR"
    };
    this.definedLevel = "";
    this.seeUpperLevel = false;
  }

  setup(definedLevel, seeUpperLevel = false) {
    if (Object.keys(this.levelLogs).includes(definedLevel.toUpperCase())) {
      this.seeUpperLevel = seeUpperLevel;
      this.definedLevel = definedLevel.toUpperCase();
    }
  }

  loggerType(arg, typeLevel) {
    const getLevelAuthorized = (indexLevel, entriesLevel) => {
      if (indexLevel >= 0) {
        return this.seeUpperLevel
          ? entriesLevel.filter((_, i) => i >= indexLevel)
          : [entriesLevel.find((_, i) => i >= indexLevel)];
      } else {
        return false;
      }
    };

    const seeLogLevel = (level, arg) => {
      const date = new Date().toUTCString();
      const log = arg;
      if (level === this.levelLogs.TRACE) {
        return console.trace(`[ ${date} | TYPE: TRACE ] =>`, log);
      }
      if (level === this.levelLogs.INFO) {
        return console.info(`[ ${date} | TYPE: INFO ] => `, log);
      }
      if (level === this.levelLogs.DEBUG) {
        return console.debug(`[ ${date} | TYPE: DEBUG ] =>`, log);
      }
      if (level === this.levelLogs.WARN) {
        return console.warn(`[ ${date} | TYPE: WARN ] =>`, log);
      }
      if (level === this.levelLogs.ERROR) {
        return console.error(`[ ${date} | TYPE: ERRO ] =>`, log);
      }
    };

    const index = Object.keys(this.levelLogs).indexOf(this.definedLevel);

    const authorizedLevels = getLevelAuthorized(
      index,
      Object.keys(this.levelLogs)
    );

    const formatLog = (args) => {
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

    if (authorizedLevels) {
      return authorizedLevels.forEach((level) => {
        if (level === typeLevel) {
          seeLogLevel(level, formatLog(arg));
        }
      });
    }
    return null;
  }

  info(...args) {
    this.loggerType(args, this.levelLogs.INFO);
  }

  debug(...args) {
    this.loggerType(args, this.levelLogs.DEBUG);
  }

  warn(...args) {
    this.loggerType(args, this.levelLogs.WARN);
  }

  error(...args) {
    this.loggerType(args, this.levelLogs.ERROR);
  }

  trace(...args) {
    this.loggerType(args, this.levelLogs.TRACE);
  }
}

export const logger = new LoggerService();
