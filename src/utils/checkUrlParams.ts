import { typedObjectKeys } from './typedObjectFunctions';

interface SearchParamsLike {
    keys(): IterableIterator<string>;
    get(name: string): string | null;
}

interface CheckUrlParamsProps<TAllowed extends Record<string, readonly string[]>> {
    params: SearchParamsLike;
    allowedParams: TAllowed;
    requiredKeys?: readonly (keyof TAllowed)[];
}

type CheckedUrlParams<
    TAllowed extends Record<string, readonly string[]>,
    TRequired extends readonly (keyof TAllowed)[] | undefined,
> = {
    [K in keyof TAllowed]?: TAllowed[K][number];
} & (TRequired extends readonly (keyof TAllowed)[]
    ? {
          [K in TRequired[number]]: TAllowed[K][number];
      }
    : Record<never, never>);

export function checkUrlParams<
    TAllowed extends Record<string, readonly string[]>,
    TRequired extends readonly (keyof TAllowed)[] | undefined = undefined,
>({
    allowedParams,
    params,
    requiredKeys,
}: CheckUrlParamsProps<TAllowed> & {
    requiredKeys?: TRequired;
}): CheckedUrlParams<TAllowed, TRequired> {
    if (Object.prototype.toString.call(allowedParams) !== '[object Object]') {
        throw new Error('allowedParams must be an object');
    }

    const allowedParamsKeys = typedObjectKeys(allowedParams);

    const paramValues: Partial<Record<keyof TAllowed, string>> = {};

    for (const key of params.keys()) {
        if (!allowedParamsKeys.includes(key as keyof TAllowed)) {
            throw new Error(`Invalid URL parameter: ${key}`);
        }

        const paramValue = params.get(key);

        if (!paramValue) {
            throw new Error(`URL parameter ${key} has no value`);
        }

        const typedKey = key as keyof TAllowed;
        if (!allowedParams[typedKey].includes(paramValue)) {
            throw new Error(`Invalid URL parameter value: ${paramValue}`);
        }

        paramValues[typedKey] = paramValue;
    }

    if (requiredKeys) {
        for (const key of requiredKeys) {
            if (!paramValues[key]) {
                throw new Error(`Missing required URL parameter: ${String(key)}`);
            }
        }
    }

    return paramValues as CheckedUrlParams<TAllowed, TRequired>;
}
