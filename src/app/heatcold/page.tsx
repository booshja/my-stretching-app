'use client';

import { useSearchParams } from 'next/navigation';
import { HeatColdForm } from './_components/HeatColdForm';
import { HeatColdRunner } from './_components/HeatColdRunner';
import { checkUrlParams } from '@/utils/checkUrlParams';
// using global utility classes from globals.css

export default function HeatCold() {
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

    const allowedParams: Record<string, string[]> = {
        rounds: ['1', '2', '3', '4'],
    };

    try {
        const { rounds: parsedRounds } = checkUrlParams({
            allowedParams,
            params,
        }) as { rounds: '1' | '2' | '3' | '4' };
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
