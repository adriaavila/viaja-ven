import Image from "next/image";

const destinations = [
    {
        title: "Los Roques",
        description: "Un archipiélago de coral con aguas cristalinas y arenas blancas infinitas.",
        image: "/los_roques.png",
        category: "Playa",
        price: "Desde $450"
    },
    {
        title: "Canaima",
        description: "Hogar del Salto Ángel, la caída de agua más alta del mundo.",
        image: "/angel_falls.png",
        category: "Aventura",
        price: "Desde $890"
    },
    {
        title: "Monte Roraima",
        description: "Un viaje en el tiempo al mundo perdido sobre los tepuyes milenarios.",
        image: "/roraima.png",
        category: "Trekking",
        price: "Desde $650"
    }
];

export default function DestinationGrid() {
    return (
        <section id="destinos" className="py-24 bg-background">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div className="max-w-xl">
                        <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">Destinos Destacados</h2>
                        <p className="text-lg text-zinc-600 dark:text-zinc-400">
                            Seleccionamos las experiencias más exclusivas en los rincones más impactantes de nuestra geografía.
                        </p>
                    </div>
                    <button className="text-ven-blue font-bold flex items-center gap-2 hover:gap-3 transition-all">
                        Ver todos los destinos <span>→</span>
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {destinations.map((dest, index) => (
                        <div key={index} className="group relative overflow-hidden rounded-3xl bg-zinc-100 dark:bg-zinc-900 transition-all hover:-translate-y-2">
                            <div className="relative h-96 w-full">
                                <Image
                                    src={dest.image}
                                    alt={dest.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                <div className="absolute top-4 left-4">
                                    <span className="bg-white/20 backdrop-blur-md text-white px-4 py-1 rounded-full text-sm font-medium border border-white/30">
                                        {dest.category}
                                    </span>
                                </div>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                                <p className="text-ven-yellow font-bold mb-1">{dest.price}</p>
                                <h3 className="text-2xl font-bold mb-2">{dest.title}</h3>
                                <p className="text-white/80 line-clamp-2 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    {dest.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
