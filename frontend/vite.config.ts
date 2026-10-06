import path from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [react()],
    define: {
        // Injected at build time so client code can read process.env.* (see .env.example).
        'process.env.II_URL': JSON.stringify(process.env.II_URL ?? ''),
        'process.env.CANISTER_ID_BACKEND': JSON.stringify(process.env.CANISTER_ID_BACKEND ?? ''),
        'process.env.STORAGE_GATEWAY_URL': JSON.stringify(process.env.STORAGE_GATEWAY_URL ?? '')
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
});
