import fs from "fs";
import path from "path";

// Create log directory
const logDir = path.resolve("logs");
if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);

// Function that writes to log file
export const writeLog = (log) => {
  const logPath = path.join(logDir, "logs.log");
  fs.appendFileSync(logPath, log + "\n", "utf8");
};

// Helper function for calculating process duration
export const calculateDuration = (start) => {
  const [sec, nano] = process.hrtime(start);
  const duration = (sec * 1e3 + nano / 1e6).toFixed(2); // ms

  return duration
};
