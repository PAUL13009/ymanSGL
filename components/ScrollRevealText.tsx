'use client'

import { useRef, useEffect, useState, useCallback } from 'react'

interface ScrollRevealTextProps {
  text: string
  as?: 'h2' | 'p' | 'span'
  id?: string
  className?: string
  style?: React.CSSProperties
  containerRef?: React.RefObject<HTMLElement | null>
}

export default function ScrollRevealText({ text, as: Tag = 'p', id, className = '', style = {}, containerRef }: ScrollRevealTextProps) {
  const innerRef = useRef<HTMLElement>(null)
  const [revealProgress, setRevealProgress] = useState<number[]>([])

  const updateProgress = useCallback(() => {
    const container = containerRef?.current ?? innerRef.current?.closest('section') ?? null
    if (!container) return

    const rect = container.getBoundingClientRect()
    const windowHeight = window.innerHeight

    const sectionHeight = rect.height
    const totalRange = windowHeight + sectionHeight
    const scrolledThrough = windowHeight - rect.top
    const rawProgress = Math.max(0, Math.min(1, scrolledThrough / totalRange))

    // Étaler la révélation sur 15%–65% du scroll — termine plus tôt
    const progress = rawProgress < 0.15 ? 0 : rawProgress > 0.65 ? 1 : (rawProgress - 0.15) / 0.5

    const chars = text.split('')
    const total = chars.length
    const progressPerChar = total > 0 ? 1 / total : 1
    const progresses = chars.map((_, i) => {
      const charThreshold = i * progressPerChar * 0.9
      const charProgress = progress >= charThreshold
        ? Math.min(1, (progress - charThreshold) / (progressPerChar * 0.4))
        : 0
      return Math.min(1, charProgress)
    })

    setRevealProgress(progresses)
  }, [text, containerRef])

  useEffect(() => {
    const target = containerRef?.current ?? document
    const onScroll = () => {
      requestAnimationFrame(updateProgress)
    }

    updateProgress()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', updateProgress)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', updateProgress)
    }
  }, [updateProgress, containerRef])

  const chars = text.split('')

  return (
    <Tag
      ref={innerRef as any}
      id={id}
      className={className}
      style={style}
    >
      {chars.map((char, i) => (
        <span
          key={i}
          className="inline-block transition-colors duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
          style={{
            color: revealProgress[i] >= 1 ? 'rgb(255,255,255)' : `rgba(255,255,255,${0.2 + 0.8 * (revealProgress[i] || 0)})`,
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </Tag>
  )
}
