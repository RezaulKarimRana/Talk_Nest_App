import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { registration } from "../../validation/Validation";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import CircleLoader from "react-spinners/CircleLoader";
const RegistrationFormComponent = ({ toast }) => {
  const [loading, setLoading] = useState(false);
  const db = getDatabase();
  const auth = getAuth();
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: () => {
      createNewUser();
    },
    validationSchema: registration,
  });
  const createNewUser = () => {
    setLoading(true);
    createUserWithEmailAndPassword(
      auth,
      formik.values.email,
      formik.values.password
    )
      .then((userCredential) => {
        const user = userCredential.user;
        setLoading(false);
        updateProfile(auth.currentUser, {
          displayName: formik.values.name,
        });
        sendEmailVerification(auth.currentUser)
          .then(() => {
            toast.success("Please check email for complete registration", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            setLoading(false);
          })
          .catch((error) => {
            toast.error(error.message, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            setLoading(false);
          });
      })
      .then(() => {
        set(ref(db, "users/" + user.uid), {
          username: user.displayName,
          email: user.email,
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorMessage.includes("auth/email-already-in-use")) {
          toast.error("Email already in use", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
        setLoading(false);
      });
  };
  return (
    <>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <div className="mt-1">
            <label className="font-fontInter text-[#484848]">Enter Name</label>
            <input
              className="w-full px-3 py-2 border rounded-md outline-none mb-4 mt-1"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              type="text"
            />
            {formik.errors.name && formik.touched.name && (
              <p className="font-fontInter text-red-500 text-sm mb-5">
                {formik.errors.name}
              </p>
            )}
          </div>
          <div>
            <label className="font-fontInter text-[#484848]">Enter Email</label>
            <input
              className="w-full px-3 py-2 border rounded-md outline-none mb-4 mt-1"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              type="email"
            />
            {formik.errors.email && formik.touched.email && (
              <p className="font-fontInter text-red-500 text-sm mb-5">
                {formik.errors.email}
              </p>
            )}
          </div>
          <div className="mt-1">
            <label className="font-fontInter text-[#484848]">
              Enter Password
            </label>
            <input
              className="w-full px-3 py-2 border rounded-md outline-none mb-4 mt-1"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              type="password"
            />
            {formik.errors.password && formik.touched.password && (
              <p className="font-fontInter text-red-500 text-sm mb-5">
                {formik.errors.password}
              </p>
            )}
          </div>
          <div className="mt-1">
            <label className="font-fontInter text-[#484848]">
              Enter Confirm Password
            </label>
            <input
              className="w-full px-3 py-2 border rounded-md outline-none mb-4 mt-1"
              name="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              type="password"
            />
            {formik.errors.confirmPassword &&
              formik.touched.confirmPassword && (
                <p className="font-fontInter text-red-500 text-sm mb-5">
                  {formik.errors.confirmPassword}
                </p>
              )}
          </div>
          <button
            disabled={loading}
            className="bg-black text-white w-full font-fontInter text-base border rounded-md py-2 mt-1 mb-4"
          >
            {loading ? <CircleLoader color="#fff" size={20} /> : "Sign Up"}
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
