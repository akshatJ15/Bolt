import React from "react";
import { GoChevronDown } from "react-icons/go";
import { IoLocation } from "react-icons/io5";
import { MdCurrencyRupee } from "react-icons/md";

const ConfirmedRide = (props) => {
  const vehicle=props.vehicleType;
  let fareString="";
  if(vehicle=="car"){
    fareString="carFare";
  }
  else if(vehicle=="moto"){
    fareString="motorcycleFare";
  }
  else{
    fareString="autoFare";
  }
  // console.log(vehicle);
  // console.log(props.fare[fareString]);  
  return (
    <div className="pb-10">
      <h5
        className="p-1 text-center w-[93%] absolute top-0"
        onClick={() => {
          props.setConfirmRidePanel(false);
        }}
      >
        <GoChevronDown className="text-3xl text-gray-200" />
      </h5>
      <h3 className="text-2xl font-semibold mb-5">Confirm your Ride</h3>

      <div className="flex gap-2 justify-between flex-col items-center">
        <img
          className="h-20"
          src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"
          alt=""
        />
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-2">
            <IoLocation />
            <div>
              <h3 className="text-lg font-medium">Pickup</h3>
              <p className="text-sm -mt-1 text-gray-600">{props.pickup}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2">
            <IoLocation />
            <div>
              <h3 className="text-lg font-medium">Destination</h3>
              <p className="text-sm -mt-1 text-gray-600">{props.destination}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3">
            <MdCurrencyRupee />
            <div>
              <h3 className="text-lg font-medium">Cash</h3>
              <p className="text-sm -mt-1 text-gray-600">
                {Math.floor(props.fare[fareString])}
              </p>
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            props.setVehicleFound(true);
            props.setConfirmRidePanel(false);
            props.setVehiclePanel(false);
            props.createRide();
          }}
          className="w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default ConfirmedRide;
