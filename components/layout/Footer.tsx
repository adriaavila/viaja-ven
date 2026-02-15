import Link from 'next/link';
import Image from 'next/image';

const socialLinks = [
    {
        label: 'Instagram',
        href: '#',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
        ),
    },
    {
        label: 'TikTok',
        href: '#',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
            </svg>
        ),
    },
    {
        label: 'WhatsApp',
        href: '#',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
            </svg>
        ),
    },
];

export default function Footer() {
    return (
        <footer className="relative border-t border-transparent bg-white">
            {/* Gradient top border */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-10">
                    {/* Brand */}
                    <div className="sm:col-span-2">
                        <Link href="/" className="flex items-center gap-2 mb-4 group">
                            <Image
                                src="/logo.svg"
                                alt="Viaja logo"
                                width={28}
                                height={28}
                                className="w-7 h-7 transition-transform group-hover:rotate-90 duration-500"
                            />
                            <span className="font-[family-name:var(--font-display)] font-bold text-xl tracking-tight text-primary-dark italic">
                                Viaja
                            </span>
                        </Link>
                        <p className="text-sm text-text-muted leading-relaxed max-w-xs mb-6">
                            Turismo gastronómico organizado en un solo plan.
                            Descubre lo mejor de Colonia Tovar, Aragua.
                        </p>

                        {/* Social icons */}
                        <div className="flex items-center gap-3">
                            {socialLinks.map((s) => (
                                <a
                                    key={s.label}
                                    href={s.href}
                                    aria-label={s.label}
                                    className="w-10 h-10 rounded-xl bg-surface border border-line flex items-center justify-center text-text-muted hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all duration-200"
                                >
                                    {s.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="text-sm font-semibold text-gray-900 mb-4">Explorar</h4>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/explore" className="text-sm text-text-muted hover:text-primary transition-colors hover-underline">
                                    Experiencias
                                </Link>
                            </li>
                            <li>
                                <Link href="/#rutas" className="text-sm text-text-muted hover:text-primary transition-colors hover-underline">
                                    Rutas curadas
                                </Link>
                            </li>
                            <li>
                                <Link href="/plan" className="text-sm text-text-muted hover:text-primary transition-colors hover-underline">
                                    Planificar visita
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Info */}
                    <div>
                        <h4 className="text-sm font-semibold text-gray-900 mb-4">Información</h4>
                        <ul className="space-y-3">
                            <li className="text-sm text-text-muted flex items-center gap-2">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-primary shrink-0">
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="currentColor" strokeWidth="1.5" />
                                    <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1.5" />
                                </svg>
                                Colonia Tovar, Aragua
                            </li>
                            <li className="text-sm text-text-muted">Venezuela 🇻🇪</li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-6 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-xs text-text-muted">
                        © {new Date().getFullYear()} Viaja · Turismo Gastronómico. Todos los derechos reservados.
                    </p>
                    <p className="text-xs text-text-muted">
                        Hecho con ❤️ desde Colonia Tovar
                    </p>
                </div>
            </div>
        </footer>
    );
}
