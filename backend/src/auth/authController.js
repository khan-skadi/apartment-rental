const User = require("../models/user.js");

async function login(req, res, next) {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new Error())
  }
}

async function signup(req, res, next) {
  if (await User.findOne({ email: req.body.email })) {
    res.status(409).send("The email you entered already exists.");
  }

  const user = new User({
    firstName: req.body.first_name,
    lastName: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
  });
  try {
    const newUser = await user.save();
    let authUser = newUser.toObject();
    delete authUser.password;
    res.status(201).send(authUser);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  signup,
  login,
};
