import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface TagProps {
    label: string;
    variant?: 'default' | 'outline' | 'accent';
    className?: string;
}

export const Tag: React.FC<TagProps> = ({
    label,
    variant = 'default',
    className
}) => {
    const baseStyles = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors";

    const variants = {
        default: "bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200",
        outline: "border border-neutral-200 text-neutral-600 dark:border-neutral-700 dark:text-neutral-300",
        accent: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
    };

    return (
        <span className={twMerge(baseStyles, variants[variant], className)}>
            {label}
        </span>
    );
};
