import React, { useState } from 'react';
import { Users, UserCheck, Calendar } from 'lucide-react';
import TabNavigation from '../components/TabNavigation';
import EntityManager from '../components/EntityManager';
const DashboardAdmin = () => {
    const [currentView, setCurrentView] = useState('dashboard');

    const tabs = [
        { id: 'patient', label: 'Patients', icon: Users },
        { id: 'odontologist', label: 'Odontologists', icon: UserCheck },
        { id: 'appointment', label: 'Appointments', icon: Calendar },
    ];

    const navigateToEntity = (entityType) => {
        setCurrentView(entityType);
    };

    const backToDashboard = () => {
        setCurrentView('dashboard');
    };

    const renderContent = () => {
        if (currentView === 'dashboard') {
            return (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {tabs.map(({ id, label, icon: Icon }) => (
                        <div
                            key={id}
                            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer dark:bg-gray-800"
                            onClick={() => navigateToEntity(id)}
                        >
                            <div className="flex items-center gap-4">
                                <div className="bg-blue-100 p-3 rounded-lg">
                                    <Icon className="text-blue-600" size={24} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold">{label}</h3>
                                    <p className="">Manage {label.toLowerCase()}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            );
        }
        return (
            <div className="min-h-screen p-6">
                <div className="max-w-7xl mx-auto">
                    <EntityManager
                        entityType={currentView}
                        onBack={backToDashboard}
                    />
                </div>
            </div>
        );
    };
    return (
        <div className="min-h-screen p-6 ">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold">Dental Clinic Admin</h1>
                    <p className="mt-2">Manage patients, odontologists, and appointments</p>
                </div>

                <TabNavigation
                    activeTab={currentView}
                    onTabChange={navigateToEntity}
                    tabs={tabs}
                />
            {renderContent()}
            </div>
        </div>
    );
};
export default DashboardAdmin