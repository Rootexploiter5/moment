interface FooterProps {
  onOpenTrackOrder: () => void;
  onOpenCart: () => void;
}

export function Footer({ onOpenTrackOrder, onOpenCart }: FooterProps) {
  return (
    <footer className="bg-[#0B0A09] text-white border-t border-[#24201A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-10 border-b border-[#221E18]">
          <div className="md:col-span-5">
            <p className="font-display text-2xl font-semibold text-white tracking-tight mb-3">
              Maison Aurelia
            </p>
            <p className="text-sm text-[#9E9589] leading-relaxed max-w-sm">
              Handcrafted championship trophies, optical crystal awards, and bespoke brass
              momentos finished in 24k gold plate and natural stone.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs text-[#DFC684]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#DFC684]" />
              <span>London &amp; Paris Ateliers · Est. 1924</span>
            </div>
          </div>

          <div className="md:col-span-3 space-y-2.5 text-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#DFC684] mb-3">
              Atelier Navigation
            </p>
            <div>
              <a href="#collection" className="text-[#A89F91] hover:text-[#DFC684] transition-colors">
                Trophy &amp; Memento Collection
              </a>
            </div>
            <div>
              <button
                type="button"
                onClick={onOpenTrackOrder}
                className="text-[#A89F91] hover:text-[#DFC684] transition-colors cursor-pointer"
              >
                Track Commission Status
              </button>
            </div>
          </div>

          <div className="md:col-span-4 space-y-2.5 text-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#DFC684] mb-3">
              Client Services
            </p>
            <div>
              <button
                type="button"
                onClick={onOpenTrackOrder}
                className="text-[#A89F91] hover:text-[#DFC684] transition-colors cursor-pointer"
              >
                Track Commission Status
              </button>
            </div>
            <div>
              <button
                type="button"
                onClick={onOpenCart}
                className="text-[#A89F91] hover:text-[#DFC684] transition-colors cursor-pointer"
              >
                Review Shopping Bag
              </button>
            </div>
            <p className="text-xs text-[#7A7266] pt-2">
              412 Goldsmith Row · Monday – Saturday, 09:00 – 18:00
            </p>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7A7266]">
          <p>© {new Date().getFullYear()} Maison Aurelia Ltd. All rights reserved.</p>
          <p className="text-[#9E9589]">24k Gold Plate · Carrara Marble · Optical Crystal</p>
        </div>
      </div>
    </footer>
  );
}
