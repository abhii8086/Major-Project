import React, { useEffect, useState } from "react";
import axios from "axios";
import logo from "../images/download.jpg";

const About = () => {
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get("http://localhost:5000/scatterplot", {
          responseType: "blob", // important to specify response type as blob
        });

        // Create a local URL for the image blob
        const imageUrl = URL.createObjectURL(response.data);
        setImageSrc(imageUrl);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchImage();
  }, []);

  return (
    <>
      <div
        id="about"
        className="w-full h-screen bg-gray-300 my-3 px-3 py-1 rounded-md flex items-stretch border border-black"
      >
        <div className="flex-2  p-4">
          <h1 className="text-2xl font-bold mb-4">About us</h1>
          <p className="text-gray-700">
            Whether you're a developer, a business owner, or someone looking for
            a new home, Geo Assist is here to help. Let's explore what we offer:
          </p>
          <ul className="list-disc pl-6 mt-4">
            <li>
              <span className="font-semibold">Developers:</span> Dive into our
              geolocation APIs and SDKs. Build location-aware applications,
              track assets, and enhance user experiences with accurate location
              data.
            </li>
            <li>
              <span className="font-semibold">Businesses:</span> Leverage our
              geospatial insights. Optimize supply chains, analyze market
              trends, and make data-driven decisions based on location
              intelligence.
            </li>
            <li>
              <span className="font-semibold">Home Seekers:</span> Discover
              neighborhoods, commute times, and local amenities. Use our maps to
              find your dream home or explore investment opportunities.
            </li>
          </ul>
          <p className="mt-4 text-gray-700">
            Geo Assist is your compass in the world of geospatial information.
            Let's navigate together!
          </p>
        </div>
        <div className="flex-none w-1/3 relative ">
          <img
            src={imageSrc}
            alt="Geo Assist"
            className="w-[100%] h-[90%] object-cover rounded-md shadow-lg absolute inset-0"
          />
        </div>
      </div>
    </>
  );
};

export default About;
