import React from "react";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import FinishRide from "../components/FinishRide";
import { FaArrowUp } from "react-icons/fa";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const CaptainRiding = () => {
  const [finishRidePanel, setFinishRidePanel] = useState(false);
  const finishRidePanelRef = useRef(null);
  
  
  useGSAP(
    function () {
      if (finishRidePanel) {
        gsap.to(finishRidePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(finishRidePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [finishRidePanel]
  );
  return (
    <div className="h-screen relative flex flex-col justify-end">
      <div className="fixed p-6 top-0 flex items-center justify-between w-screen">
        <Link to="/captain-home">
          <img
            className="w-16 absolute left-5 top-5"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Bolt_logo.png/640px-Bolt_logo.png"
          />
        </Link>
      </div>

      <div
        className="h-1/5 p-6 flex items-center justify-between relative bg-yellow-400 pt-10"
        onClick={() => {
          setFinishRidePanel(true);
        }}
      >
        <h5
          className="p-1 text-center w-[90%] absolute top-0"
          onClick={() => {}}
        >
          <FaArrowUp />
        </h5>
        <h4 className="text-xl font-semibold">{"4 KM away"}</h4>
        <button className=" bg-green-600 text-white font-semibold p-3 px-10 rounded-lg">
          Complete Ride
        </button>
      </div>
      <div
        ref={finishRidePanelRef}
        className="fixed w-full z-[500] bottom-0 translate-y-full bg-white px-3 py-10 pt-12"
      >
        <FinishRide setFinishRidePanel={setFinishRidePanel} />
      </div>

      <div className="h-screen fixed w-screen top-0 z-[-1]">
        <img
          className="w-full h-full object-cover"
          src="https://media.istockphoto.com/id/1356005360/vector/route-mapping-city-streets-car-ride.jpg?s=612x612&w=0&k=20&c=zmcoP55mMdM_a1W7RDRvjV4kYiT_P78d947LztmvVTw="
          alt=""
        />
      </div>
    </div>
  );
};

export default CaptainRiding;
