'use client';

import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import debounce from 'lodash.debounce';

export function Search() {
  const router = useRouter();

  const debouncedSet = useMemo(
    () =>
      debounce((value?: string) => {
        value = value?.trim();
        if (typeof window === 'undefined') return;
        const url = new URL(window.location.href);
        if (value) {
          url.searchParams.set('q', value);
        } else {
          url.searchParams.delete('q');
        }

        router.replace(url.toString());
      }, 500),
    [router],
  );

  useEffect(() => {
    return () => debouncedSet.cancel();
  });

  return (
    <div className="relative max-w-md">
      <input
        type="text"
        placeholder="Išči"
        className="input input-bordered w-full"
        defaultValue={
          typeof window !== 'undefined'
            ? new URL(window.location.href).searchParams.get('q') ?? ''
            : ''
        }
        onChange={(e) => debouncedSet(e.target.value)}
      />
      <FontAwesomeIcon
        icon={faSearch}
        className="absolute right-4 top-1/2 -translate-y-1/2 transform text-gray-400"
      />
    </div>
  );
}
