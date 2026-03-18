'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { galleryImages } from '@/lib/data'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Gallery() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [lightboxImage, setLightboxImage] = useState<typeof galleryImages[0] | null>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      // Section heading
      gsap.from('.gallery-heading > *', {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.gallery-heading',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })

      // Gallery items reveal with clip-path
      document.querySelectorAll('.gallery-item').forEach((item, i) => {
        gsap.from(item, {
          clipPath: 'inset(100% 0% 0% 0%)',
          opacity: 0,
          duration: 1,
          delay: i * 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        })

        // Parallax shift on scroll
        gsap.to(item.querySelector('.gallery-image'), {
          yPercent: -10,
          ease: 'none',
          scrollTrigger: {
            trigger: item,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        })
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <>
      <section
        ref={sectionRef}
        id="gallery"
        className="relative py-32 md:py-48 px-6 md:px-12"
      >
        <div className="max-w-7xl mx-auto">
          <div className="gallery-heading text-center mb-16">
            <span className="text-accent text-sm font-body tracking-widest uppercase mb-4 block">
              Visual Work
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white">
              Gallery
            </h2>
          </div>

          {/* Masonry grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {galleryImages.map((image) => (
              <div
                key={image.id}
                className="gallery-item break-inside-avoid rounded-xl overflow-hidden relative group"
                onClick={() => setLightboxImage(image)}
                data-cursor-hover
                style={{ cursor: 'none' }}
              >
                <div className="gallery-image relative" style={{ aspectRatio: `${image.width}/${image.height}` }}>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading="lazy"
                  />
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/40 transition-colors duration-300 flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-75 group-hover:scale-100"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            className="fixed inset-0 z-[9995] flex items-center justify-center bg-dark/95 backdrop-blur-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImage(null)}
          >
            <button
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-dark-200/80 flex items-center justify-center hover:bg-accent/20 transition-colors z-10"
              onClick={() => setLightboxImage(null)}
              data-cursor-hover
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <motion.div
              className="relative w-[90vw] max-w-5xl aspect-video"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={lightboxImage.src}
                alt={lightboxImage.alt}
                fill
                className="object-contain rounded-lg"
                sizes="90vw"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
