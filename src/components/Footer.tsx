import React, { useState } from 'react';
import { Mail, Check, ArrowRight, Instagram, Facebook, Youtube } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { LegalDocType } from './LegalModal';

interface FooterProps {
  onOpenLegal: (doc: LegalDocType) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLegal }) => {
  const { t, setCookieConsent, cookieConsent } = useStore();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
  };

  return (
    <footer className="bg-slate-950 text-white pt-20 pb-12 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-slate-800">
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-3xl sm:text-4xl font-serif font-black tracking-widest text-white">
              SEYOUL
            </h3>
            <p className="text-xs sm:text-sm text-sky-400 uppercase tracking-widest font-extrabold">
              K-Beauty · Made in Korea
            </p>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-md font-normal">
              {t.footer.aboutBrand}
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-slate-900 hover:bg-sky-900 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-slate-900 hover:bg-sky-900 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-slate-900 hover:bg-sky-900 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm uppercase font-extrabold tracking-widest text-slate-200">
              {t.footer.linksTitle}
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-300 font-medium">
              <li>
                <button
                  onClick={() => onOpenLegal('terms')}
                  className="hover:text-sky-300 transition-colors cursor-pointer"
                >
                  {t.footer.terms}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegal('privacy')}
                  className="hover:text-sky-300 transition-colors cursor-pointer"
                >
                  {t.footer.privacy}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegal('shipping')}
                  className="hover:text-sky-300 transition-colors cursor-pointer"
                >
                  {t.footer.shippingPayment}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegal('returns')}
                  className="hover:text-sky-300 transition-colors cursor-pointer"
                >
                  {t.footer.returns}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegal('complaints')}
                  className="hover:text-sky-300 transition-colors cursor-pointer"
                >
                  {t.footer.complaints}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCookieConsent({ ...cookieConsent, hasConsented: false })}
                  className="hover:text-sky-300 transition-colors cursor-pointer"
                >
                  {t.footer.cookieSettings}
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-sm uppercase font-extrabold tracking-widest text-slate-200">
              {t.footer.newsletterTitle}
            </h4>
            <p className="text-sm text-slate-300 font-normal">
              {t.footer.newsletterDesc}
            </p>

            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="space-y-2.5">
                <div className="flex gap-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.footer.newsletterPlaceholder}
                    className="flex-1 px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white placeholder:text-slate-400 focus:outline-hidden focus:border-sky-400"
                  />
                  <button
                    type="submit"
                    className="px-5 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-sm font-bold transition-colors cursor-pointer shadow-sm"
                  >
                    {t.footer.newsletterBtn}
                  </button>
                </div>
              </form>
            ) : (
              <div className="p-4 rounded-xl bg-sky-950 border border-sky-700 text-sky-200 text-sm flex items-start gap-3">
                <Check className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">{t.footer.newsletterSuccess}</p>
                  <p className="text-xs text-sky-300 mt-0.5">Použijte kód v nákupním košíku pro 10% slevu.</p>
                </div>
              </div>
            )}

            <div className="pt-2 text-xs sm:text-sm text-slate-300 space-y-1.5 font-medium">
              <p>Email: <a href="mailto:info@seyoul.cz" className="text-sky-300 underline font-semibold">info@seyoul.cz</a></p>
              <p>Telefon: <a href="tel:+420777123456" className="text-sky-300 underline font-semibold">+420 777 123 456</a></p>
              <p className="text-slate-400">Expediční sklad: K Hájům 2606/2b, 155 00 Praha 5</p>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 text-center text-xs sm:text-sm text-slate-400 font-medium">
          <p>{t.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
};
