'use client';

import React from 'react';
import { SITE } from '@/data/tradewell';
import { useDirectory } from '@/context/DirectoryContext';

export function Footer() {
  const { handleQuickSearch, closeDirectory, openJoin } = useDirectory();

  const servicesList = [
    'Roofing',
    'Home repairs',
    'HVAC (Commercial)',
    'Electrical',
    'Lawn/Garden'
  ];

  const handleLinkClick = (href: string) => {
    closeDirectory();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__top">
          <div className="footer__brand">
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
            <p>
              An independent directory covering every home service trade, connecting Arkansas homeowners with local professionals.
            </p>
          </div>

          <div>
            <h4>Services</h4>
            <ul id="footServices">
              {servicesList.map((n) => (
                <li key={n}>
                  <button
                    className="footer__link"
                    type="button"
                    onClick={() => handleQuickSearch(n)}
                  >
                    {n}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>Company</h4>
            <ul>
              <li><a href="#how" onClick={() => handleLinkClick('#how')}>About</a></li>
              <li><a href="#advice" onClick={() => handleLinkClick('#advice')}>Contact</a></li>
              <li><a href="#reviews" onClick={() => handleLinkClick('#reviews')}>Reviews</a></li>
              <li><a href="#join" onClick={() => openJoin()}>Careers</a></li>
              <li><a href="#service-area" onClick={() => handleLinkClick('#service-area')}>Service area</a></li>
            </ul>
          </div>

          <div>
            <h4>Resources</h4>
            <ul>
              <li><a href="#advice" onClick={() => handleLinkClick('#advice')}>Home improvement</a></li>
              <li><a href="#advice" onClick={() => handleLinkClick('#advice')}>Cost guides</a></li>
              <li><a href="#advice" onClick={() => handleLinkClick('#advice')}>Advice</a></li>
              <li><a href="#projects" onClick={() => handleLinkClick('#projects')}>Project guides</a></li>
              <li><a href="#how" onClick={() => handleLinkClick('#how')}>How it works</a></li>
            </ul>
          </div>

          <div>
            <h4>For professionals</h4>
            <ul>
              <li><button className="footer__link" type="button" onClick={openJoin}>Join the directory</button></li>
              <li><button className="footer__link" type="button" onClick={openJoin}>Business profile</button></li>
              <li><button className="footer__link" type="button" onClick={openJoin}>Professional resources</button></li>
              <li><a href="#reviews" onClick={() => handleLinkClick('#reviews')}>Managing reviews</a></li>
            </ul>
          </div>

          <div>
            <h4>Legal</h4>
            <ul>
              <li><a href="#legal" onClick={() => handleLinkClick('#legal')}>Privacy</a></li>
              <li><a href="#legal" onClick={() => handleLinkClick('#legal')}>Terms</a></li>
              <li><a href="#legal" onClick={() => handleLinkClick('#legal')}>Accessibility</a></li>
              <li><a href="#legal" onClick={() => handleLinkClick('#legal')}>Cookie preferences</a></li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom" id="legal">
          <p className="footer__legal">© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
