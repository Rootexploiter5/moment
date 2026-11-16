import { ShoppingBag, Menu, X } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenTrackOrder: () => void;
}

export function Header({ cartCount, onOpenCart, onOpenTrackOrder }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-[#E6DCC5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#top"
          className="font-display text-2xl font-semibold tracking-tight text-[#1C1917] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8E6718]"
        >
          Maison Aurelia
        </a>

        {/* Zone 2: Navigation links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#645D54]"
        >
          <a
            href="#collection"
            className="hover:text-[#1C1917] underline-offset-8 hover:underline decoration-[#B68A2D] transition-colors whitespace-nowrap shrink-0"
          >
            Collection
          </a>
          <button
            type="button"
            onClick={onOpenTrackOrder}
            className="hover:text-[#1C1917] underline-offset-8 hover:underline decoration-[#B68A2D] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Track Order
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenCart}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#1C1917] hover:bg-[#8E6718] transition-colors duration-200 rounded-md whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8E6718]"
          >
            <ShoppingBag className="w-4 h-4 text-[#DFC684]" strokeWidth={1.75} />
            <span>Shopping Bag</span>
            <span className="tabular-nums text-[#DFC684]">({cartCount})</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            className="md:hidden p-2.5 text-[#1C1917] hover:bg-[#FAF8F4] rounded-md border border-[#E6DCC5] cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E6DCC5] bg-white px-4 py-3 flex flex-col gap-1">
          <a
            href="#collection"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2.5 px-2 text-sm font-medium text-[#1C1917] hover:bg-[#FAF8F4] rounded-md"
          >
            Collection
          </a>
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenTrackOrder();
            }}
            className="py-2.5 px-2 text-left text-sm font-medium text-[#1C1917] hover:bg-[#FAF8F4] rounded-md cursor-pointer"
          >
            Track Order
          </button>
        </div>
      )}
    </header>
  );
}
