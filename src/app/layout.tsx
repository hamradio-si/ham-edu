import { Header } from '@/components/header';
import './globals.scss';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Footer } from '@/components/footer';
import { morse } from '@/fonts/fonts';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Radioamaterski Izobraževalni Portal',
    template: '%s | Radioamaterski Izobraževalni Portal',
  },
  description:
    'Radioamaterski Izobraževalni Portal Zveze Radioamaterjev Slovenije',
  creator: 'Jakob Kordež',
  icons: {
    icon: '/icons/icon_bg_r.png',
    shortcut: '/icons/icon_bg_r.png',
  },
  // TODO add real URL
  metadataBase: new URL('https://edu.jkob.cc/'),
  openGraph: {
    type: 'website',
    locale: 'sl_SI',
    title: {
      default: 'Radioamaterski Izobraževalni Portal',
      template: '%s | Radioamaterski Izobraževalni Portal',
    },
    description:
      'Radioamaterski Izobraževalni Portal Zveze Radioamaterjev Slovenije',
    images: {
      url: '/icons/icon_bg_r.png',
      height: 2903,
      width: 2903,
    },
  },
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
