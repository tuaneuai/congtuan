import React from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const StickyMobileBar: React.FC = () => {
  const { t, selectedVariant, formatPrice, addToCart, setIsCheckoutOpen } = useStore();

  const handleMobileBuyNow = () => {
    addToCart(selectedVariant.id, 1, false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-2.5 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
      <div className="flex items-center justify-between gap-3">
        <div className="leading-tight">
          <p className="text-xs text-sky-900 uppercase tracking-wider font-extrabold truncate max-w-[150px]">
            {selectedVariant.name}
          </p>
          <div className="flex items-baseline gap-1.5 mt-0.5">
            <span className="text-lg font-black text-slate-950 font-sans tabular-nums">
              {formatPrice(selectedVariant.priceCZK, selectedVariant.priceEUR)}
            </span>
            {selectedVariant.originalPriceCZK > selectedVariant.priceCZK && (
              <span className="text-xs text-slate-400 font-bold line-through">
                {formatPrice(selectedVariant.originalPriceCZK, selectedVariant.originalPriceEUR)}
              </span>
            )}
          </div>
        </div>

        <button
          onClick={handleMobileBuyNow}
          className="flex-1 max-w-[210px] h-12 inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg hover:bg-sky-900 active:scale-95 transition-all cursor-pointer whitespace-nowrap px-4"
        >
          <span>{t.pricing.buyNow}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
