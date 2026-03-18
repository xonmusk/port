'use client'

import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

interface Project {
  id: number
  title: string
  subtitle: string
  description: string
  techStack: string[]
  image: string
  color: string
}

interface ProjectModalProps {
  project: Project | null
  isOpen: boolean
  onClose: () => void
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEsc)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!project) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[9995] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-dark/90 backdrop-blur-md"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            ref={modalRef}
            className="relative w-[90vw] max-w-4xl max-h-[85vh] overflow-y-auto rounded-2xl glass z-10"
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 50 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-dark-200/80 flex items-center justify-center hover:bg-accent/20 transition-colors"
              data-cursor-hover
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Hero image */}
            <div className="relative w-full aspect-video overflow-hidden rounded-t-2xl">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 90vw, 60vw"
              />
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(to top, ${project.color}, transparent)`,
                }}
              />
            </div>

            {/* Content */}
            <div className="p-8 md:p-12">
              <motion.span
                className="text-accent text-sm tracking-widest uppercase font-body"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {project.subtitle}
              </motion.span>

              <motion.h2
                className="font-display text-3xl md:text-5xl font-bold text-white mt-3 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                {project.title}
              </motion.h2>

              <motion.p
                className="text-gray-400 font-body leading-relaxed text-lg mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {project.description}
              </motion.p>

              {/* Tech stack */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
              >
                <h3 className="text-sm font-body tracking-widest uppercase text-gray-500 mb-3">
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-3">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-2 rounded-full border border-accent/30 text-accent text-sm font-body"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Additional screenshots placeholder */}
              <motion.div
                className="grid grid-cols-2 gap-4 mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {[1, 2].map((n) => (
                  <div
                    key={n}
                    className="aspect-video rounded-lg overflow-hidden relative"
                  >
                    <Image
                      src={`https://picsum.photos/seed/${project.title.toLowerCase().replace(/\s/g, '')}${n}/600/400`}
                      alt={`${project.title} screenshot ${n}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 40vw, 30vw"
                    />
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
