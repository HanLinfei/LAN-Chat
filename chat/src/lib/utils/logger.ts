// 日志级别
enum LogLevel {
    ERROR = 0,
    WARN = 1,
    INFO = 2,
    DEBUG = 3
}

// 获取当前环境的日志级别
const getCurrentLogLevel = (): LogLevel => {
    // 开发环境使用DEBUG级别，生产环境使用INFO级别
    if (import.meta.env.DEV) {
        return LogLevel.DEBUG;
    }
    return LogLevel.INFO;
};

// 当前配置的日志级别
const currentLogLevel = getCurrentLogLevel();

// 格式化日志消息
const formatMessage = (level: string, message: string): string => {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${level.toUpperCase()}] ${message}`;
};

// 日志工具
export const logger = {
    error: (message: string, ...args: any[]) => {
        if (currentLogLevel >= LogLevel.ERROR) {
            console.error(formatMessage('ERROR', message), ...args);
        }
    },

    warn: (message: string, ...args: any[]) => {
        if (currentLogLevel >= LogLevel.WARN) {
            console.warn(formatMessage('WARN', message), ...args);
        }
    },

    info: (message: string, ...args: any[]) => {
        if (currentLogLevel >= LogLevel.INFO) {
            console.info(formatMessage('INFO', message), ...args);
        }
    },

    debug: (message: string, ...args: any[]) => {
        if (currentLogLevel >= LogLevel.DEBUG) {
            console.debug(formatMessage('DEBUG', message), ...args);
        }
    }
}; 