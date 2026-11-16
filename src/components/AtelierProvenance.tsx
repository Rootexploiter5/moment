import { Award, ShieldCheck, Sparkles, MapPin } from 'lucide-react';

export function AtelierProvenance() {
  return (
      <section id="about" className="bg-[#1A1A1A] text-white py-14 lg:py-20 border-t border-[#2E2E2E] relative overflow-hidden">
        {/* Subtle gold radiant aura in background */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#D4AF37]/10 blur-[120px] pointer-events-none rounded-full"
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 mb-3 rounded-full bg-[#262626] border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold uppercase tracking-widest">
                <MapPin className="w-3.5 h-3.5" />
                <span>About Us · Kothamangalam, Kerala</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight text-balance">
                About Today Mementos
              </h2>
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-4 mb-4" />
              <p className="text-sm sm:text-base text-[#B3A99B] leading-relaxed">
                Founded in Kothamangalam, Today Mementos has grown into Kerala&apos;s trusted destination for celebrating
                milestones, championships, and lifelong achievements. From school and college fests to corporate galas
                and sports tournaments across Kerala, we design custom awards that honor excellence with dignity.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {/* Pillar 1 */}
              <div className="p-6 sm:p-8 rounded-lg bg-[#222222] border border-[#2E2E2E] flex flex-col justify-between hover:border-[#D4AF37]/60 transition-colors">
                <div>
                  <div className="w-12 h-12 rounded-full bg-[#1A1A1A] border border-[#3A3A3A] flex items-center justify-center mb-5 text-[#D4AF37]">
                    <Sparkles className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <p className="text-xs font-semibold tracking-[0.16em] uppercase text-[#D4AF37] mb-1.5">
                    01. Our Workshop
                  </p>
                  <h3 className="font-display text-2xl font-bold text-white mb-2.5">
                    Local Kothamangalam Artisans
                  </h3>
                  <p className="text-sm text-[#A69C8E] leading-relaxed">
                    Directly produced in our Kothamangalam workshop, our team oversees metal spinning, casting,
                    finishing, and custom mounting under one roof with zero compromise on craftsmanship.
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-[#2A2A2A] flex items-center justify-between text-xs text-[#F3E5AB]">
                  <span>Direct Workshop Production</span>
                  <span className="font-semibold text-[#D4AF37]">★ In-House Team</span>
                </div>
              </div>

              {/* Pillar 2 */}
              <div className="p-6 sm:p-8 rounded-lg bg-[#222222] border border-[#2E2E2E] flex flex-col justify-between hover:border-[#D4AF37]/60 transition-colors">
                <div>
                  <div className="w-12 h-12 rounded-full bg-[#1A1A1A] border border-[#3A3A3A] flex items-center justify-center mb-5 text-[#D4AF37]">
                    <Award className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <p className="text-xs font-semibold tracking-[0.16em] uppercase text-[#D4AF37] mb-1.5">
                    02. Quality Materials
                  </p>
                  <h3 className="font-display text-2xl font-bold text-white mb-2.5">
                    Kerala Teak, Crystal &amp; Metal
                  </h3>
                  <p className="text-sm text-[#A69C8E] leading-relaxed">
                    We hand-select solid Nilambur teak wood pedestals, lead-free optical crystal obelisks, and durable
                    metal alloys designed to resist tropical humidity and maintain an enduring showroom shine.
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-[#2A2A2A] flex items-center justify-between text-xs text-[#F3E5AB]">
                  <span>Solid Wood, Stone &amp; Crystal</span>
                  <span className="font-semibold text-[#D4AF37]">★ Built to Last</span>
                </div>
              </div>

              {/* Pillar 3 */}
              <div className="p-6 sm:p-8 rounded-lg bg-[#222222] border border-[#2E2E2E] flex flex-col justify-between hover:border-[#D4AF37]/60 transition-colors">
                <div>
                  <div className="w-12 h-12 rounded-full bg-[#1A1A1A] border border-[#3A3A3A] flex items-center justify-center mb-5 text-[#D4AF37]">
                    <ShieldCheck className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <p className="text-xs font-semibold tracking-[0.16em] uppercase text-[#D4AF37] mb-1.5">
                    03. Complete Service
                  </p>
                  <h3 className="font-display text-2xl font-bold text-white mb-2.5">
                    Complimentary Inscription
                  </h3>
                  <p className="text-sm text-[#A69C8E] leading-relaxed">
                    High-definition laser etching and diamond engraving are included free with every award. We provide
                    vector proofing before production and fast, insured delivery to all Kerala districts.
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-[#2A2A2A] flex items-center justify-between text-xs text-[#F3E5AB]">
                  <span>Free with Every Award</span>
                  <span className="font-semibold text-[#D4AF37]">★ All-Kerala Dispatch</span>
                </div>
              </div>
            </div>
          </div>
      </section>
      );
}
