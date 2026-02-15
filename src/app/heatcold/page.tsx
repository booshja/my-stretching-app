'use client';

import { useSearchParams } from 'next/navigation';
import { HeatColdForm } from './_components/HeatColdForm';
import { HeatColdRunner } from './_components/HeatColdRunner';
import { checkUrlParams } from '@/utils/checkUrlParams';
import { Suspense } from 'react';
// using global utility classes from globals.css

function HeatColdContent() {
    const params = useSearchParams();
    const rounds = params.get('rounds');

    const showForm = !rounds;

    if (showForm) {
        return (
            <div className="u-page">
                <HeatColdForm />
            </div>
        );
    }

    const allowedParams = {
        rounds: ['1', '2', '3'],
    } as const;

    try {
        const { rounds: parsedRounds } = checkUrlParams({
            allowedParams,
            params,
            requiredKeys: ['rounds'] as const,
        });
        return (
            <div className="u-page">
                <HeatColdRunner rounds={parseInt(parsedRounds, 10)} />
            </div>
        );
    } catch {
        return (
            <div className="u-page">
                <HeatColdForm />
            </div>
        );
    }
}

export default function HeatCold() {
    return (
        <Suspense fallback={<div className="u-page">Loading...</div>}>
            <HeatColdContent />
        </Suspense>
    );
}
