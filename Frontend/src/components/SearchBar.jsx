
import { X } from "lucide-react";
//allows a search by a values
const SearchBar = ({ value, onChange, placeholder = "Search..." }) => {
    return (
        <div className="flex items-center gap-2 w-full max-w-md">
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-600"
            />
            {value && (
                <button
                    onClick={() => onChange("")}
                    className="text-gray-500 hover:text-gray-700"
                >
                    <X size={20} />
                </button>
            )}
        </div>
    );
};
export default SearchBar