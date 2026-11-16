import { ShoppingBag, Menu, X } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenTrackOrder: () => void;
}

export function Header({
  cartCount,
  onOpenCart,
  onOpenTrackOrder,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E6DCC5]">
      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-6">
        {/* Brand Wordmark & Local Tagline */}
        <div className="flex items-center gap-3">
          <a
            href="#top"
            className="group flex flex-col focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D4AF37]"
          >
            <span className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#1A1A1A] group-hover:text-[#B89628] transition-colors whitespace-nowrap">
              Today Mementos
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#8E6718] font-medium">
              Kothamangalam · Premier Trophy Atelier
            </span>
          </a>
        </div>

        {/* Center Navigation Cluster */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-8 text-sm font-medium text-[#4A443C]"
        >
          <a
            href="#collection"
            className="hover:text-[#1A1A1A] underline-offset-8 hover:underline decoration-[#D4AF37] transition-colors whitespace-nowrap shrink-0"
          >
            Collection
          </a>

          <a
            href="#about"
            className="hover:text-[#1A1A1A] underline-offset-8 hover:underline decoration-[#D4AF37] transition-colors whitespace-nowrap shrink-0"
          >
            About Us
          </a>

          <button
            type="button"
            onClick={onOpenTrackOrder}
            className="hover:text-[#1A1A1A] underline-offset-8 hover:underline decoration-[#D4AF37] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Track Order
          </button>
        </nav>

        {/* Primary Action Button */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenCart}
            className="inline-flex items-center gap-2 px-4.5 py-2.5 text-sm font-semibold text-white bg-[#1A1A1A] hover:bg-[#2A2A2A] border border-[#2E2E2E] transition-all duration-200 rounded-md whitespace-nowrap shrink-0 cursor-pointer shadow-sm hover:shadow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4AF37]"
          >
            <ShoppingBag className="w-4 h-4 text-[#D4AF37]" strokeWidth={1.75} />
            <span>Shopping Bag</span>
            <span className="tabular-nums px-1.5 py-0.5 text-xs bg-[#2E2E2E] text-[#D4AF37] font-bold rounded">
              {cartCount}
            </span>
          </button>

          {/* Mobile menu toggle button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            className="md:hidden p-2.5 text-[#1A1A1A] hover:bg-[#FAF8F4] rounded-md border border-[#E6DCC5] cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E6DCC5] bg-white px-4 py-3 flex flex-col gap-2">
          <a
            href="#collection"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2.5 px-3 text-sm font-medium text-[#1A1A1A] hover:bg-[#FAF8F4] rounded-md"
          >
            Collection
          </a>

          <a
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2.5 px-3 text-sm font-medium text-[#1A1A1A] hover:bg-[#FAF8F4] rounded-md"
          >
            About Us
          </a>

          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenTrackOrder();
            }}
            className="py-2.5 px-3 text-left text-sm font-medium text-[#1A1A1A] hover:bg-[#FAF8F4] rounded-md cursor-pointer"
          >
            Track Order
          </button>
        </div>
      )}
    </header>
  );
}
