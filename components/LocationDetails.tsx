// components/LocationDetails.tsx
export default function LocationDetails() {
  const mapsUrl = `https://maps.app.goo.gl/Lh5p9ax2evCRewSF8`;

  return (
    <div className="text-center my-6 space-y-6 select-none">

      {/* Map Pin Icon */}
      <div className="flex justify-center text-teal-light">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 animate-bounce">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
        </svg>
      </div>

      <div className="space-y-2">
        <p className="font-sans text-[10px] tracking-[0.25em] text-[#C2A677] uppercase font-bold">
          The Venue
        </p>
        <h3 className="font-serif text-2xl tracking-widest text-teal-dark font-light uppercase">
          Woudin
        </h3>

        <p className="font-sans text-[11px] leading-relaxed tracking-[0.16em] text-teal-dark/70 uppercase max-w-xs mx-auto pt-1 font-medium">
          Oudine, Andaket
        </p>
      </div>

      <div className="pt-2">
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-2 px-6 py-3 rounded-full border border-gold/70 text-gold text-[10px] tracking-[0.2em] font-bold uppercase transition-all duration-300 hover:bg-gold hover:text-[#FCFAF6] hover:shadow-[0_8px_20px_rgba(194,166,119,0.25)] hover:scale-[1.03] active:scale-[0.98]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-3.5 h-3.5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
          </svg>
          <span>View on Map</span>
        </a>
      </div>

    </div>
  );
}