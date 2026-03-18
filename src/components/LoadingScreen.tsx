'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

interface LoadingScreenProps {
  onComplete: () => void
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const percentRef = useRef<HTMLSpanElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const container = containerRef.current
    const progress = progressRef.current
    const percent = percentRef.current
    const logo = logoRef.current
    if (!container || !progress || !percent || !logo) return

    const tl = gsap.timeline({
      onComplete: () => {
        // Wipe transition
        gsap.to(container, {
          clipPath: 'inset(0% 0% 100% 0%)',
          duration: 0.8,
          ease: 'power3.inOut',
          onComplete: () => {
            setIsVisible(false)
            onComplete()
          },
        })
      },
    })

    // Logo draw/fade in
    tl.from(logo, {
      scale: 0.5,
      opacity: 0,
      duration: 0.8,
      ease: 'back.out(2)',
    })

    // Progress bar fill with counter
    const counter = { value: 0 }
    tl.to(counter, {
      value: 100,
      duration: 2,
      ease: 'power2.inOut',
      onUpdate: () => {
        const val = Math.round(counter.value)
        percent.textContent = `${val}%`
        progress.style.width = `${val}%`
      },
    }, '-=0.3')

    // Logo pulse at end
    tl.to(logo, {
      scale: 1.1,
      duration: 0.3,
      ease: 'power2.in',
    })

    tl.to(logo, {
      scale: 1,
      duration: 0.2,
    })

    return () => {
      tl.kill()
    }
  }, [onComplete])

  if (!isVisible) return null

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[10000] bg-dark flex flex-col items-center justify-center"
      style={{ clipPath: 'inset(0% 0% 0% 0%)' }}
    >
      {/* Logo */}
      <div ref={logoRef} className="mb-12">
        <span className="font-display text-5xl md:text-7xl font-bold text-accent">
          AR.
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-48 md:w-64 h-0.5 bg-dark-300 rounded-full overflow-hidden">
        <div
          ref={progressRef}
          className="h-full bg-gradient-to-r from-accent-dark via-accent to-accent-light rounded-full"
          style={{ width: '0%' }}
        />
      </div>

      {/* Percentage */}
      <span
        ref={percentRef}
        className="mt-4 font-body text-sm text-gray-500 tracking-widest"
      >
        0%
      </span>

      {/* Decorative particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-float"
            style={{
              width: Math.random() * 3 + 1 + 'px',
              height: Math.random() * 3 + 1 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              background: `rgba(201, 168, 76, ${Math.random() * 0.3 + 0.1})`,
              animationDelay: Math.random() * 3 + 's',
              animationDuration: Math.random() * 4 + 3 + 's',
            }}
          />
        ))}
      </div>
    </div>
  )
}
