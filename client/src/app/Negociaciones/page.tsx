"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Menu from "../Components/navegar";

export default function Negociaciones() {
    type Negociacion = {
        ID_Negociaciones: number;
        Cliente_ID: number;
        Fecha_Inicio: string;
        Fecha_Cierre: string;
        Estatus: string;
    }

  const [negociaciones, setNegociaciones] = useState<Negociacion[]>([]);

  useEffect(() => {
    const fetchNegociaciones = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/negociaciones");
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

  const columnas = ["Iniciado", "En Revisión", "Terminado", "Cancelado"];

  return (
    <div className="h-screen flex">
      <Menu />
      <main className="flex-1 p-10 overflow-auto">
        <h1 className="text-4xl font-bold mb-8">Kanban de Negociaciones</h1>
        <div className="grid grid-cols-4 gap-4 border-t border-b border-gray-300">
          {columnas.map((col) => (
            <div key={col} className="flex flex-col border-l border-r border-gray-300 min-h-[400px] px-2">
              <h2 className="text-xl font-semibold text-center py-2 border-b border-gray-300 bg-gray-100">
                {col}
              </h2>
              <div className="flex flex-col gap-2 mt-2">
                {negociaciones
                  .filter((n) => n.Estatus === col)
                  .map((n) => (
                    <div
                      key={n.ID_Negociaciones}
                      className="bg-white border border-gray-300 shadow-sm rounded-lg p-4 text-sm"
                    >
                      <p><strong>ID:</strong> {n.ID_Negociaciones}</p>
                      <p><strong>Cliente:</strong> {n.Cliente_ID}</p>
                      <p><strong>Inicio:</strong> {n.Fecha_Inicio}</p>
                      <p><strong>Cierre:</strong> {n.Fecha_Cierre || "—"}</p>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
