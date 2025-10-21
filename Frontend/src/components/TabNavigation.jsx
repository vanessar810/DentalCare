
const TabNavigation = ({ tabs, activeTab, onTabChange }) => {

    return (
        <div className="flex gap-4 mb-6 ">
            {tabs.map(({ id, label, icon: Icon }) => (
                <button
                    key={id}
                    onClick={() => onTabChange(id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === id ? 'bg-blue-600 text-white ' : 'bg-gray-100 dark:bg-gray-800'
                        }`}
                >
                    <Icon size={18} />
                    {label}
                </button>
            ))}
        </div>
    );
};
export default TabNavigation