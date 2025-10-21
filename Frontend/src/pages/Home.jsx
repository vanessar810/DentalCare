import React from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
// Home page component
const images = ["/1.jpg", "/2.jpg", "/3.jpg", "/4.jpeg", "/5.jpg", "/6.jpg", "/7.jpeg", "/8.png"]
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3, 
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};
const Home = () => (
  <div className="container mx-auto p-6">
    <div className="text-center mb-8 ">
      <h2 className="text-4xl font-bold text-gray-800 mb-4 dark:text-neutral-400">Welcome to DentalCare Clinic</h2>
      <p className="text-xl text-gray-600 dark:text-neutral-400">Professional dental care for your entire family</p>
    </div>

    <div className="grid md:grid-cols-3 gap-6 mb-8 ">
      <div className="bg-indigo-300 p-6 rounded-lg shadow-md dark:bg-gray-800">
        <i className="fas fa-tooth text-4xl text-blue-600 mb-4"></i>
        <h3 className="text-xl font-semibold mb-2 dark:text-neutral-400">General Dentistry</h3>
        <p className="text-gray-600 dark:text-neutral-400">Comprehensive dental care including cleanings, fillings, and preventive treatments.</p>
      </div>
      <div className="bg-indigo-300 p-6 rounded-lg shadow-md dark:bg-gray-800">
        <i className="fas fa-user-md text-4xl text-blue-600 mb-4"></i>
        <h3 className="text-xl font-semibold mb-2 dark:text-neutral-400">Specialized Care</h3>
        <p className="text-gray-600 dark:text-neutral-400">Expert orthodontics, oral surgery, and cosmetic dentistry services.</p>
      </div>
      <div className="bg-indigo-300 p-6 rounded-lg shadow-md dark:bg-gray-800">
        <i className="fas fa-calendar-alt text-4xl text-blue-600 mb-4"></i>
        <h3 className="text-xl font-semibold mb-2 dark:text-neutral-400">Easy Scheduling</h3>
        <p className="text-gray-600 dark:text-neutral-400">Convenient online appointment booking and flexible scheduling options.</p>
      </div>
    </div>
    <div className="max-w-4xl mx-auto p-4">
      <Carousel
      responsive={responsive}
      infinite
      autoPlay
      autoPlaySpeed={2000}
      arrows={true}
      showDots={false}
      containerClass="carousel-container"
      itemClass="p-2"
      >
      {images.map((src, i) => (
        <div key={i} className="rounded-xl overflow-hidden shadow-lg">
          <img src={src} alt={`Imagen ${i + 1}`} className="w-full h-64 object-cover" />
        </div>
      ))}
    </Carousel>

  </div>
  </div >
);
export default Home