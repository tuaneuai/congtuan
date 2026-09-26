import React from 'react';
import { Sparkles, Clock, Check, Moon } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const HowToUse: React.FC = () => {
  const { t } = useStore();

  const steps = [
    {
      number: '1',
      title: t.howToUse.step1Title,
      description: t.howToUse.step1Desc,
      icon: Check
    },
    {
      number: '2',
      title: t.howToUse.step2Title,
      description: t.howToUse.step2Desc,
      icon: Sparkles
    },
    {
      number: '3',
      title: t.howToUse.step3Title,
      description: t.howToUse.step3Desc,
      icon: Sparkles
    },
    {
      number: '4',
      title: t.howToUse.step4Title,
      description: t.howToUse.step4Desc,
      icon: Clock
    }
  ];

  return (
    <section id="how-to-use" className="py-24 bg-gradient-to-b from-[#F0F7FF]/60 via-white to-[#FFF5F8]/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <p className="text-sm uppercase tracking-[0.25em] font-extrabold text-rose-700">
            {t.howToUse.tag}
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-slate-950 tracking-tight">
            {t.howToUse.title}
          </h2>
          <p className="text-slate-700 text-base sm:text-lg leading-relaxed font-normal">
            {t.howToUse.subtitle}
          </p>
        </div>

        {/* 4 Step Visual Workflow */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="relative p-7 rounded-3xl bg-white/90 border border-pink-100/90 hover:border-pink-300 hover:bg-white transition-all duration-300 shadow-xs hover:shadow-xl flex flex-col justify-between"
              >
                <div>
                  {/* Step numerical indicator */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-black text-base flex items-center justify-center shadow-xs">
                      {step.number}
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-pink-50 text-rose-600 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-slate-950 mb-2.5 tracking-wide">
                    {step.title}
                  </h3>

                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                    {step.description}
                  </p>
                </div>

                {/* Visual Step Illustration representation */}
                <div className="mt-6 pt-4 border-t border-pink-100 flex items-center justify-center py-3 bg-pink-50/40 rounded-xl">
                  {step.number === '1' && (
                    <div className="text-center text-xs sm:text-sm font-bold text-slate-700">
                      💧 Čistá, suchá pleť
                    </div>
                  )}
                  {step.number === '2' && (
                    <div className="text-center text-xs sm:text-sm font-bold text-rose-700">
                      ✨ 2dílná hydrogelová maska
                    </div>
                  )}
                  {step.number === '3' && (
                    <div className="text-center text-xs sm:text-sm font-bold text-sky-800">
                      🧖‍♀️ Spodní díl → Horní díl
                    </div>
                  )}
                  {step.number === '4' && (
                    <div className="text-center text-xs sm:text-sm font-bold text-rose-900 flex items-center gap-1.5">
                      <Moon className="w-4 h-4 text-rose-500" />
                      <span>2–8 hodin / Přes noc</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Expert Tip Callout */}
        <div className="mt-14 max-w-3xl mx-auto p-7 rounded-3xl bg-gradient-to-r from-pink-50 via-rose-50/70 to-sky-50 border border-pink-200 flex items-start gap-4 shadow-xs">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-base sm:text-lg font-black text-slate-950 mb-1.5">
              {t.howToUse.tipsTitle}
            </h4>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
              {t.howToUse.tipsContent}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
