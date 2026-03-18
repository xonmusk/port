'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const outlineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot = dotRef.current
    const outline = outlineRef.current
    if (!dot || !outline) return

    // Check for touch device
    if ('ontouchstart' in window) return

    const moveCursor = (e: MouseEvent) => {
      gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.1, ease: 'power2.out' })
      gsap.to(outline, { x: e.clientX, y: e.clientY, duration: 0.3, ease: 'power2.out' })
    }

    const handleMouseEnter = () => {
      dot.classList.add('hovering')
      outline.classList.add('hovering')
    }

    const handleMouseLeave = () => {
      dot.classList.remove('hovering')
      outline.classList.remove('hovering')
    }

    window.addEventListener('mousemove', moveCursor)

    const hoverElements = document.querySelectorAll('a, button, [data-cursor-hover]')
    hoverElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mouseleave', handleMouseLeave)
    })

    // Re-observe for dynamically added elements
    const observer = new MutationObserver(() => {
      const newHoverElements = document.querySelectorAll('a, button, [data-cursor-hover]')
      newHoverElements.forEach((el) => {
        el.addEventListener('mouseenter', handleMouseEnter)
        el.addEventListener('mouseleave', handleMouseLeave)
      })
    })
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      hoverElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={outlineRef} className="cursor-outline" />
    </>
  )
}
