import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Razredi radioamaterjev',
  description: 'Premerjava razredov radioamaterjev',
};

const classes = [
  {
    premium: false,
    name: 'N razred',
    description:
      'N razred je namenjen začetnikom, ki se šele spoznavajo z radioamaterstvom in niso še tako vešči v elektroniki.',
    perks: [
      <>
        Uporaba le nekaterih frekvenčnih pasov{' '}
        <span className="text-sm font-light">(4 KV, 4 UKV)</span>
      </>,
      <>
        Manjša moč{' '}
        <span className="text-sm font-light">(KV - 100 W, UKV - 25 W)</span>
      </>,
      <>Ozek izbor klicnih znakov</>,
    ],
    callsigns: ['S52AAA - S52XZZ in S52ZAA - S52ZZZ', 'S58AAA - S58XZZ'],
  },
  {
    premium: true,
    name: 'A razred',
    description:
      'A razred je namenjen tistim, ki želijo delovati na vseh amaterskih frekvencah in z večjo močjo.',
    perks: [
      <>Uporaba vseh radioamaterskih frekvenčnih pasov</>,
      <>
        Večja moč <span className="text-sm font-light">(do 1500 W)</span>
      </>,
      <>Širši izbor klicnih znakov</>,
      <>Uporaba radioamaterskih satelitskih storitev</>,
    ],
    callsigns: [
      'S50A - S59Z',
      'S50AA - S59ZZ',
      'S50AAA - S50XZZ',
      'S54AAA - S54XZZ in S54ZAA - S54ZZZ',
      'S56AAA - S56XZZ in S56ZAA - S56ZZZ',
      'S57AAA - S57XZZ in S57ZAA - S57ZZZ',
      'S58ZAA - S58ZZZ',
    ],
  },
];

export default function ClassesPage() {
  return (
    <div className="section container">
      <div className="prose mx-auto">
        <h1 className="text-center">Razreda radioamaterjev</h1>
      </div>

      <div className="mt-10 flex flex-col items-center justify-center gap-6 md:flex-row md:items-stretch">
        {classes.map((c) => (
          <div
            key={c.name}
            className={`flex max-w-sm flex-1 flex-col rounded-2xl p-6 ${
              c.premium
                ? 'bg-neutral text-neutral-content shadow-lg shadow-secondary'
                : 'bg-base-200'
            }`}
          >
            <h4 className="mb-4 text-center text-lg font-bold">{c.name}</h4>
            <p>{c.description}</p>

            <div
              className={`divider ${
                c.premium ? 'before:bg-neutral-700 after:bg-neutral-700' : ''
              }`}
            />

            <ul className="flex flex-col gap-2">
              {c.perks.map((p, i) => (
                <li key={i} className="flex flex-row items-start gap-2">
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className="mt-1 h-4 text-primary"
                  />
                  <div className="flex-1">{p}</div>
                </li>
              ))}
            </ul>

            <div
              className={`divider ${
                c.premium ? 'before:bg-neutral-700 after:bg-neutral-700' : ''
              }`}
            />

            <h5 className="mb-2 text-center font-semibold">Klicni znaki</h5>
            <ul className="text-sm">
              {c.callsigns.map((cs, i) => (
                <li key={i}>{cs}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
