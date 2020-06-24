const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const saltRounds = 10;

const userSchema = new Schema({
  firstName: { type: String, required: true, default: "", trim: true },
  lastName: { type: String, required: true, default: "", trim: true },
  email: {
    type: String,
    unique: true,
    required: true,
    default: "",
    trim: true,
    lowercase: true,
  },
  password: { type: String, select: false },
  role: {
    type: String,
    enum: ["client", "realtor", "admin"],
    required: true,
    default: "client",
    trim: true,
  },
});

userSchema.methods.hashPassword = function hashPassword(password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, function (err, hash) {
      if (err) return reject(new Error(err));
      return resolve(hash);
    });
  });
};

userSchema.methods.authenticate = function authenticate(password) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, this.password, function (err, result) {
      if (!result) return reject();
      return resolve();
    });
  });
};

userSchema.pre("save", function (next) {
  if (this.password && this.isModified("password")) {
    this.password = this.hashPassword(this.password)
      .then((hashed) => {
        this.password = hashed;
        next();
      })
      .catch(next);
  } else {
    next();
  }
});

userSchema.plugin(uniqueValidator);

const User = mongoose.model("User", userSchema);

module.exports = User;
