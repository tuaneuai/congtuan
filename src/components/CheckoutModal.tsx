import React, { useState } from 'react';
import { X, ShieldCheck, Check, CreditCard, Truck, MapPin, Building, Lock } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PaymentMethodType } from '../types';

export const CheckoutModal: React.FC = () => {
  const {
    t,
    cart,
    isCheckoutOpen,
    setIsCheckoutOpen,
    shippingMethods,
    selectedShippingId,
    setSelectedShippingId,
    selectedShipping,
    appliedDiscount,
    cartSubtotalCZK,
    currency,
    formatPrice,
    createOrder,
    settings
  } = useStore();

  // Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    postalCode: '',
    country: 'Česká republika',
    sameBilling: true,
    pickupPointName: 'Zásilkovna – Vinohradská 142, Praha 3 (Z-BOX)'
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('card');
  const [cardInfo, setCardInfo] = useState({
    number: '',
    expiry: '',
    cvc: '',
    nameOnCard: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPickupSelector, setShowPickupSelector] = useState(false);

  const samplePickupPoints = [
    'Zásilkovna – Vinohradská 142, Praha 3 (Z-BOX 24/7)',
    'Zásilkovna – Václavské náměstí 812, Praha 1 (Knihkupectví)',
    'Zásilkovna – Masarykova 410, Brno (Výdejní místo)',
    'Zásilkovna – Nádražní 28, Ostrava (Z-BOX non-stop)',
    'Zásilkovna – Americká 18, Plzeň (Tabák & Tisk)'
  ];

  if (!isCheckoutOpen) return null;

  // Calculation
  const discountAmountCZK = appliedDiscount
    ? Math.round((cartSubtotalCZK * appliedDiscount.discountPercent) / 100)
    : 0;

  const isFreeShipping = cartSubtotalCZK >= settings.freeShippingThresholdCZK || cart.some(i => i.boxesCount >= 3);
  const effectiveShippingPriceCZK = isFreeShipping ? 0 : selectedShipping.priceCZK;
  const effectiveShippingPriceEUR = isFreeShipping ? 0 : selectedShipping.priceEUR;

  const finalTotalCZK = Math.max(0, cartSubtotalCZK - discountAmountCZK + effectiveShippingPriceCZK);
  const finalTotalEUR = Math.round((finalTotalCZK / settings.exchangeRateCZKtoEUR) * 10) / 10;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    // Clear error
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const handleCardInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formatted = value;
    if (name === 'number') {
      formatted = value.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ').substring(0, 19);
    } else if (name === 'expiry') {
      formatted = value.replace(/\D/g, '').replace(/(\d{2})(?=\d)/g, '$1/').substring(0, 5);
    } else if (name === 'cvc') {
      formatted = value.replace(/\D/g, '').substring(0, 4);
    }
    setCardInfo((prev) => ({ ...prev, [name]: formatted }));
  };

  const validate = () => {
    const err: Record<string, string> = {};
    if (!formData.firstName.trim()) err.firstName = 'Vyplňte jméno';
    if (!formData.lastName.trim()) err.lastName = 'Vyplňte příjmení';
    if (!formData.email.trim() || !formData.email.includes('@')) err.email = 'Zadejte platný e-mail';
    if (!formData.phone.trim()) err.phone = 'Zadejte telefon pro kurýra';
    if (!formData.street.trim()) err.street = 'Zadejte ulici a číslo';
    if (!formData.city.trim()) err.city = 'Zadejte město';
    if (!formData.postalCode.trim()) err.postalCode = 'Zadejte PSČ';

    if (paymentMethod === 'card') {
      if (cardInfo.number.replace(/\s/g, '').length < 15) err.cardNumber = 'Zadejte platné 16místné číslo karty';
      if (cardInfo.expiry.length < 5) err.cardExpiry = 'Platnost MM/RR';
      if (cardInfo.cvc.length < 3) err.cardCvc = 'CVC kód';
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsProcessing(true);

    // Simulate secure SSL payment tokenization
    setTimeout(() => {
      createOrder({
        customer: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          street: formData.street,
          city: formData.city,
          postalCode: formData.postalCode,
          country: formData.country,
          pickupPointName: selectedShipping.type === 'pickup_point' ? formData.pickupPointName : undefined
        },
        items: cart,
        shippingMethod: {
          ...selectedShipping,
          priceCZK: effectiveShippingPriceCZK,
          priceEUR: effectiveShippingPriceEUR
        },
        paymentMethod,
        subtotalCZK: cartSubtotalCZK,
        discountCZK: discountAmountCZK,
        shippingCZK: effectiveShippingPriceCZK,
        totalCZK: finalTotalCZK,
        totalEUR: finalTotalEUR,
        currency,
        discountCodeApplied: appliedDiscount?.code
      });

      setIsProcessing(false);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 my-8">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-sky-700" />
            <span className="font-serif font-bold text-lg text-slate-900">
              {t.checkout.title}
            </span>
          </div>
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Layout */}
        <form onSubmit={handleSubmitOrder} className="p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: 3-Step Checkout Fields */}
            <div className="lg:col-span-7 space-y-8">
              {/* Step 1: Customer Details */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                  <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center">
                    1
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                    {t.checkout.step1}
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {t.checkout.firstName} *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="např. Klára"
                      className={`w-full px-3 py-2 text-xs rounded-xl border bg-slate-50 ${
                        errors.firstName ? 'border-red-500' : 'border-slate-200 focus:bg-white'
                      }`}
                    />
                    {errors.firstName && <span className="text-[10px] text-red-500">{errors.firstName}</span>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {t.checkout.lastName} *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="např. Nováková"
                      className={`w-full px-3 py-2 text-xs rounded-xl border bg-slate-50 ${
                        errors.lastName ? 'border-red-500' : 'border-slate-200 focus:bg-white'
                      }`}
                    />
                    {errors.lastName && <span className="text-[10px] text-red-500">{errors.lastName}</span>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {t.checkout.email} *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="klara@email.cz"
                      className={`w-full px-3 py-2 text-xs rounded-xl border bg-slate-50 ${
                        errors.email ? 'border-red-500' : 'border-slate-200 focus:bg-white'
                      }`}
                    />
                    {errors.email && <span className="text-[10px] text-red-500">{errors.email}</span>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {t.checkout.phone} *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+420 777 000 000"
                      className={`w-full px-3 py-2 text-xs rounded-xl border bg-slate-50 ${
                        errors.phone ? 'border-red-500' : 'border-slate-200 focus:bg-white'
                      }`}
                    />
                    {errors.phone && <span className="text-[10px] text-red-500">{errors.phone}</span>}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {t.checkout.street} *
                  </label>
                  <input
                    type="text"
                    name="street"
                    value={formData.street}
                    onChange={handleInputChange}
                    placeholder="Vinohradská 142"
                    className={`w-full px-3 py-2 text-xs rounded-xl border bg-slate-50 ${
                      errors.street ? 'border-red-500' : 'border-slate-200 focus:bg-white'
                    }`}
                  />
                  {errors.street && <span className="text-[10px] text-red-500">{errors.street}</span>}
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-1">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {t.checkout.postalCode} *
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      placeholder="130 00"
                      className={`w-full px-3 py-2 text-xs rounded-xl border bg-slate-50 ${
                        errors.postalCode ? 'border-red-500' : 'border-slate-200 focus:bg-white'
                      }`}
                    />
                  </div>

                  <div className="col-span-1">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {t.checkout.city} *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="Praha 3"
                      className={`w-full px-3 py-2 text-xs rounded-xl border bg-slate-50 ${
                        errors.city ? 'border-red-500' : 'border-slate-200 focus:bg-white'
                      }`}
                    />
                  </div>

                  <div className="col-span-1">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {t.checkout.country}
                    </label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white font-medium"
                    >
                      <option value="Česká republika">Česká republika</option>
                      <option value="Slovensko">Slovensko</option>
                      <option value="Německo">Německo</option>
                      <option value="Rakousko">Rakousko</option>
                      <option value="Polsko">Polsko</option>
                      <option value="Vietnam">Vietnam</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="sameBilling"
                    name="sameBilling"
                    checked={formData.sameBilling}
                    onChange={handleInputChange}
                    className="w-4 h-4 rounded text-sky-600 focus:ring-sky-500"
                  />
                  <label htmlFor="sameBilling" className="text-xs text-slate-600 cursor-pointer">
                    {t.checkout.sameBilling}
                  </label>
                </div>
              </div>

              {/* Step 2: Shipping Methods */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                  <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center">
                    2
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                    {t.checkout.step2}
                  </h3>
                </div>

                <div className="space-y-2.5">
                  {shippingMethods.filter((s) => s.enabled).map((ship) => {
                    const isSelected = ship.id === selectedShippingId;
                    const priceDisplay = isFreeShipping
                      ? 'ZDARMA'
                      : formatPrice(ship.priceCZK, ship.priceEUR);

                    return (
                      <div
                        key={ship.id}
                        onClick={() => setSelectedShippingId(ship.id)}
                        className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-sky-50/50 border-slate-900 shadow-xs ring-1 ring-slate-900'
                            : 'bg-white border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                isSelected ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-300'
                              }`}
                            >
                              {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-slate-900">
                                  {ship.name}
                                </span>
                                {ship.badge && (
                                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-sky-100 text-sky-800">
                                    {ship.badge}
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-slate-500">
                                {ship.description} · Doručení {ship.estimatedDelivery}
                              </p>
                            </div>
                          </div>

                          <span className={`text-xs font-bold ${isFreeShipping ? 'text-emerald-600' : 'text-slate-900'}`}>
                            {priceDisplay}
                          </span>
                        </div>

                        {/* Pickup Point Selection Subview */}
                        {isSelected && ship.type === 'pickup_point' && (
                          <div className="mt-3 pt-3 border-t border-sky-100 pl-8">
                            <p className="text-xs text-slate-700 font-semibold mb-1">
                              {t.checkout.pickupPointLabel}
                            </p>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-sky-900 font-medium bg-white px-2.5 py-1.5 rounded-lg border border-sky-200 flex-1 truncate">
                                📍 {formData.pickupPointName}
                              </span>
                              <button
                                type="button"
                                onClick={() => setShowPickupSelector(!showPickupSelector)}
                                className="text-xs font-semibold text-sky-700 hover:text-sky-900 underline whitespace-nowrap"
                              >
                                {showPickupSelector ? 'Zavřít' : 'Změnit'}
                              </button>
                            </div>

                            {showPickupSelector && (
                              <div className="mt-2 p-2 bg-white rounded-xl border border-slate-200 space-y-1">
                                {samplePickupPoints.map((point) => (
                                  <button
                                    type="button"
                                    key={point}
                                    onClick={() => {
                                      setFormData((p) => ({ ...p, pickupPointName: point }));
                                      setShowPickupSelector(false);
                                    }}
                                    className="w-full text-left p-2 rounded-lg text-xs hover:bg-sky-50 text-slate-700 truncate"
                                  >
                                    {point}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step 3: Payment Options */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                  <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center">
                    3
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                    {t.checkout.step3}
                  </h3>
                </div>

                <div className="space-y-2.5">
                  {/* Card Payment */}
                  <div
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                      paymentMethod === 'card'
                        ? 'bg-sky-50/50 border-slate-900 shadow-xs ring-1 ring-slate-900'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            paymentMethod === 'card' ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-300'
                          }`}
                        >
                          {paymentMethod === 'card' && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <div className="flex items-center gap-2">
                          <CreditCard className="w-4 h-4 text-slate-800" />
                          <span className="text-xs font-bold text-slate-900">{t.checkout.payCard}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
                        <span>VISA</span>
                        <span>·</span>
                        <span>Mastercard</span>
                      </div>
                    </div>

                    {/* Card fields */}
                    {paymentMethod === 'card' && (
                      <div className="mt-4 pt-3 border-t border-sky-100 pl-8 space-y-3">
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                            {t.checkout.cardNumber}
                          </label>
                          <input
                            type="text"
                            name="number"
                            value={cardInfo.number}
                            onChange={handleCardInputChange}
                            placeholder="4242 4242 4242 4242"
                            className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white"
                          />
                          {errors.cardNumber && <span className="text-[10px] text-red-500">{errors.cardNumber}</span>}
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                              {t.checkout.cardExpiry}
                            </label>
                            <input
                              type="text"
                              name="expiry"
                              value={cardInfo.expiry}
                              onChange={handleCardInputChange}
                              placeholder="12/28"
                              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white"
                            />
                            {errors.cardExpiry && <span className="text-[10px] text-red-500">{errors.cardExpiry}</span>}
                          </div>
                          <div>
                            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                              {t.checkout.cardCvc}
                            </label>
                            <input
                              type="password"
                              name="cvc"
                              maxLength={4}
                              value={cardInfo.cvc}
                              onChange={handleCardInputChange}
                              placeholder="•••"
                              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white"
                            />
                            {errors.cardCvc && <span className="text-[10px] text-red-500">{errors.cardCvc}</span>}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Apple Pay */}
                  <div
                    onClick={() => setPaymentMethod('apple_pay')}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      paymentMethod === 'apple_pay'
                        ? 'bg-sky-50/50 border-slate-900 shadow-xs ring-1 ring-slate-900'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          paymentMethod === 'apple_pay' ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-300'
                        }`}
                      >
                        {paymentMethod === 'apple_pay' && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span className="text-xs font-bold text-slate-900">{t.checkout.payApple}</span>
                    </div>
                    <span className="text-xs font-bold text-slate-900">Pay</span>
                  </div>

                  {/* Google Pay */}
                  <div
                    onClick={() => setPaymentMethod('google_pay')}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      paymentMethod === 'google_pay'
                        ? 'bg-sky-50/50 border-slate-900 shadow-xs ring-1 ring-slate-900'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          paymentMethod === 'google_pay' ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-300'
                        }`}
                      >
                        {paymentMethod === 'google_pay' && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span className="text-xs font-bold text-slate-900">{t.checkout.payGoogle}</span>
                    </div>
                    <span className="text-xs font-bold text-slate-900">G Pay</span>
                  </div>

                  {/* Dobírka */}
                  <div
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      paymentMethod === 'cod'
                        ? 'bg-sky-50/50 border-slate-900 shadow-xs ring-1 ring-slate-900'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          paymentMethod === 'cod' ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-300'
                        }`}
                      >
                        {paymentMethod === 'cod' && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span className="text-xs font-bold text-slate-900">{t.checkout.payCod}</span>
                    </div>
                  </div>

                  {/* Bank Transfer QR */}
                  <div
                    onClick={() => setPaymentMethod('bank_transfer')}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      paymentMethod === 'bank_transfer'
                        ? 'bg-sky-50/50 border-slate-900 shadow-xs ring-1 ring-slate-900'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          paymentMethod === 'bank_transfer' ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-300'
                        }`}
                      >
                        {paymentMethod === 'bank_transfer' && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span className="text-xs font-bold text-slate-900">{t.checkout.payBank}</span>
                    </div>
                    <span className="text-xs font-semibold text-slate-500">QR Platba</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Order Summary Sidebar */}
            <div className="lg:col-span-5">
              <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-6 sticky top-24">
                <h4 className="text-sm font-bold text-slate-900 pb-3 border-b border-slate-200">
                  Shrnutí nákupu ({cart.length} položek)
                </h4>

                {/* Items */}
                <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <div key={item.variantId} className="flex justify-between text-xs">
                      <div>
                        <span className="font-semibold text-slate-900">
                          {item.quantity}× {item.variantName}
                        </span>
                        <p className="text-[11px] text-slate-500">
                          {item.masksCount * item.quantity} masek celkem
                        </p>
                      </div>
                      <span className="font-bold text-slate-900">
                        {formatPrice(item.priceCZK * item.quantity, item.priceEUR * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Costs breakdown */}
                <div className="space-y-2 pt-4 border-t border-slate-200 text-xs text-slate-600">
                  <div className="flex justify-between">
                    <span>Mezisoučet</span>
                    <span className="font-semibold text-slate-900">
                      {formatPrice(cartSubtotalCZK)}
                    </span>
                  </div>

                  {discountAmountCZK > 0 && (
                    <div className="flex justify-between text-emerald-600 font-semibold">
                      <span>Sleva ({appliedDiscount?.code})</span>
                      <span>-{formatPrice(discountAmountCZK)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Doprava ({selectedShipping.name})</span>
                    <span className={isFreeShipping ? 'font-bold text-emerald-600' : 'font-semibold text-slate-900'}>
                      {isFreeShipping ? 'ZDARMA' : formatPrice(effectiveShippingPriceCZK, effectiveShippingPriceEUR)}
                    </span>
                  </div>

                  <div className="flex justify-between text-base font-bold text-slate-900 pt-3 border-t border-slate-200">
                    <span>Celkem k úhradě</span>
                    <span className="text-xl text-sky-950 font-sans">
                      {formatPrice(finalTotalCZK, finalTotalEUR)}
                    </span>
                  </div>
                </div>

                {/* Terms consent */}
                <p className="text-[11px] text-slate-500 leading-snug">
                  {t.checkout.termsConsent}
                </p>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-4 px-6 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-slate-900 hover:bg-sky-900 disabled:opacity-50 transition-all shadow-xl hover:shadow-2xl cursor-pointer"
                >
                  {isProcessing ? 'Zpracovávám objednávku...' : t.checkout.completeOrder}
                </button>

                <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{t.checkout.securityNotice}</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
