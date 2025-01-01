import React from "react";

const Home = () => {
  return (
    <div className="h-screen relative overflow-hidden">
      <img
        className="w-16 absolute left-5 top-5"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Bolt_logo.png/640px-Bolt_logo.png"
      />
      <div className="h-screen w-screen">
        <img
          className="h-full w-full object-cover"
          src="https://t3.ftcdn.net/jpg/07/28/30/26/360_F_728302620_Xddnf5Cl0K1ACZurd6yByUzHiHMMIoe6.jpg"
        />
      </div>
      <div className=" flex flex-col justify-end h-screen absolute top-0 w-full">
        <div className="h-[30%] p-6 bg-white relative">
          <h5 className="absolute opacity-0 right-6 top-6 text-2xl">
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className="text-2xl font-semibold">Find a Trip</h4>
          <form className="relative py-3">
            <div className="line absolute h-16 w-1 top-[50%] -translate-y-1/2 left-5 bg-gray-700 rounded-full"></div>
            <input
              type="text"
              className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full"
              placeholder="Add a pick-up location"
            />
            <input
              type="text"
               className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full  mt-3'
              placeholder="Enter Your Destination"
            />
          </form>
          <button className="bg-black text-white px-4 py-2 rounded-lg mt-3 w-full">
            Find Trip
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
