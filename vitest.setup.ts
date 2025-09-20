import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { createElement } from 'react';

vi.mock('next/link', () => ({
    default: ({
        href,
        children,
    }: {
        href: string;
        children: React.ReactNode;
    }) => createElement('a', { href }, children),
}));
