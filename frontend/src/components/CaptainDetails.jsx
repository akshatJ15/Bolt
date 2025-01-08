import React from "react";
import { MdOutlineTimer } from "react-icons/md";
import { IoMdSpeedometer } from "react-icons/io";
import { RiBookletLine } from "react-icons/ri";
import useCaptainStore from "../store/captainStore";

const CaptainDetails = () => {
  const captain = useCaptainStore((state) => state.captain);
  console.log(captain);

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-start gap-3">
          <img
            className="h-10 w-10 rounded-full object-cover"
            src={captain?.profileImage || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdlMd7stpWUCmjpfRjUsQ72xSWikidbgaI1w&s"}
            alt=""
          />
          <h4 className="text-lg font-medium capitalize">
            {captain ? `${captain.fullname.firstname} ${captain.fullname.lastname}` : "Captain Name"}
          </h4>
        </div>
        <div>
          <h4 className="text-xl font-semibold">₹{captain?.earnings || "0.00"}</h4>
          <p className="text-sm text-gray-600">Earned</p>
        </div>
      </div>
      <div className="flex p-3 mt-8 bg-gray-100 rounded-xl justify-center gap-5 items-start">
        <div className="text-center">
          <MdOutlineTimer className="text-3xl mb-2 font-thin inline-block" />
          <h5 className="text-lg font-medium">{captain?.hoursOnline || "0.0"}</h5>
          <p className="text-sm text-gray-600">Hours Online</p>
        </div>
        <div className="text-center">
          <IoMdSpeedometer className="text-3xl mb-2 font-thin inline-block" />
          <h5 className="text-lg font-medium">{captain?.ridesCompleted || "0"}</h5>
          <p className="text-sm text-gray-600">Rides Completed</p>
        </div>
        <div className="text-center">
          <RiBookletLine className="text-3xl mb-2 font-thin inline-block" />
          <h5 className="text-lg font-medium">{captain?.reviews || "0"}</h5>
          <p className="text-sm text-gray-600">Reviews</p>
        </div>
      </div>
    </div>
  );
};

export default CaptainDetails;
