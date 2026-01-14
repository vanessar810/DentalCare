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
                    `${item.name || ''} ${item.lastname || ''}`.trim() || 'N/A',
                    item.license || 'N/A',
                    item.phone || 'N/A',
                    item.email || 'N/A',
                ];
            }
        },
        appointment: {
            headers: ['ID', 'Patient ID', 'Patient name','Odontologist ID', 'Odontologist name', 'Date', 'Actions'],
            renderRow: (item) => {    
                if (!item) 
                    return ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'];           
                return [
                    item.id,
                    item.patient.id,
                    `${item.patient.name || ''} ${item.patient.lastname || ''}`.trim() || 'N/A',
                    item.odontologist.id,
                    `${item.odontologist.name || ''} ${item.odontologist.lastname || ''}`.trim() || 'N/A',
                    item.date ? new Date(item.date).toLocaleString() : 'N/A',
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
                <thead className="">
                    <tr>
                        {config.headers.map(header => (
                            <th key={header} className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className=" divide-y divide-gray-200">
                    {data.map(item => (
                        <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 ">
                            {config.renderRow(item).map((cell, index) => (
                                <td key={index} className="px-6 py-4 whitespace-nowrap text-sm">
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
                                    className="text-red-200 hover:text-red-400"
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