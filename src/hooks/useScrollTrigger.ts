'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface UseScrollTriggerOptions {
  trigger?: string | HTMLElement
  start?: string
  end?: string
  scrub?: boolean | number
  pin?: boolean
  markers?: boolean
  toggleActions?: string
  onEnter?: () => void
  onLeave?: () => void
  onEnterBack?: () => void
  onLeaveBack?: () => void
}

export function useScrollTrigger(
  animation: (tl: gsap.core.Timeline) => void,
  options: UseScrollTriggerOptions,
  deps: React.DependencyList = []
) {
  const triggerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!triggerRef.current) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: options.trigger || triggerRef.current,
        start: options.start || 'top center',
        end: options.end || 'bottom center',
        scrub: options.scrub ?? false,
        pin: options.pin ?? false,
        markers: options.markers ?? false,
        toggleActions: options.toggleActions || 'play none none none',
        onEnter: options.onEnter,
        onLeave: options.onLeave,
        onEnterBack: options.onEnterBack,
        onLeaveBack: options.onLeaveBack,
      },
    })

    animation(tl)

    return () => {
      tl.scrollTrigger?.kill()
      tl.kill()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return triggerRef
}
