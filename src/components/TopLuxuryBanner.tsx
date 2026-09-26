import React, { useState } from 'react';
import { Sparkles, ArrowRight, Play, X, ChevronDown, ShieldCheck, Flame, Star, Award } from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface TopLuxuryBannerProps {
  onOpenVideo?: () => void;
}

export const TopLuxuryBanner: React.FC<TopLuxuryBannerProps> = ({ onOpenVideo }) => {
  const { topBannerSettings, language, setSelectedVariantId } = useStore();
  const [isDismissed, setIsDismissed] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  if (!topBannerSettings.enabled || isDismissed) {
    return null;
  }

  const handleCtaClick = () => {
    setSelectedVariantId('box-3');
    const pricingEl = document.querySelector('#pricing');
    if (pricingEl) {
      pricingEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Localized texts
  const localizedBadge =
    language === 'vi'
      ? 'CHÍNH HÃNG HÀN QUỐC · CÔNG NGHỆ HYDROGEL COLLAGEN THỰC VẬT'
      : language === 'en'
      ? 'GENUINE KOREAN DERMA · BIO-COLLAGEN REAL DEEP MASK'
      : topBannerSettings.badgeText || 'KOREAN DERMA-LUXURY · 216 000 PPM REAL COLLAGEN';

  const localizedSubtitle =
    language === 'vi'
      ? 'Mặt nạ thạch collagen sinh học giúp dưỡng ẩm sâu, tái tạo độ đàn hồi và tạo hiệu ứng căng bóng Glass Skin chuẩn Hàn Quốc. Ưu đãi chỉ 499 Kč / hộp (5 miếng).'
      : language === 'en'
      ? 'Bio-collagen overnight hydrogel mask for deep cellular hydration, elasticity, and radiant Korean glass skin. Special offer from 499 Kč / box (5 sheets).'
      : topBannerSettings.subtitle || 'Korejský noční rituál pro hlubokou hydrataci a skleněný finiš pleti. Akční cena od 499 Kč / box.';

  const localizedCta =
    language === 'vi'
      ? 'ĐẶT MUA NGAY (TỪ 499 KČ) →'
      : language === 'en'
      ? 'SHOP NOW (FROM 499 KČ) →'
      : topBannerSettings.buttonText || 'KOUPIT V AKCI (OD 499 KČ) →';

  return (
    <div className="relative w-full z-30 transition-all duration-500 ease-in-out bg-slate-950">
      {/* Outer Luxury Frame Container with Glow and Glass Accents */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 pt-2 pb-2">
        <div
          className={`relative overflow-hidden rounded-2xl md:rounded-3xl luxury-frame-glow transition-all duration-500 ${
            isCollapsed ? 'py-2 px-4' : 'p-4 sm:p-6 md:p-8'
          } border border-sky-300/40 bg-gradient-to-r from-slate-950 via-[#0a1829] to-slate-950 text-white shadow-2xl`}
        >
          {/* Ambient Lighting Layers */}
          {/* 1. Deep Aurora Glow Backdrop */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-24 -left-20 w-96 h-96 bg-sky-500/20 rounded-full blur-3xl animate-aurora-glow" />
            <div className="absolute -bottom-24 -right-20 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-aurora-glow delay-1000" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-32 bg-sky-400/10 blur-2xl" />
          </div>

          {/* 2. Diamond Light Sweep Animation across banner */}
          {(topBannerSettings.lightingEffect === 'diamond-sweep' || !topBannerSettings.lightingEffect) && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
              <div className="w-1/3 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-25 animate-light-sweep" />
            </div>
          )}

          {/* 3. Sparkle / Star Glints */}
          <div className="absolute top-3 right-16 pointer-events-none z-10 hidden sm:block animate-sparkle">
            <Sparkles className="w-5 h-5 text-sky-200 drop-shadow-[0_0_8px_rgba(186,230,253,0.8)]" />
          </div>
          <div className="absolute bottom-4 left-1/4 pointer-events-none z-10 hidden md:block animate-sparkle delay-700">
            <Sparkles className="w-4 h-4 text-cyan-300 drop-shadow-[0_0_6px_rgba(103,232,249,0.8)]" />
          </div>

          {/* Collapsed State Bar (compact view) */}
          {isCollapsed ? (
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-serif tracking-widest text-sky-200 uppercase font-semibold">
                  SEYOUL KOREAN COLLAGEN JELLY MASK
                </span>
                <span className="hidden md:inline text-xs text-slate-300 font-light">
                  · {topBannerSettings.discountBadge || 'Sleva 43% + Doprava zdarma'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCtaClick}
                  className="px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-sky-400 to-blue-500 text-slate-950 hover:brightness-110 shadow-sm cursor-pointer"
                >
                  {localizedCta}
                </button>
                <button
                  onClick={() => setIsCollapsed(false)}
                  className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  title="Mở rộng banner"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            /* Expanded Full Luxury Banner Frame */
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Text & Value Proposition Column (Left 7 cols) */}
              <div className="lg:col-span-7 space-y-4 sm:space-y-5">
                {/* Top Badge with Gem & Shimmer */}
                <div className="flex flex-wrap items-center gap-2.5">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-950/90 border border-sky-400/60 backdrop-blur-md shadow-[0_0_15px_rgba(56,189,248,0.4)]">
                    <Sparkles className="w-4 h-4 text-sky-300 animate-pulse" />
                    <span className="text-xs sm:text-sm font-extrabold tracking-wider text-sky-200 uppercase">
                      {localizedBadge}
                    </span>
                  </div>

                  {topBannerSettings.discountBadge && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500/30 to-rose-500/30 border border-amber-400/60 text-xs sm:text-sm font-black text-amber-300 tracking-wider shadow-sm">
                      <Flame className="w-4 h-4 text-amber-400 animate-bounce" />
                      {topBannerSettings.discountBadge}
                    </span>
                  )}
                </div>

                {/* Primary Headline in Luxury Serif */}
                <div>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black tracking-tight text-white leading-tight drop-shadow-md">
                    {topBannerSettings.title || 'SEYOUL BIO-COLLAGEN REAL DEEP MASK'}
                  </h2>
                  <p className="mt-2.5 text-base sm:text-lg text-slate-100 font-normal leading-relaxed max-w-2xl text-balance">
                    {localizedSubtitle}
                  </p>
                </div>

                {/* Feature Micro-Badges */}
                <div className="flex flex-wrap items-center gap-2.5 sm:gap-3.5 pt-1 text-xs sm:text-sm text-slate-200 font-bold">
                  <div className="flex items-center gap-2 bg-white/10 border border-white/20 px-3.5 py-1.5 rounded-xl shadow-xs">
                    <Award className="w-4 h-4 text-sky-300" />
                    <span>Quy cách: 5 pieces / box</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 border border-white/20 px-3.5 py-1.5 rounded-xl shadow-xs">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="text-amber-200">4.9/5 (128+ Đánh giá)</span>
                  </div>
                  <div className="flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/50 text-emerald-300 px-3.5 py-1.5 rounded-xl shadow-xs font-black">
                    <ShieldCheck className="w-4 h-4 text-emerald-300" />
                    <span>Chỉ 499 Kč / hộp</span>
                  </div>
                </div>

                {/* CTA Action Buttons */}
                <div className="flex flex-wrap items-center gap-3.5 pt-2">
                  <button
                    onClick={handleCtaClick}
                    className="relative group overflow-hidden px-7 py-3.5 sm:px-8 sm:py-4 rounded-xl font-black text-sm sm:text-base tracking-wide bg-gradient-to-r from-sky-400 via-sky-300 to-blue-400 text-slate-950 shadow-[0_0_25px_rgba(56,189,248,0.6)] hover:shadow-[0_0_35px_rgba(56,189,248,0.9)] transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center gap-2.5"
                  >
                    {/* Button Light Sweep */}
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
                    <span className="relative z-10 uppercase">{localizedCta}</span>
                    <ArrowRight className="w-5 h-5 relative z-10 transition-transform group-hover:translate-x-1" />
                  </button>

                  {onOpenVideo && (
                    <button
                      onClick={onOpenVideo}
                      className="px-5 py-3.5 sm:py-4 rounded-xl font-bold text-sm sm:text-base text-white hover:text-sky-200 bg-white/10 hover:bg-white/20 border border-white/30 backdrop-blur-md transition-all flex items-center gap-2.5 cursor-pointer"
                    >
                      <Play className="w-4 h-4 fill-sky-300 text-sky-300" />
                      <span>{language === 'vi' ? 'Xem Video (1:45)' : language === 'en' ? 'Watch Ritual (1:45)' : 'Přehrát video (1:45)'}</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Visual Showcase Frame Column (Right 5 cols) - Crystal Sharp Luxury Showcase */}
              <div className="lg:col-span-5 relative mt-4 lg:mt-0">
                <div className="relative mx-auto max-w-sm lg:max-w-none rounded-2xl overflow-hidden border border-sky-400/40 shadow-[0_15px_40px_rgba(0,0,0,0.7)] group">
                  {/* Glowing Edge Border Ring */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-sky-400/40 pointer-events-none z-20 group-hover:border-sky-300/80 transition-colors" />

                  {/* Primary Visual Showcase: Custom Image or Crystal Sharp Vector Card */}
                  <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-gradient-to-br from-slate-900 via-[#0B2545] to-slate-950 flex flex-col justify-between p-6 sm:p-7 overflow-hidden">
                    {/* Background light refraction & water caustics */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.25)_0,transparent_60%)] pointer-events-none"></div>
                    <div className="absolute -bottom-10 -left-10 w-44 h-44 rounded-full bg-blue-500/20 blur-2xl pointer-events-none"></div>

                    {/* Top row of banner frame */}
                    <div className="relative z-10 flex items-center justify-between">
                      <div className="px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-xs font-bold text-sky-200 flex items-center gap-1.5 shadow-sm">
                        <Sparkles className="w-3.5 h-3.5 text-sky-300" />
                        <span>K-Beauty Genuine Formula</span>
                      </div>
                      <span className="text-xs font-black tracking-widest text-amber-300 bg-amber-400/20 px-2.5 py-1 rounded-md border border-amber-400/30">
                        100% KOREA
                      </span>
                    </div>

                    {/* Center Luxury Emblem */}
                    <div className="relative z-10 text-center my-auto py-2">
                      <div className="relative w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-2 flex items-center justify-center">
                        <div className="absolute inset-0 rounded-full bg-sky-400/20 blur-md animate-pulse"></div>
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr from-sky-400 to-blue-600 border border-white/40 shadow-xl flex items-center justify-center text-white transform group-hover:scale-105 transition-transform">
                          <span className="font-serif font-black text-xl sm:text-2xl tracking-widest">SY</span>
                        </div>
                      </div>
                      <h4 className="text-base sm:text-lg font-serif font-extrabold text-white tracking-widest">
                        SEYOUL
                      </h4>
                      <p className="text-xs text-sky-200 font-semibold tracking-wider uppercase mt-0.5">
                        Bio-Collagen Real Deep Mask
                      </p>
                    </div>

                    {/* Floating Product Badge on Banner */}
                    <div className="relative z-10 flex items-center justify-between p-3 rounded-xl bg-slate-950/85 backdrop-blur-md border border-white/25 shadow-lg">
                      <div>
                        <div className="text-[11px] text-sky-300 font-bold uppercase tracking-wider">
                          Made in Seoul · 5 masek (34g)
                        </div>
                        <div className="text-xs sm:text-sm font-serif font-bold text-white tracking-wide">
                          Khung Ưu Đãi Đặc Biệt
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-slate-400 line-through">699 Kč</div>
                        <div className="text-sm sm:text-base font-black text-emerald-400">499 Kč</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Top Right Controls: Collapse & Dismiss Buttons */}
          <div className="absolute top-2 right-2 flex items-center gap-1 z-20">
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title={isCollapsed ? 'Mở rộng banner' : 'Thu gọn banner'}
            >
              <ChevronDown
                className={`w-4 h-4 transform transition-transform ${isCollapsed ? '' : 'rotate-180'}`}
              />
            </button>
            <button
              onClick={() => setIsDismissed(true)}
              className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title="Đóng banner"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
