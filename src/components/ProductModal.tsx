import { useState, useEffect } from 'react';
import { X, Check, Minus, Plus } from 'lucide-react';
import { EngravingDetails, EngravingFont, Product, ProductSize } from '../types/shop';
import { ResilientImage } from './ResilientImage';

interface ProductModalProps {
  product: Product | null;
  initialEngraving: EngravingDetails;
  onClose: () => void;
  onAddToCart: (params: {
    product: Product;
    size: ProductSize;
    finish: string;
    quantity: number;
    engraving: EngravingDetails;
  }) => void;
}

export function ProductModal({
  product,
  initialEngraving,
  onClose,
  onAddToCart,
}: ProductModalProps) {
  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null);
  const [selectedFinish, setSelectedFinish] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [engraving, setEngraving] = useState<EngravingDetails>(initialEngraving);

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0]);
      setSelectedFinish(product.finishes[0]);
      setQuantity(1);
      setEngraving(initialEngraving);
    }
  }, [product, initialEngraving]);

  useEffect(() => {
    if (!product) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [product, onClose]);

  if (!product || !selectedSize) return null;

  const unitPrice = product.basePrice + selectedSize.priceDelta;
  const lineTotal = unitPrice * quantity;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddToCart({
      product,
      size: selectedSize,
      finish: selectedFinish,
      quantity,
      engraving,
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#1C1917]/60 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-white border border-[#E6DCC5] rounded-lg shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close product details"
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/95 border border-[#E6DCC5] text-[#1C1917] hover:border-[#8E6718] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Left Column: Sticky Product Image & Specifications */}
          <div className="lg:col-span-6 bg-[#FAF8F4] p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-[#E6DCC5] flex flex-col justify-between">
            <div>
              <div className="aspect-[4/3] w-full bg-white border border-[#E6DCC5] rounded-md overflow-hidden mb-6">
                <ResilientImage
                  src={product.image}
                  alt={product.imageAlt}
                  title={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <p className="text-xs font-medium uppercase tracking-wider text-[#8E6718] mb-2">
                Craftsmanship &amp; Specifications
              </p>
              <p className="text-sm text-[#645D54] leading-relaxed mb-6">
                {product.craftNotes}
              </p>
            </div>

            <dl className="grid grid-cols-2 gap-4 pt-5 border-t border-[#E6DCC5] text-xs">
              <div>
                <dt className="text-[#645D54]">Dimensions</dt>
                <dd className="font-semibold text-[#1C1917] mt-0.5 tabular-nums">
                  {selectedSize.dimensions}
                </dd>
              </div>
              <div>
                <dt className="text-[#645D54]">Approximate Weight</dt>
                <dd className="font-semibold text-[#1C1917] mt-0.5 tabular-nums">
                  {product.weight}
                </dd>
              </div>
              <div>
                <dt className="text-[#645D54]">Reference SKU</dt>
                <dd className="font-semibold text-[#1C1917] mt-0.5 tabular-nums">
                  {product.sku}
                </dd>
              </div>
              <div>
                <dt className="text-[#645D54]">Engraving Lead Time</dt>
                <dd className="font-semibold text-[#1C1917] mt-0.5">
                  {product.leadTime}
                </dd>
              </div>
            </dl>
          </div>

          {/* Right Column: Contiguous Purchase & Engraving Module */}
          <form onSubmit={handleSubmit} className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs text-[#645D54] mb-2">
                <span className="uppercase tracking-wider text-[#8E6718] font-medium">
                  {product.category}
                </span>
                <span aria-hidden="true">·</span>
                <span>{product.availability}</span>
              </div>

              <h2
                id="product-modal-title"
                className="font-display text-3xl sm:text-4xl font-semibold text-[#1C1917] mb-2 pr-8"
              >
                {product.name}
              </h2>

              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-2xl font-semibold text-[#1C1917] tabular-nums">
                  ${unitPrice.toLocaleString()}
                </span>
                <span className="text-xs text-[#645D54]">
                  Includes complimentary gold plate engraving
                </span>
              </div>

              <p className="text-sm text-[#645D54] leading-relaxed mb-6">
                {product.shortDescription}
              </p>

              {/* Size Selector */}
              <div className="mb-5">
                <span className="block text-xs font-semibold uppercase tracking-wider text-[#1C1917] mb-2">
                  Select Size &amp; Stature
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {product.sizes.map((size) => {
                    const active = selectedSize.label === size.label;
                    return (
                      <button
                        key={size.label}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`px-3 py-2.5 text-left border rounded-md transition-colors cursor-pointer ${
                          active
                            ? 'border-[#8E6718] bg-[#FAF8F4] text-[#1C1917]'
                            : 'border-[#E6DCC5] bg-white text-[#645D54] hover:border-[#C9A24D]'
                        }`}
                      >
                        <span className="block text-xs font-semibold text-[#1C1917] truncate">
                          {size.label}
                        </span>
                        <span className="block text-[11px] text-[#645D54] tabular-nums mt-0.5">
                          {size.priceDelta === 0
                            ? 'Standard'
                            : `+$${size.priceDelta}`}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Finish Selector */}
              <div className="mb-6">
                <span className="block text-xs font-semibold uppercase tracking-wider text-[#1C1917] mb-2">
                  Metal Finish
                </span>
                <div className="flex flex-wrap gap-2">
                  {product.finishes.map((finish) => {
                    const active = selectedFinish === finish;
                    return (
                      <button
                        key={finish}
                        type="button"
                        onClick={() => setSelectedFinish(finish)}
                        className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium border rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                          active
                            ? 'border-[#1C1917] bg-[#1C1917] text-white'
                            : 'border-[#E6DCC5] bg-white text-[#1C1917] hover:border-[#8E6718]'
                        }`}
                      >
                        {active && <Check className="w-3.5 h-3.5 text-[#DFC684]" />}
                        <span>{finish}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Optional Custom Engraving Box */}
              <div className="p-4 sm:p-5 bg-[#FAF8F4] border border-[#E6DCC5] rounded-lg mb-6">
                <div className="flex items-center justify-between gap-4 mb-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#1C1917]">
                      Custom Plaque Engraving
                    </p>
                    <p className="text-xs text-[#645D54]">
                      Complimentary diamond-drag inscription
                    </p>
                  </div>
                  <label className="inline-flex items-center gap-2 text-xs font-medium text-[#1C1917] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={engraving.enabled}
                      onChange={(e) =>
                        setEngraving((prev) => ({ ...prev, enabled: e.target.checked }))
                      }
                      className="w-4 h-4 accent-[#8E6718] rounded cursor-pointer"
                    />
                    <span>Include Inscription</span>
                  </label>
                </div>

                {engraving.enabled ? (
                  <div className="space-y-3 pt-2 border-t border-[#E6DCC5]">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        maxLength={42}
                        value={engraving.recipient}
                        onChange={(e) =>
                          setEngraving((prev) => ({ ...prev, recipient: e.target.value }))
                        }
                        placeholder="Line 1: Honoree or Club Name"
                        aria-label="Engraving line 1 honoree"
                        className="w-full px-3 py-2 text-xs bg-white border border-[#E6DCC5] rounded-md text-[#1C1917] focus:outline-none focus:border-[#8E6718]"
                      />
                      <input
                        type="text"
                        maxLength={32}
                        value={engraving.dateLine}
                        onChange={(e) =>
                          setEngraving((prev) => ({ ...prev, dateLine: e.target.value }))
                        }
                        placeholder="Line 3: Year or Date (e.g. 2026)"
                        aria-label="Engraving line 3 year or date"
                        className="w-full px-3 py-2 text-xs bg-white border border-[#E6DCC5] rounded-md text-[#1C1917] focus:outline-none focus:border-[#8E6718]"
                      />
                    </div>
                    <input
                      type="text"
                      maxLength={54}
                      value={engraving.citation}
                      onChange={(e) =>
                        setEngraving((prev) => ({ ...prev, citation: e.target.value }))
                      }
                      placeholder="Line 2: Award Citation or Milestone"
                      aria-label="Engraving line 2 citation"
                      className="w-full px-3 py-2 text-xs bg-white border border-[#E6DCC5] rounded-md text-[#1C1917] focus:outline-none focus:border-[#8E6718]"
                    />
                    <div className="flex items-center justify-between gap-2 pt-1">
                      <span className="text-[11px] text-[#645D54]">Lettering Style:</span>
                      <div className="flex items-center gap-1.5">
                        {(['Classic Roman', 'Atelier Script'] as EngravingFont[]).map((font) => (
                          <button
                            key={font}
                            type="button"
                            onClick={() =>
                              setEngraving((prev) => ({ ...prev, fontStyle: font }))
                            }
                            className={`px-2.5 py-1 text-[11px] font-medium rounded border transition-colors cursor-pointer ${
                              engraving.fontStyle === font
                                ? 'bg-[#1C1917] text-white border-[#1C1917]'
                                : 'bg-white text-[#645D54] border-[#E6DCC5]'
                            }`}
                          >
                            {font}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Mini Live Gold Plate Proof */}
                    <div className="gold-foil-surface px-4 py-3 rounded-sm border border-[#A87E2A] text-center">
                      <p
                        className={`text-xs text-[#2B1F06] truncate ${
                          engraving.fontStyle === 'Atelier Script'
                            ? 'font-display italic font-semibold text-sm'
                            : 'font-display font-semibold uppercase tracking-[0.1em]'
                        }`}
                      >
                        {engraving.recipient || 'HONOREE NAME'}
                      </p>
                      <p className="text-[11px] text-[#3D2C0A] truncate mt-0.5">
                        {engraving.citation || 'Citation Line'}
                      </p>
                      <p className="text-[10px] tracking-[0.18em] uppercase text-[#4B360C] mt-0.5 tabular-nums">
                        {engraving.dateLine || 'MMXXVI'}
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-[#645D54]">
                    Piece will be supplied with a blank brushed gold presentation plate.
                  </p>
                )}
              </div>
            </div>

            {/* Quantity & Primary Purchase CTA */}
            <div className="pt-4 border-t border-[#E6DCC5] flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="inline-flex items-center justify-between border border-[#E6DCC5] rounded-md bg-[#FAF8F4] px-2 h-11 sm:w-32 shrink-0">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="p-1.5 text-[#1C1917] hover:text-[#8E6718] cursor-pointer"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-sm font-semibold text-[#1C1917] tabular-nums">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Increase quantity"
                  className="p-1.5 text-[#1C1917] hover:text-[#8E6718] cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                type="submit"
                className="flex-1 h-11 px-6 text-sm font-semibold text-white bg-[#8E6718] hover:bg-[#755412] rounded-md transition-colors cursor-pointer whitespace-nowrap"
              >
                Add to Shopping Bag · ${lineTotal.toLocaleString()}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
