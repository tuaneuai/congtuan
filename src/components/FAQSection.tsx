import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const FAQSection: React.FC = () => {
  const { t } = useStore();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqItems = [
    { q: t.faq.q1, a: t.faq.a1 },
    { q: t.faq.q2, a: t.faq.a2 },
    { q: t.faq.q3, a: t.faq.a3 },
    { q: t.faq.q4, a: t.faq.a4 },
    { q: t.faq.q5, a: t.faq.a5 },
    { q: t.faq.q6, a: t.faq.a6 },
    { q: t.faq.q7, a: t.faq.a7 },
    { q: t.faq.q8, a: t.faq.a8 }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-gradient-to-b from-white via-[#FFF5F8]/40 to-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <p className="text-sm uppercase tracking-[0.25em] font-extrabold text-rose-700">
            {t.faq.tag}
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-slate-950 tracking-tight">
            {t.faq.title}
          </h2>
          <p className="text-slate-700 text-base sm:text-lg leading-relaxed font-normal">
            {t.faq.subtitle}
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl border-2 border-slate-200 bg-white overflow-hidden transition-all duration-200 shadow-xs hover:border-sky-300"
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-black text-slate-950 leading-snug">
                    {item.q}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-sky-100 text-sky-800' : ''
                    }`}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 text-sm sm:text-base text-slate-700 leading-relaxed border-t border-slate-100 pt-4 font-normal">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Help footer */}
        <div className="mt-12 text-center text-sm text-slate-700 flex flex-wrap items-center justify-center gap-2">
          <HelpCircle className="w-5 h-5 text-rose-500" />
          <span>
            Máte další dotazy? Napište nám kdykoliv na{' '}
            <a href="mailto:lezara.info@gmail.com" className="text-rose-600 hover:text-rose-700 underline font-bold">
              lezara.info@gmail.com
            </a>{' '}
            nebo volejte{' '}
            <a href="tel:+420773868888" className="text-rose-600 hover:text-rose-700 underline font-bold">
              +420 773 868 888
            </a>
          </span>
        </div>
      </div>
    </section>
  );
};
