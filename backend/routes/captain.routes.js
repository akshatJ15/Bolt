const express = require("express");

const router = express.Router();

const authMiddleware = require("../middlewares/auth.middlewares");

const { body } = require("express-validator");

const captainController = require("../controllers/captain.controller");

router.post("/register", [
  body("email").isEmail().withMessage("Invalid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password should be at least 6 characters long"),
  body("fullname.firstname")
    .isLength({ min: 3 })
    .withMessage("First name should be at least 3 characters long"),
  body("vehicle.color")
    .isLength({ min: 3 })
    .withMessage("Color should be at least 3 characters long"),
  body("vehicle.plate")
    .isLength({ min: 3 })
    .withMessage("Plate should be at least 3 characters long"),
  body("vehicle.capacity")
    .isInt({ min: 1 })
    .withMessage("Capacity should be at least 1 person"),
  body("vehicle.vehicleType")
    .isIn(["car", "motorcycle", "auto"])
    .withMessage("Invalid vehicle type"),
], captainController.register);

router.post("/login", [
    body("email").isEmail().withMessage("Invalid email"),
    body("password")
        .isLength({ min: 6 })
        .withMessage("Password should be at least 6 characters long"),
    ], captainController.login);


router.get("/profile", authMiddleware.authCaptain, captainController.profile);

router.get("/logout", authMiddleware.authCaptain ,captainController.logout);

module.exports = router;
