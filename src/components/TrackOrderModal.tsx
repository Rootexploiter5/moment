import { useState, useEffect } from 'react';
import { X, Search, PackageCheck } from 'lucide-react';
import { OrderRecord } from '../types/shop';

interface TrackOrderModalProps {
  isOpen: boolean;
  initialOrderNumber?: string;
  orders: OrderRecord[];
  onClose: () => void;
}

export function TrackOrderModal({
  isOpen,
  initialOrderNumber = 'MA-1042',
  orders,
  onClose,
}: TrackOrderModalProps) {
  const [query, setQuery] = useState(initialOrderNumber);
  const [selectedOrder, setSelectedOrder] = useState<OrderRecord | null>(null);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const target = initialOrderNumber || orders[0]?.orderNumber || 'MA-1042';
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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C1917]/60 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="track-order-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-white border border-[#E6DCC5] rounded-lg shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-5 bg-[#FAF8F4] border-b border-[#E6DCC5] flex items-center justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-[#8E6718]">
              Atelier Dispatch Lookup
            </p>
            <h2 id="track-order-title" className="font-display text-2xl font-semibold text-[#1C1917]">
              Track Your Commission
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close order tracker"
            className="w-9 h-9 flex items-center justify-center rounded-full border border-[#E6DCC5] bg-white text-[#1C1917] hover:border-[#8E6718] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <form onSubmit={handleLookup} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#8E6718] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter order reference (e.g. MA-1042)"
                aria-label="Order reference number"
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#FAF8F4] border border-[#E6DCC5] rounded-md text-[#1C1917] focus:outline-none focus:border-[#8E6718] focus:bg-white tabular-nums"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 text-sm font-semibold text-white bg-[#1C1917] hover:bg-[#8E6718] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Look Up
            </button>
          </form>

          {/* Recent Orders Quick Select */}
          {orders.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#645D54]">
              <span>Available references:</span>
              {orders.slice(0, 4).map((order) => (
                <button
                  key={order.orderNumber}
                  type="button"
                  onClick={() => {
                    setQuery(order.orderNumber);
                    setSelectedOrder(order);
                    setSearched(true);
                  }}
                  className="px-2.5 py-1 bg-[#FAF8F4] border border-[#E6DCC5] hover:border-[#8E6718] rounded text-[#1C1917] font-medium tabular-nums cursor-pointer"
                >
                  {order.orderNumber}
                </button>
              ))}
            </div>
          )}

          {selectedOrder ? (
            <div className="border border-[#E6DCC5] rounded-lg overflow-hidden">
              <div className="p-4 bg-[#FAF8F4] border-b border-[#E6DCC5] flex items-center justify-between gap-4">
                <div className="flex items-center gap-2.5">
                  <PackageCheck className="w-5 h-5 text-[#8E6718]" />
                  <div>
                    <p className="text-sm font-semibold text-[#1C1917] tabular-nums">
                      Order #{selectedOrder.orderNumber} · {selectedOrder.status}
                    </p>
                    <p className="text-xs text-[#645D54]">
                      Estimated Dispatch: {selectedOrder.estimatedDispatch}
                    </p>
                  </div>
                </div>
                <span className="text-sm font-semibold text-[#1C1917] tabular-nums">
                  ${selectedOrder.total.toLocaleString()}
                </span>
              </div>

              <div className="p-4 space-y-3 text-sm">
                <div className="text-xs text-[#645D54]">
                  Recipient:{' '}
                  <span className="font-medium text-[#1C1917]">
                    {selectedOrder.customer.fullName}
                  </span>{' '}
                  · {selectedOrder.customer.address}, {selectedOrder.customer.postalCode}
                </div>

                <div className="divide-y divide-[#EFE8D8] border-t border-[#EFE8D8]">
                  {selectedOrder.items.map((item) => (
                    <div key={item.cartItemId} className="pt-3 flex justify-between gap-4">
                      <div>
                        <p className="font-medium text-[#1C1917]">
                          {item.name} × {item.quantity}
                        </p>
                        <p className="text-xs text-[#645D54]">
                          {item.selectedSize.label} · {item.selectedFinish}
                        </p>
                        {item.engraving.enabled && item.engraving.recipient && (
                          <p className="text-xs text-[#8E6718] mt-0.5">
                            Engraving Proof: {item.engraving.recipient}
                            {item.engraving.citation ? ` · ${item.engraving.citation}` : ''}
                          </p>
                        )}
                      </div>
                      <span className="text-sm font-semibold text-[#1C1917] tabular-nums">
                        ${(item.unitPrice * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            searched && (
              <div className="p-6 text-center bg-[#FAF8F4] border border-[#E6DCC5] rounded-lg">
                <p className="text-sm font-medium text-[#1C1917]">
                  No order found matching “{query}”
                </p>
                <p className="text-xs text-[#645D54] mt-1">
                  Verify your order reference (such as MA-1042) and try again.
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
