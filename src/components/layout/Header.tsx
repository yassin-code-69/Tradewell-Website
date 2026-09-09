'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { CATEGORIES, SITE } from '@/data/tradewell';
import { Icon } from '@/components/ui/Icons';
import { useDirectory } from '@/context/DirectoryContext';

export function Header() {
  const {
    closeDirectory,
    openJoin,
    openDrawer,
    handleQuickSearch,
    isDirectoryOpen
  } = useDirectory();

  const [activeMenu, setActiveMenu] = useState<'find' | 'services' | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  const groups = Array.from(new Set(CATEGORIES.map((c) => c.group)));

  // Scroll listener for sticky header styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleBrandClick = (e: React.MouseEvent) => {
    e.preventDefault();
    closeDirectory();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchIconClick = () => {
    if (isDirectoryOpen) {
      closeDirectory();
    }
    const input = document.getElementById('serviceInput') as HTMLInputElement | null;
    if (input) {
      setTimeout(() => input.focus(), 250);
    }
  };

  return (
    <header className={`header ${isScrolled ? 'is-scrolled' : ''}`} ref={headerRef}>
      <div className="wrap header__inner">
        <a className="brand" href="#top" id="brandHome" onClick={handleBrandClick} aria-label={`${SITE.name} — home`}>
          <Image
            src="/assets/img/tradewell-home-logo-transparent.png"
            alt="Tradewell Home — All Home Services"
            width={200}
            height={42}
            className="brand__img"
            priority
          />
        </a>

        <nav className="nav" aria-label="Primary">
          {/* Find Pros Menu */}
          <div className={`nav__item ${activeMenu === 'find' ? 'is-open' : ''}`}>
            <button
              className="nav__link"
              aria-expanded={activeMenu === 'find'}
              aria-haspopup="true"
              onClick={(e) => {
                e.stopPropagation();
                setActiveMenu(activeMenu === 'find' ? null : 'find');
              }}
            >
              Find Pros
              <svg className="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            <div className="mega" style={{ width: 'min(520px, calc(100vw - 32px))' }}>
              <div className="mega__grid" style={{ gridTemplateColumns: '1fr' }}>
                {CATEGORIES.slice(0, 5).map((c) => (
                  <button
                    key={c.name}
                    className="mega__link"
                    type="button"
                    onClick={() => {
                      setActiveMenu(null);
                      handleQuickSearch(c.name);
                    }}
                  >
                    <Icon name={c.icon} />
                    <span>{c.name} ({c.pros} Pros)</span>
                  </button>
                ))}
              </div>
              <div className="mega__foot">
                <p>Verified Arkansas home service specialists.</p>
                <a
                  className="btn btn--outline btn--sm"
                  href="#featured-categories"
                  onClick={() => {
                    setActiveMenu(null);
                    closeDirectory();
                  }}
                >
                  Browse all
                </a>
              </div>
            </div>
          </div>

          <div className="nav__item">
            <a
              className="nav__link"
              href="#featured-categories"
              onClick={() => closeDirectory()}
            >
              Trades
            </a>
          </div>
          <div className="nav__item">
            <a
              className="nav__link"
              href="#how"
              onClick={() => closeDirectory()}
            >
              How It Works
            </a>
          </div>
          <div className="nav__item">
            <a
              className="nav__link"
              href="#reviews"
              onClick={() => closeDirectory()}
            >
              Reviews
            </a>
          </div>
          <div className="nav__item">
            <a
              className="nav__link"
              href="#service-area"
              onClick={() => closeDirectory()}
            >
              Service Area
            </a>
          </div>
        </nav>

        <div className="nav-actions">
          <button
            className="icon-btn"
            id="headerSearch"
            aria-label="Search services"
            onClick={handleSearchIconClick}
          >
            <svg className="ico" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
          </button>
          <a
            className="btn btn--outline"
            href="#join"
            onClick={(e) => {
              e.preventDefault();
              openJoin();
            }}
          >
            Join as a Pro
          </a>
          <button
            className="icon-btn hamburger"
            id="openDrawer"
            aria-label="Open menu"
            aria-expanded="false"
            onClick={openDrawer}
          >
            <svg className="ico" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
