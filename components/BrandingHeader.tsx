// components/BrandingHeader.tsx
export default function BrandingHeader() {
  return (
    <div className="space-y-3 w-full select-none">
      <p className="font-sans text-[10px] md:text-xs tracking-[0.3em] text-teal-dark/65 font-bold uppercase">
        You are invited to the
      </p>

      <h1 className="font-serif text-3xl sm:text-4xl md:text-6xl tracking-[0.18em] text-teal-dark font-light uppercase leading-none">
        Bachelorette
      </h1>

      <p className="font-script text-6xl sm:text-7xl md:text-8xl text-teal-light drop-shadow-[0_2px_4px_rgba(76,178,212,0.15)] leading-none -mt-4 sm:-mt-5 select-none transform rotate-[-2deg]">
        Party
      </p>
    </div>
  );
}