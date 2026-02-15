'use client';

import { useEffect, useRef } from 'react';

interface ScrollRevealOptions {
    threshold?: number;
    rootMargin?: string;
    staggerChildren?: boolean;
    staggerDelay?: number;  // ms between each child
}

export function useScrollReveal<T extends HTMLElement>(
    options: ScrollRevealOptions = {}
) {
    const ref = useRef<T>(null);
    const {
        threshold = 0.15,
        rootMargin = '0px 0px -40px 0px',
        staggerChildren = false,
        staggerDelay = 80,
    } = options;

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.classList.add('revealed');

                    if (staggerChildren) {
                        const children = el.querySelectorAll('.reveal-child');
                        children.forEach((child, i) => {
                            (child as HTMLElement).style.transitionDelay = `${i * staggerDelay}ms`;
                            child.classList.add('revealed');
                        });
                    }

                    observer.unobserve(el);
                }
            },
            { threshold, rootMargin }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [threshold, rootMargin, staggerChildren, staggerDelay]);

    return ref;
}
