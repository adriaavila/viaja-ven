'use client';

import Link from 'next/link';
import { forwardRef } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonBaseProps {
    variant?: ButtonVariant;
    size?: ButtonSize;
    fullWidth?: boolean;
    children: React.ReactNode;
    className?: string;
}

type ButtonAsButton = ButtonBaseProps &
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & {
        href?: undefined;
    };

type ButtonAsLink = ButtonBaseProps &
    Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps> & {
        href: string;
    };

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantClasses: Record<ButtonVariant, string> = {
    primary:
        'bg-accent-hot text-white font-medium hover:bg-accent-soft active:scale-[0.97] shadow-sm hover:shadow-md hover:shadow-accent-hot/20 disabled:opacity-50 disabled:pointer-events-none disabled:shadow-none',
    secondary:
        'border border-primary-soft text-primary font-medium hover:bg-primary-soft/10 active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none',
    ghost:
        'text-text-main hover:bg-surface active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none',
};

const sizeClasses: Record<ButtonSize, string> = {
    sm: 'px-4 py-2 text-sm rounded-lg',
    md: 'px-6 py-3 text-base rounded-xl',
    lg: 'px-8 py-4 text-lg rounded-xl',
};

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
    (props, ref) => {
        const {
            variant = 'primary',
            size = 'md',
            fullWidth = false,
            className = '',
            children,
            ...rest
        } = props;

        const classes = [
            'inline-flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer',
            variantClasses[variant],
            sizeClasses[size],
            fullWidth ? 'w-full' : '',
            className,
        ]
            .filter(Boolean)
            .join(' ');

        if ('href' in rest && rest.href) {
            const { href, ...linkRest } = rest as ButtonAsLink;
            return (
                <Link
                    href={href}
                    ref={ref as React.Ref<HTMLAnchorElement>}
                    className={classes}
                    {...linkRest}
                >
                    {children}
                </Link>
            );
        }

        return (
            <button
                ref={ref as React.Ref<HTMLButtonElement>}
                className={classes}
                {...(rest as Omit<ButtonAsButton, keyof ButtonBaseProps>)}
            >
                {children}
            </button>
        );
    }
);

Button.displayName = 'Button';
export default Button;
