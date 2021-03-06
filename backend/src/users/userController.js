const User = require('../models/user.js');
const Apartment = require('../models/apartment.js');

function formatSort(order, orderBy) {
  let sort = {};
  sort[orderBy] = order;
  return sort;
}

async function getUsers(req, res, next) {
  const user = req.user;
  if (user.role === 'admin') {
    try {
      const { currentPage, rowsCount, order, orderBy } = req.query;
      const users = await User.find({ _id: { $ne: user._id } })
        .sort(formatSort(order, orderBy))
        .skip(parseInt(currentPage) * parseInt(rowsCount))
        .limit(parseInt(rowsCount))
        .lean();

      // all users except the admin
      const totalUsers = await User.find({ _id: { $ne: user._id } }).lean();
      const totalCount = totalUsers.length;
      res.send({ users, totalCount });
    } catch (err) {
      next(err);
    }
  } else {
    res.status(401).send("This user doesn't have permission to get users");
  }
}

async function addUser(req, res, next) {
  if (req.user.role === 'admin') {
    try {
      if (await User.findOne({ email: req.body.email })) {
        res.status(409).send('The email you entered already exists.');
      }

      const {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        role
      } = req.body;

      const user = new User({
        firstName,
        lastName,
        email,
        password,
        role
      });

      const createdUser = await user.save();
      let authUser = createdUser.toObject();
      delete authUser.password;
      res.json(authUser);
    } catch (err) {
      return next(err);
    }
  } else {
    res.status(401).send("This user doesn't have permission to add user");
  }
}

async function updateUser(req, res, next) {
  if (req.user.role === 'admin' || req.user._id === req.params.id) {
    try {
      let userId;
      if (req.user._id === req.params.id) {
        userId = req.user._id;
      } else {
        userId = req.params.id;
      }
      const user = await User.findOne({ _id: userId });

      user.firstName = req.body.first_name || user.firstName;
      user.lastName = req.body.last_name || user.lastName;
      user.email = req.body.email || user.email;
      if (req.body.password) user.password = req.body.password;
      user.role = req.body.role || user.role;
      try {
        const updatedUser = await user.save();
        let authUser = updatedUser.toObject();
        delete authUser.password;
        res.json(authUser);
      } catch (err) {
        if (err.name === 'ValidationError') {
          res.status(409).send('Validation Error');
        } else {
          return next(err);
        }
      }
    } catch (err) {
      res.status(404).send("The user with id doesn't exist");
    }
  } else {
    res.status(401).send("This user doesn't have permission to update user");
  }
}

async function deleteUser(req, res, next) {
  if (req.user.role === 'admin') {
    try {
      const userId = req.params.id;

      if (req.user._id === userId) {
        res.status(400).send("The admin can't remove his own profile");
      }

      const user = await User.findOne({ _id: userId });
      await user.remove();

      await Apartment.deleteMany({ realtor: userId });
      res.status(204).send();
    } catch (err) {
      res.status(404).send("The user with this id doesn't exist");
    }
  } else {
    res.status(401).send("This user doesn't have permission to delete user");
  }
}

async function getRealtors(req, res, next) {
  const user = req.user;
  if (user.role === 'admin' || user.role === 'realtor') {
    try {
      // all realtors and admins except the request user
      const users = await User.find({
        role: { $ne: 'client' }
      }).lean();
      res.send({ users });
    } catch (err) {
      next(err);
    }
  } else {
    res
      .status(401)
      .send("This user doesn't have permission to get realtors and admins");
  }
}

module.exports = {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
  getRealtors
};
