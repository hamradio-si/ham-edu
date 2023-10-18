import { Metadata } from 'next';
import CallsignTool from './callsign-tool';

export const metadata: Metadata = {
  title: 'Izbira klicnega znaka',
  description: 'Orodje za pomoč pri izbiri klicnega znaka',
};

export default function Callsign() {
  return (
    <div className="section container prose">
      <h1>Pomoč pri izbiri klicnega znaka</h1>

      <p>
        Spodaj vpiši želen klicni znak in preveri, če je ta že zaseden in če
        ustreza izbranem razredu.
      </p>

      <CallsignTool />
    </div>
  );
}
