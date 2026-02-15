'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Button from '@/components/ui/Button';

const navItems = [
    { label: 'Experiencias', href: '/explore' },
    { label: 'Rutas', href: '/#rutas' },
    { label: 'Planificar', href: '/plan' },
];

export default function Header() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();
    const isHome = pathname === '/';

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Check initial
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setMobileOpen(false);
    }, [pathname]);

    // Determine header appearance states
    const isTransparent = isHome && !isScrolled && !mobileOpen;

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-in-out ${isTransparent
                    ? 'bg-transparent border-transparent'
                    : 'bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-sm supports-[backdrop-filter]:bg-white/60'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 md:h-24 flex items-center justify-between transition-[height] duration-300">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2.5 group">
                    <div className={`relative transition-all duration-500 ${isTransparent ? 'brightness-0 invert' : ''}`}>
                        <Image
                            src="/logo.svg"
                            alt="Viaja logo"
                            width={32}
                            height={32}
                            className="w-8 h-8 transition-transform group-hover:rotate-[360deg] duration-700"
                            priority
                        />
                    </div>
                    <span
                        className={`font-[family-name:var(--font-display)] font-bold text-xl tracking-tight italic transition-colors duration-300 ${isTransparent ? 'text-white' : 'text-primary-dark'
                            }`}
                    >
                        Viaja
                    </span>
                </Link>

                {/* Desktop nav */}
                <nav className="hidden md:flex items-center gap-8" aria-label="Navegación principal">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href.split('#')[0]));
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`relative text-sm font-medium transition-colors hover-underline ${isTransparent
                                        ? 'text-white/90 hover:text-white'
                                        : isActive ? 'text-primary' : 'text-gray-600 hover:text-primary'
                                    }`}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                {/* Desktop CTA */}
                <div className="hidden md:block">
                    <Button
                        href="/plan"
                        size="sm"
                        className={`transition-all duration-300 ${isTransparent
                                ? '!bg-white/20 !backdrop-blur-md !border-white/30 !text-white hover:!bg-white hover:!text-primary-dark shadow-lg'
                                : ''
                            }`}
                    >
                        Crear mi plan
                    </Button>
                </div>

                {/* Mobile hamburger */}
                <button
                    className={`md:hidden p-2 rounded-lg transition-colors cursor-pointer ${isTransparent
                            ? 'text-white hover:bg-white/10'
                            : 'text-gray-900 hover:bg-black/5'
                        }`}
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
                    aria-expanded={mobileOpen}
                >
                    {mobileOpen ? (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                    ) : (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M3 7h18M3 12h18M3 17h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                    )}
                </button>
            </div>

            {/* Mobile menu */}
            <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${mobileOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
                }`}>
                <nav
                    className="bg-white/95 backdrop-blur-xl border-t border-gray-100 px-4 py-6 space-y-2 shadow-xl"
                    aria-label="Menú móvil"
                >
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setMobileOpen(false)}
                                className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors ${isActive
                                    ? 'bg-primary/5 text-primary'
                                    : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                    <div className="pt-4 px-2">
                        <Button href="/plan" fullWidth size="md" onClick={() => setMobileOpen(false)}>
                            Crear mi plan
                        </Button>
                    </div>
                </nav>
            </div>
        </header>
    );
}
