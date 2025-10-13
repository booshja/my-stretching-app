import Link from 'next/link';
import styles from './LandingPage.module.css';

export default function LandingPage() {
    return (
        <div className={styles.landingPage}>
            <h1 className={`${styles.title} text-center`}>
                Welcome to My Stretching App!
            </h1>
            <p className={styles.description}>What would you like to do?</p>
            <div>
                <Link href="/stretch" className={styles.link}>
                    Stretching
                </Link>
                <Link href="/heatcold" className={styles.link}>
                    Heat/Cold Therapy
                </Link>
                <Link href="/pregame" className={styles.link}>
                    Pre-Game Warmup
                </Link>
            </div>
        </div>
    );
}
