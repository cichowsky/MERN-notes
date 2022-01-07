require("dotenv").config();

module.exports = {
  port: process.env.PORT || 3001,
  database: process.env.DATABASE || "mongodb://127.0.0.1:27017/MERN-notes",
  ACCESS_TOKEN_KEY: process.env.ACCESS_TOKEN_KEY || "top_secret_key_long_key",
  REFRESH_TOKEN_KEY: process.env.REFRESH_TOKEN_KEY || "top_secret_key_long_key",
  ACCESS_TOKEN_TIME: process.env.ACCESS_TOKEN_TIME * 1 || 60 * 2, // 2 minutes
  REFRESH_TOKEN_TIME: process.env.REFRESH_TOKEN_TIME * 1 || 60 * 60 * 24 * 7, // 7 days
};
