interface FooterProps {
  onOpenTrackOrder: () => void;
  onOpenCart: () => void;
}

export function Footer({ onOpenTrackOrder, onOpenCart }: FooterProps) {
  return (
    <footer className="bg-white border-t border-[#E6DCC5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-10 border-b border-[#E6DCC5]">
          <div className="md:col-span-5">
            <p className="font-display text-2xl font-semibold text-[#1C1917] mb-3">
              Maison Aurelia
            </p>
            <p className="text-sm text-[#645D54] leading-relaxed max-w-sm">
              Handcrafted championship trophies, optical crystal awards, and bespoke brass
              momentos finished in 24k gold plate and natural stone.
            </p>
          </div>

          <div className="md:col-span-3 space-y-2.5 text-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#8E6718] mb-3">
              Atelier Navigation
            </p>
            <div>
              <a href="#collection" className="text-[#645D54] hover:text-[#1C1917] transition-colors">
                Trophy &amp; Memento Collection
              </a>
            </div>
            <div>
              <button
                type="button"
                onClick={onOpenTrackOrder}
                className="text-[#645D54] hover:text-[#1C1917] transition-colors cursor-pointer"
              >
                Track Commission Status
              </button>
            </div>
          </div>

          <div className="md:col-span-4 space-y-2.5 text-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#8E6718] mb-3">
              Client Services
            </p>
            <div>
              <button
                type="button"
                onClick={onOpenTrackOrder}
                className="text-[#645D54] hover:text-[#1C1917] transition-colors cursor-pointer"
              >
                Track Commission Status
              </button>
            </div>
            <div>
              <button
                type="button"
                onClick={onOpenCart}
                className="text-[#645D54] hover:text-[#1C1917] transition-colors cursor-pointer"
              >
                Review Shopping Bag
              </button>
            </div>
            <p className="text-xs text-[#645D54] pt-2">
              412 Goldsmith Row · Monday – Saturday, 09:00 – 18:00
            </p>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#645D54]">
          <p>© {new Date().getFullYear()} Maison Aurelia Ltd. All rights reserved.</p>
          <p>24k Gold Plate · Carrara Marble · Optical Crystal</p>
        </div>
      </div>
    </footer>
  );
}
