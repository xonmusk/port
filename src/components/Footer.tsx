'use client'

import MagneticButton from './MagneticButton'

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative py-8 px-6 md:px-12 border-t border-dark-300/30">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-gray-600 font-body text-sm">
          &copy; {new Date().getFullYear()} Ashwik Ram. Crafted with passion.
        </p>

        <MagneticButton
          className="px-4 py-2 rounded-full border border-dark-300 text-gray-500 hover:text-accent hover:border-accent/40 text-sm font-body transition-colors flex items-center gap-2"
          onClick={scrollToTop}
          strength={0.2}
        >
          <span>Back to top</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </MagneticButton>
      </div>
    </footer>
  )
}
