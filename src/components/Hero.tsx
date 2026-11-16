import { ArrowRight, Shield, PenTool, Truck } from 'lucide-react';
import { HERO_IMAGE } from '../data/products';
import { ResilientImage } from './ResilientImage';

interface HeroProps {
  onExploreCollection: () => void;
}

export function Hero({ onExploreCollection }: HeroProps) {
  return (
    <section id="top" className="bg-[#FAF8F4] border-b border-[#E6DCC5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Editorial Copy Column */}
          <div className="lg:col-span-6 flex flex-col justify-between py-2 lg:py-4">
            <div>
              <h1 className="font-display text-[clamp(2.35rem,4vw,3.75rem)] leading-[1.08] font-bold text-[#1A1A1A] text-balance mb-6">
                Enduring Honors Cast in Wood, Metal &amp; Glass
              </h1>

              <p className="text-base sm:text-lg leading-relaxed text-[#5A5248] max-w-xl mb-8">
                Kerala&apos;s trusted craftsmen for custom teak wood plaques, gleaming championship trophies,
                optical crystal awards, and bespoke corporate mementos. Each piece comes with complimentary
                precision inscription and statewide insured delivery.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 mb-8">
                <button
                  type="button"
                  onClick={onExploreCollection}
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 text-sm font-semibold text-white bg-[#1A1A1A] hover:bg-[#2A2A2A] border border-[#2E2E2E] shadow-md hover:shadow-lg transition-all duration-200 rounded-md whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4AF37]"
                >
                  <span>Explore Collection</span>
                  <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
                </button>
              </div>
            </div>

            {/* Trust Banner (<TrustBox/>): 3-column CSS Grid in Charcoal (#1A1A1A) with Gold (#D4AF37) Accents */}
            <div className="p-4 sm:p-5 rounded-lg bg-[#1A1A1A] border border-[#2E2E2E] text-white shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5 divide-y md:divide-y-0 md:divide-x divide-[#2E2E2E]">
                {/* Column 1: Shield */}
                <div className="flex items-start gap-3.5 pt-2 md:pt-0">
                  <div className="p-2.5 rounded-md bg-[#252525] border border-[#333333] shrink-0 text-[#D4AF37]">
                    <Shield className="w-5 h-5" strokeWidth={1.75} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#F3E5AB]">
                      Custom Awards
                    </p>
                    <p className="text-xs text-[#B3A99B] mt-0.5 leading-snug">
                      Wood, metal &amp; crystal architectural finishes
                    </p>
                  </div>
                </div>

                {/* Column 2: Pen Tool */}
                <div className="flex items-start gap-3.5 pt-3 md:pt-0 md:pl-4">
                  <div className="p-2.5 rounded-md bg-[#252525] border border-[#333333] shrink-0 text-[#D4AF37]">
                    <PenTool className="w-5 h-5" strokeWidth={1.75} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#F3E5AB]">
                      Free Inscription
                    </p>
                    <p className="text-xs text-[#B3A99B] mt-0.5 leading-snug">
                      Complimentary laser &amp; diamond-drag engraving
                    </p>
                  </div>
                </div>

                {/* Column 3: Truck */}
                <div className="flex items-start gap-3.5 pt-3 md:pt-0 md:pl-4">
                  <div className="p-2.5 rounded-md bg-[#252525] border border-[#333333] shrink-0 text-[#D4AF37]">
                    <Truck className="w-5 h-5" strokeWidth={1.75} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#F3E5AB]">
                      Kerala Express
                    </p>
                    <p className="text-xs text-[#B3A99B] mt-0.5 leading-snug">
                      Fast, insured dispatch from Kothamangalam
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 4:3 Editorial Showcase Image Column */}
          <div className="lg:col-span-6">
            <div className="h-full bg-white p-3 sm:p-4 border border-[#E6DCC5] rounded-lg shadow-[0_14px_40px_-20px_rgba(28,25,23,0.16)] ring-1 ring-[#1A1A1A]/10">
              <div className="relative h-full min-h-[300px] aspect-[4/3] lg:aspect-auto overflow-hidden rounded-sm bg-[#1A1A1A]">
                <ResilientImage
                  src={HERO_IMAGE}
                  alt="Handcrafted championship trophy cup from Today Mementos Kothamangalam"
                  title="Grand Victory Winged Cup"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/55 to-transparent p-5 sm:p-6 border-t border-white/10">
                  <span className="inline-block px-2.5 py-0.5 mb-1.5 text-[10px] uppercase tracking-widest text-[#D4AF37] bg-black/80 rounded backdrop-blur-xs border border-[#D4AF37]/40 font-semibold">
                    Today Mementos Kothamangalam
                  </span>
                  <p className="font-display text-xl sm:text-2xl font-bold text-white">
                    Grand Victory Winged Cup
                  </p>
                  <p className="text-xs text-[#E5DDD0]/85 mt-0.5">
                    Solid Stone Plinth · Polished Metallic Gold Finish · Complimentary Plate Engraving
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
