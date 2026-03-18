import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Alex Rivera | Creative Developer & Digital Storyteller',
  description: 'Portfolio of Alex Rivera — a creative developer specializing in immersive web experiences, scroll-driven storytelling, and cinematic animations.',
  keywords: ['creative developer', 'portfolio', 'web animation', 'GSAP', 'scroll animation', 'digital storyteller'],
  openGraph: {
    title: 'Alex Rivera | Creative Developer',
    description: 'Crafting immersive digital experiences that move people.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-body antialiased">
        {children}
      </body>
    </html>
  )
}
