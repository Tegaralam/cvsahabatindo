import type { Metadata } from "next";
import './globals.css'
import { Inter, Instrument_Serif } from 'next/font/google'
import { LanguageProvider } from '@/components/LanguageProvider';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300','400','500','600','700','800','900'],
  variable: '--font-inter',
})

const serif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal','italic'],
  variable: '--font-serif',
})

export const metadata: Metadata = {
  title: 'CV. Sahabat Indo Sukses — Hybrid Generator Booster',
  description: 'Solusi engineering inovasi energi hijau untuk industri. Hybrid Generator Booster — 37% lebih murah dari Solar Off-Grid, ROI < 1 tahun, stabil 24 jam non-stop.',
  keywords: ['Hybrid Generator', 'Generator Booster', 'Efisiensi Energi', 'Energi Hijau Industri', 'Genset Industri', 'CV Sahabat Indo Sukses'],
  openGraph: {
    title: 'CV. Sahabat Indo Sukses — Hybrid Generator Booster',
    description: 'Solusi engineering inovasi energi hijau untuk industri. 37% lebih murah dari Solar Off-Grid.',
    type: 'website',
    locale: 'id_ID',
    siteName: 'CV. Sahabat Indo Sukses',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CV. Sahabat Indo Sukses — Hybrid Generator Booster',
    description: 'Investasi 37% lebih murah dari Solar Off-Grid, ROI < 1 tahun, stabil 24 jam non-stop.',
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`scroll-smooth ${inter.variable} ${serif.variable}`}>
      <body className={`${inter.className} bg-[#0a0a0a] text-[#f5f5f5] antialiased selection:bg-emerald-500/30 selection:text-white`}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
