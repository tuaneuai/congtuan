import React, { useState } from 'react';
import { Sparkles, Droplets, ShieldCheck, Award } from 'lucide-react';

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
      x: -y * 10,
      y: x * 12
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
      <div className="absolute inset-0 bg-radial from-pink-200/30 via-sky-200/30 to-transparent blur-3xl pointer-events-none rounded-full transform -translate-y-6"></div>

      {/* Floating Collagen & Water Molecule particles */}
      <div className="absolute -top-3 -left-3 w-12 h-12 rounded-full bg-white/90 backdrop-blur-md border border-pink-200 shadow-lg flex items-center justify-center animate-bounce duration-3000 pointer-events-none z-20">
        <Droplets className="w-5 h-5 text-sky-500" />
      </div>

      <div className="absolute top-1/2 -right-4 w-16 h-16 rounded-full bg-white/95 backdrop-blur-md border border-sky-200 shadow-xl flex flex-col items-center justify-center pointer-events-none animate-pulse z-20">
        <Sparkles className="w-5 h-5 text-rose-500 mb-0.5" />
        <span className="text-[9px] font-black text-slate-900 tracking-tighter uppercase">5 Masek</span>
      </div>

      <div className="absolute -bottom-4 left-6 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-pink-200 shadow-md flex items-center gap-1.5 text-xs font-extrabold text-slate-800 pointer-events-none z-20">
        <ShieldCheck className="w-4 h-4 text-emerald-600" />
        <span>100% Vyrobeno v Koreji</span>
      </div>

      {/* Interactive 3D Render Box & Sachets */}
      <div
        className="relative transition-transform duration-200 ease-out flex items-center justify-center p-2 sm:p-4"
        style={{
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Shadow Pedestal with Glass Reflection */}
        <div className="absolute bottom-2 w-4/5 h-12 bg-slate-900/10 blur-xl rounded-full transform scale-y-50"></div>

        {/* The Master Composition with Real SEYOUL Product Imagery */}
        <div className="relative w-full max-w-[480px] aspect-4/3 flex items-center justify-center">
          {/* Main Official Product Image */}
          <div className="relative z-10 w-full max-w-[420px] group">
            <img
              src="/seyoul-jelly-mask.png"
              alt="SEYOUL Collagen Jelly Mask Real Product"
              className="w-full h-auto object-contain drop-shadow-[0_20px_35px_rgba(30,58,138,0.2)] hover:scale-105 transition-transform duration-500"
            />

            {/* Glowing authenticity badge overlay */}
            <div className="absolute -bottom-2 right-4 bg-white/90 backdrop-blur-md border border-sky-200 px-3 py-1.5 rounded-xl shadow-lg flex items-center gap-2">
              <Award className="w-4 h-4 text-sky-600" />
              <div className="text-left">
                <div className="text-[10px] font-black uppercase tracking-wider text-slate-900 leading-none">
                  SEYOUL KOREA
                </div>
                <div className="text-[9px] font-bold text-sky-700 leading-none mt-0.5">
                  Bio-Collagen 34g
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
