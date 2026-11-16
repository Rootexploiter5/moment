import { ArrowRight } from 'lucide-react';
import { EngravingDetails, EngravingFont } from '../types/shop';

interface EngravingAtelierProps {
  draftEngraving: EngravingDetails;
  onChangeDraft: (next: EngravingDetails) => void;
  onApplyToCollection: () => void;
}

const PRESETS: { label: string; recipient: string; citation: string; dateLine: string }[] = [
  {
    label: 'Championship',
    recipient: 'VICTORIA ROWING CLUB',
    citation: 'Grand Challenge First Place',
    dateLine: 'NOVEMBER 2026',
  },
  {
    label: 'Leadership',
    recipient: 'ELEANOR VANCE',
    citation: 'Distinguished Civic Stewardship',
    dateLine: 'TWENTY-FIVE YEARS OF SERVICE',
  },
  {
    label: 'Memorial',
    recipient: 'IN HONOR OF ARTHUR PENDLETON',
    citation: 'Founder & Patron of the Arts',
    dateLine: '1948 – 2026',
  },
];

export function EngravingAtelier({
  draftEngraving,
  onChangeDraft,
  onApplyToCollection,
}: EngravingAtelierProps) {
  const updateField = <K extends keyof EngravingDetails>(key: K, value: EngravingDetails[K]) => {
    onChangeDraft({ ...draftEngraving, enabled: true, [key]: value });
  };

  return (
    <section id="engraving" className="bg-[#FAF8F4] py-8 lg:py-10 border-b border-[#E6DCC5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Live Brushed Gold Brass Plaque Preview */}
          <div className="lg:col-span-6">
            <div className="bg-white p-4 sm:p-6 border border-[#E6DCC5] rounded-lg shadow-[0_10px_30px_-20px_rgba(28,25,23,0.15)]">
              <div className="p-3 sm:p-4 bg-[#EFEAE0] border border-[#DDD3BE] rounded-sm">
                <div className="gold-foil-surface p-4 sm:p-8 rounded-[2px] border border-[#A87E2A] shadow-inner text-center min-h-[190px] flex flex-col items-center justify-center relative">
                  {/* Classic Corner Brass Rivets */}
                  <span className="w-2 h-2 rounded-full bg-[#7A5915]/50 absolute top-3 left-3" aria-hidden="true" />
                  <span className="w-2 h-2 rounded-full bg-[#7A5915]/50 absolute top-3 right-3" aria-hidden="true" />
                  <span className="w-2 h-2 rounded-full bg-[#7A5915]/50 absolute bottom-3 left-3" aria-hidden="true" />
                  <span className="w-2 h-2 rounded-full bg-[#7A5915]/50 absolute bottom-3 right-3" aria-hidden="true" />

                  <div className="w-12 h-px bg-[#47330A]/40 mb-3" aria-hidden="true" />

                  <p
                    className={`text-lg sm:text-2xl text-[#2B1F06] tracking-wide max-w-md break-words ${
                      draftEngraving.fontStyle === 'Atelier Script'
                        ? 'font-display italic font-semibold'
                        : 'font-display font-semibold uppercase tracking-[0.12em]'
                    }`}
                  >
                    {draftEngraving.recipient || 'RECIPIENT NAME'}
                  </p>

                  <p
                    className={`mt-2 text-sm sm:text-base text-[#3D2C0A] max-w-sm break-words ${
                      draftEngraving.fontStyle === 'Atelier Script'
                        ? 'font-display italic text-lg'
                        : 'font-sans font-medium'
                    }`}
                  >
                    {draftEngraving.citation || 'Award Citation or Occasion'}
                  </p>

                  <p className="mt-3 text-xs tracking-[0.2em] uppercase text-[#4B360C] font-medium tabular-nums">
                    {draftEngraving.dateLine || 'MMXXVI'}
                  </p>

                  <div className="w-12 h-px bg-[#47330A]/40 mt-3" aria-hidden="true" />
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between text-xs text-[#645D54]">
                <span>Satin-Brushed Brass Plate · Dark Oxidized Fill</span>
                <span>Complimentary with every order</span>
              </div>
            </div>
          </div>

          {/* Engraving Controls */}
          <div className="lg:col-span-6">
            <p className="text-xs font-medium tracking-[0.16em] uppercase text-[#8E6718] mb-1.5">
              Bespoke Inscription Studio
            </p>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#1C1917] text-balance mb-2.5">
              Compose Your Dedication Before You Select a Piece
            </h2>
            <p className="text-sm text-[#645D54] leading-relaxed mb-4">
              Our master engravers diamond-drag every brass plate and crystal bevel in-house.
              Test your inscription lines below—your text carries forward automatically when
              customizing any trophy or plaque.
            </p>

            {/* Occasion Preset Buttons */}
            <div className="mb-4">
              <span className="block text-xs font-medium text-[#645D54] mb-1.5">
                Sample Occasion Templates
              </span>
              <div className="flex flex-wrap gap-2">
                {PRESETS.map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() =>
                      onChangeDraft({
                        ...draftEngraving,
                        enabled: true,
                        recipient: preset.recipient,
                        citation: preset.citation,
                        dateLine: preset.dateLine,
                      })
                    }
                    className="px-3 py-1.5 text-xs font-medium text-[#1C1917] bg-white border border-[#E6DCC5] hover:border-[#8E6718] rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4 bg-white p-5 sm:p-6 border border-[#E6DCC5] rounded-lg">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="atelier-recipient"
                    className="block text-xs font-medium text-[#1C1917] mb-1.5"
                  >
                    Line 1 — Honoree or Title
                  </label>
                  <input
                    id="atelier-recipient"
                    type="text"
                    maxLength={42}
                    value={draftEngraving.recipient}
                    onChange={(e) => updateField('recipient', e.target.value)}
                    placeholder="e.g. VICTORIA ROWING CLUB"
                    className="w-full px-3.5 py-2 text-sm bg-[#FAF8F4] border border-[#E6DCC5] rounded-md text-[#1C1917] focus:outline-none focus:border-[#8E6718] focus:bg-white"
                  />
                </div>

                <div>
                  <label
                    htmlFor="atelier-date"
                    className="block text-xs font-medium text-[#1C1917] mb-1.5"
                  >
                    Line 3 — Year or Date
                  </label>
                  <input
                    id="atelier-date"
                    type="text"
                    maxLength={32}
                    value={draftEngraving.dateLine}
                    onChange={(e) => updateField('dateLine', e.target.value)}
                    placeholder="e.g. NOVEMBER 2026"
                    className="w-full px-3.5 py-2 text-sm bg-[#FAF8F4] border border-[#E6DCC5] rounded-md text-[#1C1917] focus:outline-none focus:border-[#8E6718] focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="atelier-citation"
                  className="block text-xs font-medium text-[#1C1917] mb-1.5"
                >
                  Line 2 — Citation or Occasion
                </label>
                <input
                  id="atelier-citation"
                  type="text"
                  maxLength={54}
                  value={draftEngraving.citation}
                  onChange={(e) => updateField('citation', e.target.value)}
                  placeholder="e.g. Grand Challenge First Place"
                  className="w-full px-3.5 py-2 text-sm bg-[#FAF8F4] border border-[#E6DCC5] rounded-md text-[#1C1917] focus:outline-none focus:border-[#8E6718] focus:bg-white"
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                <div className="flex items-center gap-2">
                  {(['Classic Roman', 'Atelier Script'] as EngravingFont[]).map((font) => {
                    const active = draftEngraving.fontStyle === font;
                    return (
                      <button
                        key={font}
                        type="button"
                        onClick={() => updateField('fontStyle', font)}
                        className={`px-3.5 py-2 text-xs font-medium rounded-md border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                          active
                            ? 'bg-[#1C1917] text-white border-[#1C1917]'
                            : 'bg-[#FAF8F4] text-[#645D54] border-[#E6DCC5] hover:text-[#1C1917]'
                        }`}
                      >
                        {font}
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={onApplyToCollection}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#8E6718] hover:bg-[#755412] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>Choose Piece with Inscription</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Craftsmanship & Materials Provenance Band */}
        <div
          id="craftsmanship"
          className="mt-14 pt-12 border-t border-[#E6DCC5] grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-[#8E6718] mb-1.5">
              01. 24k Gold Electroplating
            </p>
            <h3 className="font-display text-xl font-semibold text-[#1C1917] mb-2">
              Heavy-Gauge Spun Brass
            </h3>
            <p className="text-sm text-[#645D54] leading-relaxed">
              Every chalice and laurel wreath is formed from solid brass, hand-burnished, and
              triple-plated in bright or satin 24k gold with a protective clear lacquer seal.
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-[#8E6718] mb-1.5">
              02. Honed Carrara &amp; Travertine
            </p>
            <h3 className="font-display text-xl font-semibold text-[#1C1917] mb-2">
              Natural Architectural Stone
            </h3>
            <p className="text-sm text-[#645D54] leading-relaxed">
              We mill plinths from authentic white Carrara marble and Roman travertine, weighted
              for ceremonial stability and finished with protective baize undersides.
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-[#8E6718] mb-1.5">
              03. Presentation &amp; Dispatch
            </p>
            <h3 className="font-display text-xl font-semibold text-[#1C1917] mb-2">
              White-Glove Inspection
            </h3>
            <p className="text-sm text-[#645D54] leading-relaxed">
              Each trophy and medallion arrives in a bespoke ivory presentation box with cotton
              handling gloves and an archival certificate of engraving accuracy.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
