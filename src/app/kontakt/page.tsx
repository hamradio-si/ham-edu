import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Kontakt',
  description: 'Kontaktne informacije',
  openGraph: {
    title: 'Kontakt',
    description: 'Kontaktne informacije',
  },
};

export default function ContactPage() {
  return (
    <div className="section container prose">
      <h1>Kontakt</h1>

      <p>
        Za več informacij o radioamaterstvu ali o vsebinah na tej spletni strani
        nas lahko kontaktirate na{' '}
        <Link href="mailto:s52kj@hamradio.si">s52kj@hamradio.si</Link>.
      </p>
    </div>
  );
}
