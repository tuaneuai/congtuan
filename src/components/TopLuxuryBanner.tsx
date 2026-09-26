import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  Droplets,
  ShieldCheck,
  Award,
  CheckCircle2,
  HeartHandshake,
  Layers,
  Sparkle
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface TopLuxuryBannerProps {
  onOpenVideo?: () => void;
}

export const TopLuxuryBanner: React.FC<TopLuxuryBannerProps> = ({ onOpenVideo }) => {
  const { topBannerSettings, setSelectedVariantId } = useStore();
  const [activeMobilePanel, setActiveMobilePanel] = useState<'all' | 'panel1' | 'panel2' | 'panel3'>('all');

  const handleCtaClick = () => {
    setSelectedVariantId('box-3');
    const pricingEl = document.querySelector('#pricing');
    if (pricingEl) {
      pricingEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full z-20 bg-gradient-to-r from-[#FFF0F5] via-[#F0F7FF] to-[#FFF0F5] border-b border-pink-200/90 shadow-sm">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-3 sm:py-4">
        {/* Luxury Cosmetics Frame Container with Aurora Lighting */}
        <div className="relative overflow-hidden rounded-2xl md:rounded-3xl border border-pink-200/90 bg-gradient-to-br from-white via-[#FFF8FA] to-[#F0F8FF] p-3 sm:p-4 md:p-5 text-slate-900 shadow-xl">
          {/* Ambient Lighting Layers - Pearl White, Rose-Gold & Dewy Ice Blue */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-20 -left-20 w-80 h-80 bg-pink-200/40 rounded-full blur-3xl animate-aurora-glow" />
            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-sky-200/45 rounded-full blur-3xl animate-aurora-glow delay-1000" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-32 bg-white/70 blur-2xl" />
          </div>

          {/* Diamond Light Sweep Shimmer Effect */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-10 opacity-50">
            <div className="w-1/3 h-full bg-gradient-to-r from-transparent via-white/80 to-transparent transform -skew-x-25 animate-light-sweep" />
          </div>

          {/* If custom image URL is uploaded/provided */}
          {topBannerSettings.imageUrl ? (
            <div className="relative z-10">
              <div
                onClick={handleCtaClick}
                className="relative rounded-2xl overflow-hidden shadow-lg border border-pink-200 group cursor-pointer"
              >
                <img
                  src={topBannerSettings.imageUrl}
                  alt="SEYOUL Korean Beauty Collagen Jelly Mask Campaign Banner"
                  className="w-full h-auto max-h-[580px] object-cover rounded-2xl transition-transform duration-500 group-hover:scale-[1.01]"
                  referrerPolicy="no-referrer"
                />

                {/* Hover overlay CTA */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-6">
                  <div className="text-white">
                    <p className="text-xs uppercase font-extrabold tracking-widest text-pink-300">
                      SEYOUL Korean Beauty
                    </p>
                    <p className="text-lg font-serif font-black">
                      Kolagenová Jelly Maska · 5 Pieces / Box
                    </p>
                  </div>
                  <button className="px-5 py-2.5 rounded-xl font-bold text-xs uppercase bg-rose-500 hover:bg-rose-600 text-white shadow-lg flex items-center gap-2">
                    <span>ĐẶT MUA NGAY →</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Pristine 3-Panel Panoramic Campaign Banner (Identical to 'paner mat ma hq.png') */
            <div className="relative z-10 space-y-4">
              {/* Mobile Tab Switcher (Visible only on small screens) */}
              <div className="flex md:hidden items-center justify-center gap-1.5 p-1 bg-white/80 backdrop-blur-xs rounded-xl border border-pink-200">
                <button
                  onClick={() => setActiveMobilePanel('all')}
                  className={`flex-1 py-1.5 px-2 rounded-lg text-[11px] font-bold transition-all ${
                    activeMobilePanel === 'all'
                      ? 'bg-gradient-to-r from-rose-500 to-sky-500 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Toàn Cảnh 3 Khung
                </button>
                <button
                  onClick={() => setActiveMobilePanel('panel1')}
                  className={`flex-1 py-1.5 px-2 rounded-lg text-[11px] font-bold transition-all ${
                    activeMobilePanel === 'panel1'
                      ? 'bg-gradient-to-r from-rose-500 to-sky-500 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Khung 1 (Hàn)
                </button>
                <button
                  onClick={() => setActiveMobilePanel('panel2')}
                  className={`flex-1 py-1.5 px-2 rounded-lg text-[11px] font-bold transition-all ${
                    activeMobilePanel === 'panel2'
                      ? 'bg-gradient-to-r from-rose-500 to-sky-500 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Khung 2 (Dưỡng Chất)
                </button>
                <button
                  onClick={() => setActiveMobilePanel('panel3')}
                  className={`flex-1 py-1.5 px-2 rounded-lg text-[11px] font-bold transition-all ${
                    activeMobilePanel === 'panel3'
                      ? 'bg-gradient-to-r from-rose-500 to-sky-500 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Khung 3 (Séc)
                </button>
              </div>

              {/* 3 Seamless Panels Side-By-Side Panorama */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5 items-stretch">
                {/* ========================================================
                    PANEL 1: KOREAN GLASS SKIN & DEWY COLLAGEN MASK
                   ======================================================== */}
                <div
                  className={`relative rounded-2xl overflow-hidden border border-sky-200/90 bg-gradient-to-b from-[#EBF5FF] via-[#F4F9FF] to-[#FFFFFF] p-4 sm:p-5 flex flex-col justify-between shadow-md transition-all duration-300 hover:shadow-lg ${
                    activeMobilePanel !== 'all' && activeMobilePanel !== 'panel1' ? 'hidden md:flex' : 'flex'
                  }`}
                >
                  <div className="absolute top-0 right-0 w-36 h-36 bg-sky-200/30 rounded-full blur-2xl pointer-events-none" />

                  {/* Header Typography */}
                  <div>
                    <div className="text-center mb-2">
                      <div className="text-xl font-serif font-black tracking-widest text-slate-900">
                        S E Y O U L
                      </div>
                      <div className="text-[10px] font-extrabold tracking-widest text-sky-700 uppercase">
                        KOREAN BEAUTY
                      </div>
                    </div>

                    <div className="mt-3">
                      <h4 className="text-2xl sm:text-3xl font-black text-sky-950 tracking-tight leading-tight">
                        콜라겐<br />젤리 마스크
                      </h4>
                      <p className="text-xs sm:text-sm text-sky-800 font-bold mt-1.5">
                        매일 더 빛나는 탱탱한 피부의 비밀
                      </p>
                    </div>

                    {/* 4 Korean Benefit Icons */}
                    <div className="mt-4 space-y-2.5 text-xs font-bold text-slate-700">
                      <div className="flex items-center gap-2.5">
                        <div className="w-6 h-6 rounded-full bg-sky-100 flex items-center justify-center shrink-0 text-sky-700 shadow-xs">
                          <Droplets className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <span className="text-slate-900 font-extrabold">집중 보습</span>
                          <span className="text-slate-500 font-medium ml-1.5">수분 충전</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <div className="w-6 h-6 rounded-full bg-pink-100 flex items-center justify-center shrink-0 text-pink-600 shadow-xs">
                          <Sparkles className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <span className="text-slate-900 font-extrabold">맑고 화사한</span>
                          <span className="text-slate-500 font-medium ml-1.5">피부 톤</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center shrink-0 text-blue-600 shadow-xs">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <span className="text-slate-900 font-extrabold">매끄럽고</span>
                          <span className="text-slate-500 font-medium ml-1.5">부드러운 피부</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 text-emerald-600 shadow-xs">
                          <ShieldCheck className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <span className="text-slate-900 font-extrabold">자연 유래</span>
                          <span className="text-slate-500 font-medium ml-1.5">성분 함유</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* SEYOUL Product Showcase */}
                  <div className="my-5 relative flex items-center justify-center group cursor-pointer" onClick={handleCtaClick}>
                    <img
                      src="/seyoul-jelly-mask.png"
                      alt="SEYOUL Collagen Jelly Mask Retail Box"
                      className="w-48 sm:w-56 h-auto object-contain drop-shadow-xl group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* 3 Korean Certification Badges */}
                  <div className="pt-3 border-t border-sky-100 grid grid-cols-3 gap-1 text-center text-[10px] font-black text-slate-800">
                    <div className="p-1.5 rounded-xl bg-white/90 border border-sky-100 shadow-xs">
                      <Award className="w-3.5 h-3.5 mx-auto text-sky-600 mb-0.5" />
                      <span>프리미엄 품질</span>
                    </div>
                    <div className="p-1.5 rounded-xl bg-white/90 border border-sky-100 shadow-xs">
                      <Sparkles className="w-3.5 h-3.5 mx-auto text-pink-500 mb-0.5" />
                      <span>한국 화장품</span>
                    </div>
                    <div className="p-1.5 rounded-xl bg-white/90 border border-sky-100 shadow-xs">
                      <span className="block text-xs mb-0.5">🇰🇷</span>
                      <span>한국 제조</span>
                    </div>
                  </div>
                </div>

                {/* ========================================================
                    PANEL 2: 6 GLOWING BIO-ACTIVE ESSENCE SPHERES
                   ======================================================== */}
                <div
                  className={`relative rounded-2xl overflow-hidden border border-blue-200/90 bg-gradient-to-b from-[#EFF6FF] via-[#F8FAFF] to-[#FFFFFF] p-4 sm:p-5 flex flex-col justify-between shadow-md transition-all duration-300 hover:shadow-lg ${
                    activeMobilePanel !== 'all' && activeMobilePanel !== 'panel2' ? 'hidden md:flex' : 'flex'
                  }`}
                >
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-200/25 rounded-full blur-3xl pointer-events-none" />

                  {/* Header Typography */}
                  <div className="text-center">
                    <div className="text-xl font-serif font-black tracking-widest text-slate-900">
                      S E Y O U L
                    </div>
                    <div className="text-[10px] font-extrabold tracking-widest text-blue-700 uppercase">
                      KOREAN BEAUTY
                    </div>
                    <h4 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight mt-2.5">
                      자연에서 찾은<br />피부 에너지
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 font-semibold mt-1.5">
                      콜라겐과 수분 성분이 선사하는 촉촉하고 탄력있는 피부
                    </p>
                  </div>

                  {/* 6 Glowing Ingredient Spheres around Central Box */}
                  <div className="my-4 relative py-2">
                    {/* Central Product Image */}
                    <div className="relative z-10 w-36 sm:w-44 mx-auto group cursor-pointer" onClick={handleCtaClick}>
                      <img
                        src="/seyoul-product-1.png"
                        alt="SEYOUL Mask Box and Sachet"
                        className="w-full h-auto object-contain drop-shadow-xl group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* 6 Ingredients Bubbles Layout */}
                    <div className="grid grid-cols-3 gap-2 pt-3">
                      {/* 1. Collagen Extract */}
                      <div className="p-2 rounded-xl bg-pink-50/95 border border-pink-200 text-center shadow-xs">
                        <div className="w-5 h-5 rounded-full bg-pink-400 text-white flex items-center justify-center mx-auto mb-1 text-[10px] font-black">
                          Co
                        </div>
                        <div className="text-[11px] font-black text-pink-950">콜라겐 추출물</div>
                        <div className="text-[9px] text-pink-700 font-semibold">피부 탄력 케어</div>
                      </div>

                      {/* 2. Hyaluronic Acid */}
                      <div className="p-2 rounded-xl bg-sky-50/95 border border-sky-200 text-center shadow-xs">
                        <div className="w-5 h-5 rounded-full bg-sky-400 text-white flex items-center justify-center mx-auto mb-1 text-[10px] font-black">
                          HA
                        </div>
                        <div className="text-[11px] font-black text-sky-950">히알루론산</div>
                        <div className="text-[9px] text-sky-700 font-semibold">짙은 수분 공급</div>
                      </div>

                      {/* 3. Natural Extracts */}
                      <div className="p-2 rounded-xl bg-emerald-50/95 border border-emerald-200 text-center shadow-xs">
                        <div className="w-5 h-5 rounded-full bg-emerald-400 text-white flex items-center justify-center mx-auto mb-1 text-[10px] font-black">
                          Bio
                        </div>
                        <div className="text-[11px] font-black text-emerald-950">자연 유래 추출물</div>
                        <div className="text-[9px] text-emerald-700 font-semibold">건강한 피부 케어</div>
                      </div>

                      {/* 4. Vitamin C & E */}
                      <div className="p-2 rounded-xl bg-amber-50/95 border border-amber-200 text-center shadow-xs">
                        <div className="w-5 h-5 rounded-full bg-amber-400 text-white flex items-center justify-center mx-auto mb-1 text-[10px] font-black">
                          Vit
                        </div>
                        <div className="text-[11px] font-black text-amber-950">비타민 C & E</div>
                        <div className="text-[9px] text-amber-700 font-semibold">항산화 케어</div>
                      </div>

                      {/* 5. Niacinamide */}
                      <div className="p-2 rounded-xl bg-blue-50/95 border border-blue-200 text-center shadow-xs">
                        <div className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center mx-auto mb-1 text-[10px] font-black">
                          B3
                        </div>
                        <div className="text-[11px] font-black text-blue-950">나이아신아마이드</div>
                        <div className="text-[9px] text-blue-700 font-semibold">맑고 화사한 피부</div>
                      </div>

                      {/* 6. Adenosine */}
                      <div className="p-2 rounded-xl bg-purple-50/95 border border-purple-200 text-center shadow-xs">
                        <div className="w-5 h-5 rounded-full bg-purple-400 text-white flex items-center justify-center mx-auto mb-1 text-[10px] font-black">
                          Ad
                        </div>
                        <div className="text-[11px] font-black text-purple-950">아데노산</div>
                        <div className="text-[9px] text-purple-700 font-semibold">주름 개선 케어</div>
                      </div>
                    </div>
                  </div>

                  {/* 3 Clinical Badges */}
                  <div className="pt-3 border-t border-blue-100 grid grid-cols-3 gap-1 text-center text-[10px] font-black text-slate-800">
                    <div className="p-1.5 rounded-xl bg-white/90 border border-blue-100 shadow-xs">
                      <ShieldCheck className="w-3.5 h-3.5 mx-auto text-blue-600 mb-0.5" />
                      <span>저자극 포뮬라</span>
                    </div>
                    <div className="p-1.5 rounded-xl bg-white/90 border border-blue-100 shadow-xs">
                      <Sparkles className="w-3.5 h-3.5 mx-auto text-indigo-500 mb-0.5" />
                      <span>피부 과학 연구</span>
                    </div>
                    <div className="p-1.5 rounded-xl bg-white/90 border border-blue-100 shadow-xs">
                      <CheckCircle2 className="w-3.5 h-3.5 mx-auto text-emerald-600 mb-0.5" />
                      <span>믿을 수 있는 품질</span>
                    </div>
                  </div>
                </div>

                {/* ========================================================
                    PANEL 3: EUROPEAN / CZECH JELLY MASKA SPEC
                   ======================================================== */}
                <div
                  className={`relative rounded-2xl overflow-hidden border border-rose-200/90 bg-gradient-to-b from-[#FFF1F5] via-[#FFF8FA] to-[#FFFFFF] p-4 sm:p-5 flex flex-col justify-between shadow-md transition-all duration-300 hover:shadow-lg ${
                    activeMobilePanel !== 'all' && activeMobilePanel !== 'panel3' ? 'hidden md:flex' : 'flex'
                  }`}
                >
                  <div className="absolute top-0 right-0 w-36 h-36 bg-pink-200/30 rounded-full blur-2xl pointer-events-none" />

                  {/* Header Typography */}
                  <div>
                    <div className="text-center mb-2">
                      <div className="text-xl font-serif font-black tracking-widest text-slate-900">
                        S E Y O U L
                      </div>
                      <div className="text-[10px] font-extrabold tracking-widest text-rose-700 uppercase">
                        KOREAN BEAUTY
                      </div>
                    </div>

                    <div className="mt-3">
                      <h4 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight leading-tight">
                        KOLAGENOVÁ<br />JELLY MASKA
                      </h4>
                      <p className="text-xs sm:text-sm text-rose-800 font-bold mt-1.5">
                        Hydratovaná, hladká a zářivě vypadající pleť.
                      </p>
                    </div>

                    {/* 4 European Benefit Icons */}
                    <div className="mt-4 space-y-2.5 text-xs font-bold text-slate-700">
                      <div className="flex items-center gap-2.5">
                        <div className="w-6 h-6 rounded-full bg-rose-100 flex items-center justify-center shrink-0 text-rose-600 shadow-xs">
                          <Droplets className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <span className="text-slate-900 font-extrabold">Intenzivní</span>
                          <span className="text-slate-600 font-medium ml-1.5">hydratace</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center shrink-0 text-amber-600 shadow-xs">
                          <Sparkles className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <span className="text-slate-900 font-extrabold">Rozjasnění</span>
                          <span className="text-slate-600 font-medium ml-1.5">pleti</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <div className="w-6 h-6 rounded-full bg-sky-100 flex items-center justify-center shrink-0 text-sky-600 shadow-xs">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <span className="text-slate-900 font-extrabold">Hladší</span>
                          <span className="text-slate-600 font-medium ml-1.5">vzhled pleti</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 text-emerald-600 shadow-xs">
                          <ShieldCheck className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <span className="text-slate-900 font-extrabold">Přírodní</span>
                          <span className="text-slate-600 font-medium ml-1.5">extrakty</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* SEYOUL Mask Box and 5 Sachets */}
                  <div className="my-5 relative flex items-center justify-center group cursor-pointer" onClick={handleCtaClick}>
                    <img
                      src="/seyoul-combo.png"
                      alt="SEYOUL Mask Box and 5 Sachets"
                      className="w-48 sm:w-56 h-auto object-contain drop-shadow-xl group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* 3 European Badges */}
                  <div className="pt-3 border-t border-rose-100 grid grid-cols-3 gap-1 text-center text-[10px] font-black text-slate-800">
                    <div className="p-1.5 rounded-xl bg-white/90 border border-rose-100 shadow-xs">
                      <Award className="w-3.5 h-3.5 mx-auto text-rose-600 mb-0.5" />
                      <span className="leading-tight block">PREMIUM KOREJSKÁ</span>
                      <span className="text-[9px] text-slate-500 font-medium">KOSMETIKA</span>
                    </div>
                    <div className="p-1.5 rounded-xl bg-white/90 border border-rose-100 shadow-xs">
                      <span className="block text-xs mb-0.5">🇰🇷</span>
                      <span className="leading-tight block">VYROBENO</span>
                      <span className="text-[9px] text-slate-500 font-medium">V KOREJI</span>
                    </div>
                    <div className="p-1.5 rounded-xl bg-white/90 border border-rose-100 shadow-xs">
                      <HeartHandshake className="w-3.5 h-3.5 mx-auto text-emerald-600 mb-0.5" />
                      <span className="leading-tight block">BEZPEČNÁ PÉČE</span>
                      <span className="text-[9px] text-slate-500 font-medium">PRO VAŠI PLEŤ</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Quick-Action Bar */}
              <div className="pt-3 border-t border-pink-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 bg-white/70 backdrop-blur-xs p-3 rounded-2xl">
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-700 font-medium">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-800 font-black text-[11px] shadow-2xs">
                    <Sparkles className="w-3 h-3 text-rose-500" />
                    ƯU ĐÃI THÁNG NÀY: MUA 2 TẶNG 1
                  </span>
                  <span className="hidden sm:inline text-slate-400">·</span>
                  <span className="text-slate-800 font-bold">Giá chỉ từ 499 Kč / Hộp (5 miếng 34g)</span>
                  <span className="hidden sm:inline text-slate-400">·</span>
                  <span className="text-emerald-700 font-bold">Freeship từ 3 hộp</span>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={handleCtaClick}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-black text-xs sm:text-sm text-white bg-gradient-to-r from-rose-500 via-pink-500 to-sky-500 hover:brightness-105 shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-95"
                  >
                    <span>ĐẶT MUA NGAY (TỪ 499 KČ) →</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
