const mongoose = require("mongoose");

const RideSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  captain: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Captain",
  },
  pickup: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  fare: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Accepted", "Completed", "Cancelled", "Ongoing"],
    default: "Pending",
  },
  duration: {
    type: Number,
  },
  distance: {
    type: Number,
  },
  otp:{
    type: String,
    select: false,
    required: true
  }
//   paymentId:{
//     type: String,
//     required: true,
//   },
//   orderId:{
//     type: String,
//     required: true,
//   },
//   signature:{
//     type: String,
//   }
});

module.exports = mongoose.model("Ride", RideSchema);
