'use client';

import React from 'react';
import Image from 'next/image';
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
            <Image
              src="/assets/img/tradewell-home-logo-transparent.png"
              alt="Tradewell Home — All Home Services"
              width={180}
              height={38}
              className="brand__img"
            />
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
