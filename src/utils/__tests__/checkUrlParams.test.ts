import { describe, expect, it } from 'vitest';
import type { ReadonlyURLSearchParams } from 'next/navigation';
import { checkUrlParams } from '../checkUrlParams';

const asReadonlyParams = (params: URLSearchParams): ReadonlyURLSearchParams =>
    params as unknown as ReadonlyURLSearchParams;

describe('checkUrlParams', () => {
    const allowedParams = {
        type: ['stretch', 'heatcold', 'pregame'],
        rounds: ['3', '5'],
    };

    it('returns validated key/value params', () => {
        const params = asReadonlyParams(new URLSearchParams('type=stretch'));
        expect(checkUrlParams({ allowedParams, params })).toEqual({
            type: 'stretch',
        });
    });

    it('throws when a key is not allowed', () => {
        const params = asReadonlyParams(new URLSearchParams('foo=bar'));
        expect(() => checkUrlParams({ allowedParams, params })).toThrow(
            'Invalid URL parameter: foo'
        );
    });

    it('throws when a value is not allowed', () => {
        const params = asReadonlyParams(new URLSearchParams('type=daily'));
        expect(() => checkUrlParams({ allowedParams, params })).toThrow(
            'Invalid URL parameter value: daily'
        );
    });

    it('throws when a provided key has no value', () => {
        const params = asReadonlyParams(new URLSearchParams('type='));
        expect(() => checkUrlParams({ allowedParams, params })).toThrow(
            'URL parameter type has no value'
        );
    });

    it('throws when a required key is missing', () => {
        const params = asReadonlyParams(new URLSearchParams('type=stretch'));
        expect(() =>
            checkUrlParams({
                allowedParams,
                params,
                requiredKeys: ['type', 'rounds'] as const,
            })
        ).toThrow('Missing required URL parameter: rounds');
    });
});
