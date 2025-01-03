import React from "react";
import { Link } from "react-router-dom";
import { MdOutlineLogout } from "react-icons/md";
import CaptainDetails from "../components/CaptainDetails";
import RidePopUp from "../components/RidePopUp";
import ConfirmRidePopUp from "../components/ConfirmRidePopUp";
import { useState } from "react";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const CaptainHome = () => {

  const [ridePopupPanel, setRidePopupPanel] = useState(true);
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);

  const ridePopupPanelRef = useRef(null);
  const confirmRidePopupPanelRef = useRef(null);

  useGSAP(
    function () {
      if (ridePopupPanel) {
        gsap.to(ridePopupPanelRef.current, {
          transform: "translateY(0)",
          duration: 0.5,
        });
      } else {
        gsap.to(ridePopupPanelRef.current, {
          transform: "translateY(100%)",
          duration: 0.5,
        });
      }
    },
    [ridePopupPanel]
  );

  useGSAP(
    function () {
      if (confirmRidePopupPanel) {
        gsap.to(confirmRidePopupPanelRef.current, {
          transform: "translateY(0)",
          duration: 0.5,
        });
      } else {
        gsap.to(confirmRidePopupPanelRef.current, {
          transform: "translateY(100%)",
          duration: 0.5,
        });
      }
    },
    [confirmRidePopupPanel]
  );

  return (
    <div className="h-screen">
      <div className="fixed p-6 top-0 flex items-center justify-between w-screen">
        <Link to="/">
          <img
            className="w-16 absolute left-5 top-5"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Bolt_logo.png/640px-Bolt_logo.png"
          />
        </Link>
        <Link
          to="/captain-home"
          className=" h-10 w-10 bg-white flex items-center justify-center rounded-full"
        >
          <MdOutlineLogout className="text-lg font-medium" />
        </Link>
      </div>
      <div className="h-1/2">
        <img
          className="w-full h-full object-cover"
          src="https://cdn.theatlantic.com/thumbor/lbZRyomRR9jj98IyP6qPKjaKYqQ=/0x48:1231x740/720x405/media/img/mt/2017/04/IMG_7105/original.png"
        />
      </div>
      <div className="h-2/5 p-6">
        <CaptainDetails />
      </div>
      <div className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12 overflow-scroll" ref={ridePopupPanelRef}>
        <RidePopUp
          setRidePopupPanel={setRidePopupPanel}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
        />{" "}
      </div>

      <div className="fixed w-full h-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12 overflow-scroll" ref={confirmRidePopupPanelRef}>
        <ConfirmRidePopUp
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          setRidePopupPanel={setRidePopupPanel}
        />{" "}
      </div>
    </div>
  );
};

export default CaptainHome;