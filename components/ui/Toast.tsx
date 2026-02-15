'use client';

import { useEffect, useState } from 'react';

interface ToastProps {
    message: string;
    isVisible: boolean;
    onDismiss: () => void;
    duration?: number;
    variant?: 'success' | 'info';
}

export default function Toast({
    message,
    isVisible,
    onDismiss,
    duration = 3000,
    variant = 'success',
}: ToastProps) {
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (isVisible) {
            setShow(true);
            const timer = setTimeout(() => {
                setShow(false);
                setTimeout(onDismiss, 200);
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [isVisible, duration, onDismiss]);

    if (!isVisible && !show) return null;

    const bgClass =
        variant === 'success'
            ? 'bg-primary-dark text-white'
            : 'bg-white text-text-main border border-line shadow-lg';

    return (
        <div
            role="status"
            aria-live="polite"
            className={`fixed bottom-24 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${bgClass} ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                }`}
        >
            <span className="flex items-center gap-2">
                {variant === 'success' && (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path
                            d="M13 4.5L6 11.5L3 8.5"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                )}
                {message}
            </span>
        </div>
    );
}
