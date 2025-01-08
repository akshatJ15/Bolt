import React from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { GoChevronDown } from "react-icons/go";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmedRide from "../components/ConfirmedRide";
import { useRef, useState } from "react";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";
import { Link } from "react-router-dom";
import axios from "axios";
import { SocketContext } from "../context/SocketContext";
import { useEffect } from "react";
import { useContext } from "react";
import { UserDataContext } from "../context/UserContext";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const vehiclePanelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [activeField, setActiveField] = useState(null);
  const [fare, setFare] = useState({});
  const [vehicleType, setVehicleType] = useState(null);
  const [ride, setRide] = useState(null);

  const { socket } = useContext(SocketContext);
  const { user } = useContext(UserDataContext);

  useEffect(() => {
    socket.emit("join", { userType: "user", userId: user._id });
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted");
  };

  const fetchPickupSuggestions = async (value) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { input: value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setPickupSuggestions(response.data); // Set suggestions directly
    } catch (error) {
      console.error(
        "Error fetching pickup suggestions",
        error.response?.data || error.message
      );
    }
  };

  const fetchDestinationSuggestions = async (value) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { input: value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setDestinationSuggestions(response.data); // Set suggestions directly
    } catch (error) {
      console.error(
        "Error fetching destination suggestions",
        error.response?.data || error.message
      );
    }
  };

  const handlePickupChange = (e) => {
    setPickup(e.target.value);
    if (e.target.value.length >= 3) {
      // Ensure at least 3 characters
      fetchPickupSuggestions(e.target.value);
    } else {
      setPickupSuggestions([]);
    }
  };

  const handleDestinationChange = (e) => {
    setDestination(e.target.value);
    if (e.target.value.length >= 3) {
      // Ensure at least 3 characters
      fetchDestinationSuggestions(e.target.value);
    } else {
      setDestinationSuggestions([]);
    }
  };

  const handleSuggestionSelect = (type, suggestion) => {
    if (type === "pickup") {
      setPickup(suggestion.description);
      setPickupSuggestions([]);
    } else {
      setDestination(suggestion.description);
      setDestinationSuggestions([]);
    }
  };

  useGSAP(
    function () {
      if (panelOpen) {
        gsap.to(panelRef.current, {
          height: "70%",
          padding: 24,
        });
        gsap.to(panelCloseRef.current, { opacity: 1 });
      } else {
        gsap.to(panelRef.current, { height: 0, padding: 0 });
        gsap.to(panelCloseRef.current, { opacity: 0 });
      }
    },
    [panelOpen]
  );

  useGSAP(
    function () {
      if (vehiclePanel) {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehiclePanel]
  );

  useGSAP(
    function () {
      if (confirmRidePanel) {
        gsap.to(confirmRidePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(confirmRidePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmRidePanel]
  );

  useGSAP(
    function () {
      if (vehicleFound) {
        gsap.to(vehicleFoundRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(vehicleFoundRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehicleFound]
  );

  useGSAP(
    function () {
      if (waitingForDriver) {
        gsap.to(waitingForDriverRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(waitingForDriverRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [waitingForDriver]
  );

  async function findTrip() {
    setVehiclePanel(true);
    setPanelOpen(false);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
        {
          params: {
            pickup,
            destination,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data);
      setFare(response.data);
    } catch (error) {
      console.error(
        "Error finding trip",
        error.response?.data || error.message
      );
    }
  }

  async function createRide() {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/create`,
      {
        pickup,
        destination,
        vehicleType,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log(response.data);
  }

  return (
    <div className="h-screen relative overflow-hidden py-17">
      <Link to="/">
        <img
          className="w-16 absolute left-5 top-5"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Bolt_logo.png/640px-Bolt_logo.png"
        />
      </Link>
      <div className="h-screen w-screen">
        {/* img for temporary use */}
        <img
          className="h-full w-full object-cover"
          src="https://cdn.theatlantic.com/thumbor/lbZRyomRR9jj98IyP6qPKjaKYqQ=/0x48:1231x740/720x405/media/img/mt/2017/04/IMG_7105/original.png"
        />
      </div>
      <div className=" flex flex-col justify-end h-screen absolute top-0 w-full">
        <div className="h-[30%] p-6 bg-white relative">
          <h5
            ref={panelCloseRef}
            onClick={() => setPanelOpen(false)}
            className="absolute opacity-0 right-6 top-6 text-2xl"
          >
            <GoChevronDown />
          </h5>
          <h4 className="text-2xl font-semibold">Find a Trip</h4>
          <form className="relative py-3" onSubmit={handleSubmit}>
            <div className="line absolute h-16 w-1 top-[50%] -translate-y-1/2 left-5 bg-gray-700 rounded-full"></div>
            <input
              type="text"
              value={pickup}
              className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full"
              placeholder="Add a pick-up location"
              onChange={handlePickupChange}
              onClick={() => setPanelOpen(true)}
            />
            <input
              type="text"
              value={destination}
              className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full  mt-3"
              placeholder="Enter Your Destination"
              onChange={handleDestinationChange}
              onClick={() => setPanelOpen(true)}
            />
          </form>
          <button
            className="w-full bg-black py-2 rounded-2xl text-white pb-4"
            onClick={findTrip}
          >
            Find Trip
          </button>
        </div>
        <div ref={panelRef} className="bg-white h-0">
          <LocationSearchPanel
            setVehiclePanel={setVehiclePanel}
            setPanelOpen={setPanelOpen}
            suggestions={{
              pickup: pickupSuggestions,
              destination: destinationSuggestions,
            }}
            onSelect={handleSuggestionSelect}
          />
        </div>
      </div>
      <div
        ref={vehiclePanelRef}
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12"
      >
        <VehiclePanel
          createRide={createRide}
          selectVehicle={setVehicleType}
          fare={fare}
          setConfirmRidePanel={setConfirmRidePanel}
          setVehiclePanel={setVehiclePanel}
        />
      </div>
      <div
        ref={confirmRidePanelRef}
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12"
      >
        <ConfirmedRide
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
          setConfirmRidePanel={setConfirmRidePanel}
          setVehicleFound={setVehicleFound}
          setVehiclePanel={setVehiclePanel}
          createRide={createRide}
        />
      </div>
      <div
        ref={vehicleFoundRef}
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12"
      >
        <LookingForDriver
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
          setVehicleFound={setVehicleFound}
        />
      </div>
      <div
        ref={waitingForDriverRef}
        className="fixed w-full  z-10 bottom-0  bg-white px-3 py-6 pt-12"
      >
        <WaitingForDriver
          ride={ride}
          setVehicleFound={setVehicleFound}
          setWaitingForDriver={setWaitingForDriver}
          waitingForDriver={waitingForDriver}
        />
      </div>
    </div>
  );
};

export default Home;
