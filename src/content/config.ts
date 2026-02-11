import { defineCollection, z, reference } from 'astro:content';
import { glob } from 'astro/loaders';

const reviews = defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: "./src/content/reviews" }),
    schema: z.object({
        // SEO & Meta
        title: z.string().max(70),
        description: z.string().max(160),
        publishDate: z.date(),
        updatedDate: z.date().optional(),
        isDraft: z.boolean().default(false),
        featured: z.boolean().default(false),

        // Taxonomy
        category: z.enum(['adventures', 'rulebooks', 'settings', 'supplements']),
        tags: z.array(z.string()).default([]),

        // Product Data
        product: z.object({
            name: z.string(),
            publisher: z.string().default("Wizards of the Coast"),
            system: z.enum(['D&D 5e', 'One D&D', 'System Agnostic']).default('D&D 5e'),
            releaseDate: z.date().optional(),
            price: z.number().positive(),
            currency: z.enum(['USD', 'EUR', 'GBP']).default('USD'),
            affiliateLink: z.string().url().optional(),
            coverImage: z.string(),
            pageCount: z.number().int().optional(),
            levels: z.object({
                min: z.number().min(1).max(20),
                max: z.number().min(1).max(20)
            }).optional()
        }),

        // Review Specifics
        rating: z.number().min(0).max(10),
        verdict: z.string().max(280),
        pros: z.array(z.string()).min(1),
        cons: z.array(z.string()).min(1),

        relatedComparisons: z.array(reference('comparisons')).optional(),
    })
});

const comparisons = defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: "./src/content/comparisons" }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        publishDate: z.date(),
        category: z.enum(['adventures', 'rulebooks', 'settings', 'supplements']),

        items: z.array(z.object({
            name: z.string(),
            reviewRef: reference('reviews').optional(),
            pros: z.array(z.string()).optional(),
            cons: z.array(z.string()).optional()
        })).min(2),

        winner: z.string().optional(),
    })
});

const news = defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: "./src/content/news" }),
    schema: z.object({
        title: z.string(),
        excerpt: z.string(),
        publishDate: z.date(),
        category: z.enum(['releases', 'updates', 'wotc', 'community']),
        image: z.string().optional(),
        sourceUrl: z.string().url().optional(),
    })
});

export const collections = { reviews, comparisons, news };
