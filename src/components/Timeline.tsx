'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { timeline } from '@/lib/data'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Timeline() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const line = lineRef.current
    if (!section || !line) return

    const ctx = gsap.context(() => {
      // Section heading
      gsap.from('.timeline-heading > *', {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.timeline-heading',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })

      // SVG line draw animation
      const length = line.getTotalLength()
      gsap.set(line, { strokeDasharray: length, strokeDashoffset: length })
      gsap.to(line, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: '.timeline-container',
          start: 'top 60%',
          end: 'bottom 40%',
          scrub: 1,
        },
      })

      // Timeline entries
      document.querySelectorAll('.timeline-entry').forEach((entry, i) => {
        const isLeft = i % 2 === 0
        gsap.from(entry, {
          opacity: 0,
          x: isLeft ? -60 : 60,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: entry,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        })
      })

      // Year numbers parallax
      document.querySelectorAll('.timeline-year').forEach((year) => {
        gsap.from(year, {
          scale: 0.5,
          opacity: 0,
          duration: 0.6,
          ease: 'back.out(2)',
          scrollTrigger: {
            trigger: year,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        })
      })

      // Stat cards
      document.querySelectorAll('.stat-card').forEach((card) => {
        gsap.from(card, {
          scale: 0.8,
          opacity: 0,
          rotateY: 20,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        })
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="journey"
      className="relative py-32 md:py-48 px-6 md:px-12"
    >
      <div className="max-w-6xl mx-auto">
        <div className="timeline-heading text-center mb-20">
          <span className="text-accent text-sm font-body tracking-widest uppercase mb-4 block">
            My Journey
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white">
            The Story So Far
          </h2>
        </div>

        <div className="timeline-container relative">
          {/* SVG connecting line */}
          <svg
            className="absolute left-1/2 top-0 -translate-x-1/2 h-full w-1 hidden md:block"
            viewBox="0 0 2 100"
            preserveAspectRatio="none"
            style={{ height: '100%' }}
          >
            <path
              ref={lineRef}
              d="M1 0 L1 100"
              stroke="url(#lineGradient)"
              strokeWidth="2"
              fill="none"
              vectorEffect="non-scaling-stroke"
            />
            <defs>
              <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#c9a84c" stopOpacity="0.1" />
                <stop offset="50%" stopColor="#c9a84c" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#c9a84c" stopOpacity="0.1" />
              </linearGradient>
            </defs>
          </svg>

          {/* Timeline entries */}
          <div className="space-y-16 md:space-y-24">
            {timeline.map((item, i) => {
              const isLeft = i % 2 === 0
              return (
                <div
                  key={item.year}
                  className={`timeline-entry relative flex flex-col md:flex-row items-center gap-8 ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Content card */}
                  <div className={`flex-1 ${isLeft ? 'md:text-right' : 'md:text-left'}`}>
                    <div className={`inline-block p-6 md:p-8 rounded-2xl bg-dark-100/50 border border-dark-300/50 hover:border-accent/20 transition-colors duration-500 max-w-lg ${isLeft ? 'md:ml-auto' : ''}`}>
                      <h3 className="font-display text-xl md:text-2xl font-bold text-white mb-2">
                        {item.title}
                      </h3>
                      <span className="text-accent text-sm font-body tracking-wider">
                        {item.company}
                      </span>
                      <p className="text-gray-400 font-body mt-4 leading-relaxed text-sm md:text-base">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Center dot & year */}
                  <div className="flex flex-col items-center gap-2 flex-shrink-0">
                    <div className="w-4 h-4 rounded-full bg-accent border-4 border-dark relative z-10">
                      <div className="absolute inset-0 rounded-full bg-accent animate-ping opacity-20" />
                    </div>
                    <span className="timeline-year font-display text-3xl md:text-4xl font-bold text-accent/30">
                      {item.year}
                    </span>
                  </div>

                  {/* Stat card */}
                  <div className="flex-1">
                    <div className={`stat-card inline-block p-6 rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20 ${isLeft ? '' : 'md:ml-auto'}`}>
                      <span className="font-display text-3xl md:text-4xl font-bold text-accent block">
                        {item.stat.value}
                      </span>
                      <span className="text-gray-500 font-body text-sm tracking-wider">
                        {item.stat.label}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
