import fs from "fs";
import path from "path";

// Create log directory
const logDir = path.resolve("logs");
if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);

export const writeLog = (log) => {
  const logPath = path.join(logDir, "logs.log");
  fs.appendFileSync(logPath, log + "\n", "utf8")
};
