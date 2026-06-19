// components/CalloutSection.tsx
export default function CalloutSection() {
  return (
    <div className="text-center my-6 space-y-4 select-none">
      
      {/* Decorative Golden Heart */}
      <div className="flex justify-center text-teal-light/75">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5 animate-pulse">
          <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
        </svg>
      </div>

      <div className="space-y-1.5">
        <p className="font-script text-4xl text-gold leading-normal italic">
          &ldquo;Our last colorful night&rdquo;
        </p>
        <p className="font-sans text-xs tracking-[0.22em] text-teal-dark/80 uppercase font-bold">
          Before she wears white.
        </p>
      </div>

    </div>
  );
}