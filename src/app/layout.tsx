import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import '@/app/globals.css'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { LanguageProvider } from '@/context/LanguageContext'

const geistSans = Geist({ 
  subsets: ['latin'],
  variable: '--font-geist-sans',
})

const geistMono = Geist_Mono({ 
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

export const metadata: Metadata = {
  title: {
    default: 'NeonGlow - Artistic Neon Signs & Decorations',
    template: '%s | NeonGlow'
  },
  description: 'Premium artistic neon signs and LED decorations for your space. Custom designs, fast shipping, and cash on delivery across Morocco.',
  keywords: ['neon signs', 'LED decorations', 'custom neon', 'home decor', 'Morocco'],
  authors: [{ name: 'NeonGlow' }],
  openGraph: {
    title: 'NeonGlow - Artistic Neon Signs',
    description: 'Premium artistic neon signs and LED decorations',
    type: 'website',
    locale: 'fr_FR',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans bg-black text-white antialiased`}>
        <LanguageProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 pt-20">{children}</main>
            <Footer />
          </div>
        </LanguageProvider>
      </body>
    </html>
  )
}