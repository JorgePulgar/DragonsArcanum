import React, { useState } from 'react';
import { Check, X, Trophy } from 'lucide-react';
import { clsx } from 'clsx';
import { StarRating } from '../atoms/StarRating';
import { Button } from '../atoms/Button';

export interface ComparisonRow {
    label: string;
    key: string;
    type: 'text' | 'price' | 'rating' | 'boolean' | 'list';
}

export interface ComparisonProduct {
    id: string;
    name: string;
    image: string;
    isWinner?: boolean;
    data: Record<string, any>;
}

interface ComparisonTableProps {
    products: ComparisonProduct[];
    rows: ComparisonRow[];
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({ products, rows }) => {
    const winner = products.find(p => p.isWinner);

    return (
        <div className="w-full overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm my-8">
            {/* Scrollable Container */}
            <div className="overflow-x-auto pb-4">
                <table className="w-full min-w-[600px] border-collapse">
                    <thead>
                        <tr>
                            <th className="p-4 text-left w-1/4 min-w-[150px] bg-neutral-50 dark:bg-neutral-950 sticky left-0 z-10 border-b border-r border-neutral-200 dark:border-neutral-800">
                                <span className="text-sm font-semibold uppercase tracking-wider text-neutral-500">Feature</span>
                            </th>
                            {products.map(product => (
                                <th key={product.id} className={clsx(
                                    "p-4 w-1/3 min-w-[200px] text-center border-b border-neutral-200 dark:border-neutral-800 relative",
                                    product.isWinner ? "bg-blue-50/50 dark:bg-blue-900/10" : ""
                                )}>
                                    {product.isWinner && (
                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
                                            <Trophy size={12} /> Winner
                                        </div>
                                    )}
                                    <div className="flex flex-col items-center gap-3 mt-2">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-24 h-auto shadow-md rounded-md object-cover aspect-[2/3]"
                                        />
                                        <h3 className="font-bold text-lg leading-tight">{product.name}</h3>
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row, rowIndex) => (
                            <tr key={row.key} className={rowIndex % 2 === 0 ? "bg-transparent" : "bg-neutral-50/50 dark:bg-neutral-900/50"}>
                                <td className="p-4 font-medium text-neutral-700 dark:text-neutral-300 sticky left-0 bg-white dark:bg-neutral-900 z-10 border-r border-neutral-200 dark:border-neutral-800 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
                                    {row.label}
                                </td>
                                {products.map(product => {
                                    const value = product.data[row.key];
                                    return (
                                        <td key={`${product.id}-${row.key}`} className={clsx(
                                            "p-4 text-center border-l border-neutral-100 dark:border-neutral-800",
                                            product.isWinner ? "bg-blue-50/30 dark:bg-blue-900/5" : ""
                                        )}>
                                            {renderCell(value, row.type)}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

function renderCell(value: any, type: ComparisonRow['type']) {
    if (value === undefined || value === null) return <span className="text-neutral-400">-</span>;

    switch (type) {
        case 'price':
            return <span className="font-mono font-medium">${value}</span>;
        case 'rating':
            return <div className="flex justify-center"><StarRating rating={value} /></div>;
        case 'boolean':
            return value
                ? <Check className="mx-auto text-green-500" size={20} />
                : <X className="mx-auto text-red-500" size={20} />;
        case 'list':
            return (
                <ul className="text-sm text-left list-disc list-inside space-y-1">
                    {(value as string[]).map((v, i) => <li key={i}>{v}</li>)}
                </ul>
            );
        default:
            return <span className="text-sm">{value}</span>;
    }
}
