'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function useGsap(
  callback: (gsapInstance: typeof gsap) => void | (() => void),
  deps: React.DependencyList = []
) {
  const ctx = useRef<gsap.Context | null>(null)

  useEffect(() => {
    ctx.current = gsap.context(() => {
      callback(gsap)
    })

    return () => {
      ctx.current?.revert()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return ctx
}
