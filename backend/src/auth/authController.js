const User = require("../models/user.js");
const jwt = require("jsonwebtoken");
const { use } = require("./authRoute.js");

async function login(req, res, next) {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new Error());
  }
  let user;
  try {
    user = await User.find()
      .where({ email })
      .select("_id firstName lastName email role password")
      .exec();
    user = user[0];
  } catch (err) {
    return next(err);
  }

  if (!user) {
    return next(new Error());
  }

  try {
    await user.authenticate(password);
  } catch (err) {
    res.status(403).send("The password doesn't match");
  }

  const privateKey = process.env.JWT_PRIVATE_KEY;
  const expiresIn = process.env.JWT_EXPIRE;
  try {
    jwt.sign(
      {
        _id: user._id,
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      privateKey,
      { expiresIn },
      function (err, token) {
        if (err) return next(err);
        res.json({
          _id: user._id,
          firstName: user.firstName,
          lasteName: user.lasteName,
          email: user.email,
          role: user.role,
          token: token,
        });
      }
    );
  } catch (err) {
    return next(err);
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
