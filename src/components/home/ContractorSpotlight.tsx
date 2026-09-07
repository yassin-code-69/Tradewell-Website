'use client';

import React from 'react';
import Image from 'next/image';
import { PROS } from '@/data/tradewell';
import { StarRating, PinIcon, PhoneIcon } from '@/components/ui/Icons';
import { useDirectory } from '@/context/DirectoryContext';

export function ContractorSpotlight() {
  const { openContact, openProfile } = useDirectory();
  const valorPro = PROS.find((p) => p.id === 'valor-roofing') || PROS[0];

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
            Updated for this week
          </span>
        </div>

        {/* Authentic Tradewell Spotlight Card */}
        <article className="spotlight-card">
          {/* Left Column: Media & Project Caption */}
          <div className="spotlight-card__media">
            <div className="spotlight-card__img-wrap">
              <Image
                src="/assets/img/roof-replacement.jpg"
                alt="Valor Roofing LLC architectural shingle replacement project in Arkansas"
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
                Architectural Shingle Replacement & Gutters
              </div>
              <div style={{ fontSize: '13px', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '5px', marginTop: '4px' }}>
                <PinIcon /> Jonesboro & Craighead County, AR
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Details & Action Buttons */}
          <div className="spotlight-card__body">
            <div>
              <div className="pro-card__head">
                <h3 className="pro-card__name" style={{ fontSize: '26px' }}>{valorPro.name}</h3>
                <span className="badge badge--top">Featured Pro</span>
              </div>

              <div className="pro-card__row" style={{ marginTop: '8px' }}>
                <span className="pro-card__rating">
                  <StarRating rating={valorPro.rating} />
                  <span className="num">{valorPro.rating.toFixed(1)}</span>
                  <span className="cnt">({valorPro.reviews} verified reviews)</span>
                </span>
                <span className="pro-card__score">
                  Tradewell Score: <b>{valorPro.tradewellScore || 99}/100</b>
                </span>
                <span className="pro-card__loc">
                  <PinIcon /> {valorPro.city}
                </span>
                <span className="pro-card__respond">{valorPro.responds}</span>
              </div>

              <p className="spotlight-card__story">
                {valorPro.name} was selected for this week&apos;s spotlight following outstanding homeowner reports during the recent severe weather season. From same-day emergency roof inspections and transparent insurance estimates to complete architectural shingle replacements completed within 48 hours, Valor sets the benchmark for Arkansas roofing standards.
              </p>

              <div className="spotlight-card__quote">
                <blockquote>
                  &ldquo;Valor Roofing responded immediately when our roof began leaking after a storm. They gave an honest written quote, worked directly with our insurance adjuster, and completed the full roof in a single day. Flawless work.&rdquo;
                </blockquote>
                <div className="spotlight-card__quote-author">
                  — Marcus T., Jonesboro homeowner (Verified Customer)
                </div>
              </div>
            </div>

            <div className="spotlight-card__actions">
              <a
                className="btn btn--phone"
                href={valorPro.phoneHref || 'tel:+18703168800'}
                aria-label={`Call ${valorPro.name} at (870) 316-8800`}
              >
                <PhoneIcon />
                <span>Call (870) 316-8800</span>
              </a>
              <button
                className="btn btn--primary"
                type="button"
                onClick={() => openContact(valorPro.id)}
              >
                Send Info for Free Estimate
              </button>
              <button
                className="btn btn--outline"
                type="button"
                onClick={() => openProfile(valorPro.id)}
              >
                View Profile
              </button>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
