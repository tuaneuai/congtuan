import React from 'react';
import { Award, ShieldCheck, Truck, Headphones, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const TrustSection: React.FC = () => {
  const { t } = useStore();

  const trustBadges = [
    {
      icon: Award,
      title: t.trust.madeInKorea,
      desc: t.trust.madeInKoreaDesc
    },
    {
      icon: ShieldCheck,
      title: t.trust.securePayment,
      desc: t.trust.securePaymentDesc
    },
    {
      icon: Truck,
      title: t.trust.fastDelivery,
      desc: t.trust.fastDeliveryDesc
    },
    {
      icon: Headphones,
      title: t.trust.customerSupport,
      desc: t.trust.customerSupportDesc
    },
    {
      icon: Sparkles,
      title: t.trust.cleanBeauty,
      desc: t.trust.cleanBeautyDesc
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-[#FFF5F8] via-[#F0F7FF] to-[#FFF5F8] border-y border-pink-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 sm:gap-8">
          {trustBadges.map((badge, idx) => {
            const Icon = badge.icon;
            return (
              <div
                key={idx}
                className="flex flex-col items-center text-center space-y-3 p-5 rounded-3xl hover:bg-white transition-all duration-200 border border-transparent hover:border-pink-200 hover:shadow-md"
              >
                <div className="w-14 h-14 rounded-2xl bg-white border-2 border-pink-200 shadow-sm flex items-center justify-center text-rose-600">
                  <Icon className="w-7 h-7 stroke-[2]" />
                </div>
                <h4 className="text-sm sm:text-base font-black text-slate-950 tracking-wide">
                  {badge.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                  {badge.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
