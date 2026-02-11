import { useState } from 'react';
// import { ChevronDown, ChevronUp } from 'lucide-react'; 

interface FAQItem {
    question: string;
    answer: string;
}

interface FAQAccordionProps {
    items: FAQItem[];
}

export default function FAQAccordion({ items = [] }: FAQAccordionProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="space-y-2">
            {items.map((item, idx) => (
                <div
                    key={idx}
                    className="border border-copper-200 bg-white rounded-sm overflow-hidden mb-2"
                >
                    <button
                        onClick={() => toggle(idx)}
                        className="w-full flex items-center justify-between p-4 bg-copper-50 hover:bg-copper-100 transition-colors text-left cursor-pointer select-none"
                        aria-expanded={openIndex === idx}
                    >
                        <span className="font-serif font-bold text-copper-900">{item.question}</span>
                        {openIndex === idx ? (
                            <span className="text-copper-600 font-bold">^</span>
                        ) : (
                            <span className="text-copper-600 font-bold">v</span>
                        )}
                    </button>

                    <div
                        className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${openIndex === idx ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                            }`}
                    >
                        <div className="overflow-hidden">
                            <div className="p-4 text-copper-800 border-t border-copper-200 bg-white">
                                {item.answer}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
