'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { RoutePreset } from '@/lib/types';

interface RouteCardProps {
    route: RoutePreset;
}

export default function RouteCard({ route }: RouteCardProps) {
    return (
        <Link
            href={`/explore?route=${route.slug}`}
            className="group relative block rounded-2xl overflow-hidden aspect-[4/5] card-hover"
        >
            <Image
                src={route.imageUrl}
                alt={route.title}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, 33vw"
            />

            {/* Animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/90 transition-all duration-500" />

            {/* Content at bottom */}
            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                {/* Route metadata */}
                <div className="flex items-center gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-white/20 backdrop-blur-sm text-white/90 border border-white/10">
                        {route.experienceSlugs.length} paradas
                    </span>
                </div>

                <h3 className="font-heading font-bold text-lg sm:text-xl !text-white leading-snug mb-1.5">
                    {route.title}
                </h3>
                <p className="text-sm !text-white line-clamp-2 leading-relaxed opacity-90">
                    {route.description}
                </p>

                {/* Hover arrow */}
                <div className="flex items-center gap-1.5 mt-3 text-white/80 group-hover:text-white transition-colors">
                    <span className="text-xs font-medium">Explorar ruta</span>
                    <svg
                        width="14" height="14" viewBox="0 0 16 16" fill="none"
                        className="transition-transform duration-300 group-hover:translate-x-1"
                    >
                        <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </div>
        </Link>
    );
}
