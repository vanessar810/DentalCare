import {useState } from 'react';
import api from '../services/api';
//encapsule logic in api calls and states like data, errors and loading
const useApi = (endpoint) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const get = async () => {
        setLoading(true);
        try {
            const response = await api.get(endpoint);
            if (endpoint.includes('/appointmentss')) {
                setData({
                    upcoming: response.data.upcoming || [],
                    past: response.data.past || []
                });
            } else {
                setData(response.data);
            }
            setData(response.data);
            //console.log('use api get: ', response.data, endpoint)
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const post = async (payload) => {
        setLoading(true);
        try {
            const response = await api.post(endpoint, payload);
            setData(response.data);
            // console.log(response);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const put = async (id, payload) => {
        setLoading(true);
        try {
            const response = await api.put(`${endpoint}/${id}`, payload);
            setData(response.data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const remove = async (id) => {
        setLoading(true);
        try {
            await api.delete(`${endpoint}/${id}`);
            await get();
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return {data, error, loading, get, post, put, remove};
};
export default useApi