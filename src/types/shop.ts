export type ProductCategory =
  | 'Championship Cups'
  | 'Crystal & Glass'
  | 'Commemorative Plaques'
  | 'Heritage Medals';

export type CategoryFilter = 'All Pieces' | ProductCategory;

export type SortOption = 'featured' | 'price-asc' | 'price-desc';

export type EngravingFont = 'Classic Roman' | 'Atelier Script';

export interface ProductSize {
  label: string;
  dimensions: string;
  priceDelta: number;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: ProductCategory;
  material: string;
  basePrice: number;
  image: string;
  imageAlt: string;
  shortDescription: string;
  craftNotes: string;
  weight: string;
  leadTime: string;
  availability: 'In Stock' | 'Made to Order';
  finishes: string[];
  sizes: ProductSize[];
  featuredOrder: number;
}

export interface EngravingDetails {
  enabled: boolean;
  templateId?: string;
  templateName?: string;
  templateImage?: string;
  recipient: string;
  citation: string;
  dateLine: string;
  fontStyle: EngravingFont;
}

export interface CartItem {
  cartItemId: string;
  productId: string;
  name: string;
  image: string;
  category: ProductCategory;
  selectedSize: ProductSize;
  selectedFinish: string;
  unitPrice: number;
  quantity: number;
  engraving: EngravingDetails;
}

export interface CustomerDetails {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  postalCode: string;
  paymentMethod: 'Card on Delivery' | 'Invoice / Bank Transfer';
}

export interface OrderRecord {
  orderNumber: string;
  createdAt: string;
  status: 'Order Confirmed' | 'In Engraving Studio' | 'Quality Inspection' | 'Dispatched';
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  total: number;
  customer: CustomerDetails;
  estimatedDispatch: string;
}
