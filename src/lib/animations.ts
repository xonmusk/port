import gsap from 'gsap'

export const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  duration: 1,
  ease: 'power3.out',
}

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  duration: 0.8,
  ease: 'power2.out',
}

export const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  duration: 0.6,
  ease: 'back.out(1.7)',
}

export const slideInLeft = {
  initial: { opacity: 0, x: -100 },
  animate: { opacity: 1, x: 0 },
  duration: 0.8,
  ease: 'power3.out',
}

export const slideInRight = {
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0 },
  duration: 0.8,
  ease: 'power3.out',
}

export const staggerChildren = {
  staggerAmount: 0.1,
  ease: 'power3.out',
}

export function createSplitTextAnimation(
  element: HTMLElement,
  options?: { stagger?: number; duration?: number; y?: number }
) {
  const text = element.textContent || ''
  element.textContent = ''

  const words = text.split(' ')
  words.forEach((word, i) => {
    const wrapper = document.createElement('span')
    wrapper.className = 'split-line'
    const inner = document.createElement('span')
    inner.textContent = word + (i < words.length - 1 ? '\u00A0' : '')
    inner.style.display = 'inline-block'
    inner.style.transform = `translateY(${options?.y ?? 100}%)`
    inner.style.opacity = '0'
    wrapper.appendChild(inner)
    element.appendChild(wrapper)
  })

  const spans = element.querySelectorAll('.split-line > span')
  return gsap.to(spans, {
    y: '0%',
    opacity: 1,
    duration: options?.duration ?? 0.8,
    stagger: options?.stagger ?? 0.05,
    ease: 'power3.out',
    paused: true,
  })
}

export function createCountUpAnimation(
  element: HTMLElement,
  endValue: number,
  options?: { duration?: number; suffix?: string }
) {
  const obj = { value: 0 }
  return gsap.to(obj, {
    value: endValue,
    duration: options?.duration ?? 2,
    ease: 'power2.out',
    onUpdate: () => {
      element.textContent = Math.round(obj.value) + (options?.suffix ?? '')
    },
    paused: true,
  })
}
