"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import Menu from "../Components/navegar";

export default function Ventas() {
    const [ventas, setVentas] = useState([]);

    useEffect(() => {
        const fetchVentas = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/ventas');
                console.log("Datos recibidos:", response.data);
                
                if (Array.isArray(response.data)) {
                    setVentas(response.data);
                } else {
                    console.error("Formato de datos inesperado:", response.data);
                }
            } catch (error) {
                console.error("Error obteniendo negociaciones:", error);
            }
        };

        fetchVentas();
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
                            <th className="py-2 px-4 border-b">Producto ID</th>
                            <th className="py-2 px-4 border-b">Comision</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {ventas.map((ventas) => (
                            <tr key={ventas.Ventas_ID}>
                                <td className="py-2 px-4 border-b">{ventas.Ventas_ID}</td>
                                <td className="py-2 px-4 border-b">{ventas.Cliente_ID}</td>
                                <td className="py-2 px-4 border-b">{ventas.Producto_ID}</td>
                                <td className="py-2 px-4 border-b">{ventas.Comision}</td>
                                
                            </tr>
                        ))}
                    </tbody>
                </table>
            </main>
        </div>
    );
}