'use client';

import React from 'react';
import Image from 'next/image';
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
            <a href="#top" className="brand" aria-label={`${SITE.name} — home`}>
              <Image
                src="/assets/img/tradewell-home-logo-dark-v2.png"
                alt="Tradewell Home — All Home Services"
                width={220}
                height={46}
                className="brand__img--dark"
              />
            </a>
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
