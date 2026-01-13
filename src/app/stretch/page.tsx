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

    const allowedParams: Record<string, string[]> = {
        type: ['hockey', 'daily', 'neck'],
        time:
            process.env.NODE_ENV === 'development'
                ? ['20', '60', '90']
                : ['60', '90'],
    };

    try {
        const { type: parsedType, time: parsedTime } = checkUrlParams({
            allowedParams,
            params,
        }) as { type: 'hockey' | 'daily' | 'neck'; time: '60' | '90' | '20' };
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
