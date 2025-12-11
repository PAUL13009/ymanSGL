'use client'

import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import { useProximityContainer } from '@/components/ProximityProvider'
import VariableProximity from '@/components/VariableProximity'
import CustomSelect from '@/components/CustomSelect'
import CustomDateInput from '@/components/CustomDateInput'

export default function Reservation() {
  const mainRef = useRef<HTMLElement>(null)
  const containerRef = useProximityContainer()
  const heroContainerRef = useRef<HTMLElement>(null)
  const [arrivalDate, setArrivalDate] = useState('')
  const [departureDate, setDepartureDate] = useState('')
  const [guests, setGuests] = useState('2')
  const [errors, setErrors] = useState<{ arrival?: string; departure?: string }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  useEffect(() => {
    if (mainRef.current && containerRef) {
      containerRef.current = mainRef.current
    }
  }, [containerRef])

  // Date minimale : aujourd'hui
  const today = new Date().toISOString().split('T')[0]

  const validateDates = () => {
    const newErrors: { arrival?: string; departure?: string } = {}
    
    if (!arrivalDate) {
      newErrors.arrival = 'Veuillez sélectionner une date d\'arrivée'
    }
    
    if (!departureDate) {
      newErrors.departure = 'Veuillez sélectionner une date de départ'
    }
    
    if (arrivalDate && departureDate) {
      const arrival = new Date(arrivalDate)
      const departure = new Date(departureDate)
      
      if (departure <= arrival) {
        newErrors.departure = 'La date de départ doit être après la date d\'arrivée'
      }
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitMessage(null)
    
    if (!validateDates()) {
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // Simulation d'une soumission
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setSubmitMessage({
        type: 'success',
        text: 'Merci pour votre demande. Nous vous contacterons bientôt.'
      })
      
    } catch (error) {
      setSubmitMessage({
        type: 'error',
        text: 'Une erreur est survenue. Veuillez réessayer.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main ref={mainRef} className="min-h-screen">
      <Navbar />
      
      <section ref={heroContainerRef as any} id="reservation-hero" className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Image de fond */}
        <div className="absolute inset-0 z-0">
          <div className="relative w-full h-full">
            <Image
              src="/images/hero.jpg"
              alt="Villa Le Nid Céleste - Réservation"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
          </div>
        </div>

        {/* Formulaire de réservation centré */}
        <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto w-full">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-8 md:p-12 shadow-2xl">
            <h2 className="text-2xl md:text-3xl font-serif text-gold mb-6 text-center" style={{ fontFamily: 'var(--font-playfair), serif' }}>
              <VariableProximity
                label="Réservez votre séjour"
                fromFontVariationSettings="'wght' 400"
                toFontVariationSettings="'wght' 700"
                containerRef={null}
                radius={100}
                falloff="linear"
              />
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <CustomDateInput
                  label="Arrivée"
                  className="w-full"
                  value={arrivalDate}
                  onChange={setArrivalDate}
                  min={today}
                  error={errors.arrival}
                />
                <CustomDateInput
                  label="Départ"
                  className="w-full"
                  value={departureDate}
                  onChange={setDepartureDate}
                  min={arrivalDate || today}
                  error={errors.departure}
                />
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    <VariableProximity
                      label="Voyageurs"
                      fromFontVariationSettings="'wght' 400"
                      toFontVariationSettings="'wght' 600"
                      containerRef={null}
                      radius={60}
                      falloff="linear"
                    />
                  </label>
                  <CustomSelect
                    options={[
                      { value: '1', label: '1 voyageur' },
                      { value: '2', label: '2 voyageurs' },
                      { value: '3', label: '3 voyageurs' },
                      { value: '4', label: '4 voyageurs' },
                      { value: '5', label: '5+ voyageurs' },
                    ]}
                    className="w-full"
                    value={guests}
                    onChange={setGuests}
                    name="guests"
                  />
                </div>
              </div>
              
              {submitMessage && (
                <div className={`p-4 rounded-lg ${
                  submitMessage.type === 'success' 
                    ? 'bg-green-50 text-green-700 border border-green-200' 
                    : 'bg-red-50 text-red-700 border border-red-200'
                }`}>
                  <p className="text-sm">
                    <VariableProximity
                      label={submitMessage.text}
                      fromFontVariationSettings="'wght' 400"
                      toFontVariationSettings="'wght' 500"
                      containerRef={null}
                      radius={60}
                      falloff="linear"
                    />
                  </p>
                </div>
              )}
              
              <button 
                type="submit"
                disabled={isSubmitting}
                className={`w-full px-8 py-4 bg-gold text-white rounded-full font-semibold transition-all transform shadow-lg ${
                  isSubmitting 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:bg-gold-dark hover:scale-105'
                }`}
              >
                <VariableProximity
                  label={isSubmitting ? 'Traitement...' : 'Vérifier la disponibilité'}
                  fromFontVariationSettings="'wght' 400"
                  toFontVariationSettings="'wght' 600"
                  containerRef={null}
                  radius={70}
                  falloff="linear"
                />
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  )
}
