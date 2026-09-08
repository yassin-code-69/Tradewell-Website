'use client';

import React from 'react';
import Image from 'next/image';
import { Pro, isTopRated } from '@/data/tradewell';
import { StarRating, PinIcon, PhoneIcon } from '@/components/ui/Icons';
import { useDirectory } from '@/context/DirectoryContext';

export function ProCard({ pro }: { pro: Pro }) {
  const { openProfile, openContact } = useDirectory();
  const isValor = pro.id.startsWith('valor-roofing') || !!pro.phoneHref;

  const reviewCountLabel =
    pro.reviews != null ? (
      <span className="cnt">({pro.reviews} reviews)</span>
    ) : (
      <span className="cnt">Rating from verified clients</span>
    );

  return (
    <article className={`pro-card ${isValor ? 'pro-card--featured' : ''}`}>
      {pro.logo || isValor ? (
        <div className="pro-card__avatar relative overflow-hidden bg-[#F4EFEA] border border-[var(--line)] p-1 shadow-2xs">
          <Image
            src={pro.logo || '/assets/img/valor-roofing-logo.png'}
            alt={pro.name}
            fill
            className="object-contain p-1"
            sizes="72px"
          />
        </div>
      ) : (
        <div className="pro-card__avatar" style={{ backgroundColor: pro.accent }}>
          {pro.initials}
        </div>
      )}
      <div>
        <div className="pro-card__head">
          <h3 className="pro-card__name">{pro.name}</h3>
          {isValor && <span className="badge badge--top">Featured Pro</span>}
          {isTopRated(pro) && !isValor && <span className="badge badge--top">Top rated</span>}
        </div>
        <div className="pro-card__row">
          <span className="pro-card__rating">
            <StarRating rating={pro.rating} />
            <span className="num">{pro.rating.toFixed(1)}</span>
            {reviewCountLabel}
          </span>
          {pro.tradewellScore && (
            <span className="pro-card__score">
              Tradewell Score: <b>{pro.tradewellScore}</b>
            </span>
          )}
          <span className="pro-card__loc">
            <PinIcon /> {pro.city}
          </span>
        </div>
        <p className="pro-card__blurb">{pro.blurb}</p>
        <div className="pro-card__tags">
          {pro.services.map((s) => (
            <span key={s} className="tag">
              {s}
            </span>
          ))}
        </div>
      </div>
      <div className="pro-card__actions">
        <span className="pro-card__respond">{pro.responds}</span>
        {isValor ? (
          <>
            <a
              className="btn btn--phone btn--sm"
              href={pro.phoneHref || 'tel:+18703168800'}
              aria-label={`Call ${pro.name} at (870) 316-8800`}
            >
              <PhoneIcon />
              <span>Call (870) 316-8800</span>
            </a>
            <button
              className="btn btn--primary btn--sm"
              type="button"
              onClick={() => openContact(pro.id)}
            >
              Send Info
            </button>
            <button
              className="btn btn--outline btn--sm"
              type="button"
              onClick={() => openProfile(pro.id)}
            >
              View Profile
            </button>
          </>
        ) : (
          <>
            <button
              className="btn btn--primary btn--sm"
              type="button"
              onClick={() => openContact(pro.id)}
            >
              Drop Info to Contact
            </button>
            <button
              className="btn btn--outline btn--sm"
              type="button"
              onClick={() => openProfile(pro.id)}
            >
              View Profile
            </button>
          </>
        )}
      </div>
    </article>
  );
}

export function ProTile({ pro }: { pro: Pro }) {
  const { openProfile, openContact } = useDirectory();
  const isValor = pro.id.startsWith('valor-roofing') || !!pro.phoneHref;

  return (
    <article className={`pro-tile ${isValor ? 'pro-tile--featured' : ''}`}>
      <div className="pro-tile__top">
        <div className="pro-tile__avatar" style={{ backgroundColor: pro.accent }}>
          {pro.initials}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="pro-tile__name">{pro.name}</span>
            {isValor && (
              <span className="badge badge--top" style={{ fontSize: '10px', padding: '2px 7px' }}>
                Featured
              </span>
            )}
          </div>
          <span className="pro-tile__cat">{pro.category}</span>
        </div>
      </div>
      <div className="pro-tile__row">
        <StarRating rating={pro.rating} />
        <span className="num">{pro.rating.toFixed(1)}</span>
        <span className="cnt">
          {pro.reviews != null ? `${pro.reviews} reviews` : 'Verified'}
        </span>
      </div>
      <div className="pro-tile__loc">
        <PinIcon /> {pro.city}
      </div>
      <div className="pro-tile__foot">
        {isValor ? (
          <div className="flex flex-col gap-2 w-full">
            <a
              className="btn btn--phone btn--sm btn--block"
              href={pro.phoneHref || 'tel:+18703168800'}
              aria-label={`Call ${pro.name}`}
            >
              <PhoneIcon />
              <span>Call (870) 316-8800</span>
            </a>
            <div className="grid grid-cols-2 gap-2">
              <button
                className="btn btn--primary btn--sm"
                type="button"
                onClick={() => openContact(pro.id)}
              >
                Send Info
              </button>
              <button
                className="btn btn--outline btn--sm"
                type="button"
                onClick={() => openProfile(pro.id)}
              >
                Profile
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2 w-full">
            <button
              className="btn btn--primary btn--sm"
              type="button"
              onClick={() => openContact(pro.id)}
            >
              Drop Info
            </button>
            <button
              className="btn btn--outline btn--sm"
              type="button"
              onClick={() => openProfile(pro.id)}
            >
              Profile
            </button>
          </div>
        )}
      </div>
    </article>
  );
}
