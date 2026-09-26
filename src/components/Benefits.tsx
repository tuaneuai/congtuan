import React from 'react';
import { Droplets, Sparkles, Sun, Shield, Layers, Heart } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Benefits: React.FC = () => {
  const { t } = useStore();

  const benefitsList = [
    {
      index: '01',
      icon: Droplets,
      title: t.benefits.b1Title,
      description: t.benefits.b1Desc
    },
    {
      index: '02',
      icon: Sparkles,
      title: t.benefits.b2Title,
      description: t.benefits.b2Desc
    },
    {
      index: '03',
      icon: Sun,
      title: t.benefits.b3Title,
      description: t.benefits.b3Desc
    },
    {
      index: '04',
      icon: Shield,
      title: t.benefits.b4Title,
      description: t.benefits.b4Desc
    },
    {
      index: '05',
      icon: Layers,
      title: t.benefits.b5Title,
      description: t.benefits.b5Desc
    },
    {
      index: '06',
      icon: Heart,
      title: t.benefits.b6Title,
      description: t.benefits.b6Desc
    }
  ];

  return (
    <section id="benefits" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <p className="text-sm uppercase tracking-[0.25em] font-extrabold text-sky-800">
            {t.benefits.tag}
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-slate-950 tracking-tight">
            {t.benefits.title}
          </h2>
          <p className="text-slate-700 text-base sm:text-lg leading-relaxed font-normal">
            {t.benefits.subtitle}
          </p>
        </div>

        {/* 6 Benefit Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefitsList.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.index}
                className="group relative p-8 sm:p-9 rounded-3xl bg-[#F8FAFC] border border-slate-200 hover:border-sky-400 hover:bg-white transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  {/* Card Header with editorial index & quiet icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-serif font-extrabold text-sky-900/60 group-hover:text-sky-700 transition-colors">
                      {item.index}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-sky-800 group-hover:text-sky-600 group-hover:border-sky-300 transition-colors shadow-xs">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Card Title */}
                  <h3 className="text-xl font-bold text-slate-950 mb-3 tracking-wide group-hover:text-sky-950">
                    {item.title}
                  </h3>

                  {/* Card Description */}
                  <p className="text-base text-slate-700 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>

                {/* Subtle bottom accent line */}
                <div className="w-0 group-hover:w-full h-1 bg-gradient-to-r from-sky-500 to-blue-600 mt-6 transition-all duration-500 ease-out rounded-full"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
