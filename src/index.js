"use strict";
class LoggerService {
  constructor() {
    this.levelLogs = {
      INFO: "INFO",
      DEBUG: "DEBUG",
      WARN: "WARN",
      ERROR: "ERROR",
      TRACE: "TRACE"
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
      if (level === this.levelLogs.INFO) {
        return console.info(`[ ${date} | TYPE: INFO ] => `, log);
      }
      if (level === this.levelLogs.DEBUG) {
        return console.debug(`[ ${date} | TYPE: DEBUG ] =>`, log);
      }
      if (level === this.levelLogs.TRACE) {
        return console.trace(`[ ${date} | TYPE: TRACE ] =>`, log);
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

    const execRecursively = (subject, _refs = null) => {
      if (!_refs) _refs = new WeakSet();
      if (_refs.has(subject)) {
        return;
      }
      if ("object" === typeof subject) {
        _refs.add(subject);
        for (let key in subject) execRecursively(subject[key], _refs);
      }
    };

    const formatLog = (args) => {
      let m = "";
      args.forEach((arg) => {
        if (typeof arg === "object") {
          m += `${JSON.stringify(arg, execRecursively())} `;
        } else {
          m += `${arg} `;
        }
      });
      let message = "";
      let st = m.split(" ").join(", ").split("").reverse();
      if (st[0] === " " && st[1] === ",") {
        st.splice(0, 2);
        message = st.reverse().join("");
      }
      return message;
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
