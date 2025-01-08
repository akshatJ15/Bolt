const rideService = require("../services/ride.service");
const { validationResult } = require("express-validator");
const mapService = require("../services/maps.service");
const { sendMessageToSocketId }=require('../socket');

module.exports.createRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { pickup, destination, vehicleType } = req.body;
  console.log({
    pickup,
    destination,
    vehicleType,
  });
  console.log(req.user._id);
  if (!req.user._id) {
    return res.status(400).json({ error: "User not found" });
  }
  try {
    const ride = await rideService.createRide({
      userId: req.user._id,
      pickup,
      destination,
      vehicleType,
    });

    const captainsInRadius=await mapService.getCaptainInTheRadius(pickUpCoordinates.ltd,pickUpCoordinates.lng,2);

    const pickUpCoordinates=await mapService.getAddress(pickup);

    console.log({pickUpCoordinates});

    ride.otp="";

    sendMessageToSocketId(captain.socketId,{
      event:"new-ride",
      data:ride
    });


  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports.getFare = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { pickup, destination } = req.query;
  try {
    const fare = await rideService.getFare(pickup, destination);

    return res.status(200).json(fare);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
