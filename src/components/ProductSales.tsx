import React, { useState } from 'react';
import { Star, Check, ShieldCheck, Truck, Clock, Sparkles, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductVisual3D } from './ProductVisual3D';

export const ProductSales: React.FC = () => {
  const {
    t,
    variants,
    selectedVariantId,
    setSelectedVariantId,
    selectedVariant,
    addToCart,
    setIsCheckoutOpen,
    formatPrice,
    settings
  } = useStore();

  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, Math.min(10, prev + delta)));
  };

  const handleAddToCart = () => {
    addToCart(selectedVariantId, quantity, true);
  };

  const handleBuyNow = () => {
    addToCart(selectedVariantId, quantity, false);
    setIsCheckoutOpen(true);
  };

  return (
    <section id="pricing" className="py-24 bg-gradient-to-b from-white via-[#FFF5F8]/60 to-[#F0F7FF]/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <p className="text-sm uppercase tracking-[0.25em] font-extrabold text-rose-700">
            {t.pricing.tag}
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-slate-950 tracking-tight">
            {t.pricing.title}
          </h2>
          <p className="text-slate-700 text-base sm:text-lg leading-relaxed font-normal">
            {t.pricing.subtitle}
          </p>
        </div>

        {/* 3 Bundle Option Selector Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {variants.map((v) => {
            const isSelected = v.id === selectedVariantId;
            return (
              <div
                key={v.id}
                onClick={() => setSelectedVariantId(v.id)}
                className={`relative rounded-3xl p-7 sm:p-9 cursor-pointer transition-all duration-300 border-2 flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white border-rose-500 shadow-2xl shadow-pink-500/15 -translate-y-2 ring-4 ring-pink-100'
                    : 'bg-white/90 hover:bg-white border-pink-100 hover:border-pink-300 shadow-sm hover:shadow-xl'
                }`}
              >
                {/* Optional Badge */}
                {v.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-gradient-to-r from-rose-500 via-pink-600 to-sky-600 text-white text-xs font-black tracking-wider uppercase shadow-lg flex items-center gap-1.5 whitespace-nowrap">
                    <Sparkles className="w-4 h-4 text-pink-200 animate-pulse" />
                    <span>{v.badge}</span>
                  </div>
                )}

                <div>
                  {/* Radio selection check */}
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'border-rose-500 bg-rose-500 text-white'
                          : 'border-slate-300 bg-white'
                      }`}
                    >
                      {isSelected && <Check className="w-4 h-4 stroke-[3]" />}
                    </div>
                    <span className="text-xs sm:text-sm font-extrabold text-rose-900 bg-pink-100 px-3 py-1.5 rounded-lg border border-pink-200">
                      {v.masksCount} masek (34g)
                    </span>
                  </div>

                  {/* Title & subtitle */}
                  <h3 className="text-2xl font-black text-slate-950 mb-1.5">
                    {v.name}
                  </h3>
                  <p className="text-sm font-medium text-slate-600 mb-6">
                    {v.boxesCount === 1 && t.pricing.boxSingleSub}
                    {v.boxesCount === 3 && t.pricing.boxThreeSub}
                    {v.boxesCount === 5 && t.pricing.boxFiveSub}
                  </p>

                  {/* Pricing Display */}
                  <div className="space-y-2.5 mb-6">
                    <div className="flex items-baseline gap-2.5">
                      <span className="text-4xl sm:text-5xl font-black text-slate-950 font-sans tracking-tight tabular-nums">
                        {formatPrice(v.priceCZK, v.priceEUR)}
                      </span>
                      {v.originalPriceCZK > v.priceCZK && (
                        <span className="text-base sm:text-lg text-slate-400 font-bold line-through">
                          {formatPrice(v.originalPriceCZK, v.originalPriceEUR)}
                        </span>
                      )}
                    </div>

                    {/* Unit price badge */}
                    <div className="text-xs sm:text-sm font-bold text-rose-800 bg-pink-50 border border-pink-200 rounded-xl px-3 py-1.5 inline-block">
                      {v.boxesCount === 1 ? (
                        <span>{formatPrice(v.priceCZK, v.priceEUR)} / box (5 masek)</span>
                      ) : (
                        <span>
                          ~{formatPrice(Math.round(v.priceCZK / v.boxesCount), Math.round((v.priceEUR / v.boxesCount) * 10) / 10)} / box ({v.masksCount} masek)
                        </span>
                      )}
                    </div>

                    {v.savingsCZK > 0 && (
                      <div className="pt-1">
                        <span className="text-xs sm:text-sm font-black text-rose-700 bg-rose-50 border border-rose-200/90 rounded-lg px-3 py-1.5 inline-flex items-center gap-1.5 shadow-2xs">
                          <span>{t.pricing.saveAmount}</span>
                          <span>{formatPrice(v.savingsCZK)} ({v.savingsPercent}%)</span>
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Extra Bundle Bonuses */}
                  <div className="space-y-3 pt-5 border-t border-slate-200 text-sm text-slate-800 font-medium">
                    <div className="flex items-center gap-2.5">
                      <Check className="w-5 h-5 text-emerald-600 shrink-0 stroke-[2.5]" />
                      <span className="font-semibold">{v.masksCount} samostatných 34g hydrogel masek</span>
                    </div>

                    {v.boxesCount >= 3 ? (
                      <div className="flex items-center gap-2.5 text-rose-900 font-bold bg-pink-50 px-2.5 py-1.5 rounded-lg border border-pink-200">
                        <Truck className="w-5 h-5 text-rose-600 shrink-0" />
                        <span>{t.pricing.freeShippingBonus}</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2.5 text-slate-600">
                        <Truck className="w-5 h-5 text-slate-400 shrink-0" />
                        <span>Doprava od 69 Kč</span>
                      </div>
                    )}

                    {v.boxesCount >= 5 && (
                      <div className="flex items-center gap-2.5 text-pink-950 font-bold bg-pink-50 px-2.5 py-1.5 rounded-lg border border-pink-200">
                        <Sparkles className="w-5 h-5 text-pink-600 shrink-0" />
                        <span>{t.pricing.giftBonus}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-8">
                  <button
                    type="button"
                    className={`w-full py-4 px-4 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-gradient-to-r from-rose-500 via-pink-600 to-sky-600 text-white shadow-md'
                        : 'bg-pink-50/70 text-slate-800 hover:bg-pink-100 border border-pink-100'
                    }`}
                  >
                    {isSelected ? '✓ Đã chọn gói này' : 'Chọn gói này'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Master Contiguous Purchase Module */}
        <div className="bg-white rounded-3xl p-7 sm:p-11 border-2 border-pink-200/90 shadow-2xl shadow-pink-500/10 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
            {/* Visual on left */}
            <div className="md:col-span-5 flex justify-center">
              <ProductVisual3D className="w-full max-w-xs" />
            </div>

            {/* Actions on right */}
            <div className="md:col-span-7 space-y-6">
              <div>
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                  <span className="text-sm font-extrabold text-slate-900">4.9 / 5</span>
                  <span className="text-sm text-slate-500 font-medium">· 128 recenzí</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-serif font-black text-slate-950">
                  SEYOUL Collagen Jelly Mask
                </h3>
                <p className="text-sm text-slate-600 mt-1 font-medium">
                  Aktivní balíček: <span className="font-extrabold text-rose-700">{selectedVariant.name}</span>
                </p>
              </div>

              {/* Price calculation */}
              <div className="flex flex-wrap items-baseline gap-3">
                <span className="text-4xl sm:text-5xl font-black text-slate-950 tracking-tight tabular-nums">
                  {formatPrice(selectedVariant.priceCZK * quantity, selectedVariant.priceEUR * quantity)}
                </span>
                {selectedVariant.originalPriceCZK > selectedVariant.priceCZK && (
                  <span className="text-lg text-slate-400 font-bold line-through">
                    {formatPrice(selectedVariant.originalPriceCZK * quantity, selectedVariant.originalPriceEUR * quantity)}
                  </span>
                )}
                {selectedVariant.boxesCount >= 3 && (
                  <span className="text-xs sm:text-sm font-extrabold px-3 py-1 rounded-lg bg-pink-100 text-rose-900 border border-pink-200">
                    Doprava zdarma
                  </span>
                )}
              </div>

              {/* Quantity Stepper */}
              <div className="flex items-center gap-4">
                <span className="text-sm font-bold text-slate-700">
                  {t.pricing.quantity}:
                </span>
                <div className="flex items-center border-2 border-pink-200 rounded-xl bg-pink-50/50 p-1">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="w-9 h-9 rounded-lg bg-white flex items-center justify-center text-slate-800 hover:text-rose-600 disabled:opacity-30 shadow-xs cursor-pointer font-bold"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-black text-base text-slate-950">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= 10}
                    className="w-9 h-9 rounded-lg bg-white flex items-center justify-center text-slate-800 hover:text-rose-600 disabled:opacity-30 shadow-xs cursor-pointer font-bold"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Action Buttons: Add to Cart & Buy Now */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                <button
                  onClick={handleAddToCart}
                  className="w-full inline-flex items-center justify-center gap-2.5 py-4 px-6 rounded-xl font-extrabold text-xs sm:text-sm tracking-wider text-rose-950 bg-pink-100/80 hover:bg-pink-200/90 border-2 border-pink-300 transition-colors shadow-xs cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4 text-rose-700" />
                  <span>{t.pricing.addToCart}</span>
                </button>

                <button
                  onClick={handleBuyNow}
                  className="w-full inline-flex items-center justify-center gap-2.5 py-4 px-6 rounded-xl font-black text-xs sm:text-sm tracking-wider text-white bg-gradient-to-r from-rose-500 via-pink-600 to-sky-600 hover:from-rose-600 hover:to-sky-700 transition-all shadow-xl shadow-pink-500/20 hover:shadow-2xl cursor-pointer"
                >
                  <span>{t.pricing.buyNow}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Trust markers */}
              <div className="grid grid-cols-2 gap-3 pt-5 border-t border-slate-200 text-xs sm:text-sm text-slate-700 font-bold">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 stroke-[2.5]" />
                  <span>{t.pricing.stockStatus} ({settings.stockCount} ks)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-sky-600 shrink-0 stroke-[2]" />
                  <span>{t.pricing.fastDelivery}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-sky-600 shrink-0 stroke-[2]" />
                  <span>{t.pricing.secureCheckout}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-600 shrink-0 stroke-[2]" />
                  <span>{t.pricing.easyReturn}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
