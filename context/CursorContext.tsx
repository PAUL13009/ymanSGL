'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { usePathname } from 'next/navigation'

interface CursorContextType {
  overPropertyCard: boolean
  servicePillLabel: string | null
  setOverPropertyCard: (over: boolean) => void
  setOverServiceImage: (label: string | null) => void
}

const CursorContext = createContext<CursorContextType | null>(null)

export function CursorProvider({ children }: { children: ReactNode }) {
  const [overPropertyCard, setOverPropertyCard] = useState(false)
  const [servicePillLabel, setServicePillLabel] = useState<string | null>(null)
  const pathname = usePathname()

  // Réinitialiser le curseur à chaque changement de page
  useEffect(() => {
    setOverPropertyCard(false)
    setServicePillLabel(null)
  }, [pathname])

  return (
    <CursorContext.Provider value={{
      overPropertyCard,
      servicePillLabel,
      setOverPropertyCard,
      setOverServiceImage: setServicePillLabel,
    }}>
      {children}
    </CursorContext.Provider>
  )
}

export function useCursor() {
  const ctx = useContext(CursorContext)
  if (!ctx) return null
  return ctx
}
