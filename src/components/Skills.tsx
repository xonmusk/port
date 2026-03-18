'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { skills, techIcons } from '@/lib/data'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const barsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      // Section heading
      gsap.from('.skills-heading > *', {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.skills-heading',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })

      // Skill bars animate
      barsRef.current.forEach((bar, i) => {
        if (!bar) return
        const fill = bar.querySelector('.skill-fill') as HTMLElement
        if (!fill) return

        gsap.from(bar, {
          opacity: 0,
          x: -30,
          duration: 0.6,
          delay: i * 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: bar,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        })

        gsap.fromTo(
          fill,
          { width: '0%' },
          {
            width: `${skills[i].level}%`,
            duration: 1.2,
            delay: i * 0.1 + 0.3,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: bar,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        )
      })

      // Tech icons float animation
      gsap.from('.tech-icon', {
        opacity: 0,
        scale: 0,
        duration: 0.5,
        stagger: {
          each: 0.08,
          from: 'random',
        },
        ease: 'back.out(2)',
        scrollTrigger: {
          trigger: '.tech-icons-container',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative py-32 md:py-48 px-6 md:px-12"
    >
      <div className="max-w-7xl mx-auto">
        <div className="skills-heading mb-16">
          <span className="text-accent text-sm font-body tracking-widest uppercase mb-4 block">
            Expertise
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white">
            Skills & Tools
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Skill bars */}
          <div className="space-y-8">
            {skills.map((skill, i) => (
              <div
                key={skill.name}
                ref={(el) => { barsRef.current[i] = el }}
                className="group"
              >
                <div className="flex justify-between mb-2">
                  <span className="font-body text-gray-300 text-sm tracking-wider">
                    {skill.name}
                  </span>
                  <span className="font-body text-accent text-sm">
                    {skill.level}%
                  </span>
                </div>
                <div className="h-1.5 bg-dark-300 rounded-full overflow-hidden">
                  <div
                    className="skill-fill h-full rounded-full bg-gradient-to-r from-accent-dark via-accent to-accent-light"
                    style={{ width: '0%' }}
                  />
                </div>
                <span className="text-xs text-gray-600 font-body mt-1 block">
                  {skill.category}
                </span>
              </div>
            ))}
          </div>

          {/* Tech icons floating grid */}
          <div className="tech-icons-container flex flex-wrap gap-4 items-start content-start">
            {techIcons.map((tech) => (
              <div
                key={tech}
                className="tech-icon px-5 py-3 rounded-xl border border-dark-300 bg-dark-100/50 hover:border-accent/40 hover:bg-accent/5 transition-all duration-300 group"
                data-cursor-hover
              >
                <span className="font-body text-sm text-gray-400 group-hover:text-accent transition-colors">
                  {tech}
                </span>
              </div>
            ))}

            {/* Decorative floating elements */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 opacity-20 pointer-events-none">
              <div className="w-full h-full rounded-full border border-accent/20 animate-pulse-slow" />
              <div className="absolute inset-8 rounded-full border border-accent/10 animate-pulse-slow" style={{ animationDelay: '1s' }} />
              <div className="absolute inset-16 rounded-full border border-accent/5 animate-pulse-slow" style={{ animationDelay: '2s' }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
