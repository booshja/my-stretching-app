import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
    plugins: [react(), tsconfigPaths()],
    test: {
        environment: 'jsdom',
        setupFiles: ['./vitest.setup.ts'],
        globals: true,
        css: true,
        coverage: {
            provider: 'v8',
            reporter: ['text', 'html'],
            include: ['src/**/*.{ts,tsx}'],
            exclude: [
                '**/*.test.{ts,tsx}',
                '**/__tests__/**',
                '**/node_modules/**',
                '**/.next/**',
                'src/types.ts',
            ],
            thresholds: {
                lines: 80,
                functions: 80,
                branches: 80,
                statements: 80,
            },
        },
    },
});
