'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { aboutText, stats } from '@/lib/data'
import { createCountUpAnimation } from '@/lib/animations'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const statValuesRef = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      // Heading split-text animation
      if (headingRef.current) {
        const text = headingRef.current.textContent || ''
        headingRef.current.textContent = ''
        const words = text.split(' ')
        words.forEach((word, i) => {
          const wrapper = document.createElement('span')
          wrapper.className = 'overflow-hidden inline-block'
          const inner = document.createElement('span')
          inner.textContent = word + (i < words.length - 1 ? '\u00A0' : '')
          inner.className = 'inline-block'
          wrapper.appendChild(inner)
          headingRef.current!.appendChild(wrapper)
        })

        gsap.from(headingRef.current.querySelectorAll('span > span'), {
          yPercent: 100,
          opacity: 0,
          duration: 0.8,
          stagger: 0.06,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        })
      }

      // Body text fade in
      if (bodyRef.current) {
        gsap.from(bodyRef.current.children, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: bodyRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        })
      }

      // Image parallax float on mouse
      if (imageRef.current) {
        gsap.from(imageRef.current, {
          opacity: 0,
          scale: 0.9,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        })
      }

      // Stats count up
      statValuesRef.current.forEach((el, i) => {
        if (!el) return
        const anim = createCountUpAnimation(el, stats[i].value, {
          suffix: stats[i].suffix,
          duration: 2,
        })

        ScrollTrigger.create({
          trigger: el,
          start: 'top 85%',
          onEnter: () => anim.play(),
        })
      })

      // Stats container fade in
      if (statsRef.current) {
        gsap.from(statsRef.current.children, {
          opacity: 0,
          y: 30,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        })
      }
    }, section)

    return () => ctx.revert()
  }, [])

  // Mouse tilt for image
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return
    const rect = imageRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height

    gsap.to(imageRef.current, {
      rotateY: x * 10,
      rotateX: -y * 10,
      duration: 0.5,
      ease: 'power2.out',
    })
  }

  const handleMouseLeave = () => {
    if (!imageRef.current) return
    gsap.to(imageRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.8,
      ease: 'elastic.out(1, 0.5)',
    })
  }

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-32 md:py-48 px-6 md:px-12"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
          {/* Text content */}
          <div>
            <span className="text-accent text-sm font-body tracking-widest uppercase mb-4 block">
              About Me
            </span>
            <h2
              ref={headingRef}
              className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-8"
            >
              {aboutText.heading}
            </h2>
            <div ref={bodyRef} className="space-y-4">
              {aboutText.body.split('\n\n').map((paragraph, i) => (
                <p key={i} className="text-gray-400 font-body leading-relaxed text-base md:text-lg">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Image with 3D tilt */}
          <div
            ref={imageRef}
            className="relative aspect-[3/4] rounded-2xl overflow-hidden"
            style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-dark-200 to-dark-300 rounded-2xl" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-display text-8xl text-accent/20 font-bold">AR</span>
            </div>
            {/* Decorative border */}
            <div className="absolute inset-4 border border-accent/20 rounded-xl" />
          </div>
        </div>

        {/* Stats */}
        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24">
          {stats.map((stat, i) => (
            <div key={stat.label} className="text-center">
              <span
                ref={(el) => { statValuesRef.current[i] = el }}
                className="font-display text-4xl md:text-5xl font-bold text-accent block"
              >
                0{stat.suffix}
              </span>
              <span className="text-gray-500 font-body text-sm tracking-wider uppercase mt-2 block">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
