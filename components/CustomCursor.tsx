'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { useCursor } from '@/context/CursorContext'

function detectFinePointer(): boolean {
  if (typeof window === 'undefined') return false
  const fine = window.matchMedia('(pointer: fine)').matches
  const hover = window.matchMedia('(hover: hover)').matches
  // Fallback desktop : évite curseur invisible si matchMedia est trop strict
  const desktopFallback = window.innerWidth >= 1024 && !('ontouchstart' in window)
  return (fine && hover) || desktopFallback
}

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [hasPointer, setHasPointer] = useState(false)
  const visibleRef = useRef(false)
  const cursorCtx = useCursor()
  const pillText = cursorCtx?.servicePillLabel ?? (cursorCtx?.overPropertyCard ? 'VOIR' : null)
  const showPill = pillText !== null

  useEffect(() => {
    const enabled = detectFinePointer()
    setHasPointer(enabled)
    document.documentElement.classList.toggle('custom-cursor-enabled', enabled)
    return () => {
      document.documentElement.classList.remove('custom-cursor-enabled')
    }
  }, [])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY })
    if (!visibleRef.current) {
      visibleRef.current = true
      setIsVisible(true)
    }
  }, [])

  const handleMouseEnter = useCallback(() => {
    visibleRef.current = true
    setIsVisible(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    visibleRef.current = false
    setIsVisible(false)
  }, [])

  useEffect(() => {
    if (!hasPointer) return

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
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
