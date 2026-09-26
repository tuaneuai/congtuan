import React, { useState } from 'react';
import { Cookie, Settings, Check, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CookieBanner: React.FC = () => {
  const { t, cookieConsent, setCookieConsent } = useStore();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [analytics, setAnalytics] = useState(cookieConsent.analytics);
  const [marketing, setMarketing] = useState(cookieConsent.marketing);

  if (cookieConsent.hasConsented && !isSettingsOpen) return null;

  const handleAcceptAll = () => {
    setCookieConsent({
      essential: true,
      analytics: true,
      marketing: true,
      hasConsented: true
    });
    setIsSettingsOpen(false);
  };

  const handleRejectOptional = () => {
    setCookieConsent({
      essential: true,
      analytics: false,
      marketing: false,
      hasConsented: true
    });
    setIsSettingsOpen(false);
  };

  const handleSaveCustom = () => {
    setCookieConsent({
      essential: true,
      analytics,
      marketing,
      hasConsented: true
    });
    setIsSettingsOpen(false);
  };

  return (
    <>
      {/* Subtle Floating Bottom Banner */}
      {!cookieConsent.hasConsented && !isSettingsOpen && (
        <div className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-md z-40 bg-white/95 backdrop-blur-xl border border-slate-200 rounded-2xl shadow-2xl p-5 text-slate-800 animate-slide-up">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-sky-100 text-sky-800 flex items-center justify-center shrink-0 mt-0.5">
              <Cookie className="w-4 h-4" />
            </div>
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-900">
                {t.cookie.title}
              </h4>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                {t.cookie.desc}
              </p>

              <div className="flex flex-wrap items-center gap-2 pt-2">
                <button
                  onClick={handleAcceptAll}
                  className="px-3.5 py-1.5 rounded-lg bg-slate-900 text-white text-[11px] font-bold hover:bg-sky-900 transition-colors shadow-2xs"
                >
                  {t.cookie.acceptAll}
                </button>
                <button
                  onClick={handleRejectOptional}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-[11px] font-semibold hover:bg-slate-200 transition-colors"
                >
                  {t.cookie.rejectOptional}
                </button>
                <button
                  onClick={() => setIsSettingsOpen(true)}
                  className="px-2 py-1.5 text-slate-500 hover:text-slate-800 text-[11px] underline"
                >
                  {t.cookie.customize}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 border border-slate-200 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Settings className="w-4 h-4 text-sky-700" />
                <h3 className="text-sm font-bold text-slate-900">
                  {t.cookie.title}
                </h3>
              </div>
              <button
                onClick={() => setIsSettingsOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                <div>
                  <h5 className="font-bold text-slate-800">Nezbytné cookies</h5>
                  <p className="text-[11px] text-slate-500">Provoz košíku, jazyka a zabezpečení nákupu.</p>
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase bg-slate-200 px-2 py-0.5 rounded">
                  Vždy aktivní
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                <div>
                  <h5 className="font-bold text-slate-800">Analytické cookies</h5>
                  <p className="text-[11px] text-slate-500">Anonymní statistiky návštěvnosti k vylepšení webu.</p>
                </div>
                <input
                  type="checkbox"
                  checked={analytics}
                  onChange={(e) => setAnalytics(e.target.checked)}
                  className="w-4 h-4 rounded text-sky-600 focus:ring-sky-500"
                />
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                <div>
                  <h5 className="font-bold text-slate-800">Marketingové cookies</h5>
                  <p className="text-[11px] text-slate-500">Zobrazení relevantních kosmetických nabídek.</p>
                </div>
                <input
                  type="checkbox"
                  checked={marketing}
                  onChange={(e) => setMarketing(e.target.checked)}
                  className="w-4 h-4 rounded text-sky-600 focus:ring-sky-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={handleRejectOptional}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Odmítnout vše
              </button>
              <button
                type="button"
                onClick={handleSaveCustom}
                className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-sky-900 transition-colors shadow-sm"
              >
                {t.cookie.save}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
