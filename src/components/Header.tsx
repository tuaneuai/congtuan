import React, { useState } from 'react';
import { ShoppingBag, Search, ShieldCheck, Menu, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Language, Currency } from '../types';

export const Header: React.FC = () => {
  const {
    t,
    language,
    setLanguage,
    currency,
    setCurrency,
    cartItemCount,
    setIsCartOpen,
    setIsAdminOpen,
    setSelectedVariantId
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBuyNow = () => {
    setSelectedVariantId('box-3');
    const pricingSection = document.querySelector('#pricing');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const query = searchQuery.toLowerCase();
    setSearchOpen(false);

    if (query.includes('kolagen') || query.includes('složení') || query.includes('ingredient')) {
      handleNavClick('#ingredients');
    } else if (query.includes('video') || query.includes('clip')) {
      handleNavClick('#video');
    } else if (query.includes('recenze') || query.includes('hodnocení') || query.includes('review')) {
      handleNavClick('#reviews');
    } else if (query.includes('použít') || query.includes('postup') || query.includes('step')) {
      handleNavClick('#how-to-use');
    } else if (query.includes('cena') || query.includes('koupit') || query.includes('objednat')) {
      handleNavClick('#pricing');
    } else {
      handleNavClick('#product');
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full glass-nav transition-all">
        {/* Top announcement bar */}
        <div className="bg-gradient-to-r from-slate-950 via-[#0B2545] to-slate-950 text-white text-xs sm:text-sm font-semibold tracking-wide py-2 px-4 text-center flex items-center justify-center gap-3">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>
            {language === 'cz' && 'Korejská prémiová kosmetika · Doprava zdarma při objednávce 3+ boxů po celé ČR'}
            {language === 'vi' && 'Mỹ phẩm chuẩn K-Beauty · Miễn phí vận chuyển toàn CH Séc từ 3 hộp'}
            {language === 'en' && 'Authentic Seoul Skincare · Free Shipping on 3+ Boxes across EU'}
          </span>
          <span className="hidden sm:inline bg-amber-400/20 text-amber-300 font-black tracking-wider px-2.5 py-0.5 rounded-md border border-amber-400/30">
            KÓD: KOREA10 (-10%)
          </span>
        </div>

        {/* Main 3-zone Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Zone 1: Brand Wordmark (Single text element in display face) */}
          <div className="flex items-center gap-3">
            <a
              href="#"
              className="text-2xl sm:text-3xl font-serif font-black tracking-widest text-slate-950 hover:text-sky-800 transition-colors whitespace-nowrap"
            >
              SEYOUL
            </a>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm xl:text-base font-bold tracking-wide text-slate-700">
            <button
              onClick={() => handleNavClick('#product')}
              className="hover:text-sky-800 transition-colors cursor-pointer py-1"
            >
              {t.nav.product}
            </button>
            <button
              onClick={() => handleNavClick('#benefits')}
              className="hover:text-sky-800 transition-colors cursor-pointer py-1"
            >
              {t.nav.benefits}
            </button>
            <button
              onClick={() => handleNavClick('#ingredients')}
              className="hover:text-sky-800 transition-colors cursor-pointer py-1"
            >
              {t.nav.ingredients}
            </button>
            <button
              onClick={() => handleNavClick('#how-to-use')}
              className="hover:text-sky-800 transition-colors cursor-pointer py-1"
            >
              {t.nav.howToUse}
            </button>
            <button
              onClick={() => handleNavClick('#video')}
              className="hover:text-sky-800 transition-colors cursor-pointer py-1"
            >
              {t.nav.video}
            </button>
            <button
              onClick={() => handleNavClick('#gallery')}
              className="hover:text-sky-800 transition-colors cursor-pointer py-1"
            >
              {t.nav.gallery}
            </button>
            <button
              onClick={() => handleNavClick('#reviews')}
              className="hover:text-sky-800 transition-colors cursor-pointer py-1"
            >
              {t.nav.reviews}
            </button>
            <button
              onClick={() => handleNavClick('#faq')}
              className="hover:text-sky-800 transition-colors cursor-pointer py-1"
            >
              {t.nav.faq}
            </button>
          </nav>

          {/* Zone 3: Interactive Affordances, Selectors & CTA */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Currency Selector */}
            <div className="hidden sm:flex items-center text-xs font-medium bg-slate-100 rounded-lg p-0.5 border border-slate-200">
              <button
                onClick={() => setCurrency('CZK')}
                className={`px-2 py-1 rounded transition-colors ${
                  currency === 'CZK'
                    ? 'bg-white text-slate-900 shadow-xs font-semibold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                CZK
              </button>
              <button
                onClick={() => setCurrency('EUR')}
                className={`px-2 py-1 rounded transition-colors ${
                  currency === 'EUR'
                    ? 'bg-white text-slate-900 shadow-xs font-semibold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                EUR
              </button>
            </div>

            {/* Language Switcher CZ | VI | EN */}
            <div className="flex items-center text-xs font-medium bg-slate-100 rounded-lg p-0.5 border border-slate-200">
              {(['cz', 'vi', 'en'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-2 py-1 rounded uppercase tracking-wider transition-colors ${
                    language === lang
                      ? 'bg-white text-sky-900 shadow-xs font-bold'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>

            {/* Search Trigger */}
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Vyhledávání"
              className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Admin Portal Trigger */}
            <button
              onClick={() => setIsAdminOpen(true)}
              aria-label="Quản trị Admin"
              title="Bảng Quản Trị SEYOUL (Mật khẩu: admin123)"
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-sky-900 bg-sky-50/90 hover:bg-sky-100/90 rounded-lg border border-sky-200/80 transition-all cursor-pointer shadow-2xs hover:shadow-xs"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-sky-700" />
              <span className="hidden sm:inline font-bold">Admin</span>
            </button>

            {/* Shopping Cart Button with Live Badge */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="Košík"
              className="relative p-2 text-slate-700 hover:text-sky-950 rounded-lg hover:bg-sky-50 transition-colors cursor-pointer"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-sky-600 text-white text-[11px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-sm animate-scale-in">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Prominent Header Buy CTA */}
            <button
              onClick={handleBuyNow}
              className="hidden md:inline-flex items-center justify-center px-4 py-2 text-xs font-semibold tracking-wider text-white bg-slate-900 hover:bg-sky-900 rounded-lg transition-all shadow-sm hover:shadow hover:-translate-y-0.5 whitespace-nowrap cursor-pointer"
            >
              {t.nav.buyNow}
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:text-slate-900"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white/95 backdrop-blur-xl border-b border-slate-200 px-6 py-4 space-y-3">
            <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-100">
              <button
                onClick={() => handleNavClick('#product')}
                className="text-left text-sm font-medium text-slate-700 py-1.5"
              >
                {t.nav.product}
              </button>
              <button
                onClick={() => handleNavClick('#benefits')}
                className="text-left text-sm font-medium text-slate-700 py-1.5"
              >
                {t.nav.benefits}
              </button>
              <button
                onClick={() => handleNavClick('#ingredients')}
                className="text-left text-sm font-medium text-slate-700 py-1.5"
              >
                {t.nav.ingredients}
              </button>
              <button
                onClick={() => handleNavClick('#how-to-use')}
                className="text-left text-sm font-medium text-slate-700 py-1.5"
              >
                {t.nav.howToUse}
              </button>
              <button
                onClick={() => handleNavClick('#video')}
                className="text-left text-sm font-medium text-slate-700 py-1.5"
              >
                {t.nav.video}
              </button>
              <button
                onClick={() => handleNavClick('#gallery')}
                className="text-left text-sm font-medium text-slate-700 py-1.5"
              >
                {t.nav.gallery}
              </button>
              <button
                onClick={() => handleNavClick('#reviews')}
                className="text-left text-sm font-medium text-slate-700 py-1.5"
              >
                {t.nav.reviews}
              </button>
              <button
                onClick={() => handleNavClick('#faq')}
                className="text-left text-sm font-medium text-slate-700 py-1.5"
              >
                {t.nav.faq}
              </button>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-1">
                <span className="text-xs text-slate-500 mr-2">Měna:</span>
                <button
                  onClick={() => setCurrency('CZK')}
                  className={`px-2.5 py-1 text-xs rounded ${currency === 'CZK' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700'}`}
                >
                  CZK
                </button>
                <button
                  onClick={() => setCurrency('EUR')}
                  className={`px-2.5 py-1 text-xs rounded ${currency === 'EUR' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700'}`}
                >
                  EUR
                </button>
              </div>

              <button
                onClick={handleBuyNow}
                className="px-4 py-2 text-xs font-bold text-white bg-slate-900 rounded-lg shadow-sm"
              >
                {t.nav.buyNow}
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl p-6 border border-slate-100">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-sm font-semibold text-slate-800">
                {language === 'cz' && 'Hledat na SEYOUL'}
                {language === 'vi' && 'Tìm kiếm tại SEYOUL'}
                {language === 'en' && 'Search SEYOUL'}
              </h3>
              <button
                onClick={() => setSearchOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSearchSubmit} className="mt-4">
              <div className="relative">
                <Search className="absolute left-3.5 top-3.5 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t.nav.searchPlaceholder}
                  autoFocus
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-sky-500 focus:bg-white text-sm"
                />
              </div>
              <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-500">
                <span>Rychlé odkazy:</span>
                <button
                  type="button"
                  onClick={() => {
                    setSearchOpen(false);
                    handleNavClick('#ingredients');
                  }}
                  className="text-sky-700 hover:underline"
                >
                  Kolagen & Složení
                </button>
                <span>·</span>
                <button
                  type="button"
                  onClick={() => {
                    setSearchOpen(false);
                    handleNavClick('#how-to-use');
                  }}
                  className="text-sky-700 hover:underline"
                >
                  Jak používat
                </button>
                <span>·</span>
                <button
                  type="button"
                  onClick={() => {
                    setSearchOpen(false);
                    handleNavClick('#pricing');
                  }}
                  className="text-sky-700 hover:underline"
                >
                  Ceník & Balíčky
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
