'use client'

import Image from 'next/image'
import FadeContent from './FadeContent'
import VariableProximity from './VariableProximity'

interface TeamMember {
  id: number
  name: string
  role: string
  image: string
  imageAlt: string
  description?: string
}

export default function Team() {
  const containerRef = null

  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: 'Nom du membre',
      role: 'Fondatrice',
      image: '/images/DSC04823.jpg',
      imageAlt: 'Membre de l\'équipe - Agence Y L',
      description: 'Diplômée d\'un Bac+5 avec plus de 8 ans d\'expérience'
    },
    {
      id: 2,
      name: 'Nom du membre',
      role: 'Conseiller immobilier',
      image: '/images/terrasse.jpg',
      imageAlt: 'Membre de l\'équipe - Agence Y L',
      description: 'Expert en transactions immobilières'
    },
    {
      id: 3,
      name: 'Nom du membre',
      role: 'Conseiller immobilier',
      image: '/images/DSC04839.JPG',
      imageAlt: 'Membre de l\'équipe - Agence Y L',
      description: 'Spécialiste en location et gestion'
    }
  ]

  return (
    <section id="equipe" className="pt-20 pb-20 bg-stone-50">
      <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif mb-4 max-w-4xl mx-auto" style={{ color: '#4682B4', fontFamily: 'var(--font-playfair), serif' }}>
              <VariableProximity
                label="Notre équipe"
                fromFontVariationSettings="'wght' 400"
                toFontVariationSettings="'wght' 700"
                containerRef={null}
                radius={100}
                falloff="linear"
              />
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                {/* Photo */}
                <div className="relative h-80 w-full">
                  <Image
                    src={member.image}
                    alt={member.imageAlt}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Informations */}
                <div className="p-6">
                  <h3 className="text-xl font-serif mb-2" style={{ color: '#4682B4', fontFamily: 'var(--font-playfair), serif' }}>
                    <VariableProximity
                      label={member.name}
                      fromFontVariationSettings="'wght' 400"
                      toFontVariationSettings="'wght' 600"
                      containerRef={null}
                      radius={80}
                      falloff="linear"
                    />
                  </h3>
                  <p className="text-gray-600 mb-3">
                    <VariableProximity
                      label={member.role}
                      fromFontVariationSettings="'wght' 300"
                      toFontVariationSettings="'wght' 500"
                      containerRef={null}
                      radius={70}
                      falloff="linear"
                    />
                  </p>
                  {member.description && (
                    <p className="text-sm text-gray-500">
                      <VariableProximity
                        label={member.description}
                        fromFontVariationSettings="'wght' 300"
                        toFontVariationSettings="'wght' 400"
                        containerRef={null}
                        radius={60}
                        falloff="linear"
                      />
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </FadeContent>
    </section>
  )
}


