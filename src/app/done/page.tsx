'use client';

import { checkUrlParams } from '@/utils/checkUrlParams';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';

const ROUTE_PARAMS = {
    HEAT_COLD: 'heatcold',
    STRETCH: 'stretch',
} as const;

function AllDoneContent() {
    const params = useSearchParams();

    const allowedParams = {
        type: [ROUTE_PARAMS.HEAT_COLD, ROUTE_PARAMS.STRETCH],
    };

    const { type } = checkUrlParams({ allowedParams, params });

    return (
        <div>
            <h1>That&apos;s it! Great work!</h1>
            {type === ROUTE_PARAMS.HEAT_COLD && (
                <Link href="/">Do another routine</Link>
            )}
            {type === ROUTE_PARAMS.STRETCH && (
                <>
                    <p>Would you like to do a heat/cold therapy session now?</p>
                    <div>
                        <Link href="/heatcold">Yes</Link>
                        <Link href="/">No</Link>
                    </div>
                </>
            )}
        </div>
    );
}

export default function AllDone() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <AllDoneContent />
        </Suspense>
    );
}
