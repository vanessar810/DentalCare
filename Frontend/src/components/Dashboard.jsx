import React, { useState } from 'react';
import { Calendar, User, Settings, Clock, FileText, ChevronRight, Bell, Edit } from 'lucide-react';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');

    // Sample data - in a real app, this would come from props or API
    const userData = {
        role: 'Senior Software Engineer',
        name: 'Alex Johnson',
        email: 'alex.johnson@company.com',
        phone: '+1 (555) 123-4567',
        department: 'Engineering',
        joinDate: '2022-03-15',
        location: 'San Francisco, CA'
    };

    const appointments = [
        { id: 1, title: 'Team Standup', date: '2025-07-11', time: '09:00 AM', type: 'meeting' },
        { id: 2, title: 'Client Review', date: '2025-07-11', time: '02:00 PM', type: 'client' },
        { id: 3, title: 'Performance Review', date: '2025-07-14', time: '10:00 AM', type: 'hr' },
        { id: 4, title: 'Project Planning', date: '2025-07-15', time: '11:00 AM', type: 'meeting' }
    ];

    const services = [
        { name: 'Health Insurance', status: 'Active', renewal: '2025-12-31' },
        { name: 'Parking Access', status: 'Active', renewal: '2025-08-15' },
        { name: 'IT Support', status: 'Active', renewal: 'Ongoing' },
        { name: 'Learning Platform', status: 'Active', renewal: '2025-11-30' }
    ];

    const history = [
        { id: 1, action: 'Profile Updated', date: '2025-07-10', details: 'Updated contact information' },
        { id: 2, action: 'Appointment Scheduled', date: '2025-07-08', details: 'Client Review meeting' },
        { id: 3, action: 'Service Activated', date: '2025-07-01', details: 'Learning Platform access granted' },
        { id: 4, action: 'Document Uploaded', date: '2025-06-28', details: 'Performance review documents' }
    ];

    const getAppointmentColor = (type) => {
        switch (type) {
            case 'meeting': return 'bg-blue-100 text-blue-800';
            case 'client': return 'bg-green-100 text-green-800';
            case 'hr': return 'bg-purple-100 text-purple-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getServiceStatus = (status) => {
        return status === 'Active'
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800';
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Bell className="w-6 h-6 text-gray-500 hover:text-gray-700 cursor-pointer" />
                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                                    {userData.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <span className="text-sm font-medium text-gray-700">{userData.name}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Role and Quick Stats */}
                <div className="mb-8">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-bold mb-2">Welcome back, {userData.name.split(' ')[0]}!</h2>
                                <p className="text-blue-100 text-lg">{userData.role}</p>
                                <p className="text-blue-100 text-sm">{userData.department}</p>
                            </div>
                            <div className="text-right">
                                <div className="text-3xl font-bold">{appointments.length}</div>
                                <div className="text-blue-100 text-sm">Upcoming Appointments</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navigation Tabs */}
                <div className="mb-6">
                    <div className="border-b border-gray-200">
                        <nav className="-mb-px flex space-x-8">
                            {[
                                { id: 'overview', label: 'Overview', icon: User },
                                { id: 'appointments', label: 'Appointments', icon: Calendar },
                                { id: 'services', label: 'Services', icon: Settings },
                                { id: 'history', label: 'History', icon: Clock }
                            ].map(({ id, label, icon: Icon }) => (
                                <button
                                    key={id}
                                    onClick={() => setActiveTab(id)}
                                    className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${activeTab === id
                                            ? 'border-blue-500 text-blue-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }`}
                                >
                                    <Icon className="w-4 h-4" />
                                    <span>{label}</span>
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>

                {/* Tab Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {activeTab === 'overview' && (
                        <>
                            {/* Personal Information */}
                            <div className="lg:col-span-2">
                                <div className="bg-white rounded-lg shadow p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
                                        <Edit className="w-5 h-5 text-gray-400 hover:text-gray-600 cursor-pointer" />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-500">Full Name</label>
                                            <p className="mt-1 text-sm text-gray-900">{userData.name}</p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-500">Email</label>
                                            <p className="mt-1 text-sm text-gray-900">{userData.email}</p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-500">Phone</label>
                                            <p className="mt-1 text-sm text-gray-900">{userData.phone}</p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-500">Department</label>
                                            <p className="mt-1 text-sm text-gray-900">{userData.department}</p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-500">Join Date</label>
                                            <p className="mt-1 text-sm text-gray-900">{new Date(userData.joinDate).toLocaleDateString()}</p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-500">Location</label>
                                            <p className="mt-1 text-sm text-gray-900">{userData.location}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Actions */}
                            <div>
                                <div className="bg-white rounded-lg shadow p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                                    <div className="space-y-3">
                                        <button className="w-full flex items-center justify-between p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                                            <span className="text-sm font-medium text-blue-900">Schedule Appointment</span>
                                            <ChevronRight className="w-4 h-4 text-blue-600" />
                                        </button>
                                        <button className="w-full flex items-center justify-between p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                                            <span className="text-sm font-medium text-green-900">Update Profile</span>
                                            <ChevronRight className="w-4 h-4 text-green-600" />
                                        </button>
                                        <button className="w-full flex items-center justify-between p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                                            <span className="text-sm font-medium text-purple-900">View Documents</span>
                                            <ChevronRight className="w-4 h-4 text-purple-600" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {activeTab === 'appointments' && (
                        <div className="lg:col-span-3">
                            <div className="bg-white rounded-lg shadow">
                                <div className="p-6 border-b border-gray-200">
                                    <h3 className="text-lg font-semibold text-gray-900">Upcoming Appointments</h3>
                                </div>
                                <div className="divide-y divide-gray-200">
                                    {appointments.map((appointment) => (
                                        <div key={appointment.id} className="p-6 hover:bg-gray-50">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-4">
                                                    <div className="flex-shrink-0">
                                                        <Calendar className="w-5 h-5 text-gray-400" />
                                                    </div>
                                                    <div>
                                                        <h4 className="text-sm font-medium text-gray-900">{appointment.title}</h4>
                                                        <p className="text-sm text-gray-500">
                                                            {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                                                        </p>
                                                    </div>
                                                </div>
                                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getAppointmentColor(appointment.type)}`}>
                                                    {appointment.type}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'services' && (
                        <div className="lg:col-span-3">
                            <div className="bg-white rounded-lg shadow">
                                <div className="p-6 border-b border-gray-200">
                                    <h3 className="text-lg font-semibold text-gray-900">Active Services</h3>
                                </div>
                                <div className="divide-y divide-gray-200">
                                    {services.map((service, index) => (
                                        <div key={index} className="p-6 hover:bg-gray-50">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h4 className="text-sm font-medium text-gray-900">{service.name}</h4>
                                                    <p className="text-sm text-gray-500">Renewal: {service.renewal}</p>
                                                </div>
                                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getServiceStatus(service.status)}`}>
                                                    {service.status}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'history' && (
                        <div className="lg:col-span-3">
                            <div className="bg-white rounded-lg shadow">
                                <div className="p-6 border-b border-gray-200">
                                    <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                                </div>
                                <div className="divide-y divide-gray-200">
                                    {history.map((item) => (
                                        <div key={item.id} className="p-6 hover:bg-gray-50">
                                            <div className="flex items-start space-x-4">
                                                <div className="flex-shrink-0">
                                                    <FileText className="w-5 h-5 text-gray-400" />
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="text-sm font-medium text-gray-900">{item.action}</h4>
                                                    <p className="text-sm text-gray-500">{item.details}</p>
                                                    <p className="text-xs text-gray-400 mt-1">
                                                        {new Date(item.date).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;