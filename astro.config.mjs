// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';

// https://astro.build/config
// https://astro.build/config
export default defineConfig({
    site: 'https://theadventurevault.com',
    integrations: [react(), sitemap(), mdx()],
    vite: {
        resolve: {
            dedupe: ['react', 'react-dom'],
        },
        plugins: [tailwindcss()],
    },
});
