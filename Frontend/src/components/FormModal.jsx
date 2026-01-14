import {useEffect} from 'react';
const FormModal = ({ isOpen, title, onClose, children }) => {
    if (!isOpen) return null;
    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                onClose();
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [onClose]);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 sm:p-6" onClick={handleBackdropClick}>
            <div className="bg-white rounded-lg p-6 w-full max-w-md sm:max-w-lg lg:max-w-1.5xl
                max-h-[90vh] overflow-y-auto dark:bg-gray-600">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-base sm:text-lg font-semibold">{title}</h3>
                    <button onClick={onClose} className=" hover:text-red-700">
                        ×
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
};
export default FormModal