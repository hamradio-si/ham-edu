'use client';

// import { Category } from '@/interfaces/category.interface';
import { useRouter, useSearchParams } from 'next/navigation';

interface CategoryFilterProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  categories: any[];
}

export function CategoryFilter({ categories }: CategoryFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function set(value?: number) {
    if (typeof window === 'undefined') return;
    const url = new URL(window.location.href);
    if (value) {
      url.searchParams.set('c', value.toString());
    } else {
      url.searchParams.delete('c');
    }

    router.replace(url.toString());
  }

  const selected = +(searchParams?.get('c') ?? '0');

  return (
    <div className="max-w-md">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="mr-2 text-xl font-bold">Kategorije</h3>
        <button
          onClick={() => set()}
          className={`btn btn-link h-auto p-0 ${selected ? '' : 'invisible'}`}
        >
          Prikaži vse
        </button>
      </div>

      <select
        className="select select-bordered w-full lg:hidden"
        value={selected}
        onChange={(e) => set(+e.target.value)}
      >
        <option value={undefined}>Vse</option>
        {categories.map(({ id, attributes: { name } }) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </select>

      <div className="hidden flex-wrap gap-2 lg:flex">
        {categories.map(({ id, attributes: { name } }) => (
          <button
            key={id}
            onClick={() => {
              if (id === selected) {
                set();
              } else {
                set(id);
              }
            }}
            className={`badge px-4 py-4 ${
              selected === id ? 'badge-accent' : 'badge-ghost'
            }`}
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  );
}
