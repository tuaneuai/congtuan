import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Sparkles, ShieldCheck, Check } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CartDrawer: React.FC = () => {
  const {
    t,
    cart,
    isCartOpen,
    setIsCartOpen,
    setIsCheckoutOpen,
    updateCartQuantity,
    removeFromCart,
    cartSubtotalCZK,
    cartSubtotalEUR,
    cartItemCount,
    appliedDiscount,
    applyDiscountCode,
    removeDiscountCode,
    formatPrice,
    settings
  } = useStore();

  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ text: string; isError: boolean } | null>(null);

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoCodeInput.trim()) return;
    const res = applyDiscountCode(promoCodeInput);
    setPromoMessage({ text: res.message, isError: !res.success });
    if (res.success) {
      setPromoCodeInput('');
    }
  };

  const discountAmountCZK = appliedDiscount
    ? Math.round((cartSubtotalCZK * appliedDiscount.discountPercent) / 100)
    : 0;

  const freeShippingThreshold = settings.freeShippingThresholdCZK;
  const isFreeShipping = cartSubtotalCZK >= freeShippingThreshold;
  const missingForFreeShippingCZK = Math.max(0, freeShippingThreshold - cartSubtotalCZK);
  const freeShippingPercentage = Math.min(100, Math.round((cartSubtotalCZK / freeShippingThreshold) * 100));

  const finalTotalCZK = Math.max(0, cartSubtotalCZK - discountAmountCZK);

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300"
      ></div>

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          {/* Drawer Header */}
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-slate-900" />
              <h2 className="text-base font-bold text-slate-900 tracking-wide">
                {t.cart.title} ({cartItemCount})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="px-6 py-3 bg-sky-50/70 border-b border-sky-100">
            <div className="flex items-center justify-between text-xs mb-1.5">
              {isFreeShipping ? (
                <span className="font-semibold text-sky-900 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  {t.cart.freeShippingUnlocked}
                </span>
              ) : (
                <span className="text-slate-600">
                  {t.cart.freeShippingProgress} <strong className="text-sky-950">{formatPrice(missingForFreeShippingCZK)}</strong>
                </span>
              )}
              <span className="text-slate-500 font-bold">{freeShippingPercentage}%</span>
            </div>
            <div className="w-full h-1.5 bg-sky-200/60 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-sky-500 to-blue-600 transition-all duration-300 rounded-full"
                style={{ width: `${freeShippingPercentage}%` }}
              ></div>
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-slate-100 mx-auto flex items-center justify-center text-slate-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <p className="text-slate-500 text-sm">{t.cart.empty}</p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    const el = document.querySelector('#pricing');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-sky-900 transition-colors"
                >
                  {t.cart.emptyAction}
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.variantId}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex gap-4 items-start"
                >
                  {/* Thumbnail */}
                  <div className="w-16 h-20 rounded-xl bg-gradient-to-b from-white to-sky-50 border border-sky-100 flex flex-col items-center justify-center shrink-0 p-1">
                    <Sparkles className="w-5 h-5 text-sky-600 mb-1" />
                    <span className="text-[9px] font-bold text-slate-700 text-center leading-tight">
                      {item.masksCount} masek
                    </span>
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <h3 className="text-sm font-bold text-slate-900 truncate">
                        {item.variantName}
                      </h3>
                      <button
                        onClick={() => removeFromCart(item.variantId)}
                        className="text-slate-400 hover:text-red-500 p-1 transition-colors"
                        title="Odebrat z košíku"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="text-xs text-slate-500 mb-3">
                      5 ks v krabičce · Hydrogel Korean Mask
                    </p>

                    <div className="flex items-center justify-between">
                      {/* Stepper */}
                      <div className="flex items-center border border-slate-200 rounded-lg bg-white">
                        <button
                          onClick={() => updateCartQuantity(item.variantId, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center text-slate-600 hover:text-slate-900"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-7 text-center text-xs font-bold text-slate-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.variantId, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center text-slate-600 hover:text-slate-900"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Line Item Total */}
                      <div className="text-right">
                        <span className="text-sm font-bold text-slate-900">
                          {formatPrice(item.priceCZK * item.quantity, item.priceEUR * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer & Order Calculations */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-slate-200 bg-white space-y-4">
              {/* Promo Code Form */}
              <form onSubmit={handleApplyPromo} className="space-y-1.5">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCodeInput}
                    onChange={(e) => setPromoCodeInput(e.target.value)}
                    placeholder={t.cart.promoPlaceholder}
                    className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 uppercase placeholder:normal-case focus:outline-hidden focus:ring-1 focus:ring-sky-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-sky-900 transition-colors"
                  >
                    {t.cart.applyPromo}
                  </button>
                </div>

                {appliedDiscount && (
                  <div className="flex items-center justify-between text-xs text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100">
                    <span>
                      Kód <strong>{appliedDiscount.code}</strong> (-{appliedDiscount.discountPercent}%)
                    </span>
                    <button
                      type="button"
                      onClick={removeDiscountCode}
                      className="text-emerald-900 hover:underline font-semibold"
                    >
                      Odebrat
                    </button>
                  </div>
                )}

                {promoMessage && !appliedDiscount && (
                  <p className={`text-xs ${promoMessage.isError ? 'text-red-600' : 'text-emerald-600'}`}>
                    {promoMessage.text}
                  </p>
                )}
              </form>

              {/* Order Calculations */}
              <div className="space-y-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
                <div className="flex justify-between">
                  <span>{t.cart.subtotal}</span>
                  <span className="font-semibold text-slate-900">
                    {formatPrice(cartSubtotalCZK, cartSubtotalEUR)}
                  </span>
                </div>

                {discountAmountCZK > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>{t.cart.discount} ({appliedDiscount?.discountPercent}%)</span>
                    <span>-{formatPrice(discountAmountCZK)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>{t.cart.shipping}</span>
                  <span className={isFreeShipping ? 'font-bold text-emerald-600' : 'font-semibold text-slate-900'}>
                    {isFreeShipping ? t.cart.free : 'Kalkulována v pokladně'}
                  </span>
                </div>

                <div className="flex justify-between text-sm font-bold text-slate-900 pt-2 border-t border-slate-100">
                  <span>{t.cart.total}</span>
                  <span className="text-base text-sky-950 font-sans">
                    {formatPrice(finalTotalCZK)}
                  </span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={handleProceedToCheckout}
                className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-slate-900 hover:bg-sky-900 transition-all shadow-lg hover:shadow-xl cursor-pointer"
              >
                <span>{t.cart.checkoutBtn}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>{t.cart.secureNote}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
