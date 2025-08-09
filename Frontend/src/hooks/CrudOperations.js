//Abstraer la lógica repetitiva de crear, leer, actualizar y eliminar entidades.
//Centralizar el manejo de errores, mensajes de éxito y reseteo del formulario.
import {useEffect,useState} from 'react';
import useApi from './useApi';

const CrudOperations = ({endpoint, getInitialFormData, validateForm}) => {
    const {data, get, post, put, remove, loading, error} = useApi(endpoint);

    const [formData, setFormData] = useState(getInitialFormData());
    const [selectedItem, setSelectedItem] = useState(null);
    const [formError, setFormError] = useState(null);

    useEffect(() => {
        get(); // Cargar datos al montar
    }, [endpoint]);

    const handleChange = (e) => {
        const {
            name,
            value
        } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const error = validateForm(formData);
        if (error) {
            setFormError(error);
            return;
        }
        setFormError(null);

        if (selectedItem) {
            await put(selectedItem.id, formData);
        } else {
            await post(formData);
        }

        await get(); // Recargar datos
        resetForm();
    };

    const handleEdit = (item) => {
        setSelectedItem(item);
        setFormData(item);
    };

    const handleDelete = async (id) => {
        await remove(id);
        await get(); // Refrescar lista
    };

    const resetForm = () => {
        setFormData(getInitialFormData());
        setSelectedItem(null);
        setFormError(null);
    };

    return {
        items: data,
        loading,
        error,
        formData,
        formError,
        selectedItem,
        handleChange,
        handleSubmit,
        handleEdit,
        handleDelete,
        resetForm,
        get,
        post, 
        put,
        remove: remove
    };
};
export default CrudOperations