// src/components/PatientInfo.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../providers/AuthProvider';

export default function Patient() {
    const [patient, setPatient] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { auth } = useAuth();
    const patientId = auth?.user?.id;

    useEffect(() => {
        const token = localStorage.getItem('token');           // 1️⃣ JWT
        const controller = new AbortController();              // 2️⃣ cancela si desmonta

        const fetchPatient = async () => {
            try {
                const { data } = await axios.get(
                    `http://localhost:8080/patient/${patientId}`, // ⬅️ endpoint
                    {
                        headers: { Authorization: `Bearer ${token}` },
                        signal: controller.signal,                      // 3️⃣ abort control
                    }
                );
                setPatient(data);
            } catch (err) {
                if (axios.isCancel(err)) return;                   // ignorar si se canceló
                setError(
                    err.response?.data?.message ||
                    'Error al obtener la información del paciente'
                );
            } finally {
                setLoading(false);
            }
        };

        fetchPatient();

        // 4️⃣ limpia al desmontar
        return () => controller.abort();
    }, [patientId]);

    /* ------------------ Render ------------------ */
    if (loading) return <p className="animate-pulse">Cargando…</p>;
    if (error) return <p className="text-red-600">{error}</p>;
    if (!patientId) return <p>Cargando…</p>

    return (
        <section className="max-w-md mx-auto bg-white shadow rounded p-6">
            <h2 className="text-xl font-semibold mb-4">Información del paciente</h2>

            <dl className="space-y-2">
                <div>
                    <dt className="font-medium">Nombre:</dt>
                    <dd>{patient.firstName} {patient.lastName}</dd>
                </div>
                <div>
                    <dt className="font-medium">Correo:</dt>
                    <dd>{patient.email}</dd>
                </div>
                <div>
                    <dt className="font-medium">Teléfono:</dt>
                    <dd>{patient.phone}</dd>
                </div>
                <div>
                    <dt className="font-medium">Fecha de nacimiento:</dt>
                    <dd>{new Date(patient.birthDate).toLocaleDateString()}</dd>
                </div>
                {/* Agrega más campos según tu modelo */}
            </dl>
        </section>
    );
}
