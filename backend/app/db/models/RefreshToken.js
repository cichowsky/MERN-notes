const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { REFRESH_TOKEN_TIME } = require("../../config");

const RefreshTokenSchema = new Schema({
  _user_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  token: {
    type: String,
    required: true,
  },
  // TODO: add expire time!
  // createdAt: {
  //   type: Date,
  //   default: Date.now,
  //   expires: REFRESH_TOKEN_TIME,
  // },
});

const RefreshToken = mongoose.model("RefreshToken", RefreshTokenSchema);

module.exports = RefreshToken;
