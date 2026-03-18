'use client'

import { useEffect, useState, useCallback } from 'react'
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import LoadingScreen from '@/components/LoadingScreen'
import CustomCursor from '@/components/CustomCursor'
import Navigation from '@/components/Navigation'
import HeroParallax from '@/components/HeroParallax'
import About from '@/components/About'
import ProjectsHorizontalScroll from '@/components/ProjectsHorizontalScroll'
import Skills from '@/components/Skills'
import Timeline from '@/components/Timeline'
import Gallery from '@/components/Gallery'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [isReady, setIsReady] = useState(false)

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false)
    setIsReady(true)
  }, [])

  useEffect(() => {
    if (!isReady) return

    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    // Responsive - disable heavy animations on mobile
    ScrollTrigger.matchMedia({
      '(max-width: 768px)': function () {
        // Simpler animations for mobile handled within components
      },
    })

    return () => {
      lenis.destroy()
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [isReady])

  return (
    <main>
      <CustomCursor />

      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}

      <div style={{ visibility: isLoading ? 'hidden' : 'visible' }}>
        <Navigation />
        <HeroParallax />
        <About />
        <ProjectsHorizontalScroll />
        <Skills />
        <Timeline />
        <Gallery />
        <Contact />
        <Footer />
      </div>
    </main>
  )
}
