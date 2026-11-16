import { useState, useEffect } from 'react';
import { X, Minus, Plus, Trash2, CheckCircle2, ArrowLeft, ShoppingBag } from 'lucide-react';
import { CartItem, CustomerDetails, OrderRecord } from '../types/shop';
import { ResilientImage } from './ResilientImage';

interface CartDrawerProps {
  isOpen: boolean;
  items: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (cartItemId: string, delta: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onPlaceOrder: (customer: CustomerDetails) => OrderRecord;
  onInspectOrder: (orderNumber: string) => void;
}

const FREE_SHIPPING_THRESHOLD = 350;
const STANDARD_SHIPPING = 25;

export function CartDrawer({
  isOpen,
  items,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onPlaceOrder,
  onInspectOrder,
}: CartDrawerProps) {
  const [step, setStep] = useState<'bag' | 'checkout' | 'confirmed'>('bag');
  const [confirmedOrder, setConfirmedOrder] = useState<OrderRecord | null>(null);
  const [customer, setCustomer] = useState<CustomerDetails>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    postalCode: '',
    paymentMethod: 'Card on Delivery',
  });
  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen && items.length > 0 && step === 'confirmed' && !confirmedOrder) {
      setStep('bag');
    }
  }, [isOpen, items.length, step, confirmedOrder]);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const qualifiesFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0;
  const shippingFee = qualifiesFreeShipping ? 0 : STANDARD_SHIPPING;
  const total = subtotal + shippingFee;
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !customer.fullName.trim() ||
      !customer.email.trim() ||
      !customer.phone.trim() ||
      !customer.address.trim() ||
      !customer.postalCode.trim()
    ) {
      setFormError('Please complete all recipient and delivery address fields.');
      return;
    }
    setFormError('');
    const record = onPlaceOrder(customer);
    setConfirmedOrder(record);
    setStep('confirmed');
  };

  const handleCloseDrawer = () => {
    if (step === 'confirmed') {
      setStep('bag');
      setConfirmedOrder(null);
    }
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-[#1C1917]/55 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Bag"
      onClick={handleCloseDrawer}
    >
      <aside
        className="w-full max-w-lg h-full bg-white border-l border-[#E6DCC5] shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="px-6 py-5 border-b border-[#E6DCC5] flex items-center justify-between gap-4 bg-[#FAF8F4]">
          <div className="flex items-center gap-3">
            {step === 'checkout' && (
              <button
                type="button"
                onClick={() => setStep('bag')}
                aria-label="Back to shopping bag"
                className="p-1.5 text-[#1C1917] hover:text-[#8E6718] cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <h2 className="font-display text-2xl font-semibold text-[#1C1917]">
              {step === 'bag' && 'Shopping Bag'}
              {step === 'checkout' && 'Delivery & Checkout'}
              {step === 'confirmed' && 'Order Confirmed'}
            </h2>
          </div>

          <button
            type="button"
            onClick={handleCloseDrawer}
            aria-label="Close shopping bag"
            className="w-9 h-9 flex items-center justify-center rounded-full border border-[#E6DCC5] bg-white text-[#1C1917] hover:border-[#8E6718] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {step === 'confirmed' && confirmedOrder ? (
            <div className="space-y-6">
              <div className="p-6 bg-[#FAF8F4] border border-[#E6DCC5] rounded-lg text-center">
                <div className="w-12 h-12 rounded-full bg-[#8E6718]/10 border border-[#8E6718]/30 flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="w-6 h-6 text-[#8E6718]" />
                </div>
                <p className="text-xs font-medium uppercase tracking-wider text-[#8E6718]">
                  Order #{confirmedOrder.orderNumber} Confirmed
                </p>
                <h3 className="font-display text-2xl font-semibold text-[#1C1917] mt-1">
                  Thank you, {confirmedOrder.customer.fullName}
                </h3>
                <p className="text-sm text-[#645D54] mt-2">
                  Your pieces have entered our engraving queue. Estimated dispatch:{' '}
                  <span className="font-medium text-[#1C1917]">
                    {confirmedOrder.estimatedDispatch}
                  </span>
                  .
                </p>
              </div>

              <div className="border border-[#E6DCC5] rounded-lg divide-y divide-[#E6DCC5]">
                <div className="px-4 py-3 bg-[#FAF8F4] flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#1C1917]">
                  <span>Receipt Summary</span>
                  <span className="tabular-nums">#{confirmedOrder.orderNumber}</span>
                </div>
                {confirmedOrder.items.map((item) => (
                  <div key={item.cartItemId} className="p-4 flex justify-between gap-4 text-sm">
                    <div>
                      <p className="font-semibold text-[#1C1917]">
                        {item.name} × {item.quantity}
                      </p>
                      <p className="text-xs text-[#645D54]">
                        {item.selectedSize.label} · {item.selectedFinish}
                      </p>
                      {item.engraving.enabled && item.engraving.recipient && (
                        <p className="text-xs text-[#8E6718] mt-1">
                          Engraving: “{item.engraving.recipient}”
                        </p>
                      )}
                    </div>
                    <span className="font-semibold text-[#1C1917] tabular-nums shrink-0">
                      ${(item.unitPrice * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
                <div className="p-4 bg-[#FAF8F4] space-y-1.5 text-sm">
                  <div className="flex justify-between text-[#645D54]">
                    <span>Delivery ({confirmedOrder.customer.paymentMethod})</span>
                    <span className="tabular-nums">
                      {confirmedOrder.shippingFee === 0
                        ? 'Complimentary'
                        : `$${confirmedOrder.shippingFee}`}
                    </span>
                  </div>
                  <div className="flex justify-between font-semibold text-[#1C1917] text-base pt-1 border-t border-[#E6DCC5]">
                    <span>Total</span>
                    <span className="tabular-nums">${confirmedOrder.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => {
                    const num = confirmedOrder.orderNumber;
                    handleCloseDrawer();
                    onInspectOrder(num);
                  }}
                  className="flex-1 py-2.5 px-4 text-sm font-semibold text-white bg-[#1C1917] hover:bg-[#8E6718] rounded-md transition-colors cursor-pointer"
                >
                  Track This Order
                </button>
                <button
                  type="button"
                  onClick={handleCloseDrawer}
                  className="flex-1 py-2.5 px-4 text-sm font-medium text-[#1C1917] bg-white border border-[#E6DCC5] hover:border-[#8E6718] rounded-md transition-colors cursor-pointer"
                >
                  Continue Browsing
                </button>
              </div>
            </div>
          ) : items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-14 h-14 rounded-full bg-[#FAF8F4] border border-[#E6DCC5] flex items-center justify-center mb-4">
                <ShoppingBag className="w-6 h-6 text-[#8E6718]" strokeWidth={1.5} />
              </div>
              <h3 className="font-display text-2xl font-semibold text-[#1C1917] mb-2">
                Your shopping bag is empty
              </h3>
              <p className="text-sm text-[#645D54] max-w-xs mb-6">
                Explore our handcrafted 24k gold cups, optical crystal awards, and commemorative
                plaques to begin your commission.
              </p>
              <button
                type="button"
                onClick={handleCloseDrawer}
                className="px-5 py-2.5 text-sm font-semibold text-white bg-[#8E6718] hover:bg-[#755412] rounded-md transition-colors cursor-pointer"
              >
                Browse Collection
              </button>
            </div>
          ) : step === 'bag' ? (
            <div className="space-y-6">
              {/* Free White-Glove Delivery Progress */}
              <div className="p-4 bg-[#FAF8F4] border border-[#E6DCC5] rounded-lg">
                <p className="text-xs font-medium text-[#1C1917] mb-2">
                  {qualifiesFreeShipping
                    ? 'Your order qualifies for complimentary insured white-glove delivery.'
                    : `Add $${remainingForFreeShipping.toLocaleString()} more for complimentary insured white-glove delivery.`}
                </p>
                <div className="w-full h-1.5 bg-[#E6DCC5] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#8E6718] transition-all duration-300"
                    style={{
                      width: `${Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)}%`,
                    }}
                  />
                </div>
              </div>

              {/* Bag Items */}
              <div className="divide-y divide-[#E6DCC5]">
                {items.map((item) => (
                  <div key={item.cartItemId} className="py-5 first:pt-0 flex gap-4">
                    <div className="w-24 aspect-[4/3] bg-[#FAF8F4] border border-[#E6DCC5] rounded-md overflow-hidden shrink-0">
                      <ResilientImage
                        src={item.image}
                        alt={item.name}
                        title={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-display text-lg font-semibold text-[#1C1917] leading-snug">
                          {item.name}
                        </h3>
                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.cartItemId)}
                          aria-label={`Remove ${item.name}`}
                          className="p-1 text-[#645D54] hover:text-[#1C1917] cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <p className="text-xs text-[#645D54] mt-0.5">
                        {item.selectedSize.label} · {item.selectedFinish}
                      </p>

                      {item.engraving.enabled &&
                        (item.engraving.recipient || item.engraving.citation) && (
                          <div className="mt-2 p-2 bg-[#FAF8F4] border border-[#E6DCC5] rounded text-[11px] text-[#645D54]">
                            <span className="font-medium text-[#8E6718]">
                              Engraving ({item.engraving.fontStyle}):
                            </span>{' '}
                            {[
                              item.engraving.recipient,
                              item.engraving.citation,
                              item.engraving.dateLine,
                            ]
                              .filter(Boolean)
                              .join(' · ')}
                          </div>
                        )}

                      <div className="mt-3 flex items-center justify-between gap-3">
                        <div className="inline-flex items-center border border-[#E6DCC5] rounded bg-[#FAF8F4]">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.cartItemId, -1)}
                            aria-label="Decrease quantity"
                            className="p-1.5 text-[#1C1917] hover:text-[#8E6718] cursor-pointer"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-2.5 text-xs font-semibold tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.cartItemId, 1)}
                            aria-label="Increase quantity"
                            className="p-1.5 text-[#1C1917] hover:text-[#8E6718] cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <span className="text-sm font-semibold text-[#1C1917] tabular-nums">
                          ${(item.unitPrice * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Checkout Form */
            <form id="checkout-form" onSubmit={handleCheckoutSubmit} className="space-y-4">
              {formError && (
                <div
                  role="alert"
                  className="p-3 text-xs font-medium text-[#7F1D1D] bg-[#FEF2F2] border border-[#FECACA] rounded-md"
                >
                  {formError}
                </div>
              )}

              <div>
                <label htmlFor="checkout-name" className="block text-xs font-medium text-[#1C1917] mb-1">
                  Full Name or Organization Recipient
                </label>
                <input
                  id="checkout-name"
                  type="text"
                  required
                  value={customer.fullName}
                  onChange={(e) => setCustomer((c) => ({ ...c, fullName: e.target.value }))}
                  placeholder="e.g. Victoria Thornton"
                  className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F4] border border-[#E6DCC5] rounded-md focus:outline-none focus:border-[#8E6718] focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="checkout-email" className="block text-xs font-medium text-[#1C1917] mb-1">
                    Email for Engraving Proof
                  </label>
                  <input
                    id="checkout-email"
                    type="email"
                    required
                    value={customer.email}
                    onChange={(e) => setCustomer((c) => ({ ...c, email: e.target.value }))}
                    placeholder="name@organization.org"
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F4] border border-[#E6DCC5] rounded-md focus:outline-none focus:border-[#8E6718] focus:bg-white"
                  />
                </div>
                <div>
                  <label htmlFor="checkout-phone" className="block text-xs font-medium text-[#1C1917] mb-1">
                    Phone Number
                  </label>
                  <input
                    id="checkout-phone"
                    type="tel"
                    required
                    value={customer.phone}
                    onChange={(e) => setCustomer((c) => ({ ...c, phone: e.target.value }))}
                    placeholder="+1 (555) 234-5678"
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F4] border border-[#E6DCC5] rounded-md focus:outline-none focus:border-[#8E6718] focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="checkout-address" className="block text-xs font-medium text-[#1C1917] mb-1">
                  Street Delivery Address
                </label>
                <input
                  id="checkout-address"
                  type="text"
                  required
                  value={customer.address}
                  onChange={(e) => setCustomer((c) => ({ ...c, address: e.target.value }))}
                  placeholder="1450 Heritage Way, Suite 400"
                  className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F4] border border-[#E6DCC5] rounded-md focus:outline-none focus:border-[#8E6718] focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="checkout-postal" className="block text-xs font-medium text-[#1C1917] mb-1">
                    Postal / ZIP Code
                  </label>
                  <input
                    id="checkout-postal"
                    type="text"
                    required
                    value={customer.postalCode}
                    onChange={(e) => setCustomer((c) => ({ ...c, postalCode: e.target.value }))}
                    placeholder="94105"
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F4] border border-[#E6DCC5] rounded-md focus:outline-none focus:border-[#8E6718] focus:bg-white"
                  />
                </div>

                <div>
                  <label htmlFor="checkout-payment" className="block text-xs font-medium text-[#1C1917] mb-1">
                    Payment Terms
                  </label>
                  <select
                    id="checkout-payment"
                    value={customer.paymentMethod}
                    onChange={(e) =>
                      setCustomer((c) => ({
                        ...c,
                        paymentMethod: e.target.value as CustomerDetails['paymentMethod'],
                      }))
                    }
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F4] border border-[#E6DCC5] rounded-md focus:outline-none focus:border-[#8E6718] focus:bg-white"
                  >
                    <option value="Card on Delivery">Card on Delivery</option>
                    <option value="Invoice / Bank Transfer">Invoice / Bank Transfer</option>
                  </select>
                </div>
              </div>

              <div className="p-4 bg-[#FAF8F4] border border-[#E6DCC5] rounded-lg text-xs text-[#645D54] leading-relaxed">
                Every trophy and plaque undergoes final visual inspection before dispatch. You will
                receive an order tracking reference immediately upon confirmation.
              </div>
            </form>
          )}
        </div>

        {/* Drawer Footer Totals & CTA */}
        {items.length > 0 && step !== 'confirmed' && (
          <div className="px-6 py-5 border-t border-[#E6DCC5] bg-[#FAF8F4] space-y-3">
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between text-[#645D54]">
                <span>Subtotal</span>
                <span className="tabular-nums">${subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[#645D54]">
                <span>Engraving &amp; Presentation Box</span>
                <span>Complimentary</span>
              </div>
              <div className="flex justify-between text-[#645D54]">
                <span>Insured Delivery</span>
                <span className="tabular-nums">
                  {shippingFee === 0 ? 'Complimentary' : `$${shippingFee}`}
                </span>
              </div>
              <div className="flex justify-between text-base font-semibold text-[#1C1917] pt-2 border-t border-[#E6DCC5]">
                <span>Total</span>
                <span className="tabular-nums">${total.toLocaleString()}</span>
              </div>
            </div>

            {step === 'bag' ? (
              <button
                type="button"
                onClick={() => setStep('checkout')}
                className="w-full py-3 px-6 text-sm font-semibold text-white bg-[#8E6718] hover:bg-[#755412] rounded-md transition-colors cursor-pointer"
              >
                Proceed to Checkout
              </button>
            ) : (
              <button
                type="submit"
                form="checkout-form"
                className="w-full py-3 px-6 text-sm font-semibold text-white bg-[#8E6718] hover:bg-[#755412] rounded-md transition-colors cursor-pointer"
              >
                Confirm Order · ${total.toLocaleString()}
              </button>
            )}
          </div>
        )}
      </aside>
    </div>
  );
}
