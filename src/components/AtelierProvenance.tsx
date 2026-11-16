import { Award, ShieldCheck, Sparkles } from 'lucide-react';

export function AtelierProvenance() {
  return (
    <section className="bg-[#0E0D0C] text-white py-14 lg:py-20 border-t border-[#26211A] relative overflow-hidden">
      {/* Subtle gold radiant aura in background */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#8E6718]/10 blur-[120px] pointer-events-none rounded-full"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#DFC684] mb-2.5">
            The Atelier Standard
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight text-balance">
            Uncompromising Nobility Cast in Gold and Stone
          </h2>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#8E6718] to-transparent mx-auto mt-4 mb-4" />
          <p className="text-sm sm:text-base text-[#A89F91] leading-relaxed">
            Every Maison Aurelia piece is individually turned, electroplated in pure 24k gold, and
            fitted to hand-selected stone plinths for institutions, championships, and lifelong honors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* Pillar 1 */}
          <div className="p-6 sm:p-8 rounded-lg bg-[#161412] border border-[#2B251D] flex flex-col justify-between hover:border-[#8E6718]/50 transition-colors">
            <div>
              <div className="w-12 h-12 rounded-full bg-[#201D19] border border-[#3D3528] flex items-center justify-center mb-5 text-[#DFC684]">
                <Sparkles className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <p className="text-xs font-medium tracking-[0.16em] uppercase text-[#8E6718] mb-1.5">
                01. Metallurgy
              </p>
              <h3 className="font-display text-2xl font-semibold text-white mb-2.5">
                24k Gold Electroplating
              </h3>
              <p className="text-sm text-[#9E9589] leading-relaxed">
                Hand-spun from heavy-gauge solid brass, burnished by master polishers, and triple-plated
                in 24k gold with a molecular clear-coat lacquer that prevents oxidation for generations.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-[#262119] flex items-center justify-between text-xs text-[#DFC684]/80">
              <span>Pure 24k Bright &amp; Satin Gold</span>
              <span className="font-medium text-[#8E6718]">★ Guaranteed</span>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="p-6 sm:p-8 rounded-lg bg-[#161412] border border-[#2B251D] flex flex-col justify-between hover:border-[#8E6718]/50 transition-colors">
            <div>
              <div className="w-12 h-12 rounded-full bg-[#201D19] border border-[#3D3528] flex items-center justify-center mb-5 text-[#DFC684]">
                <Award className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <p className="text-xs font-medium tracking-[0.16em] uppercase text-[#8E6718] mb-1.5">
                02. Mineral Foundation
              </p>
              <h3 className="font-display text-2xl font-semibold text-white mb-2.5">
                Carrara Marble &amp; Travertine
              </h3>
              <p className="text-sm text-[#9E9589] leading-relaxed">
                Quarried in Tuscany and Rome, each pedestal is precision-honed, beveled, and weighted to
                provide ceremonial gravitas. Fitted with archival velvet baize to protect presentation surfaces.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-[#262119] flex items-center justify-between text-xs text-[#DFC684]/80">
              <span>Authentic Natural Stone Plinths</span>
              <span className="font-medium text-[#8E6718]">★ Weighted Base</span>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="p-6 sm:p-8 rounded-lg bg-[#161412] border border-[#2B251D] flex flex-col justify-between hover:border-[#8E6718]/50 transition-colors">
            <div>
              <div className="w-12 h-12 rounded-full bg-[#201D19] border border-[#3D3528] flex items-center justify-center mb-5 text-[#DFC684]">
                <ShieldCheck className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <p className="text-xs font-medium tracking-[0.16em] uppercase text-[#8E6718] mb-1.5">
                03. Bespoke Inscription
              </p>
              <h3 className="font-display text-2xl font-semibold text-white mb-2.5">
                White-Glove Presentation
              </h3>
              <p className="text-sm text-[#9E9589] leading-relaxed">
                Diamond-drag engraved in-house with proof verification. Presented inside an ivory
                presentation case accompanied by white cotton handling gloves and an engraved accuracy seal.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-[#262119] flex items-center justify-between text-xs text-[#DFC684]/80">
              <span>Complimentary On Every Order</span>
              <span className="font-medium text-[#8E6718]">★ Atelier Certified</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
