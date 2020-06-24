const express = require("express");
const authRoute = require("../auth/authRoute");
const userRoute = require("../users/userRoute");
const apartmentRoute = require("../apartments/apartmentRoute");
const jwt = require("express-jwt");

const router = express.Router();

const authMiddleware = jwt({ secret: process.env.JWT_PRIVATE_KEY });

router.use("/auth", authRoute);
router.use("/users", authMiddleware, userRoute);
router.use("/apartments", authMiddleware, apartmentRoute);

module.exports = router;
