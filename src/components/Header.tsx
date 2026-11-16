import { Info, User, Package, ShoppingBag, ChevronRight, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { OrderRecord } from '../types/shop';

interface HeaderProps {
  cartCount?: number;
  onOpenCart?: () => void;
  onOpenTrackOrder?: () => void;
  orders?: OrderRecord[];
}

export function Header({
  cartCount = 0,
  onOpenCart,
  onOpenTrackOrder,
  orders = [],
}: HeaderProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close profile dropdown on click outside or Escape key
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsProfileOpen(false);
      }
    }

    if (isProfileOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isProfileOpen]);

  const scrollToSection = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const latestOrder = orders.length > 0 ? orders[0] : null;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E6DCC5]">
      {/* Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Brand Wordmark & Local Tagline */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#top"
            onClick={(e) => scrollToSection('top', e)}
            className="group flex flex-col focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D4AF37]"
          >
            <span className="font-display text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-[#1A1A1A] group-hover:text-[#B89628] transition-colors whitespace-nowrap">
              Today Mementos
            </span>
            <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-[#8E6718] font-medium hidden xs:block">
              Kothamangalam · Premier Trophy Atelier
            </span>
          </a>
        </div>

        {/* Minimal Navigation Bar Items (Home, Collection, About Us icon, User/Profile icon) */}
        <nav
          aria-label="Primary navigation"
          className="flex items-center gap-4 sm:gap-6 md:gap-8 shrink-0"
        >
          {/* 1. Home */}
          <a
            href="#top"
            onClick={(e) => scrollToSection('top', e)}
            className="text-xs sm:text-sm font-medium text-[#4A443C] hover:text-[#1A1A1A] underline-offset-8 hover:underline decoration-[#D4AF37] transition-colors whitespace-nowrap py-1"
          >
            Home
          </a>

          {/* 2. Collection */}
          <a
            href="#collection"
            onClick={(e) => scrollToSection('collection', e)}
            className="text-xs sm:text-sm font-medium text-[#4A443C] hover:text-[#1A1A1A] underline-offset-8 hover:underline decoration-[#D4AF37] transition-colors whitespace-nowrap py-1"
          >
            Collection
          </a>

          {/* 3. About Us icon */}
          <a
            href="#about"
            onClick={(e) => scrollToSection('about', e)}
            title="About Us"
            aria-label="About Us"
            className="p-1.5 sm:p-2 text-[#4A443C] hover:text-[#1A1A1A] hover:bg-[#FAF8F4] rounded-full transition-colors flex items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4AF37]"
          >
            <Info className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-[#4A443C] hover:text-[#1A1A1A] transition-colors" strokeWidth={1.75} />
            <span className="sr-only">About Us</span>
          </a>

          {/* 4. User/Profile icon */}
          <div className="relative" ref={profileRef}>
            <button
              type="button"
              onClick={() => setIsProfileOpen((prev) => !prev)}
              title="User / Profile"
              aria-label="User Profile"
              aria-expanded={isProfileOpen}
              aria-haspopup="true"
              className={`p-1.5 sm:p-2 rounded-full transition-colors flex items-center justify-center cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4AF37] ${
                isProfileOpen
                  ? 'bg-[#1A1A1A] text-[#D4AF37]'
                  : 'text-[#4A443C] hover:text-[#1A1A1A] hover:bg-[#FAF8F4]'
              }`}
            >
              <User className="w-4.5 h-4.5 sm:w-5 sm:h-5" strokeWidth={1.75} />
              <span className="sr-only">User Profile</span>
            </button>

            {/* Profile Dropdown Popover */}
            {isProfileOpen && (
              <div
                className="absolute right-0 mt-2 w-72 sm:w-80 bg-white rounded-xl shadow-2xl border border-[#E6DCC5] p-4 text-[#1A1A1A] z-50 animate-in fade-in zoom-in-95 duration-150"
                role="dialog"
                aria-label="Profile and account menu"
              >
                {/* Header with Patron Info */}
                <div className="flex items-center justify-between pb-3 border-b border-[#E6DCC5]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#FAF8F4] border border-[#D4AF37]/40 flex items-center justify-center text-[#8E6718]">
                      <User className="w-5 h-5" strokeWidth={1.75} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#1A1A1A]">Atelier Patron</p>
                      <p className="text-xs text-[#8E6718]">Kothamangalam Client</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsProfileOpen(false)}
                    aria-label="Close profile menu"
                    className="p-1 text-[#7A7266] hover:text-[#1A1A1A] rounded-md hover:bg-[#FAF8F4] transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Quick Actions List */}
                <div className="py-2.5 space-y-1">
                  {/* Track Order */}
                  <button
                    type="button"
                    onClick={() => {
                      setIsProfileOpen(false);
                      onOpenTrackOrder?.();
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-[#FAF8F4] text-left transition-colors text-sm text-[#1A1A1A] group cursor-pointer"
                  >
                    <span className="flex items-center gap-2.5 font-medium">
                      <Package className="w-4 h-4 text-[#8E6718]" strokeWidth={1.75} />
                      <span>Track Order Status</span>
                    </span>
                    <ChevronRight className="w-4 h-4 text-[#A69C8E] group-hover:text-[#1A1A1A] transition-colors" />
                  </button>

                  {/* Shopping Bag */}
                  <button
                    type="button"
                    onClick={() => {
                      setIsProfileOpen(false);
                      onOpenCart?.();
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-[#FAF8F4] text-left transition-colors text-sm text-[#1A1A1A] group cursor-pointer"
                  >
                    <span className="flex items-center gap-2.5 font-medium">
                      <ShoppingBag className="w-4 h-4 text-[#8E6718]" strokeWidth={1.75} />
                      <span>Shopping Bag</span>
                    </span>
                    <span className="tabular-nums px-2 py-0.5 text-xs font-bold bg-[#FAF8F4] text-[#8E6718] border border-[#E6DCC5] rounded-full">
                      {cartCount} {cartCount === 1 ? 'piece' : 'pieces'}
                    </span>
                  </button>
                </div>

                {/* Recent Order Preview (if available) */}
                {latestOrder && (
                  <div className="pt-2.5 pb-1 border-t border-[#E6DCC5]">
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-[#8E6718] mb-1.5 flex items-center justify-between">
                      <span>Latest Atelier Order</span>
                      <span className="font-normal text-[#7A7266] lowercase">verified</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-[#FAF8F4] border border-[#E6DCC5] text-xs">
                      <div className="flex items-center justify-between font-semibold text-[#1A1A1A] mb-1">
                        <span>{latestOrder.orderNumber}</span>
                        <span className="px-1.5 py-0.5 rounded text-[10px] bg-[#E8F5E9] text-[#2E7D32] font-medium">
                          {latestOrder.status}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#7A7266] truncate">
                        {latestOrder.items.map((i) => i.name).join(', ')}
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setIsProfileOpen(false);
                          onOpenTrackOrder?.();
                        }}
                        className="mt-2 text-xs font-medium text-[#8E6718] hover:text-[#B89628] underline underline-offset-2 cursor-pointer"
                      >
                        View Order Details →
                      </button>
                    </div>
                  </div>
                )}

                {/* Footer note */}
                <div className="pt-2.5 mt-2 border-t border-[#E6DCC5] text-[11px] text-[#7A7266] text-center">
                  Today Mementos Atelier · Kothamangalam, Kerala
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
