class Logger {
    static DEBUG = 0
    static INFO = 1
    static WARN = 2
    static ERROR = 3
    static FATAL = 4

    constructor(level = Logger.DEBUG) {
        this.level = level
    }

    debug(message) {
        this.level <= Logger.DEBUG && console.debug(`%cDEBUG%c ${new Date().toISOString()} %c${message}`, 'color: lightgreen;', 'font-size: 0.5rem', 'color: lightgreen;')
    }

    info(message) {
        this.level <= Logger.INFO && console.info(`%cINFO%c ${new Date().toISOString()} %c${message}`, 'color: dodgerblue;', 'font-size: 0.5rem', 'color: dodgerblue;')
    }

    warn(message) {
        this.level <= Logger.WARN && console.warn(`%cWARN%c ${new Date().toISOString()} %c${message}`, 'color: gold;', 'font-size: 0.5rem', 'color: gold;')
    }

    error(message) {
        this.level <= Logger.ERROR && console.error(`%cERROR%c ${new Date().toISOString()} %c${message}`, 'color: tomato;', 'font-size: 0.5rem', 'color: tomato;')
    }

    fatal(message) {
        this.level <= Logger.FATAL && console.error(`%cFATAL%c ${new Date().toISOString()} %c${message}`, 'font-weight: bold; color: white; background-color: tomato;', 'font-size: 0.5rem', 'font-weight: bold; color: white; background-color: tomato;')
    }

}

// instance

export const logger = new Logger(import.meta.env.VITE_LOG_LEVEL)