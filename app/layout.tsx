import { Playfair_Display, Montserrat, Great_Vibes } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif'
});
const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-sans'
});
const greatVibes = Great_Vibes({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-script'
});

export const metadata = {
  title: 'Pre-Wedding Celebration',
  description: 'You are cordially invited!',
};

// Added strict type definition inline for the children prop
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${montserrat.variable} ${greatVibes.variable}`}>
      <body>{children}</body>
    </html>
  );
}