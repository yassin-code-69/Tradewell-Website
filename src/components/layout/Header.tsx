'use client';

import React, { useState, useEffect, useRef } from 'react';
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
          <span className="brand__mark" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <circle className="dot" cx="12" cy="12" r="2.6" />
              <path d="M12 9.4V7.3M12 14.6v2.1M9.4 12H7.3M14.6 12h2.1" />
              <circle cx="12" cy="5.3" r="1.7" />
              <circle cx="12" cy="18.7" r="1.7" />
              <circle cx="5.3" cy="12" r="1.7" />
              <circle cx="18.7" cy="12" r="1.7" />
            </svg>
          </span>
          <span className="brand__text">
            <span className="brand__name">{SITE.name}</span>
            <span className="brand__sub">{SITE.tagline}</span>
          </span>
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
            <div className="mega">
              <div className="mega__grid">
                {CATEGORIES.slice(0, 12).map((c) => (
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
                    <span>{c.name}</span>
                  </button>
                ))}
              </div>
              <div className="mega__foot">
                <p>{CATEGORIES.length} categories listed across the directory.</p>
                <a
                  className="btn btn--outline btn--sm"
                  href="#categories"
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

          {/* Services Menu */}
          <div className={`nav__item ${activeMenu === 'services' ? 'is-open' : ''}`}>
            <button
              className="nav__link"
              aria-expanded={activeMenu === 'services'}
              aria-haspopup="true"
              onClick={(e) => {
                e.stopPropagation();
                setActiveMenu(activeMenu === 'services' ? null : 'services');
              }}
            >
              Services
              <svg className="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            <div className="mega mega--wide">
              <div className="mega__grid">
                {groups.map((g) => (
                  <div key={g}>
                    <div className="mega__col-title">{g}</div>
                    {CATEGORIES.filter((c) => c.group === g).slice(0, 5).map((c) => (
                      <button
                        key={c.name}
                        className="mega__link"
                        type="button"
                        onClick={() => {
                          setActiveMenu(null);
                          handleQuickSearch(c.name);
                        }}
                      >
                        {c.name}
                      </button>
                    ))}
                  </div>
                ))}
              </div>
              <div className="mega__foot">
                <p>Not sure which trade you need? Browse by project instead.</p>
                <a
                  className="btn btn--outline btn--sm"
                  href="#projects"
                  onClick={() => {
                    setActiveMenu(null);
                    closeDirectory();
                  }}
                >
                  Popular projects
                </a>
              </div>
            </div>
          </div>

          <div className="nav__item">
            <a
              className="nav__link"
              href="#categories"
              onClick={() => closeDirectory()}
            >
              Categories
            </a>
          </div>
          <div className="nav__item">
            <a
              className="nav__link"
              href="#advice"
              onClick={() => closeDirectory()}
            >
              Reviews &amp; Advice
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
