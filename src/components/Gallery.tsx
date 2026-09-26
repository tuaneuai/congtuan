import React, { useState } from 'react';
import { Maximize2, X, Sparkles, Droplets } from 'lucide-react';
import { useStore } from '../context/StoreContext';

import { GalleryItem } from '../types';

export const Gallery: React.FC = () => {
  const { t, galleryItems } = useStore();
  const [activeFilter, setActiveFilter] = useState<'all' | 'product' | 'texture' | 'ritual' | 'model'>('all');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const filteredItems = activeFilter === 'all'
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeFilter);

  return (
    <section id="gallery" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <p className="text-sm uppercase tracking-[0.25em] font-extrabold text-sky-800">
            {t.gallery.tag}
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-slate-950 tracking-tight">
            {t.gallery.title}
          </h2>
          <p className="text-slate-700 text-base sm:text-lg leading-relaxed font-normal">
            {t.gallery.subtitle}
          </p>
        </div>

        {/* Filter Tabs (Interactive Segmented Control) */}
        <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-slate-100 rounded-2xl max-w-lg mx-auto mb-14 border border-slate-200">
          {(['all', 'product', 'texture', 'ritual'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer ${
                activeFilter === filter
                  ? 'bg-white text-slate-950 shadow-sm'
                  : 'text-slate-600 hover:text-slate-950'
              }`}
            >
              {filter === 'all' && t.gallery.filterAll}
              {filter === 'product' && t.gallery.filterProduct}
              {filter === 'texture' && t.gallery.filterTexture}
              {filter === 'ritual' && t.gallery.filterRitual}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group relative aspect-4/3 rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-300 border border-slate-200 hover:-translate-y-1.5 bg-slate-950"
            >
              {/* Image Layer only if user uploaded custom non-unsplash image */}
              {item.imageUrl && !item.imageUrl.includes('images.unsplash.com') ? (
                <div className="absolute inset-0">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-slate-900/20" />
                </div>
              ) : (
                /* Crystal-Sharp Aesthetic Card Render Canvas */
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient || 'from-slate-950 via-[#0a1e38] to-slate-950'}`}>
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:20px_20px]"></div>
                  <div className="absolute -top-12 -right-12 w-48 h-48 bg-sky-500/15 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500"></div>
                </div>
              )}

              {/* Card Contents */}
              <div className="relative h-full p-6 sm:p-7 flex flex-col justify-between z-10">
                {/* Top badge */}
                <div className="self-start px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-xs uppercase tracking-wider font-extrabold text-sky-200 border border-white/25 shadow-sm">
                  {item.accent}
                </div>

                {(!item.imageUrl || item.imageUrl.includes('images.unsplash.com')) && (
                  /* Center art icon with rich glow */
                  <div className="relative my-auto self-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-sky-300 group-hover:scale-110 transition-transform shadow-lg">
                    {item.category === 'texture' ? (
                      <Droplets className="w-8 h-8" />
                    ) : (
                      <Sparkles className="w-8 h-8" />
                    )}
                  </div>
                )}

                {/* Bottom caption with larger, clearer text */}
                <div className="space-y-1.5 text-white mt-auto">
                  <h3 className="text-lg sm:text-xl font-serif font-bold tracking-wide group-hover:text-sky-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-200 line-clamp-2 leading-relaxed">
                    {item.subtitle}
                  </p>
                </div>
              </div>

              {/* Hover Zoom Overlay affordance */}
              <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none z-20">
                <div className="w-12 h-12 rounded-full bg-white text-slate-950 flex items-center justify-center shadow-xl">
                  <Maximize2 className="w-5 h-5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-6 animate-fadeIn"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-slate-950 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Close */}
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 z-30 text-white/90 hover:text-white p-2 rounded-full bg-black/50 backdrop-blur-md hover:bg-black/70 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Content Preview */}
            <div className="relative aspect-16/10 sm:aspect-16/9 w-full bg-slate-900 flex flex-col justify-end overflow-hidden">
              {selectedItem.imageUrl ? (
                <img
                  src={selectedItem.imageUrl}
                  alt={selectedItem.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className={`w-full h-full bg-gradient-to-br ${selectedItem.gradient || 'from-slate-900 via-sky-950 to-slate-900'} flex items-center justify-center`}>
                  <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-2xl">
                    <Sparkles className="w-12 h-12" />
                  </div>
                </div>
              )}

              {/* Gradient Bottom Overlay & Text */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex flex-col justify-end p-6 sm:p-8">
                <div className="self-start px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold text-white mb-3 border border-white/30">
                  {selectedItem.accent}
                </div>
                <div className="w-full text-white space-y-1.5 max-w-xl">
                  <h3 className="text-xl sm:text-2xl font-serif font-bold tracking-tight">
                    {selectedItem.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {selectedItem.subtitle}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
