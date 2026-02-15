'use client';

interface FiltersBarProps {
    activeCategory: string;
    onCategoryChange: (category: string) => void;
}

const categories = [
    { value: 'all', label: 'Todos', icon: '✨' },
    { value: 'comida típica', label: 'Comida típica', icon: '🍽️' },
    { value: 'café y postres', label: 'Café y postres', icon: '☕' },
    { value: 'cerveza artesanal', label: 'Cerveza', icon: '🍺' },
    { value: 'alemana', label: 'Alemana', icon: '🥨' },
    { value: 'paseos cortos', label: 'Paseos', icon: '🚶' },
    { value: 'familiar', label: 'Familiar', icon: '👨‍👩‍👧' },
];

export default function FiltersBar({
    activeCategory,
    onCategoryChange,
}: FiltersBarProps) {
    return (
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide" role="tablist" aria-label="Filtrar por categoría">
            {categories.map((cat) => {
                const isActive = activeCategory === cat.value;
                return (
                    <button
                        key={cat.value}
                        role="tab"
                        aria-selected={isActive}
                        onClick={() => onCategoryChange(cat.value)}
                        className={`whitespace-nowrap px-4 py-2.5 text-sm rounded-full font-medium transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${isActive
                            ? 'bg-primary text-white shadow-md shadow-primary/20 scale-[1.02]'
                            : 'bg-white border border-line text-text-main hover:border-primary-soft hover:text-primary'
                            }`}
                    >
                        <span className="text-xs">{cat.icon}</span>
                        {cat.label}
                    </button>
                );
            })}
        </div>
    );
}
