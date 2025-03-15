import { describe, it, expect } from 'vitest';
import { sanitizeTitle } from '../fileFn';

describe('sanitizeTitle', () => {
    it('should replace spaces with underscores', () => {
        expect(sanitizeTitle('hello world')).toBe('hello_world');
    });

    it('should remove special characters', () => {
        expect(sanitizeTitle('hello@world!')).toBe('helloworld');
    });

    it('should keep alphanumeric characters and hyphens', () => {
        expect(sanitizeTitle('hello-world123')).toBe('hello-world123');
    });

    it('should handle empty strings', () => {
        expect(sanitizeTitle('')).toBe('');
    });
});
