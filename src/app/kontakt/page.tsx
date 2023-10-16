import Link from 'next/link';

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
