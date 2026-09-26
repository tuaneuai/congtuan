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
    <section id="how-to-use" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <p className="text-sm uppercase tracking-[0.25em] font-extrabold text-sky-800">
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
                className="relative p-7 rounded-3xl bg-[#F8FAFC] border border-slate-200 hover:border-sky-400 hover:bg-white transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between"
              >
                <div>
                  {/* Step numerical indicator */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-slate-950 text-white font-black text-base flex items-center justify-center shadow-sm">
                      {step.number}
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center">
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
                <div className="mt-6 pt-4 border-t border-slate-200/80 flex items-center justify-center py-3 bg-white rounded-xl shadow-2xs">
                  {step.number === '1' && (
                    <div className="text-center text-xs sm:text-sm font-bold text-slate-700">
                      💧 Čistá, suchá pleť
                    </div>
                  )}
                  {step.number === '2' && (
                    <div className="text-center text-xs sm:text-sm font-bold text-sky-800">
                      ✨ 2dílná hydrogelová maska
                    </div>
                  )}
                  {step.number === '3' && (
                    <div className="text-center text-xs sm:text-sm font-bold text-sky-800">
                      🧖‍♀️ Spodní díl → Horní díl
                    </div>
                  )}
                  {step.number === '4' && (
                    <div className="text-center text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                      <Moon className="w-4 h-4 text-sky-600" />
                      <span>2–8 hodin / Přes noc</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Expert Tip Callout */}
        <div className="mt-14 max-w-3xl mx-auto p-7 rounded-3xl bg-gradient-to-r from-sky-50 via-blue-50 to-indigo-50/60 border border-sky-200 flex items-start gap-4 shadow-sm">
          <div className="w-11 h-11 rounded-2xl bg-sky-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
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
