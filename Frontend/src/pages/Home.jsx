  import React from 'react'
  // Home page component
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
    </div>
  );
    export default Home