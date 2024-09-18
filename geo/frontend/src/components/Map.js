import React, { useEffect, useState } from "react";
import axios from "axios";

function MapWithHotels() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/clusters")
      .then((response) => {
        const data = response.data;
        console.log("Response Data:", data);
        console.log("Type of Data:", typeof data);

        if (Array.isArray(data)) {
          setData(data);
        } else {
          console.error("Expected an array but received:", data);
          setData([]); // Set an empty array to avoid errors in rendering
        }
      })
      .catch((error) => {
        console.error(
          "Error fetching clusters:",
          error.response ? error.response.data : error.message
        );
        setError(error);
      });
  }, []);

  return (
    <div className="flex pt-2">
      {/* Hotel Listing Section */}
      <div className="w-1/4 px-2 bg-gray-100 min-h-screen overflow-y-auto" style={{ maxHeight: 'calc(3 * 8rem + 2rem)' }}>
        {data.map((item) => (
          <div
            key={item.id}
            className="relative flex flex-col w-full max-w-xs mb-4 bg-white rounded-lg shadow-md overflow-hidden"
            style={{ height: '8rem' }} // Adjust height to fit card design
          >
            <img
              src={item.Featured_image}
              alt={item.Featured_image}
              className="h-32 w-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-transparent to-transparent text-white p-2">
            <p className="text-xs font-medium text-yellow-300 m-0">{item.Average_Rating} ★</p>
              <h2 className="text-sm font-semibold">{item.Name}</h2>
         
            </div>
          </div>
        ))}
      </div>

      {/* Map Section */}
      <div className="flex-1">
        <div className="w-full h-full">
          <iframe
            src="http://localhost:5000/map"
            width="100%"
            height="600px"
            title="Map"
            className="border w-full h-full"
          ></iframe>
        </div>
        {error && <p className="text-red-500">Error: {error.message}</p>}
      </div>
    </div>
  );
}

export default MapWithHotels;
