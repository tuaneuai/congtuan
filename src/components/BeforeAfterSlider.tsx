import React, { useState, useRef } from 'react';
import { Droplets, Sparkles, MoveHorizontal } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const BeforeAfterSlider: React.FC = () => {
  const { t, mediaSettings } = useStore();
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const hasCustomImages = !!(mediaSettings.beforeImageUrl && mediaSettings.afterImageUrl);

  return (
    <section className="py-24 bg-gradient-to-b from-[#FFF5F8]/60 via-[#F0F7FF]/50 to-white relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <p className="text-sm uppercase tracking-[0.25em] font-extrabold text-rose-700">
            {t.beforeAfter.tag}
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-slate-950 tracking-tight">
            {t.beforeAfter.title}
          </h2>
          <p className="text-slate-700 text-base sm:text-lg leading-relaxed font-normal">
            {t.beforeAfter.subtitle}
          </p>
        </div>

        {/* Interactive Comparison Canvas */}
        <div
          ref={containerRef}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          className="relative w-full aspect-16/10 sm:aspect-16/9 rounded-3xl overflow-hidden shadow-2xl border-2 border-slate-200 select-none cursor-ew-resize bg-slate-950"
        >
          {/* AFTER SIDE (Full Background layer) */}
          <div className="absolute inset-0 bg-gradient-to-tr from-sky-100 via-blue-50 to-white flex items-center justify-center p-8">
            {hasCustomImages && (
              <img
                src={mediaSettings.afterImageUrl}
                alt="After SEYOUL Treatment"
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
            <div className="relative w-full h-full flex flex-col justify-between p-6 sm:p-10 z-10">
              {/* After Glass Skin representation */}
              {!hasCustomImages && (
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(56,189,248,0.3)_0,transparent_65%)]"></div>
              )}

              {/* Tag top right */}
              <div className="relative self-end px-4 py-2 rounded-full bg-white/95 backdrop-blur-md shadow-md border border-sky-300 text-sm font-extrabold text-sky-950 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-sky-600 animate-pulse" />
                <span>{t.beforeAfter.afterLabel}</span>
              </div>

              {/* Luminous skin graphic showcase */}
              <div className="relative max-w-sm ml-auto text-right space-y-2">
                <div className="inline-block p-5 rounded-2xl bg-white/90 backdrop-blur-md border border-white shadow-xl text-left">
                  <div className="flex items-center gap-2 text-sm font-black text-sky-900 mb-1.5">
                    <Droplets className="w-5 h-5 text-sky-600" />
                    <span>Hydratace: +87% (Glass Skin)</span>
                  </div>
                  <p className="text-sm text-slate-800 leading-relaxed font-medium">
                    {t.beforeAfter.afterDesc}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* BEFORE SIDE (Clipped layer over top) */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-slate-300 via-stone-200 to-slate-400 flex items-center justify-center overflow-hidden"
            style={{ width: `${sliderPosition}%` }}
          >
            {hasCustomImages && (
              <img
                src={mediaSettings.beforeImageUrl}
                alt="Before SEYOUL Treatment"
                className="absolute inset-0 h-full object-cover max-w-none"
                style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%' }}
              />
            )}
            <div
              className="absolute inset-0 p-6 sm:p-10 flex flex-col justify-between z-10"
              style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%' }}
            >
              {/* Tag top left */}
              <div className="self-start px-4 py-2 rounded-full bg-slate-950/90 backdrop-blur-md shadow-md text-sm font-extrabold text-white flex items-center gap-2">
                <span>{t.beforeAfter.beforeLabel}</span>
              </div>

              {/* Before dehydrated skin notes */}
              <div className="max-w-sm space-y-2">
                <div className="p-5 rounded-2xl bg-slate-950/85 backdrop-blur-md text-white border border-slate-700 shadow-xl">
                  <div className="text-sm font-black text-slate-200 mb-1.5">
                    Nedostatek vláhy & mdlý tón
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {t.beforeAfter.beforeDesc}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Draggable Divider Handle Line */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-white shadow-xl pointer-events-none"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white text-slate-950 shadow-2xl border-2 border-slate-200 flex items-center justify-center">
              <MoveHorizontal className="w-6 h-6 text-slate-900" />
            </div>
          </div>
        </div>

        {/* Small Medical Disclaimer */}
        <p className="text-center text-xs sm:text-sm text-slate-500 mt-6 max-w-xl mx-auto italic">
          “{t.beforeAfter.disclaimer}”
        </p>
      </div>
    </section>
  );
};
