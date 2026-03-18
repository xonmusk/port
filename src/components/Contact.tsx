'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { siteConfig } from '@/lib/data'
import MagneticButton from './MagneticButton'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const socialLinks = [
  { name: 'GitHub', href: siteConfig.socials.github, icon: 'GH' },
  { name: 'Twitter', href: siteConfig.socials.twitter, icon: 'TW' },
  { name: 'LinkedIn', href: siteConfig.socials.linkedin, icon: 'LI' },
  { name: 'Dribbble', href: siteConfig.socials.dribbble, icon: 'DR' },
]

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const heading = headingRef.current
    if (!section || !heading) return

    const ctx = gsap.context(() => {
      // Split text heading animation
      const text = heading.textContent || ''
      heading.textContent = ''
      const words = text.split(' ')
      words.forEach((word, i) => {
        const wrapper = document.createElement('span')
        wrapper.className = 'overflow-hidden inline-block'
        const inner = document.createElement('span')
        inner.textContent = word + (i < words.length - 1 ? '\u00A0' : '')
        inner.className = 'inline-block'
        wrapper.appendChild(inner)
        heading.appendChild(wrapper)
      })

      gsap.from(heading.querySelectorAll('span > span'), {
        yPercent: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.06,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: heading,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })

      // Email link
      gsap.from('.contact-email', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 0.3,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.contact-email',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })

      // Social links
      gsap.from('.social-link', {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.social-links-container',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })

      // Background particles
      document.querySelectorAll('.contact-particle').forEach((particle) => {
        gsap.to(particle, {
          y: 'random(-30, 30)',
          x: 'random(-20, 20)',
          duration: 'random(3, 6)',
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-32 md:py-48 px-6 md:px-12 overflow-hidden"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(201, 168, 76, 0.15) 0%, transparent 70%)',
          }}
        />
        {/* Floating particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="contact-particle absolute rounded-full"
            style={{
              width: Math.random() * 4 + 2 + 'px',
              height: Math.random() * 4 + 2 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              background: `rgba(201, 168, 76, ${Math.random() * 0.3 + 0.1})`,
            }}
          />
        ))}
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <span className="text-accent text-sm font-body tracking-widest uppercase mb-6 block">
          Get In Touch
        </span>

        <h2
          ref={headingRef}
          className="font-display text-4xl md:text-6xl lg:text-8xl font-bold text-white leading-tight mb-8"
        >
          {"Let's Create Something Amazing Together"}
        </h2>

        <div className="contact-email mb-12">
          <MagneticButton
            as="a"
            href={`mailto:${siteConfig.email}`}
            className="inline-block text-xl md:text-2xl font-body text-accent hover:text-accent-light transition-colors duration-300 border-b-2 border-accent/30 hover:border-accent pb-1"
            strength={0.15}
          >
            {siteConfig.email}
          </MagneticButton>
        </div>

        <div className="social-links-container flex items-center justify-center gap-6">
          {socialLinks.map((social) => (
            <MagneticButton
              key={social.name}
              as="a"
              href={social.href}
              className="social-link w-14 h-14 rounded-full border border-dark-300 bg-dark-100/50 flex items-center justify-center hover:border-accent/40 hover:bg-accent/10 transition-all duration-300 group"
              strength={0.3}
            >
              <span className="font-body text-sm text-gray-400 group-hover:text-accent transition-colors">
                {social.icon}
              </span>
            </MagneticButton>
          ))}
        </div>
      </div>
    </section>
  )
}
