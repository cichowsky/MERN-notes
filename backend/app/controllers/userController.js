const User = require("../db/models/User");

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

    if (user && isValidPassword) {
      return res.json({ message: "User logged in." });
      // todo JWT
    } else {
      return res.status(401).json({ message: "Email or password incorrect!" });
    }
  }
}

module.exports = new UserController();
