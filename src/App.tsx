import React, { useState } from 'react';
import { StoreProvider } from './context/StoreContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { VideoSection } from './components/VideoSection';
import { Benefits } from './components/Benefits';
import { Ingredients } from './components/Ingredients';
import { HowToUse } from './components/HowToUse';
import { BeforeAfterSlider } from './components/BeforeAfterSlider';
import { Gallery } from './components/Gallery';
import { ProductSales } from './components/ProductSales';
import { ReviewsSection } from './components/ReviewsSection';
import { FAQSection } from './components/FAQSection';
import { TrustSection } from './components/TrustSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { StickyMobileBar } from './components/StickyMobileBar';
import { CookieBanner } from './components/CookieBanner';
import { LegalModal, LegalDocType } from './components/LegalModal';
import { AdminDashboard } from './components/AdminDashboard';
import { TopLuxuryBanner } from './components/TopLuxuryBanner';

export default function App() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [legalDoc, setLegalDoc] = useState<LegalDocType>(null);

  return (
    <StoreProvider>
      <div className="min-h-screen bg-gradient-to-b from-[#FFF5F8] via-[#F0F7FF] via-white to-[#FFF5F8] text-slate-800 font-sans flex flex-col selection:bg-rose-200 selection:text-slate-900 pb-16 md:pb-0">
        {/* Top Luxury Image Banner Frame with Lighting Effects */}
        <TopLuxuryBanner onOpenVideo={() => setIsVideoModalOpen(true)} />

        {/* Fixed Navigation Header */}
        <Header />

        {/* Main Content Journey: PRODUCT → BENEFIT → VIDEO → INGREDIENTS → USAGE → PROOF → OFFER */}
        <main className="flex-1">
          {/* 1. Hero Campaign Showcase */}
          <Hero onOpenVideo={() => setIsVideoModalOpen(true)} />


          {/* 2. Key Benefits */}
          <Benefits />

          {/* 3. Video Showcase */}
          <div id="product">
            <VideoSection
              isOpen={isVideoModalOpen}
              onOpen={() => setIsVideoModalOpen(true)}
              onClose={() => setIsVideoModalOpen(false)}
            />
          </div>

          {/* 4. Active Science & Ingredients */}
          <Ingredients />

          {/* 5. 4-Step Application Routine */}
          <HowToUse />

          {/* 6. Interactive Before / After Comparison */}
          <BeforeAfterSlider />

          {/* 7. Gallery Experience & Lightbox */}
          <Gallery />

          {/* 8. Contiguous Sales & Bundle Offers */}
          <ProductSales />

          {/* 9. Verified Customer Reviews */}
          <ReviewsSection />

          {/* 10. Frequently Asked Questions */}
          <FAQSection />

          {/* 11. Trust, Certifications & Guarantees */}
          <TrustSection />
        </main>

        {/* Footer */}
        <Footer onOpenLegal={(type) => setLegalDoc(type)} />

        {/* Conversion & Interactive Overlays */}
        <CartDrawer />
        <CheckoutModal />
        <OrderConfirmationModal />
        <StickyMobileBar />
        <CookieBanner />
        <LegalModal docType={legalDoc} onClose={() => setLegalDoc(null)} />
        <AdminDashboard />
      </div>
    </StoreProvider>
  );
}
