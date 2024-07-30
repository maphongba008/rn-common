import { fileAsyncTransport, logger as FileLogger } from 'react-native-logs'
import * as FileSystem from 'expo-file-system'
import moment from 'moment'

// Define the directory where logs will be stored
const logDir = FileSystem.cacheDirectory + 'logs'
FileSystem.makeDirectoryAsync(logDir, { intermediates: true })

// Define the default configuration for the logger
const defaultConfig = {
  levels: {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
  },
  severity: 'debug',
  transport: fileAsyncTransport,
  transportOptions: {
    FS: FileSystem,
    fileName: [moment().format('YYYY-MM-DD'), 'log'].join('.'),
    filePath: logDir,
  },
  async: true,
  dateFormat: 'time',
  printLevel: true,
  printDate: true,
  enabled: true,
}

// Create the file logger using the default configuration
const fileLogger = FileLogger.createLogger(defaultConfig)

// Convert the message to a string representation
const toString = (message: any) => {
  if (typeof message === 'string') {
    return message
  }
  return JSON.stringify(message)
}

/**
 * The logger object provides methods for logging messages with different severity levels.
 */
export const logger = {
  /**
   * Set the severity level of the logger.
   * Log messages with a severity level lower than the specified level will be ignored.
   * @param severity The severity level to set. Valid values are "debug", "info", "warn", or "error".
   */
  setSeverity: (severity: 'debug' | 'info' | 'warn' | 'error') => {
    fileLogger.setSeverity(severity)
  },
  /**
   * Log a debug message.
   * @param message The message to log.
   */
  debug: (message: any) => {
    fileLogger.debug(toString(message))
  },
  /**
   * Log an info message.
   * @param message The message to log.
   */
  info: (message: any) => {
    fileLogger.info(toString(message))
  },
  /**
   * Log a warning message.
   * @param message The message to log.
   */
  warn: (message: any) => {
    fileLogger.warn(toString(message))
  },
  /**
   * Log an error message.
   * @param message The message to log.
   */
  error: (message: any) => {
    fileLogger.error(toString(message))
  },
}
