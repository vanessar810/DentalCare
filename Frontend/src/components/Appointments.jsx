    import React, { useState } from 'react'
  // Appointments page component
  const Appointments = ({ appointments, setAppointments }) => {
    const [newAppointment, setNewAppointment] =  React.useState({
      patientName: '',
      date: '',
      time: '',
      service: '',
      notes: ''
    });

    const handleAddAppointment = (e) => {
      e.preventDefault();
      if (newAppointment.patientName && newAppointment.date && newAppointment.time) {
        setAppointments([...appointments, { ...newAppointment, id: Date.now() }]);
        setNewAppointment({ patientName: '', date: '', time: '', service: '', notes: '' });
      }
    };

    return (
      <div className="container mx-auto p-6">
        <h2 className="text-3xl font-bold mb-6">Appointment Management</h2>
        
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-800 dark:text-neutral-400">
            <h3 className="text-xl font-semibold mb-4">Schedule Appointment</h3>
            <form onSubmit={handleAddAppointment} className="space-y-4">
              <input
                type="text"
                placeholder="Patient Name"
                value={newAppointment.patientName}
                onChange={(e) => setNewAppointment({...newAppointment, patientName: e.target.value})}
                className="w-full p-3 border rounded-lg dark:bg-gray-300"
                required
              />
              <input
                type="date"
                value={newAppointment.date}
                onChange={(e) => setNewAppointment({...newAppointment, date: e.target.value})}
                className="w-full p-3 border rounded-lg dark:bg-gray-300"
                required
              />
              <input
                type="time"
                value={newAppointment.time}
                onChange={(e) => setNewAppointment({...newAppointment, time: e.target.value})}
                className="w-full p-3 border rounded-lg dark:bg-gray-300"
                required
              />
              <select
                value={newAppointment.service}
                onChange={(e) => setNewAppointment({...newAppointment, service: e.target.value})}
                className="w-full p-3 border rounded-lg dark:bg-gray-300" 
              >
                <option value="">Select Service</option>
                <option value="cleaning">Dental Cleaning</option>
                <option value="filling">Filling</option>
                <option value="extraction">Tooth Extraction</option>
                <option value="checkup">General Checkup</option>
                <option value="orthodontics">Orthodontics</option>
              </select>
              <textarea
                placeholder="Notes"
                value={newAppointment.notes}
                onChange={(e) => setNewAppointment({...newAppointment, notes: e.target.value})}
                className="w-full p-3 border rounded-lg dark:bg-gray-300"
                rows="3"
              />
              <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700">
                Schedule Appointment
              </button>
            </form>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-800 dark:text-neutral-400">
            <h3 className="text-xl font-semibold mb-4">Upcoming Appointments</h3>
            <div className="space-y-3">
              {appointments.length === 0 ? (
                <p className="text-gray-500">No appointments scheduled.</p>
              ) : (
                appointments.map(appointment => (
                  <div key={appointment.id} className="p-3 border rounded-lg">
                    <h4 className="font-semibold">{appointment.patientName}</h4>
                    <p className="text-sm text-gray-600 dark:text-neutral-400">{appointment.date} at {appointment.time}</p>
                    <p className="text-sm text-gray-600 dark:text-neutral-400">{appointment.service}</p>
                    {appointment.notes && <p className="text-sm text-gray-500 dark:text-neutral-400">{appointment.notes}</p>}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
export default Appointments