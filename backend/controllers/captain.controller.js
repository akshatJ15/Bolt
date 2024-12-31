const captainModel = require("../models/captain.model");
const captainService = require("../services/captain.services");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const BlacklistToken = require("../models/blackListToken.model");

module.exports.register = async (req, res, next) => {
  const {
    fullname,
    email,
    password,
    vehicle
  } = req.body;
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }
    const captainAlreadyExists = await captainModel.findOne({ email });
    if (captainAlreadyExists) {
      return res.status(400).json({ error: "Captain already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const captain = await captainService.createCaptain({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password: hashedPassword,
      color: vehicle.color,
      plate: vehicle.plate,
      capacity: vehicle.capacity,
      vehicleType: vehicle.vehicleType,
    });

    const token = jwt.sign({ _id: captain._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    res.status(201).json({ message: "Captain created successfully", captain });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.login = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }
  const { email, password } = req.body;
  try {
    const captain = await captainModel.findOne({ email }).select("+password");
    if (!captain) {
      return res.status(404).json({ error: "Captain not found" });
    }
    const isMatch = await bcrypt.compare(password, captain.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign({ _id: captain._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      })
      .status(200)
      .json({ token, captain });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.profile = async (req, res, next) => {
  try {
    res.status(200).json(req.captain);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.logout = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization.split(" ")[1];
    await BlacklistToken.create({ token });
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};