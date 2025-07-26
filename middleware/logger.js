import chalk from "chalk";
import { writeLog, calculateDuration } from "../utils/logger.js";

export const logger = (req, res, next) => {
  const start = process.hrtime();

  res.on("finish", () => {
    const timestamp = `[${new Date().toISOString()}]`;
    const method = req.method;
    const url = req.originalUrl;
    const status = res.statusCode;
    const duration = `(${calculateDuration(start)} ms)`;

    let color;
    let level;
    if (status >= 500) {
      color = chalk.red;
      level = "ERROR";
    } else if (status >= 400) {
      color = chalk.yellow;
      level = "WARN";
    } else {
      color = chalk.green;
      level = "INFO";
    }

    const rawLog = `${timestamp} ${level}: ${method} ${url} ${status} ${duration}`;
    const coloredLog = `${chalk.grey(timestamp)} ${color(level)}: ${method} ${url} ${color(status)} ${chalk.grey(duration)}`;

    writeLog(rawLog);
    console.log(coloredLog);
  });

  next();
};

export default logger;
