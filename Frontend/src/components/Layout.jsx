import { Outlet } from 'react-router-dom';
import React from 'react';
import Navbar from './Navbar';

function Layout() {
    const [users, setUsers] = React.useState([]);
    const [appointments, setAppointments] = React.useState([]);
    return (
        <div className="min-h-screen flex flex-col justify-between bg-indigo-200 dark:bg-black">
            <Navbar />
            <main className="flex-grow">
                <Outlet context={{ users, setUsers, appointments, setAppointments }} />
            </main>
            <footer className="bg-gray-800 text-white p-6 mt-8">
                <div className="container mx-auto text-center">
                    <p>&copy; 2025 DentalCare Clinic. All rights reserved.</p>
                    <p className="text-sm text-gray-400 mt-2">
                        Professional dental care for your entire family
                    </p>
                </div>
            </footer>
        </div>
    );
}

export default Layout;