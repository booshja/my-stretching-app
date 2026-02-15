import { HeatColdForm } from './_components/HeatColdForm';
import { HeatColdRunner } from './_components/HeatColdRunner';
import { checkUrlParams } from '@/utils/checkUrlParams';
// using global utility classes from globals.css

interface HeatColdPageProps {
    searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function HeatCold({ searchParams }: HeatColdPageProps) {
    const resolvedSearchParams = await searchParams;
    const params = new URLSearchParams();

    for (const [key, value] of Object.entries(resolvedSearchParams)) {
        if (typeof value === 'string') {
            params.set(key, value);
            continue;
        }

        if (Array.isArray(value)) {
            for (const entry of value) {
                params.append(key, entry);
            }
        }
    }

    const rounds = params.get('rounds');
    const roundsValues = params.getAll('rounds');

    const showForm = !rounds || roundsValues.length !== 1;

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
