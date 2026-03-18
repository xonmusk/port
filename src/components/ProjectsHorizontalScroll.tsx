'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import { projects } from '@/lib/data'
import ProjectModal from './ProjectModal'
import MagneticButton from './MagneticButton'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function ProjectsHorizontalScroll() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  useEffect(() => {
    const section = sectionRef.current
    const container = containerRef.current
    if (!section || !container) return

    const ctx = gsap.context(() => {
      const totalWidth = container.scrollWidth - window.innerWidth

      gsap.to(container, {
        x: -totalWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${totalWidth}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      // Section heading animation
      gsap.from('.projects-heading', {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  const openModal = (project: typeof projects[0]) => {
    setSelectedProject(project)
    setModalOpen(true)
  }

  return (
    <>
      <section
        ref={sectionRef}
        id="work"
        className="relative overflow-hidden"
      >
        {/* Section header */}
        <div className="absolute top-12 left-6 md:left-12 z-10 projects-heading">
          <span className="text-accent text-sm font-body tracking-widest uppercase">
            Selected Work
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white mt-2">
            Projects
          </h2>
        </div>

        {/* Drag hint */}
        <div className="absolute top-12 right-6 md:right-12 z-10 flex items-center gap-2 text-gray-500 projects-heading">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
          </svg>
          <span className="text-sm font-body tracking-wider">Scroll to explore</span>
        </div>

        {/* Horizontal scroll container */}
        <div
          ref={containerRef}
          className="flex items-center gap-8 md:gap-12 pl-6 md:pl-12 pt-32 pb-12 h-screen"
          style={{ width: 'fit-content' }}
        >
          {/* Spacer */}
          <div className="w-[10vw] flex-shrink-0" />

          {projects.map((project) => (
            <div
              key={project.id}
              className="relative flex-shrink-0 w-[80vw] md:w-[50vw] lg:w-[40vw] h-[60vh] md:h-[70vh] rounded-2xl overflow-hidden group"
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
              data-cursor-hover
            >
              {/* Background image */}
              <div className="absolute inset-0">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className={`object-cover transition-transform duration-700 ${
                    hoveredId === project.id ? 'scale-110' : 'scale-100'
                  }`}
                  sizes="(max-width: 768px) 80vw, 40vw"
                />
              </div>

              {/* Gradient overlay */}
              <div
                className="absolute inset-0 transition-opacity duration-500"
                style={{
                  background: `linear-gradient(to top, ${project.color} 0%, ${project.color}88 40%, transparent 100%)`,
                }}
              />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                <span className="text-accent/80 text-sm font-body tracking-widest uppercase">
                  {project.subtitle}
                </span>
                <h3 className="font-display text-2xl md:text-4xl font-bold text-white mt-2 mb-4">
                  {project.title}
                </h3>

                {/* Tech stack pills */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.techStack.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-3 py-1 rounded-full border border-white/20 text-white/70 font-body"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <MagneticButton
                  className="px-6 py-3 bg-accent/10 border border-accent/40 rounded-full text-accent text-sm font-body tracking-wider hover:bg-accent/20 transition-colors flex items-center gap-2"
                  onClick={() => openModal(project)}
                  strength={0.2}
                >
                  <span>More Info</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </MagneticButton>
              </div>

              {/* Project number */}
              <div className="absolute top-6 right-6">
                <span className="font-display text-6xl md:text-8xl font-bold text-white/5">
                  {String(project.id).padStart(2, '0')}
                </span>
              </div>
            </div>
          ))}

          {/* End spacer */}
          <div className="w-[10vw] flex-shrink-0" />
        </div>
      </section>

      <ProjectModal
        project={selectedProject}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  )
}
