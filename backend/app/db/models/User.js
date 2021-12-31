const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { validateEmail } = require("../validators");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required!"],
    lowercase: true,
    trim: true,
    unique: true,
    validate: [validateEmail, "Invalid email!"],
  },
  password: {
    type: String,
    required: true,
    minLength: [6, "Password must contain minimum 6 signs!"],
  },
});

// password hash
UserSchema.pre("save", async function (next) {
  const user = this;
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;
  next();
});

// https://mongoosejs.com/docs/middleware.html#error-handling-middleware
UserSchema.post("save", function (error, doc, next) {
  if (error.name === "MongoServerError" && error.code === 11000) {
    next(new Error("Email is already used!"));
  } else {
    next();
  }
});

UserSchema.methods = {
  async comparePassword(password) {
    return bcrypt.compare(password, this.password);
  },
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
