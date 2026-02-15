'use client';

import { useEffect, useRef, useCallback } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    className?: string;
}

export default function Modal({
    isOpen,
    onClose,
    title,
    children,
    className = '',
}: ModalProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const previousFocus = useRef<HTMLElement | null>(null);

    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        },
        [onClose]
    );

    useEffect(() => {
        if (isOpen) {
            previousFocus.current = document.activeElement as HTMLElement;
            dialogRef.current?.showModal();
            document.body.style.overflow = 'hidden';
            document.addEventListener('keydown', handleKeyDown);
        } else {
            dialogRef.current?.close();
            document.body.style.overflow = '';
            previousFocus.current?.focus();
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [isOpen, handleKeyDown]);

    if (!isOpen) return null;

    return (
        <dialog
            ref={dialogRef}
            aria-modal="true"
            aria-label={title || 'Modal'}
            className="fixed inset-0 z-50 m-0 flex min-h-screen w-screen items-end sm:items-center justify-center bg-transparent p-0 backdrop:bg-black/50"
            onClick={(e) => {
                if (e.target === dialogRef.current) onClose();
            }}
        >
            <div
                className={`relative w-full max-w-lg bg-white rounded-t-2xl sm:rounded-2xl p-6 shadow-xl animate-in ${className}`}
                role="document"
            >
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-1 rounded-lg text-text-muted hover:text-text-main hover:bg-surface transition cursor-pointer"
                    aria-label="Cerrar"
                >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path
                            d="M15 5L5 15M5 5l10 10"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                        />
                    </svg>
                </button>

                {title && (
                    <h2 className="text-xl font-semibold text-primary-dark mb-4 pr-8 font-heading">
                        {title}
                    </h2>
                )}

                {children}
            </div>

            <style jsx>{`
        .animate-in {
          animation: slideUp 250ms ease-out;
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
        </dialog>
    );
}
