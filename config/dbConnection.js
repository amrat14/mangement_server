import Config from ".";
import mongoose from "mongoose";
import fs from "fs";
export default class DBConnection {
  static connect() {
    // console.log("DB trying to connect on " + new Date() + Config.DB);

    const options = {
      keepAlive: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      ssl: true,
    };
    return mongoose
      .connect(Config.DB, options)
      .then(() => {
        console.log("Database connnected...");
      })
      .catch((err) => {
        console.log("Database not connnected...", err);
      });
  }
}
