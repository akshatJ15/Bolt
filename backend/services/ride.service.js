const rideModel = require("../models/ride.model");
const mapService = require("./maps.service");
const crypto = require("crypto");

module.exports.getFare=async function (pickup, destination) {
  //logic to calculate fare
  if (pickup == null || destination == null) {
    throw new Error("Invalid pickup or destination");
  }


  const distanceTime = await mapService.getDistanceTime(pickup, destination);

  const { distance, duration } = distanceTime;
  console.log({ distance, duration });
  const autoFare = (distance.value * 1) / 1000 + (duration.value * 2) / 60;
  const carFare = (distance.value * 2) / 1000 + (duration.value * 5) / 60;
  const motorcycleFare =
    (distance.value * 1.5) / 1000 + (duration.value * 3) / 60;
  console.log({ autoFare, carFare, motorcycleFare });

  return { autoFare, carFare, motorcycleFare };
}


function generateOtp(num) {
  return crypto.randomInt(10 ** (num - 1), 10 ** num - 1).toString();
}

module.exports.createRide = async ({
  userId,
  pickup,
  destination,
  vehicleType,
}) => {
  if (pickup == null || destination == null || vehicleType == null) {
    throw new Error("Invalid input");
  }

  const fare = await module.exports.getFare(pickup, destination);
  console.log("Fare of the ride is", fare);
  const ride = new rideModel({
    userId,
    pickup,
    destination,
    fare:
      fare.vehicleType === "auto"
        ? fare.autoFare
        : fare.vehicleType === "car"
          ? fare.carFare
          : fare.motorcycleFare,
    status: "Pending",
    otp: generateOtp(6),
  });

  return await ride.save();
};