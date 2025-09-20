'use client';

import { useSearchParams } from 'next/navigation';
import { StretchForm } from './_components/StretchForm';

export default function Stretch() {
    const params = useSearchParams();
    const type = params.get('type');
    const time = params.get('time');

    const showForm = !type || !time;
    // const showRoutine = type && time;

    return (
        <div>
            {showForm && <StretchForm />}
            {/* {showRoutine && <StretchingRoutine type={type} time={time} />} */}
        </div>
    );
}
