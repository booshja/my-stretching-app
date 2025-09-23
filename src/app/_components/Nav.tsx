'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from '../Nav.module.css';

export const Nav = () => {
    const pathname = usePathname();

    const links = [
        { href: '/', label: 'Home' },
        { href: '/stretch', label: 'Stretch' },
        { href: '/heatcold', label: 'Heat/Cold' },
    ];

    return (
        <nav className={styles.nav}>
            {links.map((link) => {
                const isActive = pathname === link.href;
                return (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={`${styles.link} ${
                            isActive ? styles.active : ''
                        }`}
                    >
                        {link.label}
                    </Link>
                );
            })}
        </nav>
    );
};
