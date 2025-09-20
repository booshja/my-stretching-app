import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { RoutineItem } from '../RoutineItem';

describe('RoutineItem', () => {
    it('renders image for Stretch items', () => {
        render(
            <RoutineItem
                item={{
                    name: 'Stretch',
                    description: 'desc',
                    image: '/images/standing-calf-stretch.webp',
                }}
            />
        );
        const img = screen.getByRole('img', { name: /stretch/i });
        expect(img).toBeInTheDocument();
    });

    it('renders description when present on item', () => {
        render(
            <RoutineItem
                item={{ name: 'Transition', description: 'Get ready', time: 5 }}
            />
        );
        expect(screen.getByText(/get ready/i)).toBeInTheDocument();
    });

    it('does not render an image tag for non-stretch items without image', () => {
        render(<RoutineItem item={{ name: 'Heat', time: 60 }} />);
        const imgs = screen.queryAllByRole('img');
        expect(
            imgs.length === 0 ||
                imgs.every((img) => img.getAttribute('alt') !== 'Heat')
        ).toBe(true);
    });
});
