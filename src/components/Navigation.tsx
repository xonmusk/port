'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import MagneticButton from './MagneticButton'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Skills', href: '#skills' },
  { label: 'Journey', href: '#journey' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
]

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return

    const showAnim = gsap.from(nav, {
      yPercent: -100,
      paused: true,
      duration: 0.3,
      ease: 'power2.out',
    }).progress(1)

    ScrollTrigger.create({
      start: 'top top',
      end: 'max',
      onUpdate: (self) => {
        if (self.direction === -1) {
          showAnim.play()
        } else {
          showAnim.reverse()
        }
      },
    })

    // Add background on scroll
    ScrollTrigger.create({
      start: '100px top',
      onEnter: () => nav.classList.add('glass'),
      onLeaveBack: () => nav.classList.remove('glass'),
    })

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  const handleClick = (href: string) => {
    setIsOpen(false)
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 w-full z-[9990] px-6 md:px-12 py-4 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <MagneticButton
          as="a"
          href="#"
          className="font-display text-xl font-bold text-accent"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          AR.
        </MagneticButton>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <MagneticButton
              key={link.href}
              as="a"
              href={link.href}
              className="text-sm font-body text-gray-300 hover:text-accent transition-colors duration-300 tracking-wider uppercase"
              onClick={() => handleClick(link.href)}
              strength={0.2}
            >
              {link.label}
            </MagneticButton>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex flex-col gap-1.5 z-50"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`w-6 h-0.5 bg-white transition-all duration-300 ${
              isOpen ? 'rotate-45 translate-y-2' : ''
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-white transition-all duration-300 ${
              isOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-white transition-all duration-300 ${
              isOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
          />
        </button>

        {/* Mobile Menu */}
        <div
          className={`fixed inset-0 bg-dark/95 backdrop-blur-lg flex flex-col items-center justify-center gap-8 transition-all duration-500 md:hidden ${
            isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-2xl font-display text-gray-200 hover:text-accent transition-colors"
              onClick={(e) => {
                e.preventDefault()
                handleClick(link.href)
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}
