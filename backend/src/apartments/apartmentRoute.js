const express = require("express");
const apartmentController = require("./apartmentController");

const router = express.Router();

router.route("/").get(apartmentController.getApartments);
router.route("/").post(apartmentController.addApartment);
router.route("/:id").put(apartmentController.updateApartment);
router.route("/:id").delete(apartmentController.deleteApartment);

module.exports = router;
