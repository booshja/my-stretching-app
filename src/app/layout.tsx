import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import { Nav } from './_components/Nav';

const inter = Inter({
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'My Stretching App',
    description: 'My app to help me go through my stretching routines!',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Nav />
                <div style={{ paddingTop: '56px', width: '100%' }}>
                    {children}
                </div>
            </body>
        </html>
    );
}
