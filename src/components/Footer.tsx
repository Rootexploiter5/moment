import { MapPin, Phone, Mail, Clock, Star } from 'lucide-react';

interface FooterProps {
  onOpenTrackOrder: () => void;
  onOpenCart: () => void;
}

export function Footer({ onOpenTrackOrder, onOpenCart }: FooterProps) {
  return (
    <footer className="bg-[#121212] text-white border-t border-[#262626]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-10 border-b border-[#262626]">
          {/* Brand Info */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-display text-2xl font-bold text-white tracking-tight">
                Today Mementos
              </span>
              <span className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-widest bg-[#D4AF37] text-[#1A1A1A] rounded">
                4.9 ★ Rated
              </span>
            </div>
            <p className="text-sm text-[#A69C8E] leading-relaxed max-w-sm mb-4">
              Kothamangalam&apos;s leading manufacturer and designer of custom trophies, sports cups,
              wood plaques, crystal obelisks, and ceremonial medals across Kerala.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-[#D4AF37]">
              <div className="flex text-[#D4AF37]">
                <Star className="w-3.5 h-3.5 fill-[#D4AF37]" />
                <Star className="w-3.5 h-3.5 fill-[#D4AF37]" />
                <Star className="w-3.5 h-3.5 fill-[#D4AF37]" />
                <Star className="w-3.5 h-3.5 fill-[#D4AF37]" />
                <Star className="w-3.5 h-3.5 fill-[#D4AF37]" />
              </div>
              <span className="text-[#E5DDD0] font-medium">4.9 / 5.0 (420+ Verified Client Reviews)</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-2.5 text-sm">
            <p className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] mb-3">
              Explore Atelier
            </p>
            <div>
              <a href="#collection" className="text-[#A69C8E] hover:text-[#D4AF37] transition-colors">
                Trophies &amp; Awards Collection
              </a>
            </div>
            <div>
              <button
                type="button"
                onClick={onOpenTrackOrder}
                className="text-[#A69C8E] hover:text-[#D4AF37] transition-colors cursor-pointer text-left"
              >
                Track Order Status
              </button>
            </div>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-4 space-y-2.5 text-sm">
            <p className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] mb-3">
              Kothamangalam Atelier
            </p>
            <div className="flex items-start gap-2 text-xs text-[#A69C8E]">
              <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
              <span>Today Mementos, AM Road, Kothamangalam, Ernakulam District, Kerala — 686691</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#A69C8E]">
              <Clock className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>Monday – Saturday: 9:00 AM – 7:30 PM IST</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#A69C8E]">
              <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>Direct Atelier Desk / WhatsApp: Available on Request</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#A69C8E]">
              <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>contact@todaymementos.com</span>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7A7266]">
          <p>© {new Date().getFullYear()} Today Mementos Kothamangalam. All rights reserved.</p>
          <p className="text-[#A69C8E]">Wood · Brass · Crystal · Acrylic · Kerala Express Dispatch</p>
        </div>
      </div>
    </footer>
  );
}
