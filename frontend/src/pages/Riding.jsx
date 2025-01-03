import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
import { MdCurrencyRupee, MdLocationOn } from "react-icons/md";

const Riding = () => {
  const location = useLocation();
  const ride = location.state || {};
  const navigate = useNavigate();

  return (
    <div className="h-screen">
      <Link
        to="/home"
        className="fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full"
      >
        <IoMdHome />{" "}
      </Link>
      <div className="h-1/2">
        <img className="w-full h-full object-cover" src="https://media.istockphoto.com/id/1356005360/vector/route-mapping-city-streets-car-ride.jpg?s=612x612&w=0&k=20&c=zmcoP55mMdM_a1W7RDRvjV4kYiT_P78d947LztmvVTw=" />
      </div>
      <div className="h-1/2 p-4">
        <div className="flex items-center justify-between">
          <img
            className="h-12"
            src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"
            alt=""
          />
          <div className="text-right">
            <h2 className="text-lg font-medium capitalize">Suresh</h2>
            <h4 className="text-xl font-semibold -mt-1 -mb-1">7876</h4>
            <p className="text-sm text-gray-600">Maruti Suzuki Alto</p>
          </div>
        </div>

        <div className="flex gap-2 justify-between flex-col items-center">
          <div className="w-full mt-5">
            <div className="flex items-center gap-5 p-3 border-b-2">
              <MdLocationOn />{" "}
              <div>
                <h3 className="text-lg font-medium">562/11-A</h3>
                <p className="text-sm -mt-1 text-gray-600">Jaipur</p>
              </div>
            </div>
            <div className="flex items-center gap-5 p-3">
              <MdCurrencyRupee />
              <div>
                <h3 className="text-lg font-medium">100 </h3>
                <p className="text-sm -mt-1 text-gray-600">Cash Cash</p>
              </div>
            </div>
          </div>
        </div>
        <button className="w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg">
          Make a Payment
        </button>
      </div>
    </div>
  );
};

export default Riding;
