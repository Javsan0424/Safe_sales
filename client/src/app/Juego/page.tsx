"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import Menu from "../Components/navegar";

export default function Juego() {
    return (
        <div className="h-screen flex">
            <Menu />
            <main className="flex-1 p-10">
                <div className="text-5xl"> Juego </div>
                <br />
                <div>En construción</div>
            </main>
        </div>
    );
}