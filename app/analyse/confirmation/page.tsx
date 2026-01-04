'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import VariableProximity from '@/components/VariableProximity'
import FadeContent from '@/components/FadeContent'
import AnimatedContent from '@/components/AnimatedContent'

export default function ConfirmationPage() {
  return (
    <main className="min-h-screen bg-stone-50">
      <Navbar />
      
      <section className="pt-32 pb-20">
        <FadeContent duration={1000} ease="power2.out" threshold={0.2}>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* H1 - Titre */}
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-light mb-6" style={{ color: '#4682B4', fontFamily: 'var(--font-playfair), serif' }}>
                Votre demande a bien été reçue
              </h1>
            </div>

            {/* Paragraphe 1 */}
            <AnimatedContent
              distance={50}
              direction="vertical"
              reverse={false}
              duration={0.8}
              ease="power3.out"
              initialOpacity={0}
              animateOpacity={true}
              threshold={0.2}
              delay={0}
            >
              <div className="mb-8">
                <p className="text-lg md:text-xl leading-relaxed text-gray-700 mb-3" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  Votre demande d'analyse a été transmise à l'Agence YL.
                </p>
                <p className="text-lg md:text-xl leading-relaxed text-gray-700" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  Chaque dossier est étudié individuellement afin de vérifier sa cohérence avec les conditions réelles du marché.
                </p>
              </div>
            </AnimatedContent>

            {/* Paragraphe 2 */}
            <AnimatedContent
              distance={50}
              direction="vertical"
              reverse={false}
              duration={0.8}
              ease="power3.out"
              initialOpacity={0}
              animateOpacity={true}
              threshold={0.2}
              delay={0.1}
            >
              <div className="mb-8">
                <p className="text-lg md:text-xl leading-relaxed text-gray-700 mb-3" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  Notre approche repose sur une analyse précise et un positionnement tarifaire réaliste.
                </p>
                <p className="text-lg md:text-xl leading-relaxed text-gray-700" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  Pour cette raison, nous n'acceptons pas tous les projets de vente.
                </p>
              </div>
            </AnimatedContent>

            {/* Paragraphe 3 */}
            <AnimatedContent
              distance={50}
              direction="vertical"
              reverse={false}
              duration={0.8}
              ease="power3.out"
              initialOpacity={0}
              animateOpacity={true}
              threshold={0.2}
              delay={0.2}
            >
              <div className="mb-8">
                <p className="text-lg md:text-xl leading-relaxed text-gray-700 mb-3" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  Si votre projet correspond à notre méthode, nous vous contacterons sous 48 heures afin d'échanger sur votre bien et sa situation.
                </p>
                <p className="text-lg md:text-xl leading-relaxed text-gray-700" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  Dans le cas contraire, nous ne donnerons pas suite à la demande.
                </p>
              </div>
            </AnimatedContent>

            {/* Paragraphe 4 */}
            <AnimatedContent
              distance={50}
              direction="vertical"
              reverse={false}
              duration={0.8}
              ease="power3.out"
              initialOpacity={0}
              animateOpacity={true}
              threshold={0.2}
              delay={0.3}
            >
              <div className="mb-8">
                <p className="text-lg md:text-xl leading-relaxed text-gray-700 mb-4" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  Lors de cet échange, l'objectif ne sera pas de vous "convaincre", mais de vérifier ensemble :
                </p>
                <ul className="text-lg md:text-xl leading-relaxed text-gray-700 space-y-2 mb-4" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  <li className="flex items-start">
                    <span className="mr-2 mt-1" style={{ color: '#4682B4' }}>•</span>
                    <span>la cohérence du prix par rapport au marché,</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 mt-1" style={{ color: '#4682B4' }}>•</span>
                    <span>les conditions de mise en vente,</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 mt-1" style={{ color: '#4682B4' }}>•</span>
                    <span>et la faisabilité d'une vente efficace.</span>
                  </li>
                </ul>
              </div>
            </AnimatedContent>

            {/* Encadré discret */}
            <AnimatedContent
              distance={50}
              direction="vertical"
              reverse={false}
              duration={0.8}
              ease="power3.out"
              initialOpacity={0}
              animateOpacity={true}
              threshold={0.2}
              delay={0.4}
            >
              <div className="bg-blue-50 border-2 rounded-lg p-6 mb-8" style={{ borderColor: '#4682B4' }}>
                <p className="text-sm md:text-base font-semibold mb-2" style={{ color: '#4682B4', fontFamily: 'var(--font-poppins), sans-serif' }}>
                  À savoir
                </p>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  Une estimation réaliste peut parfois être inférieure aux attentes initiales du vendeur.
                  <br />
                  C'est une étape nécessaire pour vendre dans de bonnes conditions.
                </p>
              </div>
            </AnimatedContent>

            {/* CTA Secondaire */}
            <AnimatedContent
              distance={50}
              direction="vertical"
              reverse={false}
              duration={0.8}
              ease="power3.out"
              initialOpacity={0}
              animateOpacity={true}
              threshold={0.2}
              delay={0.5}
            >
              <div className="text-center">
                <a
                  href="/estimation"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all hover:shadow-md hover:scale-105"
                  style={{
                    backgroundColor: 'transparent',
                    color: '#4682B4',
                    border: '2px solid #4682B4',
                    fontFamily: 'var(--font-poppins), sans-serif'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#4682B4'
                    e.currentTarget.style.color = 'white'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent'
                    e.currentTarget.style.color = '#4682B4'
                  }}
                >
                  <span>📄</span>
                  <span>Comprendre comment se construit une estimation réaliste</span>
                </a>
              </div>
            </AnimatedContent>
          </div>
        </FadeContent>
      </section>

      <Footer />
    </main>
  )
}


