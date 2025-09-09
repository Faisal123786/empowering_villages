import logger from "../config/logger.js";

export default {
  info: (msg, meta) => logger.info(meta || {}, msg),
  error: (msg, meta) => logger.error(meta || {}, msg),
  warn: (msg, meta) => logger.warn(meta || {}, msg),
  debug: (msg, meta) => logger.debug(meta || {}, msg),
};
