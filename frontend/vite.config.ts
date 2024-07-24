import path from 'path';
import { defineConfig } from 'vite';

import react from '@vitejs/plugin-react';

export default defineConfig(() => {
    return {
        plugins: [react()],
        test: {
            globals: true,
            environment: 'jsdom',
            coverage: {
                provider: 'v8',
                reporter: ['text', 'json', 'html'],
                reportsDirectory: './coverage',
                include: [
                    'src/components/**/*.{ts,tsx,js,jsx}',
                    'src/pages/**/*.{ts,tsx,js,jsx}',
                    'src/App.tsx',
                ],
                exclude: [
                    'node_modules',
                    '__tests__',
                    'src/redux/**',
                    'src/types/**',
                    'src/style/**',
                    'src/config/**',
                    '**/*.d.ts',
                ],
                all: true,
                lines: 80,
                functions: 80,
                branches: 80,
                statements: 80,
            },
        },
        build: {
            commonjsOptions: {
                transformMixedEsModules: true,
            },
        },
        resolve: {
            alias: [{ find: '@', replacement: path.resolve(__dirname, '.') }],
        },
    };
});
