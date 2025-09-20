import Link from 'next/link';
import styles from './LandingPage.module.css';

export default function LandingPage() {
    return (
        <div className={styles.landingPage}>
            <h1>Welcome to My Stretching App!</h1>
            <p>What would you like to do?</p>
            <div>
                <Link href="/stretch">Stretching</Link>
                <Link href="/heatcold">Heat/Cold Therapy</Link>
            </div>
        </div>
    );
}
