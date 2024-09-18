import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../images/download.jpg";
import { handleSuccess } from "../utils";
import { Link } from "react-scroll";

export default function Navbar() {
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState("");
  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
  }, []);

  const handleLogout = (e) => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    handleSuccess("User Loggedout");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };
  return (
    <nav className="bg-custom-gradient p-2 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <img src={logo} alt="User Avatar" className="w-8 h-8 rounded-full" />
        <Link to="/" className="text-white  no-underline text-lg font-semibold">
          Home
        </Link>
        <Link
          to="about"
          className="text-white no-underline hover:text-white"
        >
          About
        </Link>
        <Link
          to="service"
          className="text-white no-underline hover:text-white"
        >
          Services
        </Link>


      </div>
      <div className="flex items-center space-x-4">
        <input
          type="search"
          placeholder="Search"
          className="bg-white text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <span className="text-white ">Welcome :{loggedInUser}</span>
        <button   className="bg-[#555555] text-white font-bold py-2 px-4 rounded hover:bg-[#666666] focus:outline-none focus:ring-2 focus:ring-indigo-400"
 onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}
