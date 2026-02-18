"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/80 dark:bg-black/80 backdrop-blur-md shadow-sm py-1" : "bg-transparent py-2"
                }`}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                <Link href="/" className="text-2xl font-heading font-bold tracking-tighter">
                    VIAJA<span className="text-ven-blue">VEN</span>
                </Link>
                <div className="hidden md:flex items-center gap-8 font-medium">
                    <Link href="#destinos" className="hover:text-ven-blue transition-colors">Destinos</Link>
                    <Link href="#experiencias" className="hover:text-ven-blue transition-colors">Experiencias</Link>
                    <Link href="#nosotros" className="hover:text-ven-blue transition-colors">Nosotros</Link>
                    <Link href="#contacto" className="bg-ven-blue text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/20">
                        Reservar Ahora
                    </Link>
                </div>
            </div>
        </nav>
    );
}
