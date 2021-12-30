const User = require("../db/models/User");

class UserController {
  async register(req, res) {
    const { email, password } = req.body;
    let newUser;

    try {
      newUser = new User({ email, password });
      await newUser.save();
    } catch (error) {
      console.log(error.name);
      return res.status(422).json({ message: error.message });
    }
    res.status(201).json(newUser);
  }
}

module.exports = new UserController();
