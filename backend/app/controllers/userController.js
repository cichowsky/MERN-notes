const User = require("../db/models/User");
const jwt = require("jsonwebtoken");
const { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } = require("../config");

const generateAccessToken = (payload) => {
  return jwt.sign(payload, ACCESS_TOKEN_KEY, { expiresIn: "15s" });
};

const generateRefreshToken = (payload) => {
  return jwt.sign(payload, REFRESH_TOKEN_KEY, { expiresIn: "7d" });
};

let refreshTokens = []; // TODO: database

class UserController {
  async register(req, res) {
    const { email, password } = req.body;
    let newUser;

    try {
      newUser = new User({ email, password });
      await newUser.save();
    } catch (error) {
      return res.status(422).json({ message: error.message });
    }
    res.status(201).json({ message: "User registered. You can log in now!" });
  }

  async login(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const isValidPassword = await user?.comparePassword(password);

    if (!user || !isValidPassword) {
      return res.status(401).json({ message: "Email or password incorrect!" });
    }

    const payload = { user_id: user._id.toString() };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);
    refreshTokens.push(refreshToken); // TODO: database

    return res.json({ accessToken, refreshToken });
  }

  async refresh(req, res) {
    const { refreshToken } = req.body;

    if (!refreshToken) return res.status(401).json("User not authenticated!");
    if (!refreshTokens.includes(refreshToken)) {
      return res.status(403).json("Refresh token is not valid!");
    }

    jwt.verify(refreshToken, REFRESH_TOKEN_KEY, (err, data) => {
      if (err) return res.status(403).json("Refresh token is not valid!");

      const payload = { user_id: data.user_id };
      const newAccessToken = generateAccessToken(payload);
      // to additional improvement of security generate new refresh token
      const newRefreshToken = generateRefreshToken(payload);
      refreshTokens = refreshTokens.filter((token) => token !== refreshToken); // TODO: database
      refreshTokens.push(newRefreshToken); // TODO: database

      res.json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
    });
  }

  async logout(req, res) {
    const { refreshToken } = req.body;

    refreshTokens = refreshTokens.filter((token) => token !== refreshToken); // TODO: database

    res.status(204).json("User logged out.");
  }

  // TODO: delete this (only for testing purpose)
  async protected(req, res) {
    const { user_id } = req.data; // from authMiddleware
    // console.log("user_id", user_id);
    res.send("You have access to this page!");
  }
}

module.exports = new UserController();
