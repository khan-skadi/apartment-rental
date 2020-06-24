const express = require("express");
const userController = require("./userController");

const router = express.Router();

router.route("/").get(userController.getUsers);
router.route("/").post(userController.addUser);
router.route("/:id").put(userController.updateUser);
router.route("/:id").delete(userController.deleteUser);

module.exports = router;
