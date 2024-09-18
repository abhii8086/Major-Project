import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Carousel.css"; 

const Carousel = () => {
  const settings = {
    dots: true, // Show navigation dots
    infinite: true, // Loop slides infinitely
    speed: 200, // Transition speed in milliseconds
    slidesToShow: 1, // Show one slide at a time
    slidesToScroll: 1, // Scroll one slide at a time
    autoplay: true, // Enable auto-slide
    autoplaySpeed: 3000, // Auto-slide every 3 seconds
  };

  return (
    <div className="w-full bg-gray-300 my-3 px-3 py-1 rounded-md flex items-stretch">
      <div className="w-full max-w-7xl mx-auto ">
        <Slider {...settings}>
          <div>
            <img
              src="https://img.freepik.com/free-photo/high-angle-shot-bandra-worli-sealink-mumbai-enveloped-with-fog_181624-17180.jpg?t=st=1725204213~exp=1725207813~hmac=22658e504fbb7f367341b24a116d470c6beef3b162f62206153e067fe9b44e23&w=996"
              alt="Slide 1"
              className="w-full h-72 object-cover"
            />
          </div>
          <div>
            <img
              src="https://cdn.britannica.com/26/84526-050-45452C37/Gateway-monument-India-entrance-Mumbai-Harbour-coast.jpg"
              alt="Slide 2"
              className="w-full h-72 object-cover"
            />
          </div>
          <div>
            <img
              src="https://www.arabnews.com/sites/default/files/styles/n_670_395/public/2020/03/21/2021006-1895800595.jpg?itok=2TirUg8u"
              alt="Slide 3"
              className="w-full h-72 object-cover"
            />
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default Carousel;
