import React from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'magical' | 'ghost' | 'outline' | 'secondary';
    size?: 'sm' | 'md' | 'lg';
    href?: string;
}

export const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    size = 'md',
    href,
    className,
    children,
    ...props
}) => {
    const baseStyles = "inline-flex items-center justify-center rounded-lg font-bold font-serif transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-copper-500 disabled:opacity-50 disabled:pointer-events-none cursor-pointer";

    const variants = {
        primary: "bg-copper-950 text-white border-2 border-copper-950 hover:bg-copper-900 hover:border-copper-900 shadow-[2px_2px_0px_0px_rgba(56,28,16,0.4)] active:translate-y-[2px] active:shadow-none",
        magical: "bg-tradewind-600 text-white border-2 border-tradewind-600 hover:bg-tradewind-500 hover:border-tradewind-500 shadow-[2px_2px_0px_0px_rgba(56,28,16,0.4)] active:translate-y-[2px] active:shadow-none",
        secondary: "bg-tradewind-600 text-white border-2 border-copper-950 hover:bg-tradewind-500 shadow-[2px_2px_0px_0px_rgba(56,28,16,0.4)] active:translate-y-[2px] active:shadow-none",
        ghost: "bg-transparent text-copper-700 hover:bg-copper-100 hover:text-copper-950",
        outline: "bg-transparent text-copper-950 border-2 border-copper-800 hover:bg-copper-50"
    };

    const sizes = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-5 py-2.5 text-base",
        lg: "px-8 py-3.5 text-lg"
    };

    const combinedClasses = twMerge(baseStyles, variants[variant], sizes[size], className);

    if (href) {
        return (
            <a href={href} className={combinedClasses} {...props as any}>
                {children}
            </a>
        );
    }

    return (
        <button
            className={combinedClasses}
            {...props}
        >
            {children}
        </button>
    );
};
