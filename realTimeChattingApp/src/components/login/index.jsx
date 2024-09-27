import { useFormik } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../validation/Validation";
import CircleLoader from "react-spinners/CircleLoader";
import {
  getAuth,
  signInWithEmailAndPassword,
  updatePassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { LoggedInUser } from "../../features/slices/loginSlice";

const LoginFormComponent = ({ toast }) => {
  const auth = getAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const initialValues = {
    email: "",
    password: "",
  };
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: () => {
      signInUser();
    },
    validationSchema: login,
  });
  const signInUser = () => {
    setLoading(true);
    signInWithEmailAndPassword(
      auth,
      formik.values.email,
      formik.values.password
    )
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        if (user.emailVerified) {
          dispatch(LoggedInUser(user));
          localStorage.setItem("user", JSON.stringify(user.uid));
          toast.success("Successfully Loggedin", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          navigate("/");
        } else {
          toast.error("Please verify your email", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          let redirect;
          clearTimeout(redirect);
          redirect = setTimeout(() => {
            navigate("/login");
          }, 2000);
          setLoading(false);
        }
        setLoading(false);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorMessage.includes("auth/invalid-credential")) {
          toast.error("", {
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
  const handleForGotPassword = () => {
    if (formik.values.email.length <= 0) {
      toast.error("Please provide email", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    sendPasswordResetEmail(auth, formik.values.email)
      .then(() => {
        toast.info("password reset link sent to your email", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorMessage == "Firebase: Error (auth/invalid-email).")
          toast.info("email is not valid", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
      });
  };
  return (
    <>
      <div className="w-5/6">
        <form onSubmit={formik.handleSubmit}>
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
              className="w-full px-3 py-2 border rounded-md outline-none mb-4 mt-2"
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
          <button
            disabled={loading}
            className="bg-black text-white w-full font-fontInter text-base border rounded-md py-2 mt-1 mb-4"
          >
            {loading ? <CircleLoader color="#fff" size={20} /> : "Sign In"}
          </button>
          <p
            className="underline text-[#4A4A4A] mt-4 font-fontInter cursor-pointer"
            onClick={handleForGotPassword}
          >
            forgot password?
          </p>
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
