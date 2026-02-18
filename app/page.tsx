'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import Button from '@/components/ui/Button';
import ExperienceCard from '@/components/ExperienceCard';
import RouteCard from '@/components/RouteCard';
import SearchOverlay from '@/components/SearchOverlay';
import { useScrollReveal } from '@/lib/useScrollReveal';
import { getTrendingExperiences } from '@/lib/mock/experiences';
import { routes } from '@/lib/mock/routes';

const trending = getTrendingExperiences();

const HERO_WORDS_L1 = ['Sabores', 'que', 'inspiran,'];
const HERO_WORDS_L2 = ['memorias', 'que', 'perduran'];
const POPULAR_TAGS = ['Café ☕', 'Strudel 🥮', 'Cerveza 🍺', 'Fresas 🍓', 'Chocolate 🍫', 'Fondue 🧀'];

const STATS = [
  { value: 12, suffix: '+', label: 'Experiencias curadas' },
  { value: 3, suffix: '', label: 'Rutas temáticas' },
  { value: 100, suffix: '%', label: 'Negocios locales' },
];

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 1200;
          const startTime = performance.now();

          const animate = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}{suffix}
    </span>
  );
}

export default function HomePage() {
  const [searchOpen, setSearchOpen] = useState(false);

  const trendingRef = useScrollReveal<HTMLElement>({ staggerChildren: true, staggerDelay: 100 });
  const routesRef = useScrollReveal<HTMLDivElement>({ staggerChildren: true, staggerDelay: 120 });
  const whyRef = useScrollReveal<HTMLElement>({ staggerChildren: true, staggerDelay: 100 });
  const ctaRef = useScrollReveal<HTMLElement>();

  return (
    <>
      <div className="page-enter">
        {/* ── Hero ── */}
        <section className="relative h-[90vh] min-h-[560px] max-h-[800px] flex items-center justify-center overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1400&h=800&fit=crop"
            alt="Vista panorámica de montañas verdes en Colonia Tovar"
            fill
            className="object-cover scale-105"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-black/70" />

          <div className="relative z-10 w-full max-w-3xl mx-auto px-4 sm:px-6 text-center">
            {/* Animated headline — word by word */}
            <h1 className="font-[family-name:var(--font-display)] italic font-bold !text-white text-4xl sm:text-6xl lg:text-7xl leading-tight mb-3 drop-shadow-xl">
              {HERO_WORDS_L1.map((word, i) => (
                <span
                  key={`l1-${i}`}
                  className="hero-word inline-block mr-[0.25em] last:mr-0"
                  style={{ animationDelay: `${i * 120 + 200}ms` }}
                >
                  {word}
                </span>
              ))}
              <br />
              {HERO_WORDS_L2.map((word, i) => (
                <span
                  key={`l2-${i}`}
                  className="hero-word inline-block mr-[0.25em] last:mr-0"
                  style={{ animationDelay: `${(i + HERO_WORDS_L1.length) * 120 + 200}ms` }}
                >
                  {word}
                </span>
              ))}
            </h1>

            <p
              className="hero-word text-white/80 text-base sm:text-lg max-w-lg mx-auto mb-8 leading-relaxed"
              style={{ animationDelay: '1s' }}
            >
              Experiencias gastronómicas en Colonia Tovar, organizadas en un solo plan.
            </p>

            {/* Search bar CTA */}
            <button
              onClick={() => setSearchOpen(true)}
              className="hero-word bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl p-1.5 flex items-center gap-2 max-w-xl mx-auto w-full text-left cursor-pointer hover:bg-white/15 hover:shadow-[0_20px_60px_rgba(0,0,0,0.2)] transition-all duration-300"
              style={{ animationDelay: '1.15s' }}
            >
              <div className="flex items-center gap-3 px-4 flex-1">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white/70 shrink-0">
                  <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M16 16l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <div>
                  <p className="text-sm font-semibold text-white">Experiencias, restaurantes, destinos</p>
                  <p className="text-xs text-white/70">Descubre lo mejor de la montaña</p>
                </div>
              </div>
              <span className="px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold shrink-0 shadow-lg">
                Buscar
              </span>
            </button>

            {/* Floating popular tags */}
            <div
              className="hero-word flex flex-wrap justify-center gap-2 mt-6"
              style={{ animationDelay: '1.4s' }}
            >
              {POPULAR_TAGS.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSearchOpen(true)}
                  className="px-3 py-1.5 rounded-full text-xs font-medium text-white/90 bg-white/15 backdrop-blur-sm border border-white/20 hover:bg-white/25 transition-all cursor-pointer"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 scroll-indicator">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white/60">
              <path d="M12 5v14M19 12l-7 7-7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </section>

        {/* ── Trending this weekend ── */}
        <section ref={trendingRef} className="reveal max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-2">Tendencia</p>
              <h2 className="font-heading font-bold text-2xl sm:text-3xl text-gray-900">
                Lo más buscado este fin de semana
              </h2>
              <p className="text-sm text-text-muted mt-2 max-w-md">
                Experiencias recomendadas según la temporada y la demanda actual.
              </p>
            </div>
            <Button href="/explore" variant="ghost" size="sm" className="hidden sm:inline-flex group">
              Ver todo
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="ml-1 transition-transform group-hover:translate-x-1">
                <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Button>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-4 sm:grid sm:grid-cols-3 lg:grid-cols-4 sm:overflow-visible scrollbar-hide">
            {trending.map((exp, i) => (
              <div key={exp.id} className="reveal-child min-w-[220px] sm:min-w-0">
                <ExperienceCard experience={exp} />
              </div>
            ))}
          </div>

          <div className="sm:hidden text-center mt-4">
            <Button href="/explore" variant="ghost" size="sm">
              Ver todo →
            </Button>
          </div>
        </section>

        {/* ── Curated Routes ── */}
        <section id="rutas" className="bg-surface py-16 sm:py-24">
          <div ref={routesRef} className="reveal max-w-7xl mx-auto px-4 sm:px-6">
            <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-2">Rutas curadas</p>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-white mb-3">
              Rutas para disfrutar
            </h2>
            <p className="text-sm text-text-muted mb-10 max-w-lg">
              Recorridos curados para diferentes gustos y estilos de viaje.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {routes.map((route) => (
                <div key={route.id} className="reveal-child">
                  <RouteCard route={route} />
                </div>
              ))}
            </div>

            <div className="text-center mt-10">
              <Button href="/explore" variant="secondary">
                Ver todas las rutas
              </Button>
            </div>
          </div>
        </section>

        {/* ── Social proof / stats ── */}
        <section ref={whyRef} className="reveal max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-2">¿Por qué VenezueLautentica?</p>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-gray-900">
              Todo en un solo lugar
            </h2>
          </div>

          {/* Stats strip */}
          <div className="grid grid-cols-3 gap-4 mb-14 max-w-lg mx-auto">
            {STATS.map((stat) => (
              <div key={stat.label} className="reveal-child text-center">
                <p className="font-heading font-bold text-3xl sm:text-4xl text-gray-900">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-xs text-text-muted mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Feature cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                ),
                title: 'Planifica rápido',
                text: 'Crea tu itinerario en minutos, sin llamadas ni mensajes interminables.',
              },
              {
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 3a9 9 0 110 18 9 9 0 010-18z" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                ),
                title: '100% local',
                text: 'Trabajamos con negocios locales verificados de Colonia Tovar.',
              },
              {
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <path d="M4 6h16M4 12h16M4 18h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                ),
                title: 'Tu plan, tu ritmo',
                text: 'Tu itinerario se adapta a tu tiempo, presupuesto y estilo.',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="reveal-child flex flex-col items-center text-center p-8 rounded-2xl bg-surface border border-line/50 hover:border-primary-soft/30 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-accent-hot/10 flex items-center justify-center mb-5 text-primary">
                  {item.icon}
                </div>
                <h3 className="font-heading font-semibold text-base text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-text-muted leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Bottom CTA ── */}
        <section
          ref={ctaRef}
          className="reveal relative overflow-hidden py-20 sm:py-28"
        >
          {/* Animated gradient BG */}
          <div className="absolute inset-0 gradient-shift bg-gradient-to-br from-primary-dark via-primary to-accent-hot" />

          {/* Floating shapes */}
          <div className="absolute top-8 left-[10%] w-32 h-32 rounded-full bg-white/5 float" style={{ animationDelay: '0s' }} />
          <div className="absolute bottom-12 right-[15%] w-20 h-20 rounded-full bg-white/5 float" style={{ animationDelay: '1.5s' }} />
          <div className="absolute top-1/2 right-[8%] w-10 h-10 rounded-full bg-white/8 float" style={{ animationDelay: '3s' }} />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="font-[family-name:var(--font-display)] italic font-bold text-2xl sm:text-4xl lg:text-5xl text-white mb-4">
              ¿Listo para tu aventura gastronómica?
            </h2>
            <p className="text-white/70 mb-10 max-w-md mx-auto text-base sm:text-lg">
              Crea tu plan personalizado en minutos y disfruta lo mejor de Colonia Tovar.
            </p>
            <Button href="/plan" size="lg" className="btn-glow !bg-white !text-primary-dark font-bold hover:!bg-white/90">
              Crear mi plan →
            </Button>
          </div>
        </section>
      </div>

      {/* Search Overlay */}
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
