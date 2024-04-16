'use client';

import { Pagination } from '@/interfaces/paginated.interface';
import { useRouter } from 'next/navigation';

export function PageNumber({
  pagination: { page, pageCount },
}: {
  pagination: Pagination;
}) {
  const router = useRouter();

  const setPage = (page: number) => {
    const url = new URL(window.location.href);
    if (page > 1) {
      url.searchParams.set('p', page.toString());
    } else {
      url.searchParams.delete('p');
    }
    router.push(url.toString());
  };

  return (
    <>
      {pageCount > 1 && (
        <div className="join mt-3 w-full justify-center">
          {page > 1 && (
            <button className="btn join-item" onClick={() => setPage(page - 1)}>
              «
            </button>
          )}
          <button className="btn join-item">Stran {page}</button>
          {page < pageCount && (
            <button className="btn join-item" onClick={() => setPage(page + 1)}>
              »
            </button>
          )}
        </div>
      )}
    </>
  );
}
