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
  expireAt: {
    type: Date,
    default: () => Date.now() + REFRESH_TOKEN_TIME * 1000,
    index: { expires: REFRESH_TOKEN_TIME },
  },
});

const RefreshToken = mongoose.model("RefreshToken", RefreshTokenSchema);

module.exports = RefreshToken;
