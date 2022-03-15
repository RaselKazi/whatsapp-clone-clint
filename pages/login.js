import React, { useState, useContext } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useRouter } from "next/router";
import { Store } from "../utils/Store";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsFillEyeSlashFill, BsFillEyeFill } from "react-icons/bs";
export default function login() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loginTab, setLoginTab] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pic, setPic] = useState();
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { state, dispatch } = useContext(Store);

  const SignUpSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!name || !email || !password || !confirmPassword || !pic) {
      setLoading(false);
      toast.warning("Please Fill all the Felids");
      return;
    }
    if (password !== confirmPassword) {
      toast.warning("Passwords Do Not Match");
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        `https://whats-app-c.herokuapp.com/api/user`,
        {
          name,
          email,
          password,
          pic,
        },
        config
      );
      dispatch({ type: "USER_LOGIN", payload: data });
      Cookies.set("userInfo", JSON.stringify(data));
      toast.success("Registration Successful");
      setLoading(false);
      router.push("/");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };
  const postDetails = (pics) => {
    if (pics === undefined) {
      toast.warning("Please Select an Image!");
      return;
    }

    if (
      pics.type === "image/jpeg" ||
      pics.type === "image/jpg" ||
      pics.type === "image/png"
    ) {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "hevn2c15");
      data.append("cloud_name", "dfwtzokma");
      fetch("https://api.cloudinary.com/v1_1/dfwtzokma/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setPic(data.url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      toast.warning("Please Select an Image!");

      return;
    }
  };

  const loginSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!email || !password) {
      toast.warning("Please Fill all the Felids");
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "https://whats-app-c.herokuapp.com/api/user/login",
        { email, password },
        config
      );

      toast.success("Login Successful");
      dispatch({ type: "USER_LOGIN", payload: data });
      Cookies.set("userInfo", JSON.stringify(data));
      setLoading(false);
      router.push("/");
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };
  return (
    <div className=" relative flex items-center justify-center  h-screen w-screen bg-gray-900 overflow-hidden ">
      <div className=" absolute top-10 left-1/12 rounded-lf h-96 w-full  bg-gradient-to-b blur-3xl from-sky-500/5  via-sky-500/25 to-sky-500/5 rotate-45 "></div>
      <div className=" xl:w-2/5 lg:w-3/6 md:w-4/6  sm:w-5/6 w-full   mx-6 transition duration-300 rounded-2xl shadow-2xl bg-gray-500/10 backdrop-blur  z-50  border border-sky-500/30">
        <div className="mt-5 flex justify-center items-center h-12 ">
          <h1 className=" text-sky-500 text-3xl uppercase font-bold tracking-widest">
            {loginTab ? "sign up" : "Login"}
          </h1>
        </div>
        <div className="mt-8 mx-3 grid grid-cols-2 gap-6">
          <button
            className={`w-full py-2 px-4 rounded-full  text-gray-100 text-2xl tracking-wider font-bold  capitalize  transition duration-300 items-center justify-center h-12 bg-gradient-to-t  ${
              loginTab
                ? "border border-dashed  border-sky-500/50 backdrop-blur-2xl "
                : " from-cyan-500 to-blue-800  shadow-xl shadow-cyan-500/30 hover:scale-105 hover:shadow-cyan-500/40"
            }`}
            onClick={() => setLoginTab(false)}
          >
            Login
          </button>

          <button
            className={`w-full py-2 px-4 rounded-full  text-gray-100 text-2xl tracking-wider font-bold  capitalize  transition duration-300 items-center justify-center h-12 bg-gradient-to-t  ${
              loginTab
                ? " from-cyan-500 to-blue-800  shadow-xl shadow-cyan-500/30 hover:scale-105 hover:shadow-cyan-500/40"
                : " border border-dashed  border-sky-500/50 backdrop-blur-2xl "
            }`}
            onClick={() => setLoginTab(true)}
          >
            Sign Up
          </button>
        </div>
        <form className="py-5 px-3">
          {loginTab && (
            <input
              placeholder="Enter Your Name"
              onChange={(e) => setName(e.target.value)}
              required
              className="p-2 px-6  my-3  text-gray-200 w-full bg-gray-800/10 rounded-lg border border-sky-900 focus:outline-none focus:border-sky-600 transition duration-300"
            />
          )}

          <input
            value={email}
            type="email"
            placeholder="Enter Your Email Address"
            onChange={(e) => setEmail(e.target.value)}
            required
            className="p-2 px-6  my-3  text-gray-200 w-full bg-gray-800/10 rounded-lg border border-sky-900 focus:outline-none focus:border-sky-600 transition duration-300"
          />
          <div className=" relative">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              required
              className="p-2 px-6  my-3  text-gray-200 w-full bg-gray-800/10 rounded-lg border border-sky-900 focus:outline-none focus:border-sky-600 transition duration-300"
            />
            <div
              className=" absolute top-1/3 right-4 text-gray-300 text-xl cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
            </div>
          </div>
          {loginTab && (
            <div>
              <div className=" relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="p-2 px-6  my-3  text-gray-200 w-full bg-gray-800/10 rounded-lg border border-sky-900 focus:outline-none focus:border-sky-600 transition duration-300 "
                />
                <div
                  className=" absolute top-1/3 right-4 text-gray-300 text-xl cursor-pointer"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <BsFillEyeSlashFill />
                  ) : (
                    <BsFillEyeFill />
                  )}
                </div>
              </div>
              <div className=" relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => postDetails(e.target.files[0])}
                  className=" file:transition file:duration-300  text-transparent file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-sky-500/30 file:text-base file:font-bold file:bg-gray-500/10 file:text-sky-500
                file:cursor-pointer hover:file:text-white hover:file:bg-sky-500/30 focus:file:outline-none 
                file:backdrop-blur-md"
                />
                <div className=" top-2/4 left-9  absolute bg-sky-400/60 h-4 w-12 rounded-xl blur-md -z-10"></div>
              </div>
            </div>
          )}

          {loginTab ? (
            <button
              type="submit"
              disabled={loading}
              className="mt-8 h-12  w-full py-2 px-4 rounded-md bg-blue-700 text-gray-100 text-xl  uppercase font-semibold  hover:bg-blue-800 transition duration-300  relative disabled:bg-slate-700 disabled:text-gray-100"
              onClick={SignUpSubmitHandler}
            >
              {loading ? (
                <span className="top-1 right-1/2 absolute h-10 w-10 rounded-full border-[6px] border-r-gray-200 border-gray-400  animate-spin"></span>
              ) : (
                <span className=" ">Sign Up</span>
              )}
            </button>
          ) : (
            <div>
              <button
                type="submit"
                disabled={loading}
                className="mt-8 h-12  w-full py-2 px-4 rounded-md bg-blue-700 text-gray-100 text-xl  uppercase font-semibold  hover:bg-blue-800 transition duration-300  relative disabled:bg-slate-700 disabled:text-gray-100"
                onClick={loginSubmitHandler}
              >
                {loading ? (
                  <span className=" top-1 right-1/2 absolute h-10 w-10 rounded-full border-[6px] border-r-gray-200 border-gray-400  animate-spin"></span>
                ) : (
                  <span className=" ">Login</span>
                )}
              </button>
              <div
                onClick={() => {
                  setEmail("guest@example.com");
                  setPassword("123456");
                }}
                className="mt-8 w-full py-2 px-4 rounded-md bg-red-500/70 text-gray-100 text-xl  uppercase font-semibold  hover:bg-red-700 transition duration-300 relative text-center cursor-pointer"
              >
                Get Guest User
              </div>
            </div>
          )}
        </form>
      </div>
      <ToastContainer limit={2} />
    </div>
  );
}
