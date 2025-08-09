import { Pencil, Trash2 } from "lucide-react";
const DataTable = ({ entityType, data, loading, onEdit, onDelete }) => {
    if (loading) {
        return (
            <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (data.length === 0) {
        return (
            <div className="text-center py-12 text-gray-500">
                No {entityType} found. Create your first one!
            </div>
        );
    }
    const tableConfigs = {
        patient: {
            headers: ['ID', 'Name', 'Email', 'DNI', 'Date of Birth', 'Address', 'Actions'],
            renderRow: (item) => {
                return [
                item.id,
                `${item.name || ''} ${item.lastname || ''}`.trim() || 'N/A',
                item.email || 'N/A',
                item.dni || 'N/A',
                item.birthDate || 'N/A',
                item.address ?
                    `${item.address.street || ''} ${item.address.number || ''} ${item.address.neighborhood || ''}`.trim() || 'N/A'
                    : 'N/A',
            ]
        }
    },
        odontologist: {
            headers: ['ID', 'Name', 'License', 'Phone', 'Email', 'Actions'],
            renderRow: (item) => {                
                return [
                    item.id,
                    `${item.user?.name || ''} ${item.user?.lastname || ''}`.trim() || 'N/A',
                    item.license || 'N/A',
                    item.phone || 'N/A',
                    item.user?.email || 'N/A',
                ];
            }
        },
        appointment: {
            headers: ['ID', 'Patient ID', 'Odontologist ID', 'Date', 'Status', 'Actions'],
            renderRow: (item) => {               
                return [
                    item.id,
                    item.patientId,
                    item.odontologistId,
                    item.appointmentDate ? new Date(item.appointmentDate).toLocaleString() : 'N/A',
                    <span key="status" className={`px-2 py-1 rounded-full text-xs font-medium ${
                        item.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                        item.status === 'CANCELLED' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                    }`}>
                        {item.status || 'UNKNOWN'}
                    </span>
                ];
            }
        }
    };

    const config = tableConfigs[entityType];
    if (!config) {
        return (
            <div className="text-center py-12 text-red-500">
                No configuration found for entity type: {entityType}
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        {config.headers.map(header => (
                            <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {data.map(item => (
                        <tr key={item.id} className="hover:bg-gray-50">
                            {config.renderRow(item).map((cell, index) => (
                                <td key={index} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {cell}
                                </td>
                            ))}
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <button
                                    onClick={() => onEdit(item)}
                                    className="text-blue-600 hover:text-blue-900 mr-3"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => onDelete(item.id)}
                                    className="text-red-600 hover:text-red-900"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
export default DataTable