import { ArrowRight } from 'lucide-react';
import { HERO_IMAGE } from '../data/products';
import { ResilientImage } from './ResilientImage';

interface HeroProps {
  onExploreCollection: () => void;
}

export function Hero({ onExploreCollection }: HeroProps) {
  return (
    <section
      id="top"
      className="bg-[#FAF8F4] border-b border-[#E6DCC5]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Editorial Copy Column */}
          <div className="lg:col-span-6 flex flex-col justify-between py-2 lg:py-6">
            <div>
              <p className="text-xs font-medium tracking-[0.16em] uppercase text-[#8E6718] mb-5">
                Est. 1924 · Fine Trophies &amp; Ceremonial Momentos
              </p>

              <h1 className="font-display text-[clamp(2.35rem,4vw,3.75rem)] leading-[1.08] font-semibold text-[#1C1917] text-balance mb-6">
                Enduring Honors Cast in Gold and Stone
              </h1>

              <p className="text-base sm:text-lg leading-relaxed text-[#645D54] max-w-xl mb-8">
                Hand-spun 24k gold-plated loving cups, optical crystal obelisks, and solid
                travertine plaques crafted for championships, civic milestones, and lifelong
                recognition. Every piece includes complimentary precision engraving.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={onExploreCollection}
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 text-sm font-semibold text-white bg-[#0E0D0C] hover:bg-[#8E6718] border border-[#2B261F] shadow-md hover:shadow-lg transition-all duration-200 rounded-md whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8E6718]"
                >
                  <span>Explore Collection</span>
                  <ArrowRight className="w-4 h-4 text-[#DFC684]" />
                </button>
              </div>
            </div>

            {/* Noir Luxury Provenance & Guarantee Banner */}
            <div className="mt-8 p-4 sm:p-5 rounded-lg bg-[#0E0D0C] border border-[#28231C] text-white grid grid-cols-3 gap-4 shadow-md">
              <div>
                <p className="font-display text-xl sm:text-2xl font-semibold text-[#DFC684] tabular-nums">
                  24k Gold
                </p>
                <p className="text-[11px] text-[#A69C8E] mt-0.5">
                  Triple-plated finish
                </p>
              </div>
              <div>
                <p className="font-display text-xl sm:text-2xl font-semibold text-[#DFC684] tabular-nums">
                  Included
                </p>
                <p className="text-[11px] text-[#A69C8E] mt-0.5">
                  Diamond-drag plate
                </p>
              </div>
              <div>
                <p className="font-display text-xl sm:text-2xl font-semibold text-[#DFC684] tabular-nums">
                  Free Dispatch
                </p>
                <p className="text-[11px] text-[#A69C8E] mt-0.5">
                  Orders over $350
                </p>
              </div>
            </div>
          </div>

          {/* 4:3 Editorial Showcase Image Column */}
          <div className="lg:col-span-6">
            <div className="h-full bg-white p-3 sm:p-4 border border-[#E6DCC5] rounded-lg shadow-[0_14px_40px_-20px_rgba(28,25,23,0.16)] ring-1 ring-[#0E0D0C]/10">
              <div className="relative h-full min-h-[300px] aspect-[4/3] lg:aspect-auto overflow-hidden rounded-sm bg-[#0E0D0C]">
                <ResilientImage
                  src={HERO_IMAGE}
                  alt="Handcrafted 24k gold-plated championship trophy cup on honed white marble plinth"
                  title="Grand Victory Winged Cup"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent p-5 sm:p-6 border-t border-white/10">
                  <span className="inline-block px-2.5 py-0.5 mb-1.5 text-[10px] uppercase tracking-widest text-[#DFC684] bg-black/75 rounded backdrop-blur-xs border border-[#8E6718]/40">
                    Flagship Atelier Commission
                  </span>
                  <p className="font-display text-xl sm:text-2xl font-semibold text-white">
                    Grand Victory Winged Cup
                  </p>
                  <p className="text-xs text-[#E5DDD0]/80 mt-0.5">
                    Carrara Marble Plinth · 24k Bright Gold Plate
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
