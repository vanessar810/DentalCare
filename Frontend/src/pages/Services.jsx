  import React from 'react'
// Services page component
  const Services = () => (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-blue-900 dark:text-neutral-400">Our Services</h2>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-800">
          <i className="fas fa-tooth text-3xl text-blue-900 mb-4"></i>
          <h3 className="text-xl font-semibold mb-2 dark:text-neutral-400">General Dentistry</h3>
          <p className="text-gray-600 mb-4 dark:text-neutral-400">Routine cleanings, fillings, and preventive care to maintain oral health.</p>
          <p className="text-blue-600 font-semibold">Starting at $80</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-800">
          <i className="fas fa-smile text-3xl text-blue-900 mb-4"></i>
          <h3 className="text-xl font-semibold mb-2 dark:text-neutral-400">Cosmetic Dentistry</h3>
          <p className="text-gray-600 mb-4 dark:text-neutral-400">Teeth whitening, veneers, and smile makeovers for aesthetic enhancement.</p>
          <p className="text-blue-600 font-semibold">Starting at $200</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-800">
          <i className="fas fa-cut text-3xl text-blue-900 mb-4"></i>
          <h3 className="text-xl font-semibold mb-2 dark:text-neutral-400">Oral Surgery</h3>
          <p className="text-gray-600 mb-4 dark:text-neutral-400">Tooth extractions, wisdom teeth removal, and surgical procedures.</p>
          <p className="text-blue-600 font-semibold">Starting at $150</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-800">
          <i className="fas fa-align-center text-3xl text-blue-900 mb-4"></i>
          <h3 className="text-xl font-semibold mb-2 dark:text-neutral-400">Orthodontics</h3>
          <p className="text-gray-600 mb-4 dark:text-neutral-400">Braces, aligners, and teeth straightening treatments.</p>
          <p className="text-blue-600 font-semibold">Starting at $3000</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-800">
          <i className="fas fa-crown text-3xl text-blue-900 mb-4"></i>
          <h3 className="text-xl font-semibold mb-2 dark:text-neutral-400">Restorative Dentistry</h3>
          <p className="text-gray-600 mb-4 dark:text-neutral-400">Crowns, bridges, and implants to restore damaged teeth.</p>
          <p className="text-blue-600 font-semibold">Starting at $500</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-800">
          <i className="fas fa-child text-3xl text-blue-900 mb-4 dark:text-neutral-400"></i>
          <h3 className="text-xl font-semibold mb-2">Pediatric Dentistry</h3>
          <p className="text-gray-600 mb-4 dark:text-neutral-400">Specialized dental care for children and adolescents.</p>
          <p className="text-blue-600 font-semibold">Starting at $60</p>
        </div>
      </div>
    </div>
  )

    export default Services