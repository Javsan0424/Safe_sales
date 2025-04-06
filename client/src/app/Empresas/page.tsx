"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import Menu from "../Components/navegar";

export default function Empresas() {
    type Empresa = {
        Empresas_ID: number;
        Nombre: string;
        Numero: string;
        Direccion: string;
    };

    const [empresas, setEmpresas] = useState<Empresa[]>([]);

    useEffect(() => {
        const fetchEmpresas = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/empresas');
                console.log("Datos recibidos:", response.data);

                if (Array.isArray(response.data)) {
                    setEmpresas(response.data);
                } else if (Array.isArray(response.data.empresas)) {
                    setEmpresas(response.data.empresas);
                } else {
                    console.error("Formato de datos inesperado:", response.data);
                }
            } catch (error) {
                console.error("Error obteniendo empresas:", error);
            }
        };

        fetchEmpresas();
    }, []);

    return (
        <div className="h-screen flex">
            <Menu />
            <main className="flex-1 p-10">
                <div className="text-5xl"> Lista de Empresas </div>
                <table className="min-w-full bg-white border border-gray-300 mt-5">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">ID</th>
                            <th className="py-2 px-4 border-b">Nombre</th>
                            <th className="py-2 px-4 border-b">Numero</th>
                            <th className="py-2 px-4 border-b">Direccion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {empresas.map((empresa) => (
                            <tr key={empresa.Empresas_ID}>
                                <td className="py-2 px-4 border-b">{empresa.Empresas_ID}</td>
                                <td className="py-2 px-4 border-b">{empresa.Nombre}</td>
                                <td className="py-2 px-4 border-b">{empresa.Numero}</td>
                                <td className="py-2 px-4 border-b">{empresa.Direccion}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </main>
        </div>
    );
}
