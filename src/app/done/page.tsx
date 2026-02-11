'use client';

import { checkUrlParams } from '@/utils/checkUrlParams';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';
import styles from '../LandingPage.module.css';

const ROUTE_PARAMS = {
    HEAT_COLD: 'heatcold',
    STRETCH: 'stretch',
    PRE_GAME: 'pregame',
} as const;
type RouteParamType = (typeof ROUTE_PARAMS)[keyof typeof ROUTE_PARAMS];

function AllDoneContent() {
    const params = useSearchParams();

    const allowedParams = {
        type: [
            ROUTE_PARAMS.HEAT_COLD,
            ROUTE_PARAMS.STRETCH,
            ROUTE_PARAMS.PRE_GAME,
        ],
    };

    let type: RouteParamType | null = null;
    try {
        type = checkUrlParams({
            allowedParams,
            params,
            requiredKeys: ['type'] as const,
        }).type as RouteParamType;
    } catch {
        type = null;
    }

    if (!type) {
        return (
            <div className={styles.landingPage}>
                <h1 className={`${styles.title} text-center`}>
                    That&apos;s it! Great work!
                </h1>
                <p className={styles.description}>
                    Routine complete. Return home to start another one.
                </p>
                <Link href="/" className={styles.link}>
                    Go home
                </Link>
            </div>
        );
    }

    return (
        <div className={styles.landingPage}>
            <h1 className={`${styles.title} text-center`}>
                That&apos;s it! Great work!
            </h1>
            {type === ROUTE_PARAMS.HEAT_COLD && (
                <Link href="/" className={styles.link}>
                    Do another routine
                </Link>
            )}
            {type === ROUTE_PARAMS.STRETCH && (
                <>
                    <p className={styles.description}>
                        Would you like to do a heat/cold therapy session now?
                    </p>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <Link href="/heatcold" className={styles.link}>
                            Yes
                        </Link>
                        <Link href="/" className={styles.link}>
                            No
                        </Link>
                    </div>
                </>
            )}
            {type === ROUTE_PARAMS.PRE_GAME && (
                <div>
                    <Link href="/" className={styles.link}>
                        Do another routine
                    </Link>
                </div>
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
