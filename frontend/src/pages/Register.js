// import React, { useState } from "react";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { HideLoading, ShowLoading } from "../redux/alertsSlice";
// import toast from "react-hot-toast";

// function Register() {
//     const navigate= useNavigate();
//     const dispatch = useDispatch()
//     const [user , setuser]=  useState({
//         name: "",
//         email: "",
//         password: "",
//     });
//     const register = async()=>{
//         try {
//             dispatch(ShowLoading())
//            const response = await axios.post("/api/users/register", user);
//            dispatch(HideLoading())
//            if (response.data.success) {
//             toast.success(response.data.message);
//             navigate("/login")
//            }else{
//             toast.error(response.data.message);

//            }
//         } catch (error) {
//             toast.error('something went wrong');
//             dispatch(HideLoading());
//             console.log(error);
//         }
//     };
//     return(
//         <div className= "min-h-screen flex items-center justify-center">
//             <div className='flex flex-col gap-3 w-96 p-5 shadow border border-gray-300'>
//                 <h1 className="text-3xl font-bold text-gray-700">welcome to sheymusic</h1>
//                 <hr/>
//                 <input type="text" placeholder='Name'
//                 value={user.name}
//                 onChange={(e) => setuser({...user, name: e.target.value})}
//                 />
//                 <input type="text" placeholder='Email'
//                 value={user.email}
//                 onChange={(e) => setuser({...user, email: e.target.value})}
//                 />
//                 <input type="text" placeholder='Password'
//                 value={user.password}
//                 onChange={(e) => setuser({...user, password: e.target.value})}
//                 />
//                 <button className="primary" onClick={Register}>Register</button>
//                 <Link to="/Login" className= 'text-gray-600-underline'>Click Here To Login</Link>
//             </div>
//         </div>
//     );
// }

// export default Register

import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";
import toast from "react-hot-toast";

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const register = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post(
        `${window.location.origin}/api/users/register`,
        user
      );
      dispatch(HideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
      dispatch(HideLoading());
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div>
        <img
          className="h-[500px]"
          src="https://media.istockphoto.com/id/1338616288/vector/girl-listening-music-to-relax-using-earphone-to-listen-relaxing-music-with-closed-eyes.jpg?s=612x612&w=0&k=20&c=4mwxcOaiHldwYY0Cn_aMKrtoQ3ELQabTZQdM2M99MxA="
        />
      </div>
      <div className="flex flex-col gap-5 w-96 p-5 ">
        <h1 className="text-3xl font-bold text-secondary">welcome Back</h1>
        <hr />
        {/* <input type="text" placeholder='Name' 
              value={user.name}
              onChange={(e) => setuser({...user, name: e.target.value})}
              /> */}
        <input
          type="text"
          placeholder="Name"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="Password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <button className="primary bg-primary" onClick={register}>
          Register
        </button>
        <Link to="/login" className="text-secondary underline ">
          already Registered? Click Here To Login
        </Link>
      </div>
    </div>
  );
}

export default Register;
