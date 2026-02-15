interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
    variant?: 'default' | 'filled';
    size?: 'sm' | 'md';
    children: React.ReactNode;
}

export default function IconButton({
    label,
    variant = 'default',
    size = 'md',
    children,
    className = '',
    ...props
}: IconButtonProps) {
    const base = 'inline-flex items-center justify-center rounded-xl transition-all duration-200 cursor-pointer';
    const variants: Record<string, string> = {
        default: 'text-text-muted hover:text-text-main hover:bg-surface',
        filled: 'bg-primary-soft/15 text-primary hover:bg-primary-soft/25',
    };
    const sizes: Record<string, string> = {
        sm: 'w-8 h-8',
        md: 'w-10 h-10',
    };

    return (
        <button
            aria-label={label}
            className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
