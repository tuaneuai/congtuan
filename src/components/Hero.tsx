import React from 'react';
import { Play, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductVisual3D } from './ProductVisual3D';

interface HeroProps {
  onOpenVideo: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenVideo }) => {
  const { t, setSelectedVariantId } = useStore();

  const handleBuyNow = () => {
    setSelectedVariantId('box-3');
    const pricing = document.querySelector('#pricing');
    if (pricing) {
      pricing.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[calc(100vh-4.5rem)] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#F0F7FF] via-[#F8FAFC] to-white pt-8 pb-16 lg:py-20">
      {/* Decorative ambient background lights */}
      <div className="absolute top-12 left-1/4 w-96 h-96 bg-sky-300/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-1/4 w-[32rem] h-[32rem] bg-blue-200/25 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Brand, Value Proposition & Conversion CTAs */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            {/* Unboxed natural kicker */}
            <div className="flex items-center justify-center lg:justify-start gap-2.5 text-sm sm:text-base font-bold tracking-widest text-sky-800 uppercase">
              <Sparkles className="w-5 h-5 text-sky-600 animate-pulse" />
              <span>{t.hero.brandTag}</span>
              <span aria-hidden="true" className="text-slate-400 font-black">·</span>
              <span className="text-sky-900 font-bold">5 Pieces / Box</span>
            </div>

            {/* Brand Title and Main Headline */}
            <div>
              <p className="text-xs sm:text-sm uppercase tracking-[0.35em] font-extrabold text-sky-700 mb-2">
                K-BEAUTY LUXURY DERMA
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-black text-slate-950 tracking-tight leading-[1.12] text-balance">
                {t.hero.headline}
              </h1>
            </div>

            {/* Subheadline with high clarity & larger font */}
            <p className="text-lg sm:text-xl text-slate-700 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              {t.hero.subheadline}
            </p>

            {/* 3 Core Benefits with larger text & crisp icons */}
            <div className="pt-2 pb-2 space-y-3 max-w-md mx-auto lg:mx-0">
              <div className="flex items-center gap-3.5 text-base sm:text-lg text-slate-800">
                <div className="w-6 h-6 rounded-full bg-sky-100 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-sky-700" />
                </div>
                <span className="font-semibold">{t.hero.benefit1}</span>
              </div>
              <div className="flex items-center gap-3.5 text-base sm:text-lg text-slate-800">
                <div className="w-6 h-6 rounded-full bg-sky-100 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-sky-700" />
                </div>
                <span className="font-semibold">{t.hero.benefit2}</span>
              </div>
              <div className="flex items-center gap-3.5 text-base sm:text-lg text-slate-800">
                <div className="w-6 h-6 rounded-full bg-sky-100 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-sky-700" />
                </div>
                <span className="font-semibold">{t.hero.benefit3}</span>
              </div>
            </div>

            {/* Dual CTAs with larger touch targets and bold typography */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={handleBuyNow}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-9 py-4 sm:py-4.5 text-base font-extrabold tracking-wide text-white bg-slate-950 hover:bg-sky-900 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                <span>{t.hero.ctaBuy}</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={onOpenVideo}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-7 py-4 sm:py-4.5 text-base font-bold text-slate-800 bg-white hover:bg-slate-50 border-2 border-slate-200/90 rounded-2xl shadow-xs hover:border-slate-300 transition-all cursor-pointer"
              >
                <div className="w-7 h-7 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center">
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                </div>
                <span>{t.hero.ctaVideo}</span>
              </button>
            </div>

            {/* Proof Metadata */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm text-slate-600 font-semibold">
              <span className="flex items-center gap-2 text-emerald-800 font-bold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                {t.hero.inStock}
              </span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="text-slate-700">{t.hero.verifiedCustomerCount}</span>
            </div>
          </div>

          {/* Right Column: 3D Luxury Box & Sachet Composition */}
          <div className="lg:col-span-6 flex justify-center">
            <ProductVisual3D className="w-full max-w-lg" />
          </div>
        </div>
      </div>
    </section>
  );
};
