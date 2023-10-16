import { Header } from '@/components/header';
import './globals.scss';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Footer } from '@/components/footer';
import { morse } from '@/fonts/fonts';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Radioamaterski Izobraževalni Portal',
  description:
    'Radioamaterski Izobraževalni Portal Zveze Radioamaterjev Slovenije',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sl" data-theme="zrs">
      <body className={`flex flex-col ${inter.className} ${morse.variable}`}>
        <div className="min-h-screen">
          <Header />

          <main className="flex-1">{children}</main>
        </div>

        <Footer />
      </body>
    </html>
  );
}
