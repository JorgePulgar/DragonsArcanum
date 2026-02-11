import React from 'react';
import { Star, StarHalf } from 'lucide-react';
import { clsx } from 'clsx';

interface StarRatingProps {
    rating: number; // 0-10 scale
    max?: number;
    size?: number;
    className?: string;
}

export const StarRating: React.FC<StarRatingProps> = ({
    rating,
    max = 5,
    size = 16,
    className
}) => {
    // Convert 0-10 scale to 0-5 stars
    const normalized = rating / 2;
    const fullStars = Math.floor(normalized);
    const hasHalfStar = normalized % 1 >= 0.5;
    const emptyStars = max - fullStars - (hasHalfStar ? 1 : 0);

    return (
        <div className={clsx("flex items-center space-x-0.5", className)} aria-label={`${rating}/10 rating`}>
            {[...Array(fullStars)].map((_, i) => (
                <Star key={`full-${i}`} size={size} className="fill-yellow-400 text-yellow-400" />
            ))}
            {hasHalfStar && (
                <div className="relative">
                    {/* Approximate half star visually or use StarHalf provided by Lucide. 
                 Lucide's StarHalf is usually left half. */}
                    <StarHalf size={size} className="fill-yellow-400 text-yellow-400" />
                </div>
            )}
            {[...Array(emptyStars)].map((_, i) => (
                <Star key={`empty-${i}`} size={size} className="text-neutral-300 dark:text-neutral-600" />
            ))}
        </div>
    );
};
