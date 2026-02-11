import { describe, expect, it } from 'vitest';
import { getYouTubeEmbedUrl } from '../getYouTubeEmbedUrl';

describe('getYouTubeEmbedUrl', () => {
    it('converts youtu.be links to embed URLs', () => {
        expect(getYouTubeEmbedUrl('https://youtu.be/abc123')).toBe(
            'https://www.youtube.com/embed/abc123'
        );
    });

    it('converts youtube watch links and carries start time', () => {
        expect(
            getYouTubeEmbedUrl('https://www.youtube.com/watch?v=abc123&t=42')
        ).toBe('https://www.youtube.com/embed/abc123?start=42');
    });

    it('returns null for unsupported or invalid links', () => {
        expect(getYouTubeEmbedUrl('https://vimeo.com/123')).toBeNull();
        expect(getYouTubeEmbedUrl('not a url')).toBeNull();
        expect(getYouTubeEmbedUrl(null)).toBeNull();
    });

    it('returns null for youtube links missing video id', () => {
        expect(getYouTubeEmbedUrl('https://youtu.be/')).toBeNull();
        expect(getYouTubeEmbedUrl('https://www.youtube.com/watch?t=9')).toBeNull();
    });
});
