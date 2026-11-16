import { useState, useEffect, useMemo } from 'react';
import { PRODUCTS, SAMPLE_ORDERS } from './data/products';
import {
  CartItem,
  CategoryFilter,
  CustomerDetails,
  EngravingDetails,
  OrderRecord,
  Product,
  ProductSize,
  SortOption,
} from './types/shop';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CatalogSection } from './components/CatalogSection';
import { AtelierProvenance } from './components/AtelierProvenance';
import { Footer } from './components/Footer';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { TrackOrderModal } from './components/TrackOrderModal';

const CART_STORAGE_KEY = 'today_mementos_cart_v1';
const ORDERS_STORAGE_KEY = 'today_mementos_orders_v1';

const DEFAULT_ENGRAVING: EngravingDetails = {
  enabled: true,
  recipient: 'ST. GEORGE TROPHY FEST',
  citation: 'Champions of Kerala First Place',
  dateLine: 'NOVEMBER 2026',
  fontStyle: 'Classic Roman',
};

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All Pieces');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('featured');

  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [trackOrderModal, setTrackOrderModal] = useState<{
    open: boolean;
    orderNumber: string;
  }>({ open: false, orderNumber: 'TM-1042' });

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY) || localStorage.getItem('maison_aurelia_cart_v1');
      return saved ? (JSON.parse(saved) as CartItem[]) : [];
    } catch {
      return [];
    }
  });

  const [orders, setOrders] = useState<OrderRecord[]>(() => {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY) || localStorage.getItem('maison_aurelia_orders_v1');
      if (saved) {
        const parsed = JSON.parse(saved) as OrderRecord[];
        return parsed.length > 0 ? parsed : SAMPLE_ORDERS;
      }
      return SAMPLE_ORDERS;
    } catch {
      return SAMPLE_ORDERS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // Ignore quota exceptions
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch {
      // Ignore quota exceptions
    }
  }, [orders]);

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const list = PRODUCTS.filter((product) => {
      const matchesCategory =
        selectedCategory === 'All Pieces' || product.category === selectedCategory;
      const matchesQuery =
        !q ||
        product.name.toLowerCase().includes(q) ||
        product.material.toLowerCase().includes(q) ||
        product.category.toLowerCase().includes(q) ||
        product.shortDescription.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });

    return [...list].sort((a, b) => {
      if (sortBy === 'price-asc') return a.basePrice - b.basePrice;
      if (sortBy === 'price-desc') return b.basePrice - a.basePrice;
      return a.featuredOrder - b.featuredOrder;
    });
  }, [selectedCategory, searchQuery, sortBy]);

  const totalBagCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleAddToCart = ({
    product,
    size,
    finish,
    quantity,
    engraving,
  }: {
    product: Product;
    size: ProductSize;
    finish: string;
    quantity: number;
    engraving: EngravingDetails;
  }) => {
    const unitPrice = product.basePrice + size.priceDelta;
    const newItem: CartItem = {
      cartItemId: `${product.id}-${size.label}-${finish}-${Date.now()}`,
      productId: product.id,
      name: product.name,
      image: product.image,
      category: product.category,
      selectedSize: size,
      selectedFinish: finish,
      unitPrice,
      quantity,
      engraving: { ...engraving },
    };
    setCart((prev) => [...prev, newItem]);
    setActiveProduct(null);
    setIsCartOpen(true);
  };

  const handleQuickAdd = (product: Product) => {
    handleAddToCart({
      product,
      size: product.sizes[0],
      finish: product.finishes[0],
      quantity: 1,
      engraving: {
        enabled: true,
        recipient: 'CHAMPIONSHIP HONOREE',
        citation: 'First Place Victory',
        dateLine: '2026',
        fontStyle: 'Classic Roman',
      },
    });
  };

  const handleUpdateQuantity = (cartItemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const handlePlaceOrder = (customer: CustomerDetails): OrderRecord => {
    const subtotal = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
    const shippingFee = subtotal >= 350 ? 0 : 25;
    const total = subtotal + shippingFee;
    const orderNum = `TM-${1043 + orders.length}`;

    const dispatchDate = new Date();
    dispatchDate.setDate(dispatchDate.getDate() + 3);

    const newOrder: OrderRecord = {
      orderNumber: orderNum,
      createdAt: new Date().toISOString(),
      status: 'Order Confirmed',
      items: cart,
      subtotal,
      shippingFee,
      total,
      customer,
      estimatedDispatch: dispatchDate.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }),
    };

    setOrders((prev) => [newOrder, ...prev]);
    setCart([]);
    return newOrder;
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#1C1917]">
      <Header
        cartCount={totalBagCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenTrackOrder={() =>
          setTrackOrderModal({
            open: true,
            orderNumber: orders[0]?.orderNumber || 'TM-1042',
          })
        }
        orders={orders}
      />

      <main className="flex-1">
        <Hero onExploreCollection={() => scrollToSection('collection')} />

        <CatalogSection
          products={filteredProducts}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortBy={sortBy}
          onSortChange={setSortBy}
          onSelectProduct={(product) => setActiveProduct(product)}
          onQuickAdd={handleQuickAdd}
        />

        <AtelierProvenance />
      </main>

      <Footer
        onOpenTrackOrder={() =>
          setTrackOrderModal({
            open: true,
            orderNumber: orders[0]?.orderNumber || 'TM-1042',
          })
        }
        onOpenCart={() => setIsCartOpen(true)}
      />

      <ProductModal
        product={activeProduct}
        initialEngraving={DEFAULT_ENGRAVING}
        onClose={() => setActiveProduct(null)}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer
        isOpen={isCartOpen}
        items={cart}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onPlaceOrder={handlePlaceOrder}
        onInspectOrder={(orderNumber) =>
          setTrackOrderModal({ open: true, orderNumber })
        }
      />

      <TrackOrderModal
        isOpen={trackOrderModal.open}
        initialOrderNumber={trackOrderModal.orderNumber}
        orders={orders}
        onClose={() => setTrackOrderModal((prev) => ({ ...prev, open: false }))}
      />
    </div>
  );
}
