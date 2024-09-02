import { ReactNode } from 'react';
import { Tabs } from './tabs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vaja za radioamaterski izpit',
  description: 'Vadi vprašanja, ki se lahko pojavijo na izpitu',
  keywords: [
    'izpit',
    'vaje',
    'vaja',
    'vprašanja',
    'izpitna vprašanja',
    'vaje za izpit',
    'preizkus znanja',
    'preizkusni izpit',
  ],
  openGraph: {
    title: 'Vaja za radioamaterski izpit',
    description: 'Vadi vprašanja, ki se lahko pojavijo na izpitu',
  },
};

export default function VajeLayout({ children }: { children: ReactNode }) {
  return (
    <div className="container max-w-xl">
      <div className="section prose">
        <h1>Vaja za radioamaterski izpit</h1>
      </div>

      <Tabs />

      {children}
    </div>
  );
}
