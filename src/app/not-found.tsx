import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="py-10 text-center">
      <h1 className="block text-7xl font-bold text-neutral sm:text-9xl">404</h1>
      <h1 className="block text-2xl font-bold text-white"></h1>
      <p className="mt-3 text-neutral">Opa, nekaj je narobe.</p>
      <p className="text-neutral">Oprosti, stran, ki jo iščeš ne obstaja.</p>
      <Link className="btn btn-ghost mt-5" href="/">
        <FontAwesomeIcon icon={faChevronLeft} className="h-3 w-3" />
        Nazaj
      </Link>
    </div>
  );
}
