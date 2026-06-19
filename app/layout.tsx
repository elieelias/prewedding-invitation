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

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${montserrat.variable} ${greatVibes.variable}`}>
      <body>{children}</body>
    </html>
  );
}