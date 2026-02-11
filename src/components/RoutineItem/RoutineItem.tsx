import Image from 'next/image';
import styles from './RoutineItem.module.css';
import type { DisplayItem } from '@/types';

interface RoutineItemProps {
    item: DisplayItem | null;
    next?: boolean;
}

export const RoutineItem = ({ item, next = false }: RoutineItemProps) => {
    if (!item) return null;

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>
                {next && <span className={styles.nextSpan}>Next:</span>}
                {item.name}
            </h2>
            {'description' in item && item.description && (
                <p className={styles.description}>{item.description}</p>
            )}
            {item.kind === 'stretch' ? (
                <Image
                    src={item.image}
                    alt={item.name}
                    className={styles.image}
                    width={800}
                    height={600}
                />
            ) : null}
        </div>
    );
};
