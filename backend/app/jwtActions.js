const RefreshToken = require("./db/models/RefreshToken");
const jwt = require("jsonwebtoken");
const {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  ACCESS_TOKEN_TIME,
  REFRESH_TOKEN_TIME,
} = require("./config");

const jwtGenerateAccessToken = (payload) => {
  return jwt.sign(payload, ACCESS_TOKEN_KEY, { expiresIn: ACCESS_TOKEN_TIME });
};

const jwtGenerateRefreshToken = (payload) => {
  return jwt.sign(payload, REFRESH_TOKEN_KEY, {
    expiresIn: REFRESH_TOKEN_TIME,
  });
};

const jwtVerifyAccessToken = (accessToken, callback) => {
  jwt.verify(accessToken, ACCESS_TOKEN_KEY, callback); // callback: (err, data) => {...}
};

const jwtVerifyRefreshToken = (refreshToken, callback) => {
  jwt.verify(refreshToken, REFRESH_TOKEN_KEY, callback);
};

// Refresh Token db actions
const saveRefreshToken = async (user_id, refreshToken) => {
  try {
    const newRefreshToken = new RefreshToken({
      _user_id: user_id,
      token: refreshToken,
    });
    await newRefreshToken.save();
  } catch (error) {
    console.error("SAVE ERROR", error);
  }
};

const deleteRefreshToken = async (refreshToken) => {
  try {
    await RefreshToken.deleteOne({ token: refreshToken });
  } catch (error) {
    console.error("DELETION ERROR", error);
  }
};

const isRefreshTokenInDB = async (refreshToken) => {
  try {
    const note = await RefreshToken.findOne({ token: refreshToken });
    return note ? true : false;
  } catch (error) {
    console.error("RESOURCE FETCHING ERROR", error);
  }
};

module.exports = {
  jwtGenerateAccessToken,
  jwtGenerateRefreshToken,
  jwtVerifyAccessToken,
  jwtVerifyRefreshToken,
  saveRefreshToken,
  deleteRefreshToken,
  isRefreshTokenInDB,
};
