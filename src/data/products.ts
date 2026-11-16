import { OrderRecord, Product } from '../types/shop';

export const HERO_IMAGE = '/src/assets/images/hero_trophy_atelier_1794820655775.jpg';

export const PRODUCTS: Product[] = [
  {
    id: 'grand-victory-cup',
    sku: 'MA-CUP-01',
    name: 'Grand Victory Winged Cup',
    category: 'Championship Cups',
    material: '24k Gold Plate & Carrara Marble',
    basePrice: 485,
    image: '/src/assets/images/hero_trophy_atelier_1794820655775.jpg',
    imageAlt: 'Grand Victory Winged Cup trophy in 24k gold plate on a honed white Carrara marble plinth',
    shortDescription:
      'Hand-spun chalice crowned with a cast victory figure, twin scrolled handles, and a solid honed white marble plinth.',
    craftNotes:
      'Individually spun from heavy-gauge brass, triple-plated in 24k bright gold, and anchored to hand-selected Italian Carrara marble with a recessed brushed brass nameplate.',
    weight: '4.2 kg',
    leadTime: '3–5 business days',
    availability: 'In Stock',
    finishes: ['24k Bright Gold', 'Satin Brushed Gold'],
    sizes: [
      { label: '12" Presentation', dimensions: '12" H × 6.5" W', priceDelta: 0 },
      { label: '15" Championship', dimensions: '15" H × 8.0" W', priceDelta: 145 },
      { label: '18" Perpetual Cup', dimensions: '18" H × 9.5" W', priceDelta: 290 },
    ],
    featuredOrder: 1,
  },
  {
    id: 'sovereign-fluted-cup',
    sku: 'MA-CUP-02',
    name: 'Sovereign Fluted Loving Cup',
    category: 'Championship Cups',
    material: 'Electroplated Gold & Marble Base',
    basePrice: 360,
    image: '/src/assets/images/trophy_sovereign_cup_1794820655737.jpg',
    imageAlt: 'Sovereign Fluted Loving Cup trophy with twin scrolled handles on white marble base',
    shortDescription:
      'Classical vertical fluting and Georgian scrollwork handles paired with an architectural stepped white marble pedestal.',
    craftNotes:
      'Inspired by 19th-century yachting and equestrian prize cups. Features hand-chased acanthus base detailing and a beveled gold engraving plate.',
    weight: '3.1 kg',
    leadTime: '2–4 business days',
    availability: 'In Stock',
    finishes: ['24k Bright Gold', 'Antique Champagne Gold'],
    sizes: [
      { label: '10" Classic', dimensions: '10" H × 6.0" W', priceDelta: 0 },
      { label: '13" Premier', dimensions: '13" H × 7.5" W', priceDelta: 110 },
      { label: '16" Grand', dimensions: '16" H × 9.0" W', priceDelta: 220 },
    ],
    featuredOrder: 2,
  },
  {
    id: 'aurelian-crystal-obelisk',
    sku: 'MA-CRY-03',
    name: 'Aurelian Crystal Obelisk',
    category: 'Crystal & Glass',
    material: 'Optical Crystal & Brushed Brass',
    basePrice: 245,
    image: '/src/assets/images/trophy_crystal_obelisk_1794820656273.jpg',
    imageAlt: 'Aurelian Optical Crystal Obelisk award mounted on a solid brushed gold collar and alabaster base',
    shortDescription:
      'Hand-faceted lead-free optical crystal spire rising from a lathe-turned brushed brass collar and white alabaster cylinder.',
    craftNotes:
      'Precision-beveled to catch ambient light across eight facets, seated permanently into a weighted satin-gold collar with a curved brass front plaque.',
    weight: '2.4 kg',
    leadTime: '2–3 business days',
    availability: 'In Stock',
    finishes: ['Satin Brushed Gold Collar', 'Mirror Gold Collar'],
    sizes: [
      { label: '9" Executive', dimensions: '9" H × 3.75" Dia', priceDelta: 0 },
      { label: '11.5" Leadership', dimensions: '11.5" H × 4.25" Dia', priceDelta: 75 },
      { label: '14" Pinnacle', dimensions: '14" H × 4.75" Dia', priceDelta: 150 },
    ],
    featuredOrder: 3,
  },
  {
    id: 'travertine-heritage-plaque',
    sku: 'MA-PLQ-04',
    name: 'Travertine & Brass Plaque',
    category: 'Commemorative Plaques',
    material: 'Honed Travertine & Satin Brass',
    basePrice: 195,
    image: '/src/assets/images/memento_brass_plaque_1794820657331.jpg',
    imageAlt: 'Travertine and satin-brushed gold brass commemorative wall plaque',
    shortDescription:
      'Solid honed Roman travertine backing frame holding a thick beveled satin-brass plate deep-engraved to order.',
    craftNotes:
      'Engineered for wall mounting or desk easel display. The 3mm solid brass faceplate is diamond-drag engraved and dark-oxidized for permanent contrast.',
    weight: '2.8 kg',
    leadTime: '3–4 business days',
    availability: 'In Stock',
    finishes: ['Satin Brushed Brass', '24k Gold Satin Plate'],
    sizes: [
      { label: '8" × 10" Portrait', dimensions: '8" × 10" × 1"', priceDelta: 0 },
      { label: '10" × 12" Dedication', dimensions: '10" × 12" × 1"', priceDelta: 65 },
      { label: '12" × 15" Benefactor', dimensions: '12" × 15" × 1.25"', priceDelta: 135 },
    ],
    featuredOrder: 4,
  },
  {
    id: 'laurel-wreath-globe',
    sku: 'MA-CUP-05',
    name: 'Laurel Wreath Globe Award',
    category: 'Crystal & Glass',
    material: 'Cast Matte Gold & White Marble',
    basePrice: 310,
    image: '/src/assets/images/trophy_laurel_column_1794820656224.jpg',
    imageAlt: 'Sculpted matte gold laurel wreath encircling a fluted golden globe on a stepped white marble base',
    shortDescription:
      'Sculpted twin bay-leaf laurel branches framing a fluted golden sphere atop a stepped white marble drum pedestal.',
    craftNotes:
      'Lost-wax cast brass leaves individually hand-burnished to reveal fine botanical veining, paired with a custom-turned three-tier marble base.',
    weight: '2.9 kg',
    leadTime: '4–6 business days',
    availability: 'Made to Order',
    finishes: ['Matte Atelier Gold', 'Burnished 24k Gold'],
    sizes: [
      { label: '10.5" Laureate', dimensions: '10.5" H × 7.0" W', priceDelta: 0 },
      { label: '13" International', dimensions: '13" H × 8.5" W', priceDelta: 115 },
    ],
    featuredOrder: 5,
  },
  {
    id: 'centennial-gold-medallion',
    sku: 'MA-MED-06',
    name: 'Centennial Gold Medallion',
    category: 'Heritage Medals',
    material: '24k Gold Plated Bronze & Ivory Case',
    basePrice: 135,
    image: '/src/assets/images/memento_medallion_case_1794820658069.jpg',
    imageAlt: 'Minted gold commemorative medallion inside an ivory leatherette presentation box with gold trim',
    shortDescription:
      'Heavy-struck commemorative medallion with high-relief heritage oak motif, presented in an ivory leatherette velvet-lined box.',
    craftNotes:
      'Die-struck from solid jeweler’s bronze with proof-grade frosted relief and mirror fields. Reverse face is left smooth for custom inscription.',
    weight: '0.65 kg',
    leadTime: '2–3 business days',
    availability: 'In Stock',
    finishes: ['Proof 24k Gold', 'Antique Satin Gold'],
    sizes: [
      { label: '65mm Presentation', dimensions: '65mm Dia · 4.5" Case', priceDelta: 0 },
      { label: '80mm Grand Seal', dimensions: '80mm Dia · 5.5" Case', priceDelta: 45 },
    ],
    featuredOrder: 6,
  },
];

export const SAMPLE_ORDERS: OrderRecord[] = [
  {
    orderNumber: 'TM-1042',
    createdAt: '2026-11-12T14:22:00Z',
    status: 'In Engraving Studio',
    subtotal: 485,
    shippingFee: 0,
    total: 485,
    estimatedDispatch: 'November 18, 2026',
    customer: {
      fullName: 'Dr. Mathews Varghese',
      email: 'm.varghese@mact.ac.in',
      phone: '+91 94470 12345',
      address: 'Mar Athanasius College Campus, College Road',
      postalCode: '686666',
      paymentMethod: 'UPI / Bank Transfer',
    },
    items: [
      {
        cartItemId: 'sample-1',
        productId: 'grand-victory-cup',
        name: 'Grand Victory Winged Cup',
        image: '/src/assets/images/hero_trophy_atelier_1794820655775.jpg',
        category: 'Championship Cups',
        selectedSize: { label: '12" Presentation', dimensions: '12" H × 6.5" W', priceDelta: 0 },
        selectedFinish: '24k Bright Gold',
        unitPrice: 485,
        quantity: 1,
        engraving: {
          enabled: true,
          recipient: 'ALL-KERALA INTERCOLLEGIATE FEST',
          citation: 'Overall Championship Winner',
          dateLine: 'NOVEMBER 2026',
          fontStyle: 'Classic Roman',
        },
      },
    ],
  },
];
