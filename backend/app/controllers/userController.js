const User = require("../db/models/User");
const {
  jwtGenerateAccessToken,
  jwtGenerateRefreshToken,
  jwtVerifyRefreshToken,
  saveRefreshToken,
  deleteRefreshToken,
  isRefreshTokenInDB,
} = require("../jwtActions");

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

    const accessToken = jwtGenerateAccessToken(payload);
    const refreshToken = jwtGenerateRefreshToken(payload);
    await saveRefreshToken(payload.user_id, refreshToken);

    return res.json({ accessToken, refreshToken });
  }

  async refresh(req, res) {
    const { refreshToken } = req.body;

    if (!refreshToken) return res.status(401).json("User not authenticated!");
    if (!(await isRefreshTokenInDB(refreshToken))) {
      return res.status(403).json("Refresh token is not valid!");
    }

    jwtVerifyRefreshToken(refreshToken, async (err, data) => {
      if (err) return res.status(403).json("Refresh token is not valid!");

      const payload = { user_id: data.user_id };
      const newAccessToken = jwtGenerateAccessToken(payload);

      // additional improvement of security by generating new refresh token
      const newRefreshToken = jwtGenerateRefreshToken(payload);
      await deleteRefreshToken(refreshToken);
      await saveRefreshToken(payload.user_id, newRefreshToken);

      res.json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
    });
  }

  async logout(req, res) {
    const { refreshToken } = req.body;

    await deleteRefreshToken(refreshToken);

    res.status(200).json("User logged out.");
  }

  // TODO: delete this (only for testing purpose)
  async protected(req, res) {
    const { user_id } = req.data; // from authMiddleware
    // console.log("user_id", user_id);
    res.send("You have access to this page!");
  }
}

module.exports = new UserController();
