import React, { useState } from 'react';
import { Sparkles, Info, Droplets } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Ingredients: React.FC = () => {
  const { t } = useStore();
  const [activeIngredientId, setActiveIngredientId] = useState<string>('collagen');

  const items = t.ingredients.items;
  const activeIngredient = items.find((i) => i.id === activeIngredientId) || items[0];

  return (
    <section id="ingredients" className="py-24 bg-gradient-to-b from-white via-sky-50/40 to-slate-50 relative overflow-hidden">
      {/* Background ambient water ripples & molecular circles */}
      <div className="absolute top-1/3 -right-24 w-80 h-80 rounded-full border border-sky-200/50 pointer-events-none animate-ping duration-3000 opacity-20"></div>
      <div className="absolute top-1/2 left-4 w-64 h-64 rounded-full border border-blue-200/40 pointer-events-none opacity-40"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <p className="text-sm uppercase tracking-[0.25em] font-extrabold text-sky-800">
            {t.ingredients.tag}
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-slate-950 tracking-tight">
            {t.ingredients.title}
          </h2>
          <p className="text-slate-700 text-base sm:text-lg leading-relaxed font-normal">
            {t.ingredients.subtitle}
          </p>
          <p className="text-sm text-sky-800 font-bold pt-1">
            {t.ingredients.clickHint}
          </p>
        </div>

        {/* Interactive Molecular Matrix & Detail View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left: Interactive Bubble Selector */}
          <div className="lg:col-span-7 flex flex-wrap justify-center gap-3.5 sm:gap-4 p-4">
            {items.map((item) => {
              const isSelected = item.id === activeIngredientId;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveIngredientId(item.id)}
                  onMouseEnter={() => setActiveIngredientId(item.id)}
                  className={`group relative px-6 py-4.5 rounded-2xl transition-all duration-300 text-left border flex items-center gap-3.5 cursor-pointer ${
                    isSelected
                      ? 'bg-slate-950 text-white border-slate-950 shadow-xl shadow-sky-950/20 scale-105'
                      : 'bg-white hover:bg-sky-50/50 text-slate-900 border-slate-200 hover:border-sky-400 shadow-xs hover:shadow-md'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                      isSelected
                        ? 'bg-sky-500 text-white'
                        : 'bg-sky-100 text-sky-700 group-hover:bg-sky-200'
                    }`}
                  >
                    <Droplets className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-extrabold tracking-wide">
                      {item.name}
                    </h4>
                    <p
                      className={`text-xs font-semibold truncate max-w-[170px] ${
                        isSelected ? 'text-sky-200' : 'text-slate-600'
                      }`}
                    >
                      {item.czechName}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Focused Active Ingredient Highlight Card */}
          <div className="lg:col-span-5">
            <div className="relative p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-2xl shadow-sky-500/10 space-y-6">
              {/* Header with badge */}
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-sky-900 bg-sky-100 px-3.5 py-1.5 rounded-full border border-sky-200">
                  {activeIngredient.badge}
                </span>
                <div className="w-9 h-9 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center">
                  <Info className="w-5 h-5" />
                </div>
              </div>

              {/* Title */}
              <div>
                <h3 className="text-3xl font-serif font-black text-slate-950">
                  {activeIngredient.name}
                </h3>
                <p className="text-base font-bold text-sky-800 mt-1">
                  {activeIngredient.czechName}
                </p>
              </div>

              {/* Description */}
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
                {activeIngredient.desc}
              </p>

              {/* Micro-molecular diagram badge */}
              <div className="pt-4 border-t border-slate-200 flex items-center gap-3 text-sm text-slate-700 font-semibold">
                <Sparkles className="w-5 h-5 text-sky-600 shrink-0" />
                <span>Nízkomolekulární hydrogelová forma pro hloubkové vstřebávání</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
