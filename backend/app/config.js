require("dotenv").config();

module.exports = {
  port: process.env.PORT || 3001,
  database: process.env.DATABASE || "mongodb://127.0.0.1:27017/MERN-notes",
  ACCESS_TOKEN_KEY: process.env.ACCESS_TOKEN_KEY, // some secret key
  REFRESH_TOKEN_KEY: process.env.REFRESH_TOKEN_KEY, // some secret key
};
