import { useState } from 'react';
import { Search, Filter } from 'lucide-react';

interface FilterOption {
    label: string;
    value: string;
}

interface SearchBarProps {
    hubType: 'reviews' | 'comparisons' | 'news';
    initialQuery?: string;
    availableFilters?: {
        categories: FilterOption[];
    };
}

export default function HubSearchBar({ hubType, initialQuery = '', availableFilters }: SearchBarProps) {
    const [query, setQuery] = useState(initialQuery);
    const [activeCategory, setActiveCategory] = useState('');

    const handleSearch = () => {
        const params = new URLSearchParams();
        if (query) params.set('q', query);
        if (activeCategory) params.set('category', activeCategory);
        window.location.href = `/${hubType}?${params.toString()}`;
    };

    return (
        <div className="flex items-center gap-2 bg-white border border-copper-200 rounded-full px-3 py-1.5 shadow-sm hover:shadow-md hover:border-tradewind-400 transition-all w-full max-w-md">
            <Search className="w-4 h-4 text-tradewind-600 shrink-0" />

            <input
                type="text"
                className="bg-transparent border-none text-copper-900 placeholder-copper-400 text-sm w-full focus:ring-0 outline-none"
                placeholder="Search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />

            {/* Minimal Divider */}
            <div className="h-4 w-px bg-copper-200 shrink-0"></div>

            {/* Filter Icon with Invisible Select Overlay */}
            <div className="relative group cursor-pointer p-1">
                <Filter className={`w-4 h-4 transition-colors ${activeCategory ? 'text-tradewind-600 fill-tradewind-100' : 'text-copper-400 group-hover:text-copper-600'}`} />
                <select
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={(e) => setActiveCategory(e.target.value)}
                    value={activeCategory}
                    aria-label="Filter by Category"
                >
                    <option value="">All Categories</option>
                    {availableFilters?.categories?.map(c => (
                        <option key={c.value} value={c.value}>{c.label}</option>
                    ))}
                </select>
            </div>

            <button
                onClick={handleSearch}
                className="ml-1 bg-tradewind-100 p-1.5 rounded-full text-tradewind-700 hover:bg-tradewind-200 transition-colors"
                aria-label="Search"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 7-7 7 7" /><path d="M12 19V5" /></svg>
            </button>
        </div>
    );
}
