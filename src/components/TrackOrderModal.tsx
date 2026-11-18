import { useState, useEffect } from 'react';
import { X, Search, PackageCheck, ShieldAlert } from 'lucide-react';
import { OrderRecord } from '../types/shop';

interface TrackOrderModalProps {
  isOpen: boolean;
  initialOrderNumber?: string;
  orders: OrderRecord[];
  onClose: () => void;
}

export function TrackOrderModal({
  isOpen,
  initialOrderNumber = 'TM-1042',
  orders,
  onClose,
}: TrackOrderModalProps) {
  const [query, setQuery] = useState(initialOrderNumber);
  const [selectedOrder, setSelectedOrder] = useState<OrderRecord | null>(null);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const target = initialOrderNumber || orders[0]?.orderNumber || 'TM-1042';
      setQuery(target);
      const found = orders.find(
        (o) => o.orderNumber.toLowerCase() === target.trim().toLowerCase()
      );
      setSelectedOrder(found || null);
      setSearched(Boolean(found));
    }
  }, [isOpen, initialOrderNumber, orders]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = query.trim().toLowerCase();
    const found = orders.find((o) => o.orderNumber.toLowerCase() === cleaned);
    setSelectedOrder(found || null);
    setSearched(true);
  };

  const maskName = (name: string) => {
    if (!name) return '';
    const parts = name.split(' ');
    return parts
      .map((part) => (part.length > 2 ? `${part[0]}${'*'.repeat(part.length - 2)}${part[part.length - 1]}` : part))
      .join(' ');
  };

  const maskAddress = (address: string) => {
    if (!address) return '';
    return address.length > 10 ? `${address.substring(0, 10)}... (Protected for privacy)` : address;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1A1A1A]/75 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="track-order-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-white border border-[#E6DCC5] rounded-lg shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-5 bg-[#1A1A1A] border-b border-[#2E2E2E] flex items-center justify-between text-white">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
              Today Mementos Atelier Dispatch
            </p>
            <h2 id="track-order-title" className="font-display text-2xl font-bold text-white tracking-tight">
              Track Your Commission Status
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close order tracker"
            className="w-9 h-9 flex items-center justify-center rounded-full border border-[#333333] bg-[#222222] text-white hover:text-[#D4AF37] hover:border-[#D4AF37] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <form onSubmit={handleLookup} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#D4AF37] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter order reference (e.g. TM-1042)"
                aria-label="Order reference number"
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#FAF8F4] border border-[#E6DCC5] rounded-md text-[#1A1A1A] focus:outline-none focus:border-[#D4AF37] focus:bg-white tabular-nums"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 text-sm font-semibold text-white bg-[#1A1A1A] hover:bg-[#2A2A2A] border border-[#2E2E2E] shadow-sm rounded-md transition-all whitespace-nowrap shrink-0 cursor-pointer"
            >
              Look Up
            </button>
          </form>

          {selectedOrder ? (
            <div className="border border-[#E6DCC5] rounded-lg overflow-hidden">
              <div className="p-4 bg-[#FAF8F4] border-b border-[#E6DCC5] flex items-center justify-between gap-4">
                <div className="flex items-center gap-2.5">
                  <PackageCheck className="w-5 h-5 text-[#D4AF37]" />
                  <div>
                    <p className="text-sm font-bold text-[#1A1A1A] tabular-nums">
                      Order #{selectedOrder.orderNumber} · {selectedOrder.status}
                    </p>
                    <p className="text-xs text-[#645D54]">
                      Estimated Kerala Dispatch: {selectedOrder.estimatedDispatch}
                    </p>
                  </div>
                </div>
                <span className="text-sm font-bold text-[#1A1A1A] tabular-nums">
                  ₹{selectedOrder.total.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="p-4 space-y-3 text-sm">
                <div className="text-xs text-[#645D54] flex items-center justify-between">
                  <span>
                    Recipient:{' '}
                    <span className="font-semibold text-[#1A1A1A]">
                      {maskName(selectedOrder.customer.fullName)}
                    </span>{' '}
                    · {maskAddress(selectedOrder.customer.address)}
                  </span>
                  <span className="text-[10px] bg-[#FAF6EE] text-[#8E6718] px-2 py-0.5 rounded border border-[#D4AF37]/30">
                    Verified Customer
                  </span>
                </div>

                <div className="divide-y divide-[#EFE8D8] border-t border-[#EFE8D8]">
                  {selectedOrder.items.map((item) => (
                    <div key={item.cartItemId} className="pt-3 flex justify-between gap-4">
                      <div>
                        <p className="font-medium text-[#1A1A1A]">
                          {item.name} × {item.quantity}
                        </p>
                        <p className="text-xs text-[#645D54]">
                          {item.selectedSize.label} · {item.selectedFinish}
                        </p>
                        {item.engraving.enabled && item.engraving.recipient && (
                          <p className="text-xs text-[#8E6718] mt-0.5 font-medium">
                            Engraving Inscription: “{item.engraving.recipient}”
                            {item.engraving.citation ? ` · ${item.engraving.citation}` : ''}
                          </p>
                        )}
                      </div>
                      <span className="text-sm font-semibold text-[#1A1A1A] tabular-nums">
                        ₹{(item.unitPrice * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            searched && (
              <div className="p-6 text-center bg-[#FAF8F4] border border-[#E6DCC5] rounded-lg">
                <div className="w-10 h-10 rounded-full bg-[#F5EFE6] mx-auto mb-2 flex items-center justify-center text-[#8E6718]">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <p className="text-sm font-semibold text-[#1A1A1A]">
                  No order found matching “{query}”
                </p>
                <p className="text-xs text-[#645D54] mt-1">
                  Please verify your Today Mementos reference number (such as TM-1042) and try again.
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
