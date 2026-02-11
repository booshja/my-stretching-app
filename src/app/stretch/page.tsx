'use client';

import { useSearchParams } from 'next/navigation';
import { checkUrlParams } from '@/utils/checkUrlParams';
import { StretchForm } from './_components/StretchForm';
import { StretchRunner } from './_components/StretchRunner';
import type { StretchLength } from '@/types';
import { Suspense } from 'react';
// using global utility classes from globals.css

function StretchContent() {
    const params = useSearchParams();
    const type = params.get('type');
    const time = params.get('time');
    const showForm = !type || !time;

    if (showForm) {
        return (
            <div className="u-page">
                <StretchForm />
            </div>
        );
    }

    const allowedParams = {
        type: ['hockey', 'daily', 'neck', 'bareminimum', 'pregame', 'nighttime'],
        time:
            process.env.NODE_ENV === 'development'
                ? ['20', '45', '60']
                : ['45', '60'],
    } as const;

    try {
        const { type: parsedType, time: parsedTime } = checkUrlParams({
            allowedParams,
            params,
            requiredKeys: ['type', 'time'] as const,
        });
        return (
            <div className="u-page">
                <StretchRunner
                    type={parsedType}
                    time={parseInt(parsedTime, 10) as StretchLength}
                />
            </div>
        );
    } catch {
        return (
            <div className="u-page">
                <StretchForm />
            </div>
        );
    }
}

export default function Stretch() {
    return (
        <Suspense fallback={<div className="u-page">Loading...</div>}>
            <StretchContent />
        </Suspense>
    );
}
