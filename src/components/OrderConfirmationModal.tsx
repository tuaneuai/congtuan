import React from 'react';
import { CheckCircle2, PackageCheck, Mail, MapPin, Truck, CreditCard, ArrowRight, Printer } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const OrderConfirmationModal: React.FC = () => {
  const {
    t,
    isConfirmationOpen,
    setIsConfirmationOpen,
    lastOrder,
    formatPrice
  } = useStore();

  if (!isConfirmationOpen || !lastOrder) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 my-8">
        {/* Celebration Header */}
        <div className="p-8 text-center bg-gradient-to-b from-sky-50 to-white border-b border-slate-100">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 shadow-sm animate-bounce duration-1000">
            <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight">
            {t.confirmation.title}
          </h2>
          <p className="text-slate-600 text-sm mt-1">
            {t.confirmation.subtitle}
          </p>

          <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 text-white text-xs font-mono font-bold tracking-wider">
            <PackageCheck className="w-4 h-4 text-sky-400" />
            <span>{lastOrder.orderNumber}</span>
          </div>
        </div>

        {/* Order Details Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Email notice */}
          <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-100 flex items-start gap-3 text-xs text-sky-950">
            <Mail className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold mb-0.5">{t.confirmation.emailNote}</p>
              <p className="text-sky-800 font-mono font-medium">{lastOrder.customer.email}</p>
            </div>
          </div>

          {/* Delivery & Payment Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
              <div className="flex items-center gap-1.5 text-slate-900 font-bold mb-1">
                <Truck className="w-4 h-4 text-sky-700" />
                <span>Způsob doručení</span>
              </div>
              <p className="font-semibold text-slate-800">{lastOrder.shippingMethod.name}</p>
              {lastOrder.customer.pickupPointName ? (
                <p className="text-slate-600">{lastOrder.customer.pickupPointName}</p>
              ) : (
                <p className="text-slate-600">
                  {lastOrder.customer.street}, {lastOrder.customer.postalCode} {lastOrder.customer.city}
                </p>
              )}
              <p className="text-[11px] text-slate-500">
                Příjemce: {lastOrder.customer.firstName} {lastOrder.customer.lastName} ({lastOrder.customer.phone})
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
              <div className="flex items-center gap-1.5 text-slate-900 font-bold mb-1">
                <CreditCard className="w-4 h-4 text-sky-700" />
                <span>Platební metoda</span>
              </div>
              <p className="font-semibold text-slate-800 uppercase tracking-wide">
                {lastOrder.paymentMethod === 'card' && 'Platební karta (Online)'}
                {lastOrder.paymentMethod === 'apple_pay' && 'Apple Pay'}
                {lastOrder.paymentMethod === 'google_pay' && 'Google Pay'}
                {lastOrder.paymentMethod === 'cod' && 'Dobírka (Při převzetí)'}
                {lastOrder.paymentMethod === 'bank_transfer' && 'Bankovní převod (QR)'}
              </p>
              <p className="text-emerald-600 font-semibold">
                Stav: {lastOrder.paymentMethod === 'cod' ? 'Čeká na převzetí' : 'Úspěšně uhrazeno'}
              </p>
              <p className="text-slate-900 font-bold text-sm pt-1">
                Celkem: {formatPrice(lastOrder.totalCZK, lastOrder.totalEUR)}
              </p>
            </div>
          </div>

          {/* Purchased Items List */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              {t.confirmation.summaryTitle}
            </h4>
            <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden">
              {lastOrder.items.map((item) => (
                <div key={item.variantId} className="p-3.5 flex justify-between items-center text-xs bg-white">
                  <div>
                    <span className="font-bold text-slate-900">
                      {item.quantity}× {item.variantName}
                    </span>
                    <p className="text-[11px] text-slate-500">
                      Celkem {item.masksCount * item.quantity} masek
                    </p>
                  </div>
                  <span className="font-bold text-slate-900">
                    {formatPrice(item.priceCZK * item.quantity, item.priceEUR * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-slate-100">
            <button
              onClick={() => window.print()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Vytisknout potvrzení</span>
            </button>

            <button
              onClick={() => setIsConfirmationOpen(false)}
              className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-slate-900 hover:bg-sky-900 transition-colors shadow-md"
            >
              <span>{t.confirmation.continueShopping}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
