import { useState, useEffect, useRef } from 'react';
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
    const searchRef = useRef<HTMLDivElement>(null);
    const [items, setItems] = useState<{ element: HTMLElement, title: string, category: string }[]>([]);

    useEffect(() => {
        // Find the grid container relative to this component
        if (!searchRef.current) return;
        const section = searchRef.current.closest('section');
        if (!section) return;

        // The grid is expected to be in the same section, usually following the header row
        const grid = section.querySelector('.grid');
        if (!grid) return;

        // Parse grid items (ReviewCards)
        const cardElements = Array.from(grid.children) as HTMLElement[];

        const parsedItems = cardElements.map(el => {
            const titleEl = el.querySelector('h3');
            const title = titleEl?.textContent?.toLowerCase() || '';

            // Try to find the category tag (it uses backdrop-blur-md class in ReviewCard)
            // Fallback to checking all text if structure changes, but strict selector is safer for now
            const categoryEl = el.querySelector('.backdrop-blur-md');
            const category = categoryEl?.textContent?.trim() || '';

            return { element: el, title, category };
        });

        setItems(parsedItems);
    }, []); // Run once on mount

    useEffect(() => {
        // Filter logic
        let visibleCount = 0;
        const lowerQuery = query.toLowerCase();

        items.forEach(({ element, title, category }) => {
            const matchesSearch = !lowerQuery || title.includes(lowerQuery);
            const matchesCategory = !activeCategory || category === activeCategory;

            if (matchesSearch && matchesCategory) {
                element.style.display = ''; // Reset to default (block/flex)
                visibleCount++;
            } else {
                element.style.display = 'none';
            }
        });

        // Handle "No results" message
        if (searchRef.current) {
            const section = searchRef.current.closest('section');
            const grid = section?.querySelector('.grid');

            // Check if we already injected a message
            let noResultsMsg = grid?.nextElementSibling as HTMLElement;
            const isMsg = noResultsMsg?.id === 'hub-search-no-results';

            if (visibleCount === 0 && items.length > 0) {
                if (!isMsg && grid) {
                    const msg = document.createElement('div');
                    msg.id = 'hub-search-no-results';
                    msg.className = 'text-center text-copper-600 italic py-12 col-span-full';
                    msg.textContent = `No ${hubType} found matching your criteria.`;
                    grid.after(msg);
                }
            } else {
                if (isMsg) {
                    noResultsMsg.remove();
                }
            }
        }

    }, [query, activeCategory, items, hubType]);

    // Update URL without reload (optional but good for UX)
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        let changed = false;

        if (query) {
            if (params.get('q') !== query) {
                params.set('q', query);
                changed = true;
            }
        } else {
            if (params.has('q')) {
                params.delete('q');
                changed = true;
            }
        }

        if (activeCategory) {
            if (params.get('category') !== activeCategory) {
                params.set('category', activeCategory);
                changed = true;
            }
        } else {
            if (params.has('category')) {
                params.delete('category');
                changed = true;
            }
        }

        if (changed) {
            const newUrl = `${window.location.pathname}?${params.toString()}`;
            window.history.replaceState({}, '', newUrl);
        }
    }, [query, activeCategory]);

    return (
        <div ref={searchRef} className="flex items-center gap-2 bg-white border border-copper-200 rounded-full px-3 py-1.5 shadow-sm hover:shadow-md hover:border-tradewind-400 transition-all w-full max-w-md">
            <Search className="w-4 h-4 text-tradewind-600 shrink-0" />

            <input
                type="text"
                className="bg-transparent border-none text-copper-900 placeholder-copper-400 text-sm w-full focus:ring-0 outline-none"
                placeholder="Search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            // Removed onKeyDown Enter because we now filter realtime
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

            {/* Removed the search button click handler as we are now realtime/reactive */}
            <button
                className="ml-1 bg-tradewind-50 p-1.5 rounded-full text-tradewind-700 hover:bg-tradewind-100 transition-colors opacity-50 cursor-default"
                aria-label="Search Active"
                disabled
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 7-7 7 7" /><path d="M12 19V5" /></svg>
            </button>
        </div>
    );
}

