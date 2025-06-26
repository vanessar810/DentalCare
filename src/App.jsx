import React from 'react'
import Navbar from './components/Navbar';
import Home from './components/Home';
import Patient from './components/Patient';
import Appointments from './components/Appointments';
import Services from './components/Services';

import './App.css'
function App() {
  const [currentPage, setCurrentPage] = React.useState('home');
  const [appointments, setAppointments] = React.useState([]);
  const [patients, setPatients] = React.useState([]);
  // Main render function
  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <Home />;
      case 'patients': return (<Patient
        patients={patients}
        setPatients={setPatients}
      />
      );
      case 'appointments': return (<Appointments
        appointments={appointments}
        setAppointments={setAppointments}
      />
      );
      case 'services': return <Services />;
      default: return <Home />;
    }
  };
  return (
    <div className="min-h-screen flex flex-col justify-between bg-indigo-200 dark:bg-black">
      <Navbar currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <footer className="bg-gray-800 text-white p-6 mt-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2025 DentalCare Clinic. All rights reserved.</p>
          <p className="text-sm text-gray-400 mt-2">Professional dental care for your entire family</p>
        </div>
      </footer>
    </div>
  );
}
export default App;