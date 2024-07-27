import { fileAsyncTransport, logger as FileLogger } from "react-native-logs";
import * as FileSystem from "expo-file-system";
import moment from "moment";

const logDir = FileSystem.cacheDirectory + "logs";
FileSystem.makeDirectoryAsync(logDir, { intermediates: true });
const defaultConfig = {
  levels: {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
  },
  severity: "debug",
  transport: fileAsyncTransport,
  transportOptions: {
    FS: FileSystem,
    fileName: [moment().format("YYYY-MM-DD"), "log"].join("."),
    filePath: logDir,
  },
  async: true,
  dateFormat: "time",
  printLevel: true,
  printDate: true,
  enabled: true,
};

const fileLogger = FileLogger.createLogger(defaultConfig);

const toString = (message: any) => {
  if (typeof message === "string") {
    return message;
  }
  return JSON.stringify(message);
};

export const logger = {
  setSeverity: (severity: "debug" | "info" | "warn" | "error") => {
    fileLogger.setSeverity(severity);
  },
  debug: (message: any) => {
    fileLogger.debug(toString(message));
  },
  info: (message: any) => {
    fileLogger.info(toString(message));
  },
  warn: (message: any) => {
    fileLogger.warn(toString(message));
  },
  error: (message: any) => {
    fileLogger.error(toString(message));
  },
};
