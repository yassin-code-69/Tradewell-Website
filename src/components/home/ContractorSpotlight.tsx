'use client';

import React from 'react';
import Image from 'next/image';
import { StarRating, PinIcon, PhoneIcon } from '@/components/ui/Icons';
import { useDirectory } from '@/context/DirectoryContext';

export function ContractorSpotlight() {
  const { openContact, openProfile, pros, spotlight } = useDirectory();
  const featuredPro = pros.find((p) => p.id === spotlight?.activeProId) || pros[0];

  if (!featuredPro) return null;

  const isValor = featuredPro.id.startsWith('valor-roofing') || !!featuredPro.phoneHref;

  return (
    <section className="section section--surface border-y border-[var(--line)]" id="spotlight">
      <div className="wrap">
        {/* Section Header */}
        <div className="section__head flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <span className="section__eyebrow">Weekly Contractor Spotlight</span>
            <h2 className="section__title">Arkansas Contractor of the Week</h2>
            <p className="section__sub">
              Every week, Tradewell highlights an exceptional local trade specialist who consistently exceeds our standards for workmanship, rapid response, and client satisfaction.
            </p>
          </div>
          <span className="pro-card__respond" style={{ fontSize: '13px' }}>
            {spotlight?.updatedAt || 'Updated for this week'}
          </span>
        </div>

        {/* Authentic Tradewell Spotlight Card */}
        <article className="spotlight-card">
          {/* Left Column: Media & Project Caption */}
          <div className="spotlight-card__media">
            <div className="spotlight-card__img-wrap">
              <Image
                src={spotlight?.projectImage || '/assets/img/roof-replacement.jpg'}
                alt={`${featuredPro.name} featured project in Arkansas`}
                fill
                className="object-cover"
                sizes="(max-width: 900px) 100vw, 440px"
              />
            </div>
            <div className="spotlight-card__caption">
              <span className="section__eyebrow" style={{ marginBottom: '2px', display: 'block' }}>
                Recent Project
              </span>
              <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--ink)', fontFamily: 'var(--display)' }}>
                {spotlight?.projectTitle || 'Architectural Shingle Replacement & Gutters'}
              </div>
              <div style={{ fontSize: '13px', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '5px', marginTop: '4px' }}>
                <PinIcon /> {spotlight?.projectLocation || `${featuredPro.city}, AR`}
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Details & Action Buttons */}
          <div className="spotlight-card__body">
            <div>
              <div className="pro-card__head">
                {(featuredPro.logo || isValor) && (
                  <div className="relative w-11 h-11 rounded-lg overflow-hidden border border-[var(--line)] bg-[#F4EFEA] flex-none p-0.5 shadow-2xs">
                    <Image
                      src={featuredPro.logo || '/assets/img/valor-roofing-logo.png'}
                      alt={featuredPro.name}
                      fill
                      className="object-contain p-0.5"
                      sizes="44px"
                    />
                  </div>
                )}
                <div>
                  <h3 className="pro-card__name" style={{ fontSize: '26px' }}>{featuredPro.name}</h3>
                  <span className="badge badge--top">Featured Pro</span>
                </div>
              </div>

              <div className="pro-card__row" style={{ marginTop: '8px' }}>
                <span className="pro-card__rating">
                  <StarRating rating={featuredPro.rating} />
                  <span className="num">{featuredPro.rating.toFixed(1)}</span>
                  <span className="cnt">({featuredPro.reviews} verified reviews)</span>
                </span>
                <span className="pro-card__score">
                  Tradewell Score: <b>{featuredPro.tradewellScore || 99}/100</b>
                </span>
                <span className="pro-card__loc">
                  <PinIcon /> {featuredPro.city}
                </span>
                <span className="pro-card__respond">{featuredPro.responds}</span>
              </div>

              <p className="spotlight-card__story">
                {spotlight?.editorialNote ||
                  `${featuredPro.name} was selected for this week's spotlight following outstanding homeowner reports during the recent severe weather season. From emergency inspections and transparent estimates to prompt turnaround, they continue to set the benchmark for Arkansas standards.`}
              </p>

              <div className="spotlight-card__quote">
                <blockquote>
                  &ldquo;{spotlight?.reviewQuote ||
                    'They responded immediately when our home needed repairs after a storm. Honest written quote, worked smoothly, and completed the job cleanly. Flawless work.'}&rdquo;
                </blockquote>
                <div className="spotlight-card__quote-author">
                  — {spotlight?.reviewAuthor || 'Verified Arkansas Homeowner'}
                </div>
              </div>
            </div>

            <div className="spotlight-card__actions">
              {isValor ? (
                <>
                  <a
                    className="btn btn--phone"
                    href={featuredPro.phoneHref || 'tel:+18703168800'}
                    aria-label={`Call ${featuredPro.name} at (870) 316-8800`}
                  >
                    <PhoneIcon />
                    <span>Call (870) 316-8800</span>
                  </a>
                  <button
                    className="btn btn--primary"
                    type="button"
                    onClick={() => openContact(featuredPro.id)}
                  >
                    Send Info for Free Estimate
                  </button>
                  <button
                    className="btn btn--outline"
                    type="button"
                    onClick={() => openProfile(featuredPro.id)}
                  >
                    View Profile
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="btn btn--primary"
                    type="button"
                    onClick={() => openContact(featuredPro.id)}
                  >
                    Drop Info to Contact
                  </button>
                  <button
                    className="btn btn--outline"
                    type="button"
                    onClick={() => openProfile(featuredPro.id)}
                  >
                    View Profile
                  </button>
                </>
              )}
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
