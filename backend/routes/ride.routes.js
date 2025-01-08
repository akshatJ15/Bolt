const express = require("express");
const router = express.Router();
const { body,query } = require("express-validator");
const rideController = require("../controllers/ride.controller");
const authMiddleware = require("../middlewares/auth.middlewares");

router.post(
  "/create",
  authMiddleware.authUser,
  body("pickup").isString().isLength({ min: 3 }).withMessage("Invalid origin"),
  body("destination")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid destination"),
  body("vehicleType")
    .isString()
    .isIn(["auto", "car", "motorcycle"])
    .withMessage("Invalid vehicleType"),
  rideController.createRide
);

router.get("/get-fare", 
  authMiddleware.authUser,
  query("pickup").isString().isLength({ min: 3 }).withMessage("Invalid origin"),
  query("destination").isString().isLength({ min: 3 }).withMessage("Invalid destination"),
  rideController.getFare);

module.exports = router;
