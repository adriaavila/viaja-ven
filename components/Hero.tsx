import Image from "next/image";

export default function Hero() {
    return (
        <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <Image
                src="/angel_falls.png"
                alt="Salto Àngel, Venezuela"
                fill
                className="object-cover object-center"
                priority
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-background" />

            {/* Content */}
            <div className="container relative z-10 px-6 text-center text-white">
                <h1 className="text-5xl md:text-8xl font-heading font-bold mb-6 tracking-tight animate-fade-in">
                    Venezuela como nunca la has <span className="gradient-text brightness-150">visto</span>
                </h1>
                <p className="text-xl md:text-2xl font-sans max-w-2xl mx-auto mb-10 text-white/90 leading-relaxed text-balance">
                    Desde las cumbres de los tepuyes hasta el azul turquesa del Caribe.
                    Descubre el paraíso perdido de Sudamérica.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button className="w-full sm:w-auto bg-ven-yellow text-primary px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-xl">
                        Explorar Destinos
                    </button>
                    <button className="w-full sm:w-auto glass px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-colors">
                        Ver Video
                    </button>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
                <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
                    <div className="w-1 h-2 bg-white rounded-full" />
                </div>
            </div>
        </section>
    );
}
