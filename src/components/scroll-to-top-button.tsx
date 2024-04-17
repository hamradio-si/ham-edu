'use client';

import { scrollToTop } from '@/util/scroll-util';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';

export function ScrollToTopButton() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);

    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <button
      className={`btn btn-square btn-primary fixed bottom-5 right-5 transition duration-200 ${
        scrollY > 100 ? 'opacity-100' : 'translate-y-full opacity-0'
      }`}
      onClick={scrollToTop}
    >
      <FontAwesomeIcon icon={faArrowUp} className="h-5 w-5" />
    </button>
  );
}
