import React from "react";
import { Link } from "react-router-dom";

const RegistrationFormComponent = () => {
  return (
    <>
      <div>
        <form>
          <div className="mt-1">
            <label className="font-fontInter text-[#484848]">Enter Name</label>
            <input className="w-full px-3 py-2 border rounded-md outline-none mb-4 mt-1" />
          </div>
          <div>
            <label className="font-fontInter text-[#484848]">Enter Email</label>
            <input className="w-full px-3 py-2 border rounded-md outline-none mb-4 mt-1" />
          </div>
          <div className="mt-1">
            <label className="font-fontInter text-[#484848]">
              Enter Password
            </label>
            <input className="w-full px-3 py-2 border rounded-md outline-none mb-4 mt-1" />
          </div>
          <div className="mt-1">
            <label className="font-fontInter text-[#484848]">
              Enter Confirm Password
            </label>
            <input className="w-full px-3 py-2 border rounded-md outline-none mb-4 mt-1" />
          </div>
          <button className="bg-black text-white w-full font-fontInter text-base border rounded-md py-2 mt-1 mb-4">
            Sign Up
          </button>
          <p className="font-fontInter text-sm">
            Already have an account please{" "}
            <Link to="/login" className="text-[#236DB0] hover:underline">
              sign in
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default RegistrationFormComponent;
