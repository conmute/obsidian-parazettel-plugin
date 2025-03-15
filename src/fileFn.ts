export const sanitizeTitle = (title: string) => {
    const sanitizedTitle = title
        .replace(/[^a-zA-Z0-9-\s+]/g, '')
        .replace(/\s+/g, '_');
    return sanitizedTitle;
}
