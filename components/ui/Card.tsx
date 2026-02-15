interface CardProps {
    children: React.ReactNode;
    className?: string;
    hover?: boolean;
    padding?: boolean;
}

export default function Card({
    children,
    className = '',
    hover = true,
    padding = false,
}: CardProps) {
    return (
        <div
            className={`rounded-2xl border border-line bg-white overflow-hidden transition-all duration-200 ${hover ? 'card-hover' : ''
                } ${padding ? 'p-5' : ''} ${className}`}
        >
            {children}
        </div>
    );
}
