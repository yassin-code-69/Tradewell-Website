'use client';

import React, { useEffect } from 'react';
import { DirectoryProvider, useDirectory } from '@/context/DirectoryContext';
import { SITE } from '@/data/tradewell';
import { TopBar } from '@/components/layout/TopBar';
import { Header } from '@/components/layout/Header';
import { MobileDrawer } from '@/components/layout/MobileDrawer';
import { HeroSection } from '@/components/home/HeroSection';
import { CategoryShowcase } from '@/components/home/CategoryShowcase';
import { ContractorSpotlight } from '@/components/home/ContractorSpotlight';
import { HowItWorksSection } from '@/components/home/HowItWorksSection';
import { ReviewsSection } from '@/components/home/ReviewsSection';
import { ServiceAreaSection } from '@/components/home/ServiceAreaSection';
import { JoinBand } from '@/components/home/JoinBand';
import { Footer } from '@/components/layout/Footer';
import { DirectoryView } from '@/components/directory/DirectoryView';
import { ModalRoot } from '@/components/modals/ModalRoot';
import { Toast } from '@/components/ui/Toast';

function PageContent() {
  const { isDirectoryOpen, term } = useDirectory();

  // Synchronize document title and body class with directory state
  useEffect(() => {
    if (isDirectoryOpen) {
      document.body.classList.add('is-directory');
      document.title = `${term ? term + ' pros' : 'Directory'} — ${SITE.name}`;
    } else {
      document.body.classList.remove('is-directory');
      document.title = SITE.title;
    }
  }, [isDirectoryOpen, term]);

  return (
    <>
      <TopBar />
      <Header />
      <MobileDrawer />

      <main id="main">
        <span id="top" />

        {/* Directory / Search Results */}
        {isDirectoryOpen && <DirectoryView />}

        {/* Streamlined Homepage Sections */}
        {!isDirectoryOpen && (
          <>
            <HeroSection />
            <CategoryShowcase />
            <ContractorSpotlight />
            <HowItWorksSection />
            <ReviewsSection />
            <ServiceAreaSection />
            <JoinBand />
          </>
        )}
      </main>

      <Footer />
      <ModalRoot />
      <Toast />
    </>
  );
}

export default function Home() {
  return (
    <DirectoryProvider>
      <PageContent />
    </DirectoryProvider>
  );
}
