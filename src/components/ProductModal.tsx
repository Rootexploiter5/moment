import { useState, useEffect } from 'react';
import { X, Check, Minus, Plus } from 'lucide-react';
import { EngravingDetails, EngravingFont, Product, ProductSize } from '../types/shop';
import { ResilientImage } from './ResilientImage';

export interface EngravingTemplateOption {
  id: string;
  name: string;
  badge: string;
  image: string;
  description: string;
  fontStyle: EngravingFont;
  defaultRecipient: string;
  defaultCitation: string;
  defaultDate: string;
}

export const ENGRAVING_TEMPLATES: EngravingTemplateOption[] = [
  {
    id: 'kathakali-heritage',
    name: 'Kathakali Heritage Template',
    badge: 'Kerala Heritage',
    image: '/src/assets/images/tm_kathakali_heritage_memento.jpg',
    description: 'Traditional Kathakali wood relief with gold filigree and gloss acrylic plaque',
    fontStyle: 'Classic Roman',
    defaultRecipient: 'KERALA CULTURAL FESTIVAL',
    defaultCitation: 'Grand Achievement Award',
    defaultDate: 'NOVEMBER 2026',
  },
  {
    id: 'veena-memorial',
    name: 'Veena Memorial Template',
    badge: 'Music & Arts',
    image: '/src/assets/images/tm_veena_musical_memento.jpg',
    description: 'Carved Saraswati Veena wood sculpture framing full-color dedication plate',
    fontStyle: 'Atelier Script',
    defaultRecipient: 'CARNATIC MUSIC SAMMELAN',
    defaultCitation: 'In Commemoration of Lifetime Artistry',
    defaultDate: 'ANNUAL FEST 2026',
  },
  {
    id: 'book-pen-literary',
    name: 'Book & Pen Literary Template',
    badge: 'Literary & Academic',
    image: '/src/assets/images/tm_book_pen_literary_award.jpg',
    description: 'Milled wooden open book with gold-accent fountain pen and portrait medallion',
    fontStyle: 'Classic Roman',
    defaultRecipient: 'DR. K. R. NARAYANAN FORUM',
    defaultCitation: 'Distinguished Authorship Award',
    defaultDate: '2026',
  },
  {
    id: 'nilavilakku-lamp',
    name: 'Nilavilakku Lamp Template',
    badge: 'Auspicious Lamp',
    image: '/src/assets/images/tm_nilavilakku_traditional_lamp_memento.jpg',
    description: 'Seasoned teak Mayilvilakku lamp with circular floral laser citation plate',
    fontStyle: 'Classic Roman',
    defaultRecipient: 'STATE CONVOCATION ASSEMBLE',
    defaultCitation: 'Inaugural Honor & Felicitation',
    defaultDate: '2026',
  },
];

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
  const [selectedTemplate, setSelectedTemplate] = useState<EngravingTemplateOption>(
    ENGRAVING_TEMPLATES[0]
  );
  const [activeDisplayImage, setActiveDisplayImage] = useState<string>(
    product?.image || ENGRAVING_TEMPLATES[0].image
  );

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0]);
      setSelectedFinish(product.finishes[0]);
      setQuantity(1);
      setSelectedTemplate(ENGRAVING_TEMPLATES[0]);
      setActiveDisplayImage(product.image);
    }
  }, [product]);

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
      engraving: {
        enabled: true,
        templateId: selectedTemplate.id,
        templateName: selectedTemplate.name,
        templateImage: selectedTemplate.image,
        recipient: '',
        citation: '',
        dateLine: '',
        fontStyle: selectedTemplate.fontStyle,
      },
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
          <div className="lg:col-span-6 bg-[#FAF8F4] p-5 sm:p-7 border-b lg:border-b-0 lg:border-r border-[#E6DCC5] flex flex-col justify-between">
            <div>
              {/* Main Showcase Trophy Photo */}
              <div className="aspect-[4/3] w-full bg-white border border-[#E6DCC5] rounded-md overflow-hidden mb-3.5 shadow-sm">
                <ResilientImage
                  src={activeDisplayImage || product.image}
                  alt={product.imageAlt}
                  title={product.name}
                  className="w-full h-full object-cover transition-all duration-300"
                />
              </div>

              {/* 4 Trophy Template Design Thumbnails Strip */}
              <div className="mb-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8E6718]">
                    Trophy Design Templates ({ENGRAVING_TEMPLATES.length})
                  </span>
                  <span className="text-[11px] text-[#645D54]">Click thumbnail to inspect</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {ENGRAVING_TEMPLATES.map((tmpl) => {
                    const isSelected = selectedTemplate.id === tmpl.id;
                    return (
                      <button
                        key={tmpl.id}
                        type="button"
                        onClick={() => {
                          setSelectedTemplate(tmpl);
                          setActiveDisplayImage(tmpl.image);
                        }}
                        className={`group relative aspect-square rounded-md overflow-hidden border-2 transition-all cursor-pointer bg-white ${isSelected
                          ? 'border-[#8E6718] shadow-sm ring-2 ring-[#8E6718]/40'
                          : 'border-[#E6DCC5] opacity-75 hover:opacity-100 hover:border-[#C9A24D]'
                          }`}
                      >
                        <img
                          src={tmpl.image}
                          alt={tmpl.name}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        {isSelected && (
                          <span className="absolute top-1 right-1 bg-[#8E6718] text-white p-0.5 rounded-full shadow-xs">
                            <Check className="w-2.5 h-2.5" />
                          </span>
                        )}
                        <span className="absolute inset-x-0 bottom-0 bg-[#1C1917]/85 text-[#DFC684] text-[9px] font-medium py-0.5 text-center truncate px-1 backdrop-blur-xs">
                          {tmpl.badge}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <p className="text-xs font-medium uppercase tracking-wider text-[#8E6718] mb-1.5">
                Craftsmanship &amp; Specifications
              </p>
              <p className="text-xs sm:text-sm text-[#645D54] leading-relaxed mb-4">
                {product.craftNotes}
              </p>
            </div>

            <dl className="grid grid-cols-2 gap-3 pt-4 border-t border-[#E6DCC5] text-xs">
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
              <div className="flex items-center gap-2 text-xs mb-2.5">
                <span className="inline-block px-2.5 py-0.5 uppercase tracking-wider text-[#DFC684] bg-[#0E0D0C] border border-[#2B251D] rounded font-semibold text-[10px]">
                  {product.category}
                </span>
                <span className="text-[#645D54]" aria-hidden="true">·</span>
                <span className="text-xs text-[#8E6718] font-medium">{product.availability}</span>
              </div>

              <h2
                id="product-modal-title"
                className="font-display text-3xl sm:text-4xl font-semibold text-[#1C1917] mb-2 pr-8"
              >
                {product.name}
              </h2>

              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-2xl font-semibold text-[#1C1917] tabular-nums">
                  ₹{unitPrice.toLocaleString('en-IN')}
                </span>
                <span className="text-xs text-[#645D54]">
                  Includes complimentary custom plate engraving
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
                        className={`px-3 py-2.5 text-left border rounded-md transition-all cursor-pointer ${active
                          ? 'border-[#0E0D0C] bg-[#0E0D0C] text-white shadow-xs'
                          : 'border-[#E6DCC5] bg-white text-[#645D54] hover:border-[#8E6718]'
                          }`}
                      >
                        <span className={`block text-xs font-semibold truncate ${active ? 'text-white' : 'text-[#1C1917]'}`}>
                          {size.label}
                        </span>
                        <span className={`block text-[11px] tabular-nums mt-0.5 ${active ? 'text-[#DFC684]' : 'text-[#645D54]'}`}>
                          {size.priceDelta === 0
                            ? 'Standard'
                            : `+₹${size.priceDelta.toLocaleString('en-IN')}`}
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
                        className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium border rounded-md transition-all whitespace-nowrap shrink-0 cursor-pointer ${active
                          ? 'border-[#0E0D0C] bg-[#0E0D0C] text-white shadow-xs'
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
                className="flex-1 h-11 px-6 text-sm font-semibold text-white bg-[#0E0D0C] hover:bg-[#8E6718] border border-[#2B261F] shadow-md hover:shadow-lg rounded-md transition-all cursor-pointer whitespace-nowrap flex items-center justify-center gap-2"
              >
                <span>Add to Shopping Bag</span>
                <span className="text-[#DFC684] tabular-nums font-bold">· ₹{lineTotal.toLocaleString('en-IN')}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
