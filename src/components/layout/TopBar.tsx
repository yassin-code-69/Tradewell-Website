'use client';

import React from 'react';
import { PinIcon } from '@/components/ui/Icons';
import { useDirectory } from '@/context/DirectoryContext';

export function TopBar() {
  const { closeDirectory } = useDirectory();

  const handleNavClick = () => {
    closeDirectory();
  };

  return (
    <div className="topbar">
      <div className="wrap topbar__inner">
        <div className="topbar__left">
          <svg className="ico ico--sm" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11z" />
            <circle cx="12" cy="10" r="2.6" />
          </svg>
          <span>Serving homeowners across Arkansas</span>
        </div>
        <div className="topbar__right">
          <a href="#how" onClick={handleNavClick}>How it works</a>
          <a href="#advice" onClick={handleNavClick}>Advice</a>
          <a href="#service-area" onClick={handleNavClick}>Service area</a>
          <a href="#join" onClick={handleNavClick}>Are you a pro?</a>
        </div>
      </div>
    </div>
  );
}
