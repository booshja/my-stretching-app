import { describe, expect, it, vi } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import RootLayout from '../layout';

vi.mock('next/font/google', () => ({
    Inter: () => ({ className: 'inter-font' }),
}));

vi.mock('../_components/Nav', () => ({
    Nav: () => <nav>NavMock</nav>,
}));

describe('RootLayout', () => {
    it('renders nav and children', () => {
        const html = renderToStaticMarkup(
            <RootLayout>
                <main>ChildContent</main>
            </RootLayout>
        );

        expect(html).toContain('NavMock');
        expect(html).toContain('ChildContent');
    });
});
