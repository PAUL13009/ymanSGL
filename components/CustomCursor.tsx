'use client'

import { useEffect, useState, useCallback } from 'react'
import { useCursor } from '@/context/CursorContext'

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 })
  const [isVisible, setIsVisible] = useState(false)
  const [hasPointer, setHasPointer] = useState(false)
  const cursorCtx = useCursor()
  const pillText = cursorCtx?.servicePillLabel ?? (cursorCtx?.overPropertyCard ? 'VOIR' : null)
  const showPill = pillText !== null

  useEffect(() => {
    const isPointerDevice = window.matchMedia('(pointer: fine)').matches
    const hasHover = window.matchMedia('(hover: hover)').matches
    setHasPointer(isPointerDevice && hasHover)
  }, [])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY })
    if (!isVisible) setIsVisible(true)
  }, [isVisible])

  const handleMouseEnter = useCallback(() => setIsVisible(true), [])
  const handleMouseLeave = useCallback(() => setIsVisible(false), [])

  useEffect(() => {
    if (!hasPointer) return

    window.addEventListener('mousemove', handleMouseMove)
    document.documentElement.addEventListener('mouseenter', handleMouseEnter)
    document.documentElement.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter)
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [hasPointer, handleMouseMove, handleMouseEnter, handleMouseLeave])

  if (!hasPointer) return null

  const baseTransform = `translate(${position.x}px, ${position.y}px) translate(-50%, -50%)`

  return (
    <>
      {/* Point blanc par défaut */}
      <div
        className="custom-cursor-dot pointer-events-none fixed left-0 top-0 z-[99999]"
        style={{
          width: 18,
          height: 18,
          borderRadius: '50%',
          backgroundColor: '#fff',
          boxShadow: '0 0 0 1px rgba(0,0,0,0.2)',
          transform: baseTransform,
          opacity: isVisible && !showPill ? 1 : 0,
          transition: 'opacity 0.18s cubic-bezier(0.4, 0, 0.2, 1)',
          willChange: 'transform',
        }}
        aria-hidden
      />
      {/* Pilule VOIR au survol des cartes */}
      <div
        className="custom-cursor-pill pointer-events-none fixed left-0 top-0 z-[99999] flex items-center justify-center"
        style={{
          transform: baseTransform,
          opacity: isVisible && showPill ? 1 : 0,
          transition: 'opacity 0.18s cubic-bezier(0.4, 0, 0.2, 1)',
          willChange: 'transform',
        }}
        aria-hidden
      >
        <span
          className="px-4 py-2 rounded-full bg-white/95 text-black font-bold text-sm uppercase tracking-wide"
          style={{
            fontFamily: 'var(--font-poppins), sans-serif',
            whiteSpace: 'nowrap',
          }}
        >
          {pillText}
        </span>
      </div>
    </>
  )
}
