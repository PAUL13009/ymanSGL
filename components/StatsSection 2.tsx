'use client'

import CountUp from './CountUp'
import FadeContent from './FadeContent'

export default function StatsSection() {
  return (
    <section className="pt-20 pb-20 bg-white">
      <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {/* 10 ans d'expérience */}
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-serif mb-4" style={{ color: '#4682B4', fontFamily: 'var(--font-playfair), serif' }}>
                <CountUp
                  to={10}
                  from={0}
                  duration={2}
                  delay={0.1}
                />
                <span className="text-4xl md:text-5xl"> ans</span>
              </div>
              <p className="text-lg text-gray-700 font-light">
                d'expérience
              </p>
            </div>

            {/* + 25 transactions réalisées */}
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-serif mb-4" style={{ color: '#4682B4', fontFamily: 'var(--font-playfair), serif' }}>
                <span className="text-4xl md:text-5xl">+ </span>
                <CountUp
                  to={25}
                  from={0}
                  duration={2}
                  delay={0.3}
                />
              </div>
              <p className="text-lg text-gray-700 font-light">
                transactions réalisées
              </p>
            </div>

            {/* + 30 locations accompagnées */}
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-serif mb-4" style={{ color: '#4682B4', fontFamily: 'var(--font-playfair), serif' }}>
                <span className="text-4xl md:text-5xl">+ </span>
                <CountUp
                  to={30}
                  from={0}
                  duration={2}
                  delay={0.5}
                />
              </div>
              <p className="text-lg text-gray-700 font-light">
                locations accompagnées
              </p>
            </div>
          </div>
        </div>
      </FadeContent>
    </section>
  )
}

