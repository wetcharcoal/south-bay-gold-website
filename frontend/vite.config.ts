import path from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

function pagesBase() {
    const base = process.env.VITE_BASE ?? '/south-bay-gold-website/';
    if (!base.startsWith('/') || !base.endsWith('/')) {
        throw new Error('VITE_BASE must start and end with /');
    }
    return base;
}

export default defineConfig({
    base: pagesBase(),
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
});
