'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function HeroParallax() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const layersRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const layers = layersRef.current
    const title = titleRef.current
    const subtitle = subtitleRef.current
    if (!section || !layers || !title || !subtitle) return

    const ctx = gsap.context(() => {
      // Pinned parallax scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=200%',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      })

      // Layer 7 - Stars/sky (furthest back, barely moves)
      tl.to('[data-layer="7"]', { scale: 1.1, y: -20, ease: 'none' }, 0)
      // Layer 6 - Far mountains
      tl.to('[data-layer="6"]', { scale: 1.2, y: -40, ease: 'none' }, 0)
      // Layer 5 - Mountains
      tl.to('[data-layer="5"]', { scale: 1.4, y: -60, ease: 'none' }, 0)
      // Layer 4 - Hills
      tl.to('[data-layer="4"]', { scale: 1.6, y: -80, ease: 'none' }, 0)
      // Layer 3 - Midground elements
      tl.to('[data-layer="3"]', { scale: 2.0, y: -120, ease: 'none' }, 0)
      // Layer 2 - Near foreground
      tl.to('[data-layer="2"]', { scale: 2.8, y: -200, opacity: 0, ease: 'none' }, 0)
      // Layer 1 - Closest foreground (exits frame fastest)
      tl.to('[data-layer="1"]', { scale: 4, y: -300, opacity: 0, ease: 'none' }, 0)

      // Title animation
      tl.to(title, { scale: 1.5, y: -100, opacity: 0, ease: 'none' }, 0)
      tl.to(subtitle, { y: -150, opacity: 0, ease: 'none' }, 0)

      // Scroll indicator fade out
      tl.to(scrollIndicatorRef.current, { opacity: 0, y: -50, ease: 'none' }, 0)

      // Title entrance animation (separate from scroll)
      gsap.from(title, {
        opacity: 0,
        y: 80,
        duration: 1.5,
        delay: 0.5,
        ease: 'power3.out',
      })

      // Subtitle stagger
      const words = subtitle.querySelectorAll('span')
      gsap.from(words, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.08,
        delay: 1,
        ease: 'power3.out',
      })

      // Scroll indicator bounce
      gsap.to(scrollIndicatorRef.current, {
        y: 10,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        delay: 2,
      })
    }, section)

    return () => ctx.revert()
  }, [])

  const subtitleWords = 'Instructional Designer · Content Strategist · Visual Storyteller'.split(' ')

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden"
      id="hero"
    >
      <div ref={layersRef} className="absolute inset-0">
        {/* Layer 7: Sky/Stars */}
        <div
          data-layer="7"
          className="absolute inset-0 will-change-transform"
          style={{ zIndex: 1 }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a1a] via-[#0f1029] to-[#0a0a1a]" />
          {/* Stars */}
          {Array.from({ length: 60 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: Math.random() * 3 + 1 + 'px',
                height: Math.random() * 3 + 1 + 'px',
                top: Math.random() * 50 + '%',
                left: Math.random() * 100 + '%',
                opacity: Math.random() * 0.8 + 0.2,
                animation: `pulse ${Math.random() * 3 + 2}s ease-in-out infinite`,
                animationDelay: Math.random() * 2 + 's',
              }}
            />
          ))}
        </div>

        {/* Layer 6: Far Mountains */}
        <div
          data-layer="6"
          className="absolute inset-0 will-change-transform"
          style={{ zIndex: 2 }}
        >
          <svg viewBox="0 0 1440 800" className="absolute bottom-0 w-full" preserveAspectRatio="none">
            <path
              d="M0 800 L0 500 Q200 350 400 450 Q600 300 720 380 Q900 250 1000 350 Q1200 280 1440 400 L1440 800 Z"
              fill="#0d0d1a"
              opacity="0.7"
            />
          </svg>
        </div>

        {/* Layer 5: Mountains */}
        <div
          data-layer="5"
          className="absolute inset-0 will-change-transform"
          style={{ zIndex: 3 }}
        >
          <svg viewBox="0 0 1440 800" className="absolute bottom-0 w-full" preserveAspectRatio="none">
            <path
              d="M0 800 L0 550 Q180 420 360 500 Q540 380 720 460 Q900 350 1080 430 Q1260 370 1440 480 L1440 800 Z"
              fill="#111128"
              opacity="0.8"
            />
          </svg>
        </div>

        {/* Layer 4: Hills */}
        <div
          data-layer="4"
          className="absolute inset-0 will-change-transform"
          style={{ zIndex: 4 }}
        >
          <svg viewBox="0 0 1440 800" className="absolute bottom-0 w-full" preserveAspectRatio="none">
            <path
              d="M0 800 L0 600 Q240 520 480 570 Q720 500 960 560 Q1200 510 1440 580 L1440 800 Z"
              fill="#141430"
              opacity="0.9"
            />
          </svg>
        </div>

        {/* Layer 3: Midground */}
        <div
          data-layer="3"
          className="absolute inset-0 will-change-transform"
          style={{ zIndex: 5 }}
        >
          <svg viewBox="0 0 1440 800" className="absolute bottom-0 w-full" preserveAspectRatio="none">
            <path
              d="M0 800 L0 650 Q360 600 720 640 Q1080 590 1440 650 L1440 800 Z"
              fill="#181840"
            />
          </svg>
          {/* Accent glow */}
          <div
            className="absolute bottom-[25%] left-1/2 -translate-x-1/2 w-[600px] h-[200px] rounded-full"
            style={{
              background: 'radial-gradient(ellipse, rgba(201, 168, 76, 0.15) 0%, transparent 70%)',
            }}
          />
        </div>

        {/* Layer 2: Near foreground */}
        <div
          data-layer="2"
          className="absolute inset-0 will-change-transform"
          style={{ zIndex: 6 }}
        >
          <svg viewBox="0 0 1440 800" className="absolute bottom-0 w-full" preserveAspectRatio="none">
            <path
              d="M0 800 L0 700 Q200 680 400 710 Q600 670 800 700 Q1000 680 1200 710 Q1350 690 1440 720 L1440 800 Z"
              fill="#1c1c4a"
            />
          </svg>
        </div>

        {/* Layer 1: Closest foreground elements */}
        <div
          data-layer="1"
          className="absolute inset-0 will-change-transform"
          style={{ zIndex: 7 }}
        >
          {/* Left foreground shape */}
          <svg viewBox="0 0 1440 800" className="absolute bottom-0 w-full" preserveAspectRatio="none">
            <path
              d="M0 800 L0 720 Q100 700 200 740 L200 800 Z"
              fill="#0a0a0f"
            />
            <path
              d="M1240 800 L1240 730 Q1340 710 1440 740 L1440 800 Z"
              fill="#0a0a0f"
            />
          </svg>
          {/* Floating particles */}
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={`particle-${i}`}
              className="absolute rounded-full"
              style={{
                width: Math.random() * 4 + 2 + 'px',
                height: Math.random() * 4 + 2 + 'px',
                bottom: Math.random() * 30 + '%',
                left: Math.random() * 100 + '%',
                background: `rgba(201, 168, 76, ${Math.random() * 0.5 + 0.2})`,
                animation: `float ${Math.random() * 4 + 3}s ease-in-out infinite`,
                animationDelay: Math.random() * 3 + 's',
              }}
            />
          ))}
        </div>
      </div>

      {/* Title overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        <h1
          ref={titleRef}
          className="font-display text-5xl md:text-7xl lg:text-9xl font-bold text-white text-center will-change-transform"
          style={{ textShadow: '0 0 80px rgba(201, 168, 76, 0.3)' }}
        >
          Ashwik Ram
        </h1>
        <p
          ref={subtitleRef}
          className="mt-6 text-lg md:text-xl lg:text-2xl font-body text-gray-300 tracking-widest uppercase text-center"
        >
          {subtitleWords.map((word, i) => (
            <span key={i} className="inline-block mr-2">
              {word}
            </span>
          ))}
        </p>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-xs font-body text-gray-400 tracking-widest uppercase">
          Scroll Down
        </span>
        <svg
          className="w-6 h-6 text-accent"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  )
}
