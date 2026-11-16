import { ArrowRight } from 'lucide-react';
import { HERO_IMAGE } from '../data/products';
import { ResilientImage } from './ResilientImage';

interface HeroProps {
  onExploreCollection: () => void;
  onOpenEngraving: () => void;
}

export function Hero({ onExploreCollection, onOpenEngraving }: HeroProps) {
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
                  className="inline-flex items-center gap-2.5 px-6 py-3 text-sm font-semibold text-white bg-[#8E6718] hover:bg-[#755412] transition-colors duration-200 rounded-md whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8E6718]"
                >
                  <span>Explore Collection</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={onOpenEngraving}
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-[#1C1917] bg-white border border-[#D8C8A6] hover:border-[#8E6718] transition-colors duration-200 rounded-md whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8E6718]"
                >
                  <span>Preview Engraving</span>
                </button>
              </div>
            </div>

            {/* Quiet Provenance & Guarantee Row */}
            <div className="mt-10 pt-8 border-t border-[#E6DCC5] grid grid-cols-3 gap-6">
              <div>
                <p className="font-display text-2xl font-semibold text-[#1C1917] tabular-nums">
                  24k Gold
                </p>
                <p className="text-xs text-[#645D54] mt-1">
                  Triple-plated heirloom finish
                </p>
              </div>
              <div>
                <p className="font-display text-2xl font-semibold text-[#1C1917] tabular-nums">
                  Complimentary
                </p>
                <p className="text-xs text-[#645D54] mt-1">
                  Diamond-drag plate engraving
                </p>
              </div>
              <div>
                <p className="font-display text-2xl font-semibold text-[#1C1917] tabular-nums">
                  Free Delivery
                </p>
                <p className="text-xs text-[#645D54] mt-1">
                  On orders above $350
                </p>
              </div>
            </div>
          </div>

          {/* 4:3 Editorial Showcase Image Column */}
          <div className="lg:col-span-6">
            <div className="h-full bg-white p-3 sm:p-4 border border-[#E6DCC5] rounded-lg shadow-[0_14px_40px_-20px_rgba(28,25,23,0.16)]">
              <div className="relative h-full min-h-[300px] aspect-[4/3] lg:aspect-auto overflow-hidden rounded-sm bg-[#F4EFE6]">
                <ResilientImage
                  src={HERO_IMAGE}
                  alt="Handcrafted 24k gold-plated championship trophy cup on honed white marble plinth"
                  title="Grand Victory Winged Cup"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent p-5 sm:p-6">
                  <p className="text-xs text-[#F3E5BA] tracking-wide">
                    Flagship Commission · Carrara Marble &amp; 24k Gold Plate
                  </p>
                  <p className="font-display text-xl sm:text-2xl font-semibold text-white mt-0.5">
                    Grand Victory Winged Cup
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
