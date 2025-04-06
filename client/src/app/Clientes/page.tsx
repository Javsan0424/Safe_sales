"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import Menu from "../Components/navegar";

export default function Clientes() {
    type Cliente = {
        Cliente_ID: number;
        Nombre: string;
        Email: string;
        Telefono: string;
        Empresa_ID: number;
    };
    
    const [clientes, setClientes] = useState<Cliente[]>([]);
    

    useEffect(() => {
        const fetchClientes = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/clientes');
                console.log("Datos recibidos:", response.data); 

                
                if (Array.isArray(response.data)) {
                    setClientes(response.data);
                } else if (response.data.clientes && Array.isArray(response.data.clientes)) {
                    setClientes(response.data.clientes);
                } else {
                    console.error("Formato de datos inesperado:", response.data);
                }
            } catch (error) {
                console.error("Error fetching clientes:", error);
            }
        };

        fetchClientes();
    }, []);

    return (
        <div className="h-screen flex">
            <Menu />
            <main className="flex-1 p-10">
                <div className="text-5xl"> Lista de clientes </div>
                <table className="min-w-full bg-white border border-gray-300 mt-5">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">ID</th>
                            <th className="py-2 px-4 border-b">Nombre</th>
                            <th className="py-2 px-4 border-b">Email</th>
                            <th className="py-2 px-4 border-b">Teléfono</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientes.map((cliente) => (
                            <tr key={cliente.Cliente_ID}> {/* Cambia cliente.id a cliente.Cliente_ID */}
                                <td className="py-2 px-4 border-b">{cliente.Cliente_ID}</td>
                                <td className="py-2 px-4 border-b">{cliente.Nombre}</td>
                                <td className="py-2 px-4 border-b">{cliente.Email}</td>
                                <td className="py-2 px-4 border-b">{cliente.Telefono}</td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </main>
        </div>
    );
}