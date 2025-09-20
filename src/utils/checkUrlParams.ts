import { ReadonlyURLSearchParams } from 'next/navigation';
import { typedObjectKeys } from './typedObjectFunctions';

interface CheckUrlParamsProps {
    params: ReadonlyURLSearchParams;
    allowedParams: Record<string, string[]>;
}

export function checkUrlParams({ allowedParams, params }: CheckUrlParamsProps) {
    if (Object.prototype.toString.call(allowedParams) !== '[object Object]') {
        throw new Error('allowedParams must be an object');
    }

    const allowedParamsKeys = typedObjectKeys(allowedParams);

    const paramValues: Record<string, string> = {};

    for (const key of params.keys()) {
        if (!allowedParamsKeys.includes(key)) {
            throw new Error(`Invalid URL parameter: ${key}`);
        }

        const paramValue = params.get(key);

        if (!paramValue) {
            throw new Error(`URL parameter ${key} has no value`);
        }

        if (!allowedParams[key].includes(paramValue)) {
            throw new Error(`Invalid URL parameter value: ${paramValue}`);
        }

        paramValues[key] = paramValue;
    }

    return paramValues;
}
