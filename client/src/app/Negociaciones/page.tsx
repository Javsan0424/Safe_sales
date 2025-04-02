"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import Menu from "../Components/navegar";

export default function Negociaciones() {
    const [negociaciones, setNegociaciones] = useState([]);

    useEffect(() => {
        const fetchNegociaciones = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/negociaciones');
                console.log("Datos recibidos:", response.data);
                
                if (Array.isArray(response.data)) {
                    setNegociaciones(response.data);
                } else {
                    console.error("Formato de datos inesperado:", response.data);
                }
            } catch (error) {
                console.error("Error obteniendo negociaciones:", error);
            }
        };

        fetchNegociaciones();
    }, []);

    return (
        <div className="h-screen flex">
            <Menu />
            <main className="flex-1 p-10">
                <div className="text-5xl"> Lista de Negociaciones </div>
                <table className="min-w-full bg-white border border-gray-300 mt-5">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">ID</th>
                            <th className="py-2 px-4 border-b">Cliente ID</th>
                            <th className="py-2 px-4 border-b">Fecha Inicio</th>
                            <th className="py-2 px-4 border-b">Fecha Cierre</th>
                            <th className="py-2 px-4 border-b">Estatus</th>
                        </tr>
                    </thead>
                    <tbody>
                        {negociaciones.map((negociacion) => (
                            <tr key={negociacion.ID_Negociaciones}>
                                <td className="py-2 px-4 border-b">{negociacion.ID_Negociaciones}</td>
                                <td className="py-2 px-4 border-b">{negociacion.Cliente_ID}</td>
                                <td className="py-2 px-4 border-b">{negociacion.Fecha_Inicio}</td>
                                <td className="py-2 px-4 border-b">{negociacion.Fecha_Cierre}</td>
                                <td className="py-2 px-4 border-b">{negociacion.Estatus}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </main>
        </div>
    );
}