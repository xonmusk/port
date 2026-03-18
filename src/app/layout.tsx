import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Ashwik Ram | Instructional Designer · Content Strategist · Visual Storyteller',
  description: 'Portfolio of Ashwik Ram — an instructional designer and content strategist specializing in e-learning, visual storytelling, and digital communication.',
  keywords: ['instructional designer', 'content strategist', 'portfolio', 'e-learning', 'visual storyteller', 'Ashwik Ram'],
  openGraph: {
    title: 'Ashwik Ram | Instructional Designer & Content Strategist',
    description: 'I don\'t just design content — I engineer how people learn.',
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
