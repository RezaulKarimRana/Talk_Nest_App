import React from "react";

const RegistrationFormComponent = () => {
  return (
    <>
      <div>
        <form>
          <div>
            <label className="font-fontInter">Enter Email</label>
            <input className="w-full px-3 py-2 border rounded-md outline-none mb-3 mt-2" />
          </div>
          <div>
            <label className="font-fontInter">Enter Password</label>
            <input className="w-full px-3 py-2 border rounded-md outline-none mb-3 mt-2" />
          </div>
          <div>
            <label className="font-fontInter">Enter Confirm Password</label>
            <input className="w-full px-3 py-2 border rounded-md outline-none mb-3 mt-2" />
          </div>
          <button className="bg-black text-white w-full font-fontInter text-base border rounded-md py-2 mt-1 mb-4">
            Sign Up
          </button>
          <p>
            Already have an account please <span>sign In</span>{" "}
          </p>
        </form>
      </div>
    </>
  );
};

export default RegistrationFormComponent;
