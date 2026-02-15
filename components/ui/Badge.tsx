interface BadgeProps {
    children: React.ReactNode;
    variant?: 'default' | 'category' | 'price';
    className?: string;
}

const variantClasses: Record<string, string> = {
    default: 'bg-primary-soft/15 text-primary',
    category: 'bg-accent-hot/10 text-accent-hot',
    price: 'bg-surface text-text-main border border-line',
};

export default function Badge({
    children,
    variant = 'default',
    className = '',
}: BadgeProps) {
    return (
        <span
            className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ${variantClasses[variant]} ${className}`}
        >
            {children}
        </span>
    );
}
