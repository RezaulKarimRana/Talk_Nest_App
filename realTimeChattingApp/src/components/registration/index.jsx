import React from "react";

const RegistrationFormComponent = () => {
  return (
    <>
      <div>
        <form>
          <div>
            <label className="font-fontInter text-[#484848]">Enter Email</label>
            <input className="w-full px-3 py-2 border rounded-md outline-none mb-4 mt-1" />
          </div>
          <div>
            <label className="font-fontInter text-[#484848]">
              Enter Password
            </label>
            <input className="w-full px-3 py-2 border rounded-md outline-none mb-4 mt-1" />
          </div>
          <div>
            <label className="font-fontInter text-[#484848]">
              Enter Confirm Password
            </label>
            <input className="w-full px-3 py-2 border rounded-md outline-none mb-4 mt-1" />
          </div>
          <button className="bg-black text-white w-full font-fontInter text-base border rounded-md py-2 mt-1 mb-4">
            Sign Up
          </button>
          <p className="font-fontInter text-base">
            Already have an account please{" "}
            <span className="text-[#236DB0]">sign in</span>
          </p>
        </form>
      </div>
    </>
  );
};

export default RegistrationFormComponent;
