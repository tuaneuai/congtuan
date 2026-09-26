export type Language = 'cz' | 'vi' | 'en';
export type Currency = 'CZK' | 'EUR';

export interface ProductVariant {
  id: string;
  name: string;
  boxesCount: number;
  masksCount: number;
  originalPriceCZK: number;
  priceCZK: number;
  originalPriceEUR: number;
  priceEUR: number;
  badge?: string;
  isPopular?: boolean;
  savingsCZK: number;
  savingsPercent: number;
}

export interface CartItem {
  variantId: string;
  variantName: string;
  quantity: number;
  priceCZK: number;
  priceEUR: number;
  originalPriceCZK: number;
  originalPriceEUR: number;
  boxesCount: number;
  masksCount: number;
}

export interface Review {
  id: string;
  author: string;
  city: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  verified: boolean;
  approved: boolean;
  helpfulCount: number;
}

export interface ShippingMethod {
  id: string;
  name: string;
  description: string;
  priceCZK: number;
  priceEUR: number;
  estimatedDelivery: string;
  badge?: string;
  type: 'pickup_point' | 'home_delivery' | 'personal';
  enabled: boolean;
}

export type PaymentMethodType = 'card' | 'apple_pay' | 'google_pay' | 'cod' | 'bank_transfer';

export interface CustomerOrder {
  id: string;
  orderNumber: string;
  createdAt: string;
  status: 'new' | 'processing' | 'shipped' | 'delivered';
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    street: string;
    city: string;
    postalCode: string;
    country: string;
    pickupPointName?: string;
  };
  items: CartItem[];
  shippingMethod: ShippingMethod;
  paymentMethod: PaymentMethodType;
  subtotalCZK: number;
  discountCZK: number;
  shippingCZK: number;
  totalCZK: number;
  totalEUR: number;
  currency: Currency;
  discountCodeApplied?: string;
  notes?: string;
}

export interface DiscountCode {
  code: string;
  discountPercent: number;
  minSpendCZK?: number;
  description: string;
  active: boolean;
}

export interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  hasConsented: boolean;
}

export interface AppSettings {
  videoUrl: string;
  freeShippingThresholdCZK: number;
  stockCount: number;
  isStoreOpen: boolean;
  exchangeRateCZKtoEUR: number;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'product' | 'texture' | 'ritual' | 'model';
  subtitle: string;
  imageUrl?: string;
  gradient?: string;
  accent: string;
}

export interface VideoItem {
  id: string;
  title: string;
  url: string;
  posterUrl?: string;
  type: 'youtube' | 'vimeo' | 'mp4';
  duration?: string;
  isMain?: boolean;
  description?: string;
}

export interface MediaSettings {
  heroImageUrl?: string;
  heroMode: '3d' | 'image';
  beforeImageUrl?: string;
  afterImageUrl?: string;
  productBoxImageUrl?: string;
  productSachetImageUrl?: string;
}

export interface TopBannerSettings {
  enabled: boolean;
  imageUrl: string;
  badgeText: string;
  title: string;
  subtitle: string;
  buttonText: string;
  targetLink: string;
  lightingEffect: 'diamond-sweep' | 'aurora-glow' | 'sparkle-dew';
  discountBadge?: string;
  showCountdown?: boolean;
}

