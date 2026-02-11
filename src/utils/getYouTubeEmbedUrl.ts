export const getYouTubeEmbedUrl = (link: string | null): string | null => {
    if (!link) return null;

    try {
        const url = new URL(link);
        const host = url.hostname;

        const t = url.searchParams.get('t');
        const startParam = t ? `?start=${parseInt(t, 10) || 0}` : '';

        if (host.includes('youtu.be')) {
            const id = url.pathname.replace('/', '');
            if (!id) return null;
            return `https://www.youtube.com/embed/${id}${startParam}`;
        }

        if (host.includes('youtube.com')) {
            const id = url.searchParams.get('v');
            if (!id) return null;
            return `https://www.youtube.com/embed/${id}${startParam}`;
        }

        return null;
    } catch {
        return null;
    }
};
