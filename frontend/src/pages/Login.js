import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";
import { toast } from "react-toastify";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setuser] = useState({
    email: "",
    password: "",
  });
  const login = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post(
        `${window.location.origin}/api/users/Login`,
        user
      );
      dispatch(HideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem("token", response.data.data);
        navigate("/");
      } else {
        toast.error(response.data.message);
        alert(response.data.message);
      }
    } catch (error) {
      toast.error("something went wrong");
      dispatch(HideLoading());
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col gap-5 w-96 p-5 ">
        <h1 className="text-3xl font-bold text-secondary">welcome Back</h1>
        <hr />
        <input
          type="text"
          placeholder="Email"
          value={user.email}
          onChange={(e) => setuser({ ...user, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={user.password}
          onChange={(e) => setuser({ ...user, password: e.target.value })}
        />
        <button className="primary bg-primary" onClick={login}>
          Login
        </button>
        <Link to="/register" className="text-secondary underline ">
          Not yet Registered? Click Here To Register
        </Link>
      </div>
      <div>
        <img
          className="h-[500px]"
          src="https://media.istockphoto.com/id/1338616288/vector/girl-listening-music-to-relax-using-earphone-to-listen-relaxing-music-with-closed-eyes.jpg?s=612x612&w=0&k=20&c=4mwxcOaiHldwYY0Cn_aMKrtoQ3ELQabTZQdM2M99MxA="
        />
      </div>
    </div>
  );
}

export default Login;
