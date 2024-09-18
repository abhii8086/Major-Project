import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 h-30">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h2 className="text-xl font-semibold mb-4">Geo Assist</h2>
            <p className="text-white-600">
              “Our Commitment to Quality Services: At our core, we’re dedicated
              to delivering high-quality services that truly matter. Our focus
              is on creating value for our customers. For more details, feel
              free to get in touch with us. 🌟” Remember, concise yet impactful
              communication often leaves a lasting impression! If you need
              further assistance or have any other requests, don’t hesitate to
              ask. 😊
            </p>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
            <ul className="space-y-2 ">
              <li>
                <Link
                  to="#"
                  className="text-white no-underline	 hover:text-white"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-white no-underline hover:text-white"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-white no-underline  hover:text-white"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-white no-underline hover:text-white"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/3">
            <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
            <p className="text-white-400">
              Panvel, new Mumbai, Maharashtra, 4000
            </p>
            <p className="text-white-400">Email: www.geoassist.com</p>
            <p className="text-white-400">Phone: (123) 456-7890</p>
          </div>
        </div>
        <div className=" border-t border-gray-700 text-center">
          <p className=" text-white text-center pt-4">
            &copy; 2024 Geo Assist. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
