import { strapiFunctions, strapiUrl } from '@/api';
import { Logo } from '@/assets';
import Image from 'next/image';
import Link from 'next/link';
import ef8r from './ef8r.jpg';

export default async function Home() {
  const { data: vsebine } = await strapiFunctions.getArticles();

  return (
    <>
      <div className="relative flex min-h-[500px]">
        <Image
          src={ef8r}
          alt="EF8R antene"
          fill
          className="absolute inset-0 -z-10 object-cover object-center"
          quality={100}
          placeholder="blur"
        />

        <div className="container flex flex-col items-center justify-center gap-8 py-8 lg:flex-row [&>*]:flex-1">
          <div className="max-w-lg rounded-2xl bg-neutral/80 p-10 text-white">
            <h2 className="mb-5 text-2xl font-bold md:text-3xl">
              Kaj je radioamaterstvo?
            </h2>
            <p className="mb-5">
              Radioamaterstvo je ljubiteljsko, nepoklicno ukvarjanje z radiom in
              radiotehniko. Več o radioamaterstvu in kaj vse lahko počneš kot
              radioamater si lahko prebereš na spodnji povezavi.
            </p>
            <div className="flex flex-wrap gap-3 [&>*]:min-w-max [&>*]:flex-grow">
              <Link className="btn btn-primary" href="/radioamaterstvo">
                Kaj je radioamaterstvo?
              </Link>
              <Link className="btn btn-primary" href="/izpit">
                Radioamaterski izpit
              </Link>
            </div>
          </div>

          <div className="max-w-lg rounded-2xl bg-neutral/80 p-10 text-white">
            <h2 className="mb-5 text-2xl font-bold md:text-3xl">
              Učenje za izpit
            </h2>
            <p className="mb-5">
              Za izpit se lahko učiš z udeležitvijo tečaja, poslušanjem
              posnetkov predavanj, branjem priročnikov ali pa branjem vsebin na
              tej spletni strani.
            </p>
            <div className="flex flex-wrap gap-3 [&>*]:min-w-max [&>*]:flex-grow">
              <Link className="btn btn-primary" href="/tecaji">
                Tečaji
              </Link>
              <Link className="btn btn-primary" href="/literatura">
                Literatura
              </Link>
              <Link className="btn btn-primary" href="/vsebine">
                Vsebine
              </Link>
            </div>
          </div>

          <div className="max-w-lg rounded-2xl bg-neutral/80 p-10 text-white">
            <h2 className="mb-5 text-2xl font-bold md:text-3xl">
              Vaja za izpit
            </h2>
            <p className="mb-5">
              Za izpit lahko vadiš z naključno izbranimi vprašanji ali pa se
              preizkusiš s preizkusnim izpitom.
            </p>
            <div className="flex flex-wrap gap-3 [&>*]:min-w-max [&>*]:flex-grow">
              <Link className="btn btn-primary" href="/vaje">
                Vaja vprašanj
              </Link>
              <Link className="btn btn-primary" href="/vaje/izpit">
                Preizkusni izpit
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="section container flex flex-col gap-8">
        <div className="prose">
          <h2>Najnovejše vsebine</h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {vsebine.slice(0, 6).map(({ attributes: a }) => (
            <Link
              key={a.slug}
              href={`/v/${a.slug}`}
              className="flex-1 transition-all"
            >
              <figure className="relative overflow-clip rounded-lg bg-base-200">
                <Logo className="max-h-32 w-full p-4 text-base-300" />
                {a.cover.data && (
                  <Image
                    src={`${strapiUrl}${a.cover.data.attributes.url}`}
                    alt={a.cover.data.attributes.alternativeText || a.title}
                    fill
                    style={{
                      maxHeight: '128px',
                      objectFit: 'cover',
                    }}
                    className="absolute inset-0"
                  />
                )}
              </figure>
              <div className="card-body px-2 py-4">
                <div className="card-title">{a.title}</div>

                {a.subtitle && (
                  <div className="card-text opacity-80">{a.subtitle}</div>
                )}
              </div>
            </Link>
          ))}
        </div>

        <Link href="/vsebine" className="btn btn-primary mx-auto">
          Več vsebin
        </Link>
      </div>
    </>
  );
}
