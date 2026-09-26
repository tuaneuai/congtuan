import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Language,
  Currency,
  ProductVariant,
  CartItem,
  Review,
  ShippingMethod,
  CustomerOrder,
  DiscountCode,
  CookiePreferences,
  AppSettings,
  GalleryItem,
  VideoItem,
  MediaSettings,
  TopBannerSettings
} from '../types';
import { translations } from '../i18n/translations';

interface StoreContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  currency: Currency;
  setCurrency: (curr: Currency) => void;
  t: typeof translations.cz;
  variants: ProductVariant[];
  selectedVariantId: string;
  setSelectedVariantId: (id: string) => void;
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isConfirmationOpen: boolean;
  setIsConfirmationOpen: (open: boolean) => void;
  lastOrder: CustomerOrder | null;
  orders: CustomerOrder[];
  reviews: Review[];
  shippingMethods: ShippingMethod[];
  selectedShippingId: string;
  setSelectedShippingId: (id: string) => void;
  discountCodes: DiscountCode[];
  appliedDiscount: DiscountCode | null;
  cookieConsent: CookiePreferences;
  setCookieConsent: (prefs: CookiePreferences) => void;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  isAdminAuthenticated: boolean;
  setIsAdminAuthenticated: (auth: boolean) => void;
  settings: AppSettings;
  
  // Media & Gallery Management
  galleryItems: GalleryItem[];
  addGalleryItem: (item: Omit<GalleryItem, 'id'>) => void;
  updateGalleryItem: (id: string, item: Partial<GalleryItem>) => void;
  deleteGalleryItem: (id: string) => void;
  resetGalleryItems: () => void;
  videos: VideoItem[];
  addVideo: (video: Omit<VideoItem, 'id'>) => void;
  updateVideo: (id: string, video: Partial<VideoItem>) => void;
  deleteVideo: (id: string) => void;
  setMainVideo: (id: string) => void;
  mediaSettings: MediaSettings;
  updateMediaSettings: (newSettings: Partial<MediaSettings>) => void;

  // Top Luxury Banner Frame
  topBannerSettings: TopBannerSettings;
  updateTopBannerSettings: (newSettings: Partial<TopBannerSettings>) => void;


  // Actions
  addToCart: (variantId: string, quantity?: number, openDrawer?: boolean) => void;
  updateCartQuantity: (variantId: string, quantity: number) => void;
  removeFromCart: (variantId: string) => void;
  clearCart: () => void;
  applyDiscountCode: (code: string) => { success: boolean; message: string };
  removeDiscountCode: () => void;
  createOrder: (orderPayload: Omit<CustomerOrder, 'id' | 'orderNumber' | 'createdAt' | 'status'>) => CustomerOrder;
  updateOrderStatus: (orderId: string, status: CustomerOrder['status']) => void;
  submitReview: (review: Omit<Review, 'id' | 'date' | 'verified' | 'approved' | 'helpfulCount'>) => void;
  approveReview: (reviewId: string) => void;
  deleteReview: (reviewId: string) => void;
  updateVariantPrice: (id: string, priceCZK: number, originalPriceCZK: number) => void;
  updateShippingMethod: (id: string, priceCZK: number, enabled: boolean) => void;
  addDiscountCode: (discount: DiscountCode) => void;
  deleteDiscountCode: (code: string) => void;
  updateSettings: (newSettings: Partial<AppSettings>) => void;
  formatPrice: (amountCZK: number, amountEUR?: number) => string;
  cartSubtotalCZK: number;
  cartSubtotalEUR: number;
  cartItemCount: number;
  selectedVariant: ProductVariant;
  selectedShipping: ShippingMethod;
}

const defaultVariants: ProductVariant[] = [
  {
    id: 'box-1',
    name: '1 BOX (5 masek)',
    boxesCount: 1,
    masksCount: 5,
    originalPriceCZK: 699,
    priceCZK: 499,
    originalPriceEUR: 28,
    priceEUR: 20,
    savingsCZK: 200,
    savingsPercent: 29
  },
  {
    id: 'box-3',
    name: '3 BOXY (15 masek)',
    boxesCount: 3,
    masksCount: 15,
    originalPriceCZK: 2097,
    priceCZK: 1299,
    originalPriceEUR: 84,
    priceEUR: 52,
    badge: 'Nejoblíbenější',
    isPopular: true,
    savingsCZK: 798,
    savingsPercent: 38
  },
  {
    id: 'box-5',
    name: '5 BOXŮ (25 masek)',
    boxesCount: 5,
    masksCount: 25,
    originalPriceCZK: 3495,
    priceCZK: 1990,
    originalPriceEUR: 140,
    priceEUR: 79,
    badge: 'Nejvýhodnější',
    savingsCZK: 1505,
    savingsPercent: 43
  }
];

const defaultShippingMethods: ShippingMethod[] = [
  {
    id: 'zasilkovna',
    name: 'Zásilkovna / Packeta',
    description: 'Výdejní místo nebo Z-BOX (přes 9 000 míst v ČR)',
    priceCZK: 69,
    priceEUR: 2.8,
    estimatedDelivery: '1–2 dny',
    badge: 'Nejoblíbenější',
    type: 'pickup_point',
    enabled: true
  },
  {
    id: 'ppl',
    name: 'PPL Kurýr',
    description: 'Doručení přímo na vámi zadanou adresu s SMS avízem',
    priceCZK: 99,
    priceEUR: 3.9,
    estimatedDelivery: '1–2 dny',
    type: 'home_delivery',
    enabled: true
  },
  {
    id: 'dpd',
    name: 'DPD Private',
    description: 'Expresní doručení na adresu s hodinovým oknem doručení',
    priceCZK: 109,
    priceEUR: 4.4,
    estimatedDelivery: '1–2 dny',
    type: 'home_delivery',
    enabled: true
  },
  {
    id: 'gls',
    name: 'GLS Express EU',
    description: 'Spolehlivé doručení po celé ČR a do ostatních států EU',
    priceCZK: 119,
    priceEUR: 4.8,
    estimatedDelivery: '2–3 dny',
    type: 'home_delivery',
    enabled: true
  },
  {
    id: 'pickup',
    name: 'Osobní odběr Praha',
    description: 'Výdejní sklad Praha 4 (všední dny 9:00 - 17:00)',
    priceCZK: 0,
    priceEUR: 0,
    estimatedDelivery: 'Ještě dnes',
    badge: 'ZDARMA',
    type: 'personal',
    enabled: true
  }
];

const defaultReviews: Review[] = [
  {
    id: 'rev-1',
    author: 'Tereza Nováková',
    city: 'Praha',
    rating: 5,
    title: 'Nejlepší maska, jakou jsem kdy měla!',
    content: 'Mám suchou a citlivou pleť a po první aplikaci přes noc byla ráno moje pokožka neskutečně hebká a zářivá. Maska postupně zprůhledněla a všechna esence se vstřebala. Určitě objednám balení 5 boxů!',
    date: '2026-03-18',
    verified: true,
    approved: true,
    helpfulCount: 42
  },
  {
    id: 'rev-2',
    author: 'Lucie Dvořáková',
    city: 'Brno',
    rating: 5,
    title: 'Skutečný efekt glass skin z Koreje',
    content: 'Používám 2× týdně už třetí týden. Jemné linky kolem očí jsou vyhlazenější a pleť vypadá odpočatě i po náročném pracovním týdnu. Hydrogel perfektně drží a nestéká.',
    date: '2026-03-12',
    verified: true,
    approved: true,
    helpfulCount: 29
  },
  {
    id: 'rev-3',
    author: 'Nguyễn Thu Trang',
    city: 'Praha / Karlovy Vary',
    rating: 5,
    title: 'Đắp cực êm, da ngậm nước căng bóng',
    content: 'Mặt nạ thạch ôm rất khít mặt, không bị chảy tinh chất lem nhem như mấy loại giấy. Mình đắp qua đêm ngủ dậy da mướt như tiêm filler HA vậy. Rất đáng tiền!',
    date: '2026-03-05',
    verified: true,
    approved: true,
    helpfulCount: 38
  },
  {
    id: 'rev-4',
    author: 'Markéta Svobodová',
    city: 'Plzeň',
    rating: 5,
    title: 'Příjemné chlazení a viditelné rozjasnění',
    content: 'Maska má dvě části, takže skvěle sedí i na můj menší obličej. Niacinamid v kombinaci s kolagenem mi krásně sjednotil tón pleti. Balíček přišel přes Zásilkovnu hned druhý den.',
    date: '2026-02-28',
    verified: true,
    approved: true,
    helpfulCount: 19
  }
];

const initialDiscountCodes: DiscountCode[] = [
  { code: 'KOREA10', discountPercent: 10, description: '10% sleva pro nové zákazníky', active: true },
  { code: 'WELCOME5', discountPercent: 5, description: '5% uvítací sleva', active: true },
  { code: 'VIP15', discountPercent: 15, minSpendCZK: 2000, description: '15% sleva při nákupu nad 2000 Kč', active: true }
];

const initialOrders: CustomerOrder[] = [
  {
    id: 'ord-1',
    orderNumber: '#SEY-98241',
    createdAt: '2026-03-24T14:32:00Z',
    status: 'delivered',
    customer: {
      firstName: 'Klára',
      lastName: 'Benešová',
      email: 'klara.benes@email.cz',
      phone: '+420 774 123 456',
      street: 'Vinohradská 142',
      city: 'Praha 3',
      postalCode: '130 00',
      country: 'Česká republika'
    },
    items: [
      {
        variantId: 'box-3',
        variantName: '3 BOXY (15 masek)',
        quantity: 1,
        priceCZK: 1299,
        priceEUR: 52,
        originalPriceCZK: 2097,
        originalPriceEUR: 84,
        boxesCount: 3,
        masksCount: 15
      }
    ],
    shippingMethod: defaultShippingMethods[0],
    paymentMethod: 'card',
    subtotalCZK: 1299,
    discountCZK: 130,
    shippingCZK: 0,
    totalCZK: 1169,
    totalEUR: 47,
    currency: 'CZK',
    discountCodeApplied: 'KOREA10'
  },
  {
    id: 'ord-2',
    orderNumber: '#SEY-98242',
    createdAt: '2026-03-25T09:15:00Z',
    status: 'shipped',
    customer: {
      firstName: 'Jana',
      lastName: 'Černá',
      email: 'jana.cerna@seznam.cz',
      phone: '+420 608 987 654',
      street: 'Masarykova 58',
      city: 'Brno',
      postalCode: '602 00',
      country: 'Česká republika'
    },
    items: [
      {
        variantId: 'box-5',
        variantName: '5 BOXŮ (25 masek)',
        quantity: 1,
        priceCZK: 1990,
        priceEUR: 79,
        originalPriceCZK: 3495,
        originalPriceEUR: 140,
        boxesCount: 5,
        masksCount: 25
      }
    ],
    shippingMethod: defaultShippingMethods[1],
    paymentMethod: 'apple_pay',
    subtotalCZK: 1990,
    discountCZK: 0,
    shippingCZK: 0,
    totalCZK: 1990,
    totalEUR: 79,
    currency: 'CZK'
  }
];

const defaultGalleryItems: GalleryItem[] = [
  {
    id: 'g-1',
    title: 'SEYOUL Original Packaging',
    category: 'product',
    subtitle: 'Prémiová krabička s holografickou pečetí pravosti K-Beauty (Hộp 5 mask)',
    imageUrl: '',
    gradient: 'from-slate-950 via-[#0a1e38] to-slate-950',
    accent: '5 Pieces / Box'
  },
  {
    id: 'g-2',
    title: 'Translucent Hydrogel Matrix',
    category: 'texture',
    subtitle: 'Hladká chladivá textura s vysokou koncentrací nízkomolekulárního kolagenu',
    imageUrl: '',
    gradient: 'from-[#061e38] via-[#0b335c] to-sky-950',
    accent: 'Low-Molecular Collagen'
  },
  {
    id: 'g-3',
    title: 'Korean Spa Application',
    category: 'ritual',
    subtitle: '2dílné ergonomické provedení dokonale kopírující kontury obličeje',
    imageUrl: '',
    gradient: 'from-slate-900 via-sky-950 to-slate-950',
    accent: 'Ergonomic Fit'
  },
  {
    id: 'g-4',
    title: 'Water Caustics & Hydration',
    category: 'texture',
    subtitle: 'Kyselina hyaluronová vázající vlhkost v hlubokých vrstvách epidermis',
    imageUrl: '',
    gradient: 'from-[#031f3d] via-sky-900 to-slate-900',
    accent: 'Deep Moisture'
  },
  {
    id: 'g-5',
    title: 'Overnight Glass Skin Ritual',
    category: 'ritual',
    subtitle: 'Po 3–4 hodinách maska zprůhlední a esence je plně absorbována',
    imageUrl: '',
    gradient: 'from-slate-950 via-slate-900 to-sky-950',
    accent: 'Glass Skin Effect'
  },
  {
    id: 'g-6',
    title: 'Individual Sachet Sterility',
    category: 'product',
    subtitle: 'Samostatně sterilně balené masky pro zachování maximální čerstvosti (34g)',
    imageUrl: '',
    gradient: 'from-[#081e3a] via-blue-950 to-slate-950',
    accent: 'Hygienic 34g Sachets'
  }
];

const defaultVideos: VideoItem[] = [
  {
    id: 'v-main',
    title: 'SEYOUL Collagen Jelly Mask – Official Presentation',
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1',
    posterUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1200&auto=format&fit=crop',
    type: 'youtube',
    duration: '1:45',
    isMain: true,
    description: 'Quy trình đắp và cảm nhận làn da bóng khoẻ chuẩn K-Beauty Glass Skin'
  },
  {
    id: 'v-short-1',
    title: 'Cận cảnh chất thạch Jelly Mask siêu bám dính',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-skin-care-product-being-applied-to-a-womans-cheek-41525-large.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=600&auto=format&fit=crop',
    type: 'mp4',
    duration: '0:30',
    isMain: false,
    description: 'Chất mask thạch mát lạnh, ngậm tinh chất đậm đặc'
  },
  {
    id: 'v-short-2',
    title: 'Trải nghiệm đắp mask qua đêm thức dậy căng mọng',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-woman-applying-skincare-serum-to-her-face-41523-large.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1512290900672-1f55b9a89669?q=80&w=600&auto=format&fit=crop',
    type: 'mp4',
    duration: '0:45',
    isMain: false,
    description: 'Review từ khách hàng sau 8 giờ đắp mặt nạ ngủ collagen'
  }
];

const defaultMediaSettings: MediaSettings = {
  heroImageUrl: '',
  heroMode: '3d',
  beforeImageUrl: '',
  afterImageUrl: '',
  productBoxImageUrl: '',
  productSachetImageUrl: ''
};

export const defaultTopBannerSettings: TopBannerSettings = {
  enabled: true,
  imageUrl: '',
  badgeText: 'KOREAN DERMA-LUXURY · 216 000 PPM REAL COLLAGEN',
  title: 'SEYOUL BIO-COLLAGEN REAL DEEP MASK',
  subtitle: 'Korejský noční rituál pro hlubokou hydrataci a skleněný finiš pleti. Akční cena od 499 Kč / box.',
  buttonText: 'KOUPIT V AKCI (OD 499 KČ) →',
  targetLink: '#pricing',
  lightingEffect: 'diamond-sweep',
  discountBadge: 'SLEVA AŽ 43% + DÁREK',
  showCountdown: true
};

const StoreContext = createContext<StoreContextType | undefined>(undefined);


export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('seyoul_lang');
    return (saved as Language) || 'cz';
  });

  const [currency, setCurrencyState] = useState<Currency>(() => {
    const saved = localStorage.getItem('seyoul_curr');
    return (saved as Currency) || 'CZK';
  });

  const [variants, setVariants] = useState<ProductVariant[]>(() => {
    const saved = localStorage.getItem('seyoul_variants');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Automatically migrate if using old price (e.g. 690 Kč)
        if (Array.isArray(parsed) && parsed.some((p: ProductVariant) => p.id === 'box-1' && p.priceCZK !== 499)) {
          localStorage.setItem('seyoul_variants', JSON.stringify(defaultVariants));
          return defaultVariants;
        }
        return parsed;
      } catch {
        return defaultVariants;
      }
    }
    return defaultVariants;
  });

  const [selectedVariantId, setSelectedVariantId] = useState<string>('box-3');

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('seyoul_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [lastOrder, setLastOrder] = useState<CustomerOrder | null>(null);

  const [orders, setOrders] = useState<CustomerOrder[]>(() => {
    const saved = localStorage.getItem('seyoul_orders');
    return saved ? JSON.parse(saved) : initialOrders;
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('seyoul_reviews');
    return saved ? JSON.parse(saved) : defaultReviews;
  });

  const [shippingMethods, setShippingMethods] = useState<ShippingMethod[]>(() => {
    const saved = localStorage.getItem('seyoul_shipping');
    return saved ? JSON.parse(saved) : defaultShippingMethods;
  });

  const [selectedShippingId, setSelectedShippingId] = useState<string>('zasilkovna');

  const [discountCodes, setDiscountCodes] = useState<DiscountCode[]>(() => {
    const saved = localStorage.getItem('seyoul_discounts');
    return saved ? JSON.parse(saved) : initialDiscountCodes;
  });

  const [appliedDiscount, setAppliedDiscount] = useState<DiscountCode | null>(null);

  const [cookieConsent, setCookieConsentState] = useState<CookiePreferences>(() => {
    const saved = localStorage.getItem('seyoul_cookies');
    return saved
      ? JSON.parse(saved)
      : { essential: true, analytics: false, marketing: false, hasConsented: false };
  });

  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  const [settings, setSettings] = useState<AppSettings>(() => {
    const saved = localStorage.getItem('seyoul_settings');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.freeShippingThresholdCZK > 1200) {
          parsed.freeShippingThresholdCZK = 1200;
          localStorage.setItem('seyoul_settings', JSON.stringify(parsed));
        }
        return parsed;
      } catch {
        // fallback
      }
    }
    return {
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=0',
      freeShippingThresholdCZK: 1200,
      stockCount: 384,
      isStoreOpen: true,
      exchangeRateCZKtoEUR: 25.2
    };
  });

  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(() => {
    const saved = localStorage.getItem('seyoul_gallery');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          // If items contain old unsplash images, clear them out
          return parsed.map((item: GalleryItem) => ({
            ...item,
            imageUrl: item.imageUrl && item.imageUrl.includes('images.unsplash.com') ? '' : item.imageUrl
          }));
        }
      } catch {
        return defaultGalleryItems;
      }
    }
    return defaultGalleryItems;
  });

  const [videos, setVideos] = useState<VideoItem[]>(() => {
    const saved = localStorage.getItem('seyoul_videos');
    return saved ? JSON.parse(saved) : defaultVideos;
  });

  const [mediaSettings, setMediaSettings] = useState<MediaSettings>(() => {
    const saved = localStorage.getItem('seyoul_media');
    return saved ? JSON.parse(saved) : defaultMediaSettings;
  });

  const [topBannerSettings, setTopBannerSettings] = useState<TopBannerSettings>(() => {
    const saved = localStorage.getItem('seyoul_top_banner');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.imageUrl && parsed.imageUrl.includes('images.unsplash.com')) {
          parsed.imageUrl = '';
        }
        return { ...defaultTopBannerSettings, ...parsed };
      } catch {
        return defaultTopBannerSettings;
      }
    }
    return defaultTopBannerSettings;
  });

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('seyoul_lang', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('seyoul_curr', currency);
  }, [currency]);

  useEffect(() => {
    localStorage.setItem('seyoul_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('seyoul_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('seyoul_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('seyoul_variants', JSON.stringify(variants));
  }, [variants]);

  useEffect(() => {
    localStorage.setItem('seyoul_shipping', JSON.stringify(shippingMethods));
  }, [shippingMethods]);

  useEffect(() => {
    localStorage.setItem('seyoul_discounts', JSON.stringify(discountCodes));
  }, [discountCodes]);

  useEffect(() => {
    localStorage.setItem('seyoul_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('seyoul_gallery', JSON.stringify(galleryItems));
  }, [galleryItems]);

  useEffect(() => {
    localStorage.setItem('seyoul_videos', JSON.stringify(videos));
  }, [videos]);

  useEffect(() => {
    localStorage.setItem('seyoul_media', JSON.stringify(mediaSettings));
  }, [mediaSettings]);

  useEffect(() => {
    localStorage.setItem('seyoul_top_banner', JSON.stringify(topBannerSettings));
  }, [topBannerSettings]);


  const setLanguage = (lang: Language) => setLanguageState(lang);
  const setCurrency = (curr: Currency) => setCurrencyState(curr);

  const setCookieConsent = (prefs: CookiePreferences) => {
    setCookieConsentState(prefs);
    localStorage.setItem('seyoul_cookies', JSON.stringify(prefs));
  };

  const selectedVariant = variants.find((v) => v.id === selectedVariantId) || variants[1];
  const selectedShipping = shippingMethods.find((s) => s.id === selectedShippingId) || shippingMethods[0];

  const addToCart = (variantId: string, quantity = 1, openDrawer = true) => {
    const variant = variants.find((v) => v.id === variantId);
    if (!variant) return;

    setCart((prev) => {
      const existing = prev.find((item) => item.variantId === variantId);
      if (existing) {
        return prev.map((item) =>
          item.variantId === variantId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          variantId: variant.id,
          variantName: variant.name,
          quantity,
          priceCZK: variant.priceCZK,
          priceEUR: variant.priceEUR,
          originalPriceCZK: variant.originalPriceCZK,
          originalPriceEUR: variant.originalPriceEUR,
          boxesCount: variant.boxesCount,
          masksCount: variant.masksCount
        }
      ];
    });

    if (openDrawer) {
      setIsCartOpen(true);
    }
  };

  const updateCartQuantity = (variantId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(variantId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.variantId === variantId ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (variantId: string) => {
    setCart((prev) => prev.filter((item) => item.variantId !== variantId));
  };

  const clearCart = () => setCart([]);

  const applyDiscountCode = (code: string) => {
    const normalized = code.trim().toUpperCase();
    const found = discountCodes.find((d) => d.code === normalized && d.active);
    if (!found) {
      return { success: false, message: translations[language].cart.promoInvalid };
    }
    setAppliedDiscount(found);
    return { success: true, message: translations[language].cart.promoApplied };
  };

  const removeDiscountCode = () => setAppliedDiscount(null);

  const cartSubtotalCZK = cart.reduce((sum, item) => sum + item.priceCZK * item.quantity, 0);
  const cartSubtotalEUR = cart.reduce((sum, item) => sum + item.priceEUR * item.quantity, 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const createOrder = (
    orderPayload: Omit<CustomerOrder, 'id' | 'orderNumber' | 'createdAt' | 'status'>
  ) => {
    const newOrder: CustomerOrder = {
      ...orderPayload,
      id: `ord-${Date.now()}`,
      orderNumber: `#SEY-${Math.floor(10000 + Math.random() * 90000)}`,
      createdAt: new Date().toISOString(),
      status: 'new'
    };

    setOrders((prev) => [newOrder, ...prev]);
    setLastOrder(newOrder);
    setCart([]);
    setAppliedDiscount(null);
    setIsCartOpen(false);
    setIsCheckoutOpen(false);
    setIsConfirmationOpen(true);

    // Decrement stock
    const totalBoxesOrdered = newOrder.items.reduce(
      (sum, item) => sum + item.boxesCount * item.quantity,
      0
    );
    setSettings((prev) => ({
      ...prev,
      stockCount: Math.max(0, prev.stockCount - totalBoxesOrdered)
    }));

    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: CustomerOrder['status']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
  };

  const submitReview = (
    reviewData: Omit<Review, 'id' | 'date' | 'verified' | 'approved' | 'helpfulCount'>
  ) => {
    const newReview: Review = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      verified: true,
      approved: false, // Requires admin approval
      helpfulCount: 0
    };
    setReviews((prev) => [newReview, ...prev]);
  };

  const approveReview = (reviewId: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === reviewId ? { ...r, approved: true } : r))
    );
  };

  const deleteReview = (reviewId: string) => {
    setReviews((prev) => prev.filter((r) => r.id !== reviewId));
  };

  const updateVariantPrice = (id: string, priceCZK: number, originalPriceCZK: number) => {
    setVariants((prev) =>
      prev.map((v) => {
        if (v.id === id) {
          const priceEUR = Math.round((priceCZK / settings.exchangeRateCZKtoEUR) * 10) / 10;
          const originalPriceEUR = Math.round((originalPriceCZK / settings.exchangeRateCZKtoEUR) * 10) / 10;
          const savingsCZK = originalPriceCZK - priceCZK;
          const savingsPercent = Math.round((savingsCZK / originalPriceCZK) * 100);
          return {
            ...v,
            priceCZK,
            originalPriceCZK,
            priceEUR,
            originalPriceEUR,
            savingsCZK,
            savingsPercent
          };
        }
        return v;
      })
    );
  };

  const updateShippingMethod = (id: string, priceCZK: number, enabled: boolean) => {
    setShippingMethods((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          const priceEUR = Math.round((priceCZK / settings.exchangeRateCZKtoEUR) * 10) / 10;
          return { ...s, priceCZK, priceEUR, enabled };
        }
        return s;
      })
    );
  };

  const addDiscountCode = (discount: DiscountCode) => {
    setDiscountCodes((prev) => [...prev.filter((d) => d.code !== discount.code), discount]);
  };

  const deleteDiscountCode = (code: string) => {
    setDiscountCodes((prev) => prev.filter((d) => d.code !== code));
  };

  const updateSettings = (newSettings: Partial<AppSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const addGalleryItem = (item: Omit<GalleryItem, 'id'>) => {
    const newItem: GalleryItem = {
      ...item,
      id: `g-${Date.now()}`
    };
    setGalleryItems((prev) => [newItem, ...prev]);
  };

  const updateGalleryItem = (id: string, updated: Partial<GalleryItem>) => {
    setGalleryItems((prev) => prev.map((item) => (item.id === id ? { ...item, ...updated } : item)));
  };

  const deleteGalleryItem = (id: string) => {
    setGalleryItems((prev) => prev.filter((item) => item.id !== id));
  };

  const resetGalleryItems = () => {
    setGalleryItems(defaultGalleryItems);
    localStorage.setItem('seyoul_gallery', JSON.stringify(defaultGalleryItems));
  };

  const addVideo = (video: Omit<VideoItem, 'id'>) => {
    const newVideo: VideoItem = {
      ...video,
      id: `v-${Date.now()}`
    };
    setVideos((prev) => [...prev, newVideo]);
  };

  const updateVideo = (id: string, updated: Partial<VideoItem>) => {
    setVideos((prev) => prev.map((v) => (v.id === id ? { ...v, ...updated } : v)));
  };

  const deleteVideo = (id: string) => {
    setVideos((prev) => prev.filter((v) => v.id !== id));
  };

  const setMainVideo = (id: string) => {
    setVideos((prev) =>
      prev.map((v) => {
        if (v.id === id) {
          updateSettings({ videoUrl: v.url });
          return { ...v, isMain: true };
        }
        return { ...v, isMain: false };
      })
    );
  };

  const updateMediaSettings = (newMedia: Partial<MediaSettings>) => {
    setMediaSettings((prev) => ({ ...prev, ...newMedia }));
  };

  const updateTopBannerSettings = (newBanner: Partial<TopBannerSettings>) => {
    setTopBannerSettings((prev) => ({ ...prev, ...newBanner }));
  };

  const formatPrice = (amountCZK: number, amountEUR?: number) => {
    if (currency === 'EUR') {
      const val = amountEUR !== undefined ? amountEUR : amountCZK / settings.exchangeRateCZKtoEUR;
      return `€${val.toFixed(2)}`;
    }
    return `${amountCZK.toLocaleString('cs-CZ')} Kč`;
  };

  const t = translations[language];

  return (
    <StoreContext.Provider
      value={{
        language,
        setLanguage,
        currency,
        setCurrency,
        t,
        variants,
        selectedVariantId,
        setSelectedVariantId,
        cart,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isConfirmationOpen,
        setIsConfirmationOpen,
        lastOrder,
        orders,
        reviews,
        shippingMethods,
        selectedShippingId,
        setSelectedShippingId,
        discountCodes,
        appliedDiscount,
        cookieConsent,
        setCookieConsent,
        isAdminOpen,
        setIsAdminOpen,
        isAdminAuthenticated,
        setIsAdminAuthenticated,
        settings,
        galleryItems,
        addGalleryItem,
        updateGalleryItem,
        deleteGalleryItem,
        resetGalleryItems,
        videos,
        addVideo,
        updateVideo,
        deleteVideo,
        setMainVideo,
        mediaSettings,
        updateMediaSettings,
        topBannerSettings,
        updateTopBannerSettings,

        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        applyDiscountCode,
        removeDiscountCode,
        createOrder,
        updateOrderStatus,
        submitReview,
        approveReview,
        deleteReview,
        updateVariantPrice,
        updateShippingMethod,
        addDiscountCode,
        deleteDiscountCode,
        updateSettings,
        formatPrice,
        cartSubtotalCZK,
        cartSubtotalEUR,
        cartItemCount,
        selectedVariant,
        selectedShipping
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
