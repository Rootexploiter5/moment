import { Award, ShieldCheck, Sparkles, MapPin } from 'lucide-react';

export function AtelierProvenance() {
  return (
    <section className="bg-[#1A1A1A] text-white py-14 lg:py-20 border-t border-[#2E2E2E] relative overflow-hidden">
      {/* Subtle gold radiant aura in background */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#D4AF37]/10 blur-[120px] pointer-events-none rounded-full"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-3 rounded-full bg-[#262626] border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold uppercase tracking-widest">
            <MapPin className="w-3.5 h-3.5" />
            <span>Kothamangalam, Kerala Atelier</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight text-balance">
            The Today Mementos Standard of Excellence
          </h2>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-4 mb-4" />
          <p className="text-sm sm:text-base text-[#B3A99B] leading-relaxed">
            Every Today Mementos award is individually precision-crafted in our Kothamangalam workshop, electroplated
            with enduring metallic finishes, and mounted on solid teak wood, marble, or crystal bases for schools,
            sports tournaments, corporate institutions, and civic achievements across Kerala.
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
                01. Premium Finishes
              </p>
              <h3 className="font-display text-2xl font-bold text-white mb-2.5">
                Polished Metallic Gold &amp; Brass
              </h3>
              <p className="text-sm text-[#A69C8E] leading-relaxed">
                Formed from heavy-gauge alloys, polished to a mirror sheen, and treated with protective
                anti-tarnish clear coats to withstand Kerala&apos;s climate and maintain a pristine shine for decades.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-[#2A2A2A] flex items-center justify-between text-xs text-[#F3E5AB]">
              <span>Mirror Gold &amp; Brushed Metallic Finish</span>
              <span className="font-semibold text-[#D4AF37]">★ Guaranteed</span>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="p-6 sm:p-8 rounded-lg bg-[#222222] border border-[#2E2E2E] flex flex-col justify-between hover:border-[#D4AF37]/60 transition-colors">
            <div>
              <div className="w-12 h-12 rounded-full bg-[#1A1A1A] border border-[#3A3A3A] flex items-center justify-center mb-5 text-[#D4AF37]">
                <Award className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <p className="text-xs font-semibold tracking-[0.16em] uppercase text-[#D4AF37] mb-1.5">
                02. Mineral &amp; Wood Bases
              </p>
              <h3 className="font-display text-2xl font-bold text-white mb-2.5">
                Solid Teak, Marble &amp; Glass
              </h3>
              <p className="text-sm text-[#A69C8E] leading-relaxed">
                From hand-polished Nilambur teak wood pedestals to precision-beveled optical crystal obelisks
                and marble plinths, each base is weighted for a commanding physical presence.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-[#2A2A2A] flex items-center justify-between text-xs text-[#F3E5AB]">
              <span>Solid Wood &amp; Natural Stone Plinths</span>
              <span className="font-semibold text-[#D4AF37]">★ Weighted Base</span>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="p-6 sm:p-8 rounded-lg bg-[#222222] border border-[#2E2E2E] flex flex-col justify-between hover:border-[#D4AF37]/60 transition-colors">
            <div>
              <div className="w-12 h-12 rounded-full bg-[#1A1A1A] border border-[#3A3A3A] flex items-center justify-center mb-5 text-[#D4AF37]">
                <ShieldCheck className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <p className="text-xs font-semibold tracking-[0.16em] uppercase text-[#D4AF37] mb-1.5">
                03. In-House Inscription
              </p>
              <h3 className="font-display text-2xl font-bold text-white mb-2.5">
                Complimentary Engraving
              </h3>
              <p className="text-sm text-[#A69C8E] leading-relaxed">
                Computerized laser etching, sub-surface 3D crystal engraving, and diamond-drag metal plates
                are produced directly in our Kothamangalam studio with zero delay.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-[#2A2A2A] flex items-center justify-between text-xs text-[#F3E5AB]">
              <span>Free with Every Memento</span>
              <span className="font-semibold text-[#D4AF37]">★ Kothamangalam Verified</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
