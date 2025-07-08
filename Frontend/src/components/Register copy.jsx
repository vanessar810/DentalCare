  import React from 'react'
  import { useOutletContext } from 'react-router-dom';

  const Patient = ({ patients, setPatients }) => {
    const [newPatient, setNewPatient] = React.useState({
      name: '',
      email: '',
      phone: '',
      dateOfBirth: ''
    });

    const handleAddPatient = (e) => {
      e.preventDefault();
      if (newPatient.name && newPatient.email) {
        setPatients([...patients, { ...newPatient, id: Date.now() }]);
        setNewPatient({ name: '', email: '', phone: '', dateOfBirth: '' });
      }
    };

    return (
      <div className="container mx-auto p-6">
        <h2 className="text-3xl font-bold mb-6 dark:text-white">User Management</h2>
        
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-800">
            <h3 className="text-xl font-semibold mb-4 dark:text-neutral-400">Add New Patient</h3>
            <form onSubmit={handleAddPatient} className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                value={newPatient.name}
                onChange={(e) => setNewPatient({...newPatient, name: e.target.value})}
                className="w-full p-3 border rounded-lg dark:bg-gray-300 dark:text-blue-800"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={newPatient.email}
                onChange={(e) => setNewPatient({...newPatient, email: e.target.value})}
                className="w-full p-3 border rounded-lg dark:bg-gray-300"
                required
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={newPatient.phone}
                onChange={(e) => setNewPatient({...newPatient, phone: e.target.value})}
                className="w-full p-3 border rounded-lg dark:bg-gray-300"
              />
              <input
                type="date"
                placeholder="Date of Birth"
                value={newPatient.dateOfBirth}
                onChange={(e) => setNewPatient({...newPatient, dateOfBirth: e.target.value})}
                className="w-full p-3 border rounded-lg dark:bg-gray-300"
              />
              <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 dark:text-neutral-400">
                Add Patient
              </button>
            </form>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-800">
            <h3 className="text-xl font-semibold mb-4 dark:text-neutral-400">Patient List</h3>
            <div className="space-y-3">
              {(!patients || patients.length === 0)? (
                <p className="text-gray-500 dark:text-neutral-400">No patients registered yet.</p>
              ) : (
                patients.map(patient => (
                  <div key={patient.id} className="p-3 border rounded-lg">
                    <h4 className="font-semibold dark:text-neutral-400">{patient.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-neutral-400">{patient.email}</p>
                    <p className="text-sm text-gray-600 dark:text-neutral-400">{patient.phone}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };
  export default Patient