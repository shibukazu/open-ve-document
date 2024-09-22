import { Noto_Sans_JP } from 'next/font/google';

import type { Metadata } from 'next';

import './globals.css';
import { Header } from '@/app/_components/header';

const noto_sans_jp = Noto_Sans_JP({
    weight: ['400', '700'],
    subsets: ['latin'],
    variable: '--font-noto-sans-jp',
});

export const metadata: Metadata = {
    title: 'Open-VE | Centralized and Consistent Data Validation Engine',
    description: 'Document for Open-VE, a centralized and consistent data validation engine.',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html className={noto_sans_jp.className}>
            <body>
                <Header />
                <main
                    className='flex justify-center items-start p-4'
                    style={{ height: 'calc(100vh - 64px)' }}
                >
                    {children}
                </main>
            </body>
        </html>
    );
}
