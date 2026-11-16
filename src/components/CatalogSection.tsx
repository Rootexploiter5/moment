import { Search, SlidersHorizontal, ArrowUpRight, Plus } from 'lucide-react';
import { CategoryFilter, Product, SortOption } from '../types/shop';
import { ResilientImage } from './ResilientImage';

interface CatalogSectionProps {
  products: Product[];
  selectedCategory: CategoryFilter;
  onSelectCategory: (category: CategoryFilter) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  onSelectProduct: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
}

const CATEGORIES: CategoryFilter[] = [
  'All Pieces',
  'Championship Cups',
  'Crystal & Glass',
  'Commemorative Plaques',
  'Heritage Medals',
];

export function CatalogSection({
  products,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  onSelectProduct,
  onQuickAdd,
}: CatalogSectionProps) {
  return (
    <section id="collection" className="bg-white py-14 lg:py-20 border-b border-[#E6DCC5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <p className="text-xs font-medium tracking-[0.16em] uppercase text-[#8E6718] mb-2">
              Curated Atelier Catalog
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#1C1917] text-balance">
              Trophies, Awards &amp; Commemorative Momentos
            </h2>
          </div>
          <p className="text-sm text-[#645D54] max-w-md">
            Select any piece to choose dimensions, metal finish, and custom inscription details
            with live engraving proofing.
          </p>
        </div>

        {/* Search, Category Filter Tabs & Sort Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-8 mb-8 border-b border-[#E6DCC5]">
          {/* Category Filter Tabs */}
          <div
            role="tablist"
            aria-label="Filter collection by category"
            className="flex flex-wrap items-center gap-1.5 p-1 bg-[#FAF8F4] border border-[#E6DCC5] rounded-lg"
          >
            {CATEGORIES.map((category) => {
              const active = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => onSelectCategory(category)}
                  className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-[#1C1917] text-white shadow-xs'
                      : 'text-[#645D54] hover:text-[#1C1917] hover:bg-white/70'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {/* Search Input & Sort Select */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative flex-1 sm:w-64">
              <Search
                className="w-4 h-4 text-[#8E6718] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                strokeWidth={1.75}
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search trophies, marble, brass..."
                aria-label="Search trophies and momentos"
                className="w-full pl-10 pr-4 py-2 text-sm bg-[#FAF8F4] border border-[#E6DCC5] rounded-md text-[#1C1917] placeholder:text-[#8A8177] focus:outline-none focus:border-[#8E6718] focus:bg-white transition-colors"
              />
            </div>

            <div className="relative flex items-center">
              <SlidersHorizontal
                className="w-4 h-4 text-[#8E6718] absolute left-3 pointer-events-none"
                strokeWidth={1.75}
              />
              <select
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value as SortOption)}
                aria-label="Sort products"
                className="pl-9 pr-8 py-2 text-sm bg-[#FAF8F4] border border-[#E6DCC5] rounded-md text-[#1C1917] focus:outline-none focus:border-[#8E6718] focus:bg-white transition-colors cursor-pointer"
              >
                <option value="featured">Sort: Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {products.length === 0 ? (
          <div className="py-16 px-6 text-center bg-[#FAF8F4] border border-[#E6DCC5] rounded-lg">
            <p className="font-display text-2xl font-semibold text-[#1C1917] mb-2">
              No pieces match your current filter
            </p>
            <p className="text-sm text-[#645D54] mb-6">
              Try clearing your search term or viewing all handcrafted categories.
            </p>
            <button
              type="button"
              onClick={() => {
                onSelectCategory('All Pieces');
                onSearchChange('');
              }}
              className="px-5 py-2.5 text-sm font-medium text-white bg-[#8E6718] hover:bg-[#755412] rounded-md transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-8">
            {products.map((product) => (
              <article
                key={product.id}
                className="group flex flex-col bg-white border border-[#E6DCC5] rounded-lg overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_32px_-16px_rgba(28,25,23,0.14)]"
              >
                {/* Product Image Area (65-75% visual anchor) */}
                <button
                  type="button"
                  onClick={() => onSelectProduct(product)}
                  className="relative aspect-[4/3] w-full bg-[#FAF8F4] overflow-hidden text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#8E6718]"
                >
                  <ResilientImage
                    src={product.image}
                    alt={product.imageAlt}
                    title={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                  <span className="sr-only">Customize {product.name}</span>
                </button>

                {/* Uniform Card Metadata & Purchase Row */}
                <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between gap-4">
                  <div>
                    {/* Quiet 1-line unboxed metadata (Zero-Pill Discipline) */}
                    <div className="flex items-center gap-2 text-xs text-[#645D54] mb-1.5 truncate">
                      <span className="uppercase tracking-wider text-[#8E6718] font-medium">
                        {product.category}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="truncate">{product.availability}</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => onSelectProduct(product)}
                      className="text-left w-full cursor-pointer group/title"
                    >
                      <h3 className="font-display text-2xl font-semibold text-[#1C1917] group-hover/title:text-[#8E6718] transition-colors">
                        {product.name}
                      </h3>
                    </button>

                    <p className="text-xs text-[#645D54] mt-1">
                      {product.material}
                    </p>
                  </div>

                  {/* Aligned Price & Action Baseline */}
                  <div className="pt-4 border-t border-[#EFE8D8] flex items-center justify-between gap-3">
                    <div>
                      <span className="block text-[11px] uppercase tracking-wider text-[#645D54]">
                        Starting at
                      </span>
                      <span className="text-base font-semibold text-[#1C1917] tabular-nums">
                        ${product.basePrice.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => onQuickAdd(product)}
                        className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#1C1917] bg-[#FAF8F4] border border-[#E6DCC5] hover:border-[#8E6718] hover:bg-white rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                        title={`Quick add ${product.name} to bag`}
                      >
                        <Plus className="w-3.5 h-3.5 text-[#8E6718]" />
                        <span>Quick Add</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => onSelectProduct(product)}
                        className="inline-flex items-center gap-1 px-3.5 py-2 text-xs font-semibold text-white bg-[#1C1917] hover:bg-[#8E6718] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        <span>Customize</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
