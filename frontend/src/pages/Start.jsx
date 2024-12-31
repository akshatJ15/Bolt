import React from "react";
import { Link } from "react-router-dom";

const Start = () => {
  return (
    <div>
      <div className="bg-cover bg-center bg-[url(https://cdn.pixabay.com/photo/2022/06/19/18/31/traffic-7272520_1280.jpg)] pt-8 h-screen w-full flex justify-between flex-col">
        <Link to="/">
          <img
            className="w-16 ml-8"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Bolt_logo.png/640px-Bolt_logo.png"
          />
        </Link>
        <div className="bg-white py-5 px-4">
          <h2 className="text-3xl font-bold">Get Started Bolt</h2>
          <Link
            to="/login"
            className="flex justify-center items-center w-full bg-black text-white py-3 mt-4 rounded"
          >
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Start;
