'use client';

import { useSearchParams } from 'next/navigation';
import { HeatColdForm } from './_components/HeatColdForm';

export default function HeatCold() {
    const params = useSearchParams();
    const rounds = params.get('rounds');

    const showForm = !rounds;

    return (
        <div>
            {showForm && <HeatColdForm />}
            {/* {showRoutine && <HeatColdRoutine rounds={rounds} />} */}
        </div>
    );
}
