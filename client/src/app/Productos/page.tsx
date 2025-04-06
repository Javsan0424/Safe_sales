"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import Menu from "../Components/navegar";

export default function Productos() {
    type Producto = {
        Producto_ID: number;
        Nombre: string;
        Precio: number;
        Descripcion: string;
        Stock: number;
        Categoria: string;
    };

    const [productos, setProductos] = useState<Producto[]>([]);

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/productos');
                console.log("Datos recibidos:", response.data);
                
                if (Array.isArray(response.data)) {
                    setProductos(response.data);
                } else {
                    console.error("Formato de datos inesperado:", response.data);
                }
            } catch (error) {
                console.error("Error obteniendo productos:", error);
            }
        };

        fetchProductos();
    }, []);

    return (
        <div className="h-screen flex">
            <Menu />
            <main className="flex-1 p-10">
                <div className="text-5xl"> Lista de productos </div>
                <table className="min-w-full bg-white border border-gray-300 mt-5">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">ID</th>
                            <th className="py-2 px-4 border-b">Nombre</th>
                            <th className="py-2 px-4 border-b">Precio</th>
                            <th className="py-2 px-4 border-b">Descripción</th>
                            <th className="py-2 px-4 border-b">Stock</th>
                            <th className="py-2 px-4 border-b">Categoría</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productos.map((producto) => (
                            <tr key={producto.Producto_ID}>
                                <td className="py-2 px-4 border-b">{producto.Producto_ID}</td>
                                <td className="py-2 px-4 border-b">{producto.Nombre}</td>
                                <td className="py-2 px-4 border-b">{producto.Precio}</td>
                                <td className="py-2 px-4 border-b">{producto.Descripcion}</td>
                                <td className="py-2 px-4 border-b">{producto.Stock}</td>
                                <td className="py-2 px-4 border-b">{producto.Categoria}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </main>
        </div>
    );
}
