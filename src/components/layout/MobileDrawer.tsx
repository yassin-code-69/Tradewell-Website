'use client';

import React from 'react';
import { CATEGORIES, SITE } from '@/data/tradewell';
import { ArrowIcon, XMarkIcon } from '@/components/ui/Icons';
import { useDirectory } from '@/context/DirectoryContext';

export function MobileDrawer() {
  const {
    isDrawerOpen,
    closeDrawer,
    closeDirectory,
    openJoin,
    handleQuickSearch
  } = useDirectory();

  const handleNavClick = (href: string) => {
    closeDirectory();
    closeDrawer();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSearchClick = () => {
    closeDrawer();
    closeDirectory();
    const input = document.getElementById('serviceInput') as HTMLInputElement | null;
    if (input) {
      setTimeout(() => input.focus(), 300);
    }
  };

  return (
    <>
      <div
        className={`drawer-backdrop ${isDrawerOpen ? 'is-open' : ''}`}
        id="drawerBackdrop"
        onClick={closeDrawer}
      />
      <aside
        className={`drawer ${isDrawerOpen ? 'is-open' : ''}`}
        id="drawer"
        aria-label="Mobile menu"
        aria-hidden={!isDrawerOpen}
      >
        <div className="drawer__head">
          <span className="brand">
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
          </span>
          <button className="icon-btn" id="closeDrawer" aria-label="Close menu" onClick={closeDrawer}>
            <XMarkIcon />
          </button>
        </div>

        <div className="drawer__body">
          <button className="drawer__link" type="button" onClick={() => handleNavClick('#featured-categories')}>
            Featured Trades
          </button>
          <button className="drawer__link" type="button" onClick={() => handleNavClick('#how')}>
            How it works
          </button>
          <button className="drawer__link" type="button" onClick={() => handleNavClick('#reviews')}>
            Verified Reviews
          </button>
          <button className="drawer__link" type="button" onClick={() => handleNavClick('#service-area')}>
            Service Area
          </button>

          <div className="drawer__group-title">Core Trade Categories</div>
          <div id="drawerCats">
            {CATEGORIES.slice(0, 5).map((c) => (
              <button
                key={c.name}
                className="drawer__link"
                type="button"
                onClick={() => handleQuickSearch(c.name)}
              >
                <span>{c.name} ({c.pros} Pros)</span>
                <ArrowIcon />
              </button>
            ))}
          </div>

          <div className="drawer__cta">
            <button
              className="btn btn--primary btn--block"
              id="drawerSearchBtn"
              type="button"
              onClick={handleSearchClick}
            >
              Search for a pro
            </button>
            <button
              className="btn btn--outline btn--block"
              type="button"
              onClick={() => {
                closeDrawer();
                openJoin();
              }}
            >
              Join as a Pro
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
