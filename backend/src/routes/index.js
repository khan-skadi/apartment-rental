const express = require("express");
const authRoute = require("../auth/authRoute");
const userRoute = require("../users/userRoute");
const jwt = require("express-jwt");

const router = express.Router();

const authMiddleware = jwt({ secret: process.env.JWT_PRIVATE_KEY });

router.use("/auth", authRoute);
router.use("/users", authMiddleware, userRoute);

module.exports = router;
