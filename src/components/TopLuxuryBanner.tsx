import React, { useState, useRef } from 'react';
import {
  Sparkles,
  ArrowRight,
  X,
  ChevronDown,
  Droplets,
  ShieldCheck,
  Award,
  Upload,
  CheckCircle2,
  Sparkle
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface TopLuxuryBannerProps {
  onOpenVideo?: () => void;
}

export const TopLuxuryBanner: React.FC<TopLuxuryBannerProps> = ({ onOpenVideo }) => {
  const { topBannerSettings, updateTopBannerSettings, setSelectedVariantId } = useStore();
  const [isDismissed, setIsDismissed] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        if (base64) {
          updateTopBannerSettings({ imageUrl: base64 });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        if (base64) {
          updateTopBannerSettings({ imageUrl: base64 });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      className="relative w-full z-30 transition-all duration-500 ease-in-out bg-gradient-to-r from-[#FFF5F8] via-[#F0F7FF] to-[#FFF5F8] border-b border-pink-200/80 shadow-xs"
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="image/*"
        className="hidden"
      />

      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-2 sm:py-3">
        <div
          className={`relative overflow-hidden rounded-2xl md:rounded-3xl luxury-frame-glow transition-all duration-500 ${
            isCollapsed ? 'py-2 px-4' : 'p-3 sm:p-4 md:p-5'
          } border ${
            isDragging ? 'border-rose-500 ring-4 ring-rose-200 bg-rose-50/90' : 'border-pink-200/90 bg-gradient-to-br from-white via-[#FFF8FA] to-[#F0F8FF]'
          } text-slate-900 shadow-xl`}
        >
          {/* Ambient Lighting Layers - White, Soft Pink & Light Blue Cosmetics Glow */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-24 -left-20 w-96 h-96 bg-pink-200/35 rounded-full blur-3xl animate-aurora-glow" />
            <div className="absolute -bottom-24 -right-20 w-96 h-96 bg-sky-200/40 rounded-full blur-3xl animate-aurora-glow delay-1000" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-32 bg-white/70 blur-2xl" />
          </div>

          {/* Diamond Light Sweep Effect */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-10 opacity-60">
            <div className="w-1/3 h-full bg-gradient-to-r from-transparent via-white/70 to-transparent transform -skew-x-25 animate-light-sweep" />
          </div>

          {/* Collapsed State Bar (compact view) */}
          {isCollapsed ? (
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <span className="flex h-2.5 w-2.5 rounded-full bg-rose-500 animate-pulse" />
                <span className="text-xs sm:text-sm font-serif tracking-widest text-slate-900 uppercase font-black">
                  SEYOUL KOREAN BEAUTY · COLLAGEN JELLY MASK
                </span>
                <span className="hidden md:inline text-xs text-rose-700 font-bold bg-pink-100/80 px-2.5 py-0.5 rounded-full border border-pink-200">
                  Ưu đãi 499 Kč / Hộp · Freeship từ 3 hộp
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCtaClick}
                  className="px-4 py-1.5 rounded-full text-xs font-black bg-gradient-to-r from-rose-500 via-pink-500 to-sky-500 text-white hover:brightness-105 shadow-sm cursor-pointer"
                >
                  ĐẶT MUA NGAY →
                </button>
                <button
                  onClick={() => setIsCollapsed(false)}
                  className="p-1.5 rounded-full text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
                  title="Mở rộng banner"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : topBannerSettings.imageUrl ? (
            /* Custom Full-Resolution Uploaded Banner View */
            <div className="relative z-10">
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-pink-200 group">
                <img
                  src={topBannerSettings.imageUrl}
                  alt="SEYOUL Korean Beauty Banner"
                  className="w-full h-auto max-h-[580px] object-cover rounded-2xl"
                  referrerPolicy="no-referrer"
                />

                {/* Quick action bar */}
                <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-auto flex flex-wrap items-center gap-3">
                  <button
                    onClick={handleCtaClick}
                    className="px-6 py-3 rounded-xl font-black text-sm text-white bg-slate-950/90 hover:bg-rose-600 backdrop-blur-md shadow-xl transition-all cursor-pointer flex items-center gap-2"
                  >
                    <span>ĐẶT MUA NGAY (TỪ 499 KČ) →</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3.5 py-2.5 rounded-xl font-bold text-xs text-slate-800 bg-white/95 hover:bg-white backdrop-blur-md border border-slate-200 shadow-sm transition-all cursor-pointer flex items-center gap-1.5"
                    title="Chọn hình ảnh khác từ máy tính"
                  >
                    <Upload className="w-3.5 h-3.5 text-rose-500" />
                    <span>Thay đổi file ảnh</span>
                  </button>
                  <button
                    onClick={() => updateTopBannerSettings({ imageUrl: '' })}
                    className="px-3 py-2 rounded-xl font-bold text-xs text-slate-600 hover:text-slate-900 bg-white/80 hover:bg-white backdrop-blur-md border border-slate-200 transition-all cursor-pointer"
                    title="Quay lại banner gốc"
                  >
                    Mặc định
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Pristine 3-Panel Panoramic Banner Matching exact 'paner mat ma hq.png' */
            <div className="relative z-10 space-y-3 sm:space-y-4">
              {/* Top Banner Toolbar with Quick Upload Option */}
              <div className="flex items-center justify-between gap-3 pb-2.5 border-b border-pink-200/70">
                <div className="flex items-center gap-2.5">
                  <span className="px-3 py-1 rounded-full bg-gradient-to-r from-rose-500 to-sky-500 text-white text-[11px] font-black tracking-widest uppercase shadow-xs">
                    OFFICIAL BANNER
                  </span>
                  <span className="text-xs sm:text-sm font-serif font-black tracking-wider text-slate-900">
                    SEYOUL KOREAN BEAUTY · COLLAGEN JELLY MASK CAMPAIGN
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-1.5 rounded-xl font-bold text-xs text-rose-800 bg-rose-100/80 hover:bg-rose-200/90 border border-rose-300 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                    title="Nhấp để tải file 'paner mat ma hq.png' từ máy tính của bạn vào banner"
                  >
                    <Upload className="w-3.5 h-3.5 text-rose-600" />
                    <span className="hidden sm:inline">Tải tệp ảnh banner gốc</span>
                    <span className="sm:hidden">Tải ảnh</span>
                  </button>
                </div>
              </div>

              {/* Seamless 3-Panel Panoramic Display (Identical to 'paner mat ma hq.png') */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5 items-stretch">
                {/* PANEL 1: KOREAN GLASS SKIN & FORMULA */}
                <div className="relative rounded-2xl overflow-hidden border border-sky-200/80 bg-gradient-to-b from-[#EBF5FF] via-[#F4F9FF] to-[#FFFFFF] p-4 sm:p-5 flex flex-col justify-between shadow-md">
                  {/* Subtle caustics */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-sky-200/30 rounded-full blur-2xl pointer-events-none" />

                  {/* Header */}
                  <div>
                    <div className="text-center mb-2">
                      <div className="text-lg font-serif font-black tracking-widest text-slate-900">
                        S E Y O U L
                      </div>
                      <div className="text-[10px] font-extrabold tracking-widest text-sky-700 uppercase">
                        KOREAN BEAUTY
                      </div>
                    </div>

                    <div className="mt-3">
                      <h4 className="text-xl sm:text-2xl font-black text-sky-950 tracking-tight leading-tight">
                        콜라겐<br />젤리 마스크
                      </h4>
                      <p className="text-xs text-sky-800 font-bold mt-1">
                        매일 더 빛나는 탱탱한 피부의 비밀
                      </p>
                    </div>

                    {/* 4 Korean Benefit Icons */}
                    <div className="mt-3.5 space-y-2 text-xs font-bold text-slate-700">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-sky-100 flex items-center justify-center shrink-0 text-sky-700">
                          <Droplets className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <span className="text-slate-900 font-extrabold">집중 보습</span>
                          <span className="text-slate-500 font-normal ml-1">수분 충전</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-pink-100 flex items-center justify-center shrink-0 text-pink-600">
                          <Sparkles className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <span className="text-slate-900 font-extrabold">맑고 화사한</span>
                          <span className="text-slate-500 font-normal ml-1">피부 톤</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center shrink-0 text-blue-600">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <span className="text-slate-900 font-extrabold">매끄럽고</span>
                          <span className="text-slate-500 font-normal ml-1">부드러운 피부</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 text-emerald-600">
                          <ShieldCheck className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <span className="text-slate-900 font-extrabold">자연 유래</span>
                          <span className="text-slate-500 font-normal ml-1">성분 함유</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Real Official Product Image */}
                  <div className="my-4 relative flex items-center justify-center">
                    <img
                      src="/seyoul-jelly-mask.png"
                      alt="SEYOUL Collagen Jelly Mask Box"
                      className="w-48 sm:w-56 h-auto object-contain drop-shadow-xl hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* 3 Korean Certification Badges */}
                  <div className="pt-3 border-t border-sky-100 grid grid-cols-3 gap-1 text-center text-[10px] font-black text-slate-800">
                    <div className="p-1 rounded-lg bg-white/80 border border-sky-100">
                      <Award className="w-3.5 h-3.5 mx-auto text-sky-600 mb-0.5" />
                      <span>프리미엄 품질</span>
                    </div>
                    <div className="p-1 rounded-lg bg-white/80 border border-sky-100">
                      <Sparkles className="w-3.5 h-3.5 mx-auto text-pink-500 mb-0.5" />
                      <span>한국 화장품</span>
                    </div>
                    <div className="p-1 rounded-lg bg-white/80 border border-sky-100">
                      <span className="block text-xs mb-0.5">🇰🇷</span>
                      <span>한국 제조</span>
                    </div>
                  </div>
                </div>

                {/* PANEL 2: 6 GLOWING INGREDIENT SPHERES */}
                <div className="relative rounded-2xl overflow-hidden border border-blue-200/80 bg-gradient-to-b from-[#EFF6FF] via-[#F8FAFF] to-[#FFFFFF] p-4 sm:p-5 flex flex-col justify-between shadow-md">
                  {/* Background Glow */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-200/25 rounded-full blur-3xl pointer-events-none" />

                  {/* Header */}
                  <div className="text-center">
                    <div className="text-lg font-serif font-black tracking-widest text-slate-900">
                      S E Y O U L
                    </div>
                    <div className="text-[10px] font-extrabold tracking-widest text-blue-700 uppercase">
                      KOREAN BEAUTY
                    </div>
                    <h4 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight mt-2">
                      자연에서 찾은<br />피부 에너지
                    </h4>
                    <p className="text-xs text-slate-600 font-semibold mt-1">
                      콜라겐과 수분 성분이 선사하는 촉촉하고 탄력있는 피부
                    </p>
                  </div>

                  {/* 6 Glowing Ingredient Spheres around Central Box */}
                  <div className="my-3 relative py-2">
                    {/* Central Product */}
                    <div className="relative z-10 w-36 sm:w-44 mx-auto">
                      <img
                        src="/seyoul-product-1.png"
                        alt="SEYOUL Mask Box and Sachet"
                        className="w-full h-auto object-contain drop-shadow-xl"
                      />
                    </div>

                    {/* 6 Ingredients Bubbles Layout */}
                    <div className="grid grid-cols-3 gap-2 pt-3">
                      {/* 1. Collagen Extract */}
                      <div className="p-2 rounded-xl bg-pink-50/90 border border-pink-200 text-center">
                        <div className="w-5 h-5 rounded-full bg-pink-400 text-white flex items-center justify-center mx-auto mb-1 text-[10px] font-black">
                          Co
                        </div>
                        <div className="text-[11px] font-black text-pink-950">콜라겐 추출물</div>
                        <div className="text-[9px] text-pink-700">피부 탄력 케어</div>
                      </div>

                      {/* 2. Hyaluronic Acid */}
                      <div className="p-2 rounded-xl bg-sky-50/90 border border-sky-200 text-center">
                        <div className="w-5 h-5 rounded-full bg-sky-400 text-white flex items-center justify-center mx-auto mb-1 text-[10px] font-black">
                          HA
                        </div>
                        <div className="text-[11px] font-black text-sky-950">히알루론산</div>
                        <div className="text-[9px] text-sky-700">짙은 수분 공급</div>
                      </div>

                      {/* 3. Natural Extracts */}
                      <div className="p-2 rounded-xl bg-emerald-50/90 border border-emerald-200 text-center">
                        <div className="w-5 h-5 rounded-full bg-emerald-400 text-white flex items-center justify-center mx-auto mb-1 text-[10px] font-black">
                          Bio
                        </div>
                        <div className="text-[11px] font-black text-emerald-950">자연 유래 추출물</div>
                        <div className="text-[9px] text-emerald-700">건강한 피부 케어</div>
                      </div>

                      {/* 4. Vitamin C & E */}
                      <div className="p-2 rounded-xl bg-amber-50/90 border border-amber-200 text-center">
                        <div className="w-5 h-5 rounded-full bg-amber-400 text-white flex items-center justify-center mx-auto mb-1 text-[10px] font-black">
                          Vit
                        </div>
                        <div className="text-[11px] font-black text-amber-950">비타민 C & E</div>
                        <div className="text-[9px] text-amber-700">항산화 케어</div>
                      </div>

                      {/* 5. Niacinamide */}
                      <div className="p-2 rounded-xl bg-blue-50/90 border border-blue-200 text-center">
                        <div className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center mx-auto mb-1 text-[10px] font-black">
                          B3
                        </div>
                        <div className="text-[11px] font-black text-blue-950">나이아신아마이드</div>
                        <div className="text-[9px] text-blue-700">맑고 화사한 피부</div>
                      </div>

                      {/* 6. Adenosine */}
                      <div className="p-2 rounded-xl bg-purple-50/90 border border-purple-200 text-center">
                        <div className="w-5 h-5 rounded-full bg-purple-400 text-white flex items-center justify-center mx-auto mb-1 text-[10px] font-black">
                          Ad
                        </div>
                        <div className="text-[11px] font-black text-purple-950">아데노산</div>
                        <div className="text-[9px] text-purple-700">주름 개선 케어</div>
                      </div>
                    </div>
                  </div>

                  {/* 3 Dermatology Badges */}
                  <div className="pt-3 border-t border-blue-100 grid grid-cols-3 gap-1 text-center text-[10px] font-black text-slate-800">
                    <div className="p-1 rounded-lg bg-white/80 border border-blue-100">
                      <ShieldCheck className="w-3.5 h-3.5 mx-auto text-blue-600 mb-0.5" />
                      <span>저자극 포뮬라</span>
                    </div>
                    <div className="p-1 rounded-lg bg-white/80 border border-blue-100">
                      <Sparkles className="w-3.5 h-3.5 mx-auto text-indigo-500 mb-0.5" />
                      <span>피부 과학 연구</span>
                    </div>
                    <div className="p-1 rounded-lg bg-white/80 border border-blue-100">
                      <CheckCircle2 className="w-3.5 h-3.5 mx-auto text-emerald-600 mb-0.5" />
                      <span>믿을 수 있는 품질</span>
                    </div>
                  </div>
                </div>

                {/* PANEL 3: EUROPEAN / CZECH JELLY MASKA SPEC */}
                <div className="relative rounded-2xl overflow-hidden border border-rose-200/80 bg-gradient-to-b from-[#FFF1F5] via-[#FFF8FA] to-[#FFFFFF] p-4 sm:p-5 flex flex-col justify-between shadow-md">
                  {/* Subtle caustics */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-pink-200/30 rounded-full blur-2xl pointer-events-none" />

                  {/* Header */}
                  <div>
                    <div className="text-center mb-2">
                      <div className="text-lg font-serif font-black tracking-widest text-slate-900">
                        S E Y O U L
                      </div>
                      <div className="text-[10px] font-extrabold tracking-widest text-rose-700 uppercase">
                        KOREAN BEAUTY
                      </div>
                    </div>

                    <div className="mt-3">
                      <h4 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight leading-tight">
                        KOLAGENOVÁ<br />JELLY MASKA
                      </h4>
                      <p className="text-xs text-rose-800 font-bold mt-1">
                        Hydratovaná, hladká a zářivě vypadající pleť.
                      </p>
                    </div>

                    {/* 4 European Benefit Icons */}
                    <div className="mt-3.5 space-y-2 text-xs font-bold text-slate-700">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-rose-100 flex items-center justify-center shrink-0 text-rose-600">
                          <Droplets className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <span className="text-slate-900 font-extrabold">Intenzivní</span>
                          <span className="text-slate-600 font-medium ml-1">hydratace</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center shrink-0 text-amber-600">
                          <Sparkles className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <span className="text-slate-900 font-extrabold">Rozjasnění</span>
                          <span className="text-slate-600 font-medium ml-1">pleti</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-sky-100 flex items-center justify-center shrink-0 text-sky-600">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <span className="text-slate-900 font-extrabold">Hladší</span>
                          <span className="text-slate-600 font-medium ml-1">vzhled pleti</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 text-emerald-600">
                          <ShieldCheck className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <span className="text-slate-900 font-extrabold">Přírodní</span>
                          <span className="text-slate-600 font-medium ml-1">extrakty</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Real Official Combo Image */}
                  <div className="my-4 relative flex items-center justify-center">
                    <img
                      src="/seyoul-combo.png"
                      alt="SEYOUL Mask Box and 5 Sachets"
                      className="w-48 sm:w-56 h-auto object-contain drop-shadow-xl hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* 3 European Certification Badges */}
                  <div className="pt-3 border-t border-rose-100 grid grid-cols-3 gap-1 text-center text-[10px] font-black text-slate-800">
                    <div className="p-1 rounded-lg bg-white/80 border border-rose-100">
                      <Award className="w-3.5 h-3.5 mx-auto text-rose-600 mb-0.5" />
                      <span className="leading-tight block">PREMIUM KOREJSKÁ</span>
                    </div>
                    <div className="p-1 rounded-lg bg-white/80 border border-rose-100">
                      <span className="block text-xs mb-0.5">🇰🇷</span>
                      <span className="leading-tight block">VYROBENO V KOREJI</span>
                    </div>
                    <div className="p-1 rounded-lg bg-white/80 border border-rose-100">
                      <ShieldCheck className="w-3.5 h-3.5 mx-auto text-emerald-600 mb-0.5" />
                      <span className="leading-tight block">BEZPEČNÁ PÉČE</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Quick Call to Action Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="flex items-center gap-3 text-xs sm:text-sm font-bold text-slate-700">
                  <span className="flex items-center gap-1.5 text-rose-700 bg-rose-100/80 px-3 py-1 rounded-full border border-rose-200">
                    <Sparkles className="w-4 h-4 text-rose-500" />
                    <span>Ưu Đãi Đặc Biệt: 499 Kč / Hộp (5 Miếng)</span>
                  </span>
                  <span className="hidden sm:inline text-slate-500">·</span>
                  <span className="hidden sm:inline text-emerald-700 font-bold">Freeship khi đặt từ 3 hộp</span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleCtaClick}
                    className="px-6 py-2.5 rounded-xl font-black text-xs sm:text-sm text-white bg-gradient-to-r from-rose-500 via-pink-500 to-sky-500 hover:brightness-105 shadow-md transition-all cursor-pointer flex items-center gap-2"
                  >
                    <span>ĐẶT MUA NGAY (TỪ 499 KČ) →</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Top Right Controls: Collapse & Dismiss Buttons */}
          <div className="absolute top-2 right-2 flex items-center gap-1 z-20">
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-rose-100 transition-colors cursor-pointer"
              title={isCollapsed ? 'Mở rộng banner' : 'Thu gọn banner'}
            >
              <ChevronDown
                className={`w-4 h-4 transform transition-transform ${isCollapsed ? '' : 'rotate-180'}`}
              />
            </button>
            <button
              onClick={() => setIsDismissed(true)}
              className="p-1.5 rounded-full text-slate-400 hover:text-rose-600 hover:bg-rose-100 transition-colors cursor-pointer"
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
