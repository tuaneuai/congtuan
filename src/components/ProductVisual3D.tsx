import React, { useState } from 'react';
import { Sparkles, Droplets, ShieldCheck } from 'lucide-react';

interface ProductVisual3DProps {
  className?: string;
}

export const ProductVisual3D: React.FC<ProductVisual3DProps> = ({ className = '' }) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setRotate({
      x: -y * 12,
      y: x * 14
    });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div
      className={`relative select-none perspective-1000 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background Soft Aura & Caustics */}
      <div className="absolute inset-0 bg-radial from-sky-200/40 via-blue-100/20 to-transparent blur-3xl pointer-events-none rounded-full transform -translate-y-6"></div>

      {/* Floating Collagen & Water Molecule particles */}
      <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-to-tr from-sky-300/40 to-white/70 backdrop-blur-md border border-white/80 shadow-lg flex items-center justify-center animate-bounce duration-3000 pointer-events-none">
        <Droplets className="w-5 h-5 text-sky-600" />
      </div>
      <div className="absolute top-1/2 -right-6 w-14 h-14 rounded-full bg-gradient-to-br from-white/90 to-sky-100/70 backdrop-blur-md border border-white shadow-xl flex flex-col items-center justify-center pointer-events-none animate-pulse">
        <Sparkles className="w-5 h-5 text-sky-500 mb-0.5" />
        <span className="text-[8px] font-bold text-sky-900 tracking-tighter uppercase">5 Masks</span>
      </div>
      <div className="absolute -bottom-6 left-8 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-md flex items-center gap-1.5 text-xs font-semibold text-slate-800 pointer-events-none">
        <ShieldCheck className="w-4 h-4 text-emerald-600" />
        <span>Made in Korea · 100% Authentic</span>
      </div>

      {/* Interactive 3D Render Box & Sachets */}
      <div
        className="relative transition-transform duration-200 ease-out flex items-center justify-center p-4 sm:p-8"
        style={{
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Shadow Pedestal with Glass Reflection */}
        <div className="absolute bottom-2 w-4/5 h-12 bg-slate-900/10 blur-xl rounded-full transform scale-y-50"></div>

        {/* The Master Composition */}
        <div className="relative w-full max-w-[440px] aspect-4/3 flex items-center justify-center">
          {/* Individual Mask Sachet (Leaning behind left) */}
          <div
            className="absolute left-2 sm:left-4 bottom-8 w-44 sm:w-52 h-60 sm:h-72 rounded-2xl bg-gradient-to-br from-slate-50 via-sky-50 to-white p-5 border border-sky-100/80 shadow-xl transform -rotate-12 hover:-rotate-8 transition-transform duration-300 flex flex-col justify-between"
            style={{ transform: 'translateZ(-20px) rotate(-12deg)' }}
          >
            {/* Sachet Tear notch */}
            <div className="absolute top-4 left-0 w-1.5 h-3 bg-slate-200 rounded-r-sm"></div>
            <div className="absolute top-4 right-0 w-1.5 h-3 bg-slate-200 rounded-l-sm"></div>

            <div className="flex items-center justify-between border-b border-sky-100/60 pb-2">
              <span className="font-serif font-black text-base tracking-widest text-slate-900">SEYOUL</span>
              <span className="text-[11px] uppercase tracking-wider font-bold text-sky-700 bg-sky-100 px-2 py-0.5 rounded-md">Bio-Gel</span>
            </div>

            <div className="text-center my-auto py-2">
              <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-gradient-to-tr from-sky-400/20 to-sky-100/40 border border-sky-200 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-sky-400/30 blur-xs"></div>
              </div>
              <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 tracking-wide">COLLAGEN JELLY MASK</h4>
              <p className="text-[11px] text-sky-800 font-bold mt-0.5">Hydrogel Sheet · 34g</p>
            </div>

            <div className="text-[11px] text-slate-600 font-bold text-center uppercase tracking-widest pt-2 border-t border-slate-100">
              Seoul, South Korea
            </div>
          </div>

          {/* Main Luxury Box (Foreground) */}
          <div
            className="relative z-10 w-56 sm:w-68 h-76 sm:h-92 rounded-2xl bg-gradient-to-b from-white via-slate-50 to-sky-50/60 p-6 sm:p-7 border border-white/90 shadow-2xl flex flex-col justify-between"
            style={{
              boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.8) inset',
              transform: 'translateZ(30px)'
            }}
          >
            {/* Box holographic light reflection overlay */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-transparent via-white/50 to-sky-200/20 pointer-events-none"></div>

            {/* Top brand lockup */}
            <div className="relative text-center pt-2">
              <p className="text-[11px] tracking-[0.25em] uppercase font-bold text-sky-800 mb-1">
                K-Beauty Laboratory
              </p>
              <h3 className="text-3xl sm:text-4xl font-serif font-black tracking-widest text-slate-950">
                SEYOUL
              </h3>
              <div className="w-10 h-1 bg-sky-500 mx-auto mt-2 rounded-full"></div>
            </div>

            {/* Central Product Emblem with Collagen Crystal Effect */}
            <div className="relative my-auto text-center py-4">
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 mx-auto mb-3 flex items-center justify-center">
                {/* Concentric hydration rings */}
                <div className="absolute inset-0 rounded-full border border-sky-200/60 animate-ping duration-3000 opacity-30"></div>
                <div className="absolute inset-2 rounded-full border border-sky-300/40"></div>
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-sky-400 via-sky-500 to-blue-600 shadow-lg shadow-sky-500/25 flex items-center justify-center text-white">
                  <Droplets className="w-8 h-8 opacity-95 animate-pulse" />
                </div>
              </div>

              <h4 className="text-base sm:text-lg font-black text-slate-950 tracking-wider">
                COLLAGEN JELLY MASK
              </h4>
              <p className="text-xs sm:text-sm text-sky-800 font-bold tracking-wide mt-1">
                Deep Hydration & Glass Skin
              </p>
            </div>

            {/* Bottom Specs & Origin */}
            <div className="relative pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-700 font-bold">
              <span className="text-slate-700">5 PIECES / BOX</span>
              <span className="font-extrabold text-sky-900 bg-sky-50 px-2 py-0.5 rounded">MADE IN KOREA</span>
            </div>
          </div>

          {/* Second Mask Sachet (Leaning behind right) */}
          <div
            className="absolute right-2 sm:right-4 bottom-6 w-40 sm:w-48 h-56 sm:h-64 rounded-2xl bg-gradient-to-bl from-white via-sky-50/50 to-slate-50 p-4 border border-sky-100/70 shadow-lg transform rotate-8 hover:rotate-4 transition-transform duration-300 flex flex-col justify-between"
            style={{ transform: 'translateZ(-10px) rotate(8deg)' }}
          >
            <div className="flex items-center justify-between border-b border-sky-100 pb-1.5">
              <span className="font-serif font-black text-sm tracking-widest text-slate-900">SEYOUL</span>
              <span className="text-[10px] font-bold text-sky-700">K-BEAUTY</span>
            </div>
            <div className="text-center py-2">
              <p className="text-[10px] font-bold text-slate-800">COLLAGEN MASK</p>
              <p className="text-[9px] text-slate-500">Intensive Care</p>
            </div>
            <div className="text-[8px] text-slate-400 text-center tracking-wider">
              5 PACK SET
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
