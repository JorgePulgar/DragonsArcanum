import type { CollectionEntry } from 'astro:content';

type Post = CollectionEntry<'reviews' | 'comparisons' | 'news'>;

/**
 * Deterministic recommendation algorithm
 * 
 * Rules:
 * 1. Filter out current post
 * 2. Filter out drafts (should be handled by getCollection, but safe to double check)
 * 3. Score each post:
 *    - Common Tags: +3 points per matching tag
 *    - Same Category: +2 points
 *    - Same Silo (Collection): +1 point (implied by type usually, but good for cross-silo)
 * 4. Sort by Score (Desc) -> Date (Desc)
 * 5. Return top N (default 3)
 */
export function getRelatedPosts(
    currentPost: Post,
    allPosts: Post[],
    limit: number = 3
): Post[] {
    const currentId = currentPost.id;

    // Safely access data properties that might not exist on all types
    const currentData = currentPost.data as any;
    const currentTags = new Set<string>((currentData.tags || []).map((t: string) => t.toLowerCase()));
    const currentCategory = currentData.category;

    return allPosts
        .filter(post => post.id !== currentId) // Exclude self
        .filter(post => {
            const data = post.data as any;
            // Check both legacy 'isDraft' (reviews) and new 'draft' (others)
            // If either is true, exclude.
            return !data.isDraft && !data.draft;
        })
        .map(post => {
            let score = 0;
            const data = post.data as any;

            // 1. Tag Match (+3 per tag)
            const postTags = (data.tags || []) as string[];
            if (currentTags.size > 0 && postTags.length > 0) {
                postTags.forEach(t => {
                    if (currentTags.has(t.toLowerCase())) {
                        score += 3;
                    }
                });
            }

            // 2. Category Match (+2)
            if (data.category === currentCategory) {
                score += 2;
            }

            // 3. Collection Match (+1, if references same collection)
            if (post.collection === currentPost.collection) {
                // Prioritize staying within the same content silo
                score += 1;
            }

            return { post, score };
        })
        .sort((a, b) => {
            // Primary Sort: Score
            if (b.score !== a.score) {
                return b.score - a.score;
            }
            // Secondary Sort: Date (Newest first)
            const dateA = new Date(a.post.data.publishDate).getTime();
            const dateB = new Date(b.post.data.publishDate).getTime();
            return dateB - dateA;
        })
        .slice(0, limit)
        .map(item => item.post);
}
