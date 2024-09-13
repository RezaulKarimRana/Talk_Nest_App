import React from "react";
import { Link } from "react-router-dom";

const LoginFormComponent = () => {
  return (
    <>
      <div className="w-5/6">
        <form>
          <div>
            <label className="font-fontInter text-[#484848]">Enter Email</label>
            <input className="w-full px-3 py-2 border rounded-md outline-none mb-4 mt-1" />
          </div>
          <div className="mt-1">
            <label className="font-fontInter text-[#484848]">
              Enter Password
            </label>
            <input className="w-full px-3 py-2 border rounded-md outline-none mb-4 mt-2" />
          </div>
          <button className="bg-black text-white w-full font-fontInter text-base border rounded-md py-2 mt-1 mb-4">
            Sign In
          </button>
          <p className="underline text-[#4A4A4A] mt-4">forgot password?</p>
          <p className="font-fontInter text-sm  mt-5">
            Don't have an account please{" "}
            <Link to="/registration" className="text-[#236DB0] hover:underline">
              sign up
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default LoginFormComponent;
