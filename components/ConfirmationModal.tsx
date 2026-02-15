'use client';

import { useState } from 'react';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import type { Itinerary } from '@/lib/types';

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    itinerary: Itinerary | null;
}

type Channel = 'whatsapp' | 'email' | 'web';

function buildWhatsAppMessage(itinerary: Itinerary | null): string {
    if (!itinerary) return '';
    const lines = [
        `¡Hola! Me gustaría confirmar disponibilidad para mi plan en Viaja.`,
        ``,
        `📅 Fecha: ${itinerary.date}`,
        `👥 Personas: ${itinerary.groupSize}`,
        `⏱️ Ritmo: ${itinerary.pace}`,
        `💰 Presupuesto: ${itinerary.budget}`,
        ``,
        `📋 Paradas:`,
        ...itinerary.items.map(
            (item) => `• ${item.time} — ${item.experience.title}`
        ),
        ``,
        `¿Podrían confirmar disponibilidad y costos? ¡Gracias!`,
    ];
    return lines.join('\n');
}

export default function ConfirmationModal({
    isOpen,
    onClose,
    itinerary,
}: ConfirmationModalProps) {
    const [channel, setChannel] = useState<Channel | null>(null);
    const [emailSent, setEmailSent] = useState(false);
    const [webSent, setWebSent] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleClose = () => {
        setChannel(null);
        setEmailSent(false);
        setWebSent(false);
        setCopied(false);
        onClose();
    };

    const whatsappMessage = buildWhatsAppMessage(itinerary);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(whatsappMessage);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // fallback
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={handleClose} title="¿Dónde prefieres continuar?">
            {!channel && (
                <div>
                    <p className="text-sm text-text-muted mb-6">
                        Elige cómo quieres confirmar disponibilidad o hacer preguntas.
                    </p>

                    <div className="space-y-3">
                        {/* WhatsApp */}
                        <button
                            onClick={() => setChannel('whatsapp')}
                            className="w-full flex items-center gap-4 p-4 rounded-xl border border-line hover:border-primary-soft hover:bg-primary-soft/5 transition-all text-left cursor-pointer"
                        >
                            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M10 1.667A8.333 8.333 0 003.333 15L1.667 18.333l3.5-1.166A8.333 8.333 0 1010 1.667z" fill="#25D366" />
                                    <path d="M13.5 11.833c-.25-.125-1.458-.717-1.683-.8-.225-.083-.392-.125-.558.125-.167.25-.642.8-.792.967-.142.167-.292.183-.542.058-.25-.125-1.058-.392-2.017-1.242-.742-.667-1.242-1.483-1.392-1.733-.142-.25-.017-.383.108-.508.117-.117.25-.3.375-.45.125-.15.167-.25.25-.417.083-.167.042-.317-.017-.442-.058-.125-.558-1.342-.767-1.833-.2-.483-.408-.417-.558-.425h-.475c-.167 0-.433.058-.658.3-.225.242-.875.858-.875 2.092s.9 2.425 1.025 2.592c.125.167 1.767 2.692 4.283 3.775.6.258 1.067.408 1.433.525.6.192 1.15.167 1.583.1.483-.075 1.458-.6 1.667-1.175.2-.575.2-1.067.142-1.175-.058-.108-.225-.175-.475-.3z" fill="white" />
                                </svg>
                            </div>
                            <div>
                                <p className="font-medium text-sm text-[#1D2939]">WhatsApp</p>
                                <p className="text-xs text-text-muted">Mensaje directo con tu plan</p>
                            </div>
                        </button>

                        {/* Email */}
                        <button
                            onClick={() => setChannel('email')}
                            className="w-full flex items-center gap-4 p-4 rounded-xl border border-line hover:border-primary-soft hover:bg-primary-soft/5 transition-all text-left cursor-pointer"
                        >
                            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M2.5 5.833L10 10.833l7.5-5V15a1.667 1.667 0 01-1.667 1.667H4.167A1.667 1.667 0 012.5 15V5.833z" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M2.5 5.833A1.667 1.667 0 014.167 4.167h11.666A1.667 1.667 0 0117.5 5.833L10 10.833 2.5 5.833z" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <div>
                                <p className="font-medium text-sm text-[#1D2939]">Correo electrónico</p>
                                <p className="text-xs text-text-muted">Te responderemos en pocas horas</p>
                            </div>
                        </button>

                        {/* Web form */}
                        <button
                            onClick={() => setChannel('web')}
                            className="w-full flex items-center gap-4 p-4 rounded-xl border border-line hover:border-primary-soft hover:bg-primary-soft/5 transition-all text-left cursor-pointer"
                        >
                            <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center shrink-0">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M15.833 3.333H4.167A1.667 1.667 0 002.5 5v10a1.667 1.667 0 001.667 1.667h11.666A1.667 1.667 0 0017.5 15V5a1.667 1.667 0 00-1.667-1.667z" stroke="#8e22bb" strokeWidth="1.5" />
                                    <path d="M6.667 8.333h6.666M6.667 11.667h3.333" stroke="#8e22bb" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                            </div>
                            <div>
                                <p className="font-medium text-sm text-[#1D2939]">Formulario web</p>
                                <p className="text-xs text-text-muted">Completa tu solicitud aquí</p>
                            </div>
                        </button>
                    </div>
                </div>
            )}

            {/* WhatsApp channel */}
            {channel === 'whatsapp' && (
                <div>
                    <button
                        onClick={() => setChannel(null)}
                        className="text-sm text-primary mb-4 flex items-center gap-1 cursor-pointer hover:underline"
                    >
                        ← Volver
                    </button>
                    <p className="text-sm text-text-muted mb-3">
                        Copia este mensaje y envíalo por WhatsApp:
                    </p>
                    <div className="bg-surface rounded-xl p-4 text-sm text-text-main whitespace-pre-wrap mb-4 max-h-60 overflow-y-auto border border-line">
                        {whatsappMessage}
                    </div>
                    <div className="flex gap-3">
                        <Button onClick={handleCopy} fullWidth>
                            {copied ? '✓ Copiado' : 'Copiar mensaje'}
                        </Button>
                    </div>
                    <p className="text-xs text-text-muted mt-3 text-center">
                        Luego abre WhatsApp y envía el mensaje al negocio.
                    </p>
                </div>
            )}

            {/* Email channel */}
            {channel === 'email' && !emailSent && (
                <div>
                    <button
                        onClick={() => setChannel(null)}
                        className="text-sm text-primary mb-4 flex items-center gap-1 cursor-pointer hover:underline"
                    >
                        ← Volver
                    </button>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            setEmailSent(true);
                        }}
                        className="space-y-4"
                    >
                        <div>
                            <label htmlFor="email-name" className="block text-sm font-medium text-text-main mb-1.5">
                                Nombre
                            </label>
                            <input
                                id="email-name"
                                type="text"
                                required
                                className="w-full px-4 py-3 rounded-xl border border-line text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
                                placeholder="Tu nombre"
                            />
                        </div>
                        <div>
                            <label htmlFor="email-address" className="block text-sm font-medium text-text-main mb-1.5">
                                Correo electrónico
                            </label>
                            <input
                                id="email-address"
                                type="email"
                                required
                                className="w-full px-4 py-3 rounded-xl border border-line text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
                                placeholder="tu@email.com"
                            />
                        </div>
                        <div>
                            <label htmlFor="email-message" className="block text-sm font-medium text-text-main mb-1.5">
                                Mensaje adicional
                            </label>
                            <textarea
                                id="email-message"
                                rows={3}
                                className="w-full px-4 py-3 rounded-xl border border-line text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition resize-none"
                                placeholder="¿Algo que debamos saber?"
                            />
                        </div>
                        <Button type="submit" fullWidth>
                            Enviar solicitud
                        </Button>
                    </form>
                </div>
            )}

            {/* Email success */}
            {channel === 'email' && emailSent && (
                <div className="text-center py-6">
                    <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                            <path d="M21 9L11.5 19L7 14.5" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <h3 className="font-heading font-semibold text-lg text-[#1D2939] mb-2">¡Solicitud enviada!</h3>
                    <p className="text-sm text-text-muted mb-6">
                        Te contactaremos para confirmar disponibilidad y resolver cualquier duda.
                    </p>
                    <Button onClick={handleClose} variant="secondary" fullWidth>
                        Cerrar
                    </Button>
                </div>
            )}

            {/* Web form channel */}
            {channel === 'web' && !webSent && (
                <div>
                    <button
                        onClick={() => setChannel(null)}
                        className="text-sm text-primary mb-4 flex items-center gap-1 cursor-pointer hover:underline"
                    >
                        ← Volver
                    </button>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            setWebSent(true);
                        }}
                        className="space-y-4"
                    >
                        <div>
                            <label htmlFor="web-name" className="block text-sm font-medium text-text-main mb-1.5">
                                Nombre completo
                            </label>
                            <input
                                id="web-name"
                                type="text"
                                required
                                className="w-full px-4 py-3 rounded-xl border border-line text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
                                placeholder="Tu nombre"
                            />
                        </div>
                        <div>
                            <label htmlFor="web-phone" className="block text-sm font-medium text-text-main mb-1.5">
                                Teléfono
                            </label>
                            <input
                                id="web-phone"
                                type="tel"
                                className="w-full px-4 py-3 rounded-xl border border-line text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
                                placeholder="+58 412 123 4567"
                            />
                        </div>
                        <div>
                            <label htmlFor="web-notes" className="block text-sm font-medium text-text-main mb-1.5">
                                Notas
                            </label>
                            <textarea
                                id="web-notes"
                                rows={3}
                                className="w-full px-4 py-3 rounded-xl border border-line text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition resize-none"
                                placeholder="Indicaciones especiales, alergias, etc."
                            />
                        </div>
                        <Button type="submit" fullWidth>
                            Enviar solicitud
                        </Button>
                    </form>
                </div>
            )}

            {/* Web success */}
            {channel === 'web' && webSent && (
                <div className="text-center py-6">
                    <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                            <path d="M21 9L11.5 19L7 14.5" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <h3 className="font-heading font-semibold text-lg text-[#1D2939] mb-2">¡Solicitud recibida!</h3>
                    <p className="text-sm text-text-muted mb-6">
                        Te contactaremos para confirmar disponibilidad y resolver cualquier duda.
                    </p>
                    <Button onClick={handleClose} variant="secondary" fullWidth>
                        Cerrar
                    </Button>
                </div>
            )}
        </Modal>
    );
}
