import { writeLog } from "../utils/logger.js";

export const logger = (req, res, next) => {
  next()

  console.log("Logged")
  writeLog("Logged!!!")
}

export default logger
