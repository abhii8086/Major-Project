import React, { useEffect, useState } from "react";
import { handleError } from "../utils";
import { ToastContainer } from "react-toastify";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Carousel from "../components/Carousel";
import About from "./About";
import Service from "./Service";
import Map from '../components/Map'

function Home() {
  const [userProfile, setUserProfile] = useState("");
  const fetchUserProfile = async () => {
    try {
      const url = "http://localhost:5000/api/v1/user";
      const headers = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      const response = await fetch(url, headers);
      if (!response.ok) {
        // Handle different error statuses if needed
        throw new Error("Profile not found or unauthorized");
      }
      const result = await response.json();
      // Assuming you have a state setter like setUserProfile:
      setUserProfile(result.profile); // Adjust the state variable to your use case
    } catch (err) {
      handleError(err);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <div>
      <Navbar />
      <Carousel />
      <Map />
      <About />
      <Service/>
      <ToastContainer />
      <Footer />
    </div>
  );
}

export default Home;
