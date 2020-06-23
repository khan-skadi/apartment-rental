const User = require("../models/user.js");
const jwt = require("jsonwebtoken");
const { query } = require("express");

function formatSort(order, orderBy) {
  let sort = {};
  sort[orderBy] = order;
  return sort;
}

async function getUsers(req, res, next) {
  const user = req.user;
  if (user.role === "admin") {
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
  } else {
    res.status(401).send("This user doesn't have permission to get users");
  }
}

module.exports = {
  getUsers,
};
