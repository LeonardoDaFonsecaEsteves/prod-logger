const logger = () => {
    const definedLevel = window.localStorage.getItem('definedLevel');
    const seeUpperLevel = window.localStorage.getItem('seeUpperLevel');

    /**
    * Level logs
    */
    const levelLogs = {
        LEVEL: {
            INFO: 'INFO',
            DEBUG: 'DEBUG',
            WARN: 'WARN',
            ERROR: 'ERROR',
            TRACE: 'TRACE'
        }
    };

    /**
    * @param {string} value
    * @param {array} array
    * @returns true or false if value in array
    */
    const controlValueInArray = (value, array) => array.includes(value);

    /**
    * @param {number} indexLevel
    * @param {array} entriesLevel
    * @returns array of level string
    */
    const getLevelAuthorized = (indexLevel, entriesLevel) => {
        if (indexLevel >= 0) {
            return seeUpperLevel
                ? entriesLevel.filter((_, i) => i >= indexLevel)
                : [entriesLevel.find((_, i) => i >= indexLevel)];
        } else {
            return false;
        }
    };

    /**
    * @param {string} value
    * @param {array} array
    * @returns index of the value in array
    */
    const getIndexOf = (value, array) => typeof value === 'string' && array.indexOf(value?.toUpperCase());

    /**
     * @param {any} args
     * @returns only see upper level for definedLevel
     */
    const needSwitchToSeeUpperLevel = (typeLevel, args) => {
        if (typeLevel === levelLogs.LEVEL.INFO) {
            return console.info('[ INFO ] : ', args);
        }
        if (typeLevel === levelLogs.LEVEL.DEBUG) {
            return console.debug('[ DEBUG ] : ', args);
        }
        if (typeLevel === levelLogs.LEVEL.TRACE) {
            return console.trace('[ TRACE ] : ', args);
        }
        if (typeLevel === levelLogs.LEVEL.WARN) {
            return console.warn('[ WARN ] : ', args);
        }
        if (typeLevel === levelLogs.LEVEL.ERROR) {
            return console.error('[ ERROR ] : ', args);
        }
    }

    /**
    * @param {any} args
    * @param {string} typeLevel
    * @returns logger bassed for definedLevel
    */
    const loggerType = (args, typeLevel) => {
        if (controlValueInArray(definedLevel, ['', undefined, null, ' '])) {
            return null;
        }

        const keysLogsConst = Object.keys(levelLogs.LEVEL);

        const index = getIndexOf(definedLevel, keysLogsConst);

        const authorizedLevels = getLevelAuthorized(index, keysLogsConst);
        if (authorizedLevels && controlValueInArray(typeLevel, authorizedLevels)) {
            return authorizedLevels.forEach(level => {
                needSwitchToSeeUpperLevel(level, args)
            });
        }
        return null;
    };

    /**
    * Module for logs in frameworks JS
    * @param {string} definedLevel
    * @param {boolean} seeUpperLevel
    * @returns a log according to the defined level of logs and whether
    *  or not logs above this level should be displayed
    */
    const setup = (definedLevel, seeUpperLevel = false) => {
        if (controlValueInArray(definedLevel.toUpperCase(), Object.keys(levelLogs.LEVEL))) {
            window.localStorage.setItem('definedLevel', definedLevel);
            window.localStorage.setItem('seeUpperLevel', seeUpperLevel);
        }
    }

    return {
        setup,
        info: (...args) => loggerType(args, levelLogs.LEVEL.INFO),
        debug: (...args) => loggerType(args, levelLogs.LEVEL.DEBUG),
        warn: (...args) => loggerType(args, levelLogs.LEVEL.WARN),
        error: (...args) => loggerType(args, levelLogs.LEVEL.ERROR),
        trace: (...args) => loggerType(args, levelLogs.LEVEL.TRACE)
    };
};

export default logger;
