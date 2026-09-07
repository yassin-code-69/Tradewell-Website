'use client';

import React from 'react';
import { Pro, isTopRated } from '@/data/tradewell';
import { StarRating, PinIcon } from '@/components/ui/Icons';
import { useDirectory } from '@/context/DirectoryContext';

export function ProCard({ pro }: { pro: Pro }) {
  const { openProfile, openContact } = useDirectory();

  const reviewCountLabel =
    pro.reviews != null ? (
      <span className="cnt">({pro.reviews} reviews)</span>
    ) : (
      <span className="cnt">Rating from public profile</span>
    );

  return (
    <article className="pro-card">
      <div className="pro-card__avatar" style={{ backgroundColor: pro.accent }}>
        {pro.initials}
      </div>
      <div>
        <div className="pro-card__head">
          <h3 className="pro-card__name">{pro.name}</h3>
          {isTopRated(pro) && <span className="badge badge--top">Top rated</span>}
        </div>
        <div className="pro-card__row">
          <span className="pro-card__rating">
            <StarRating rating={pro.rating} />
            <span className="num">{pro.rating.toFixed(1)}</span>
            {reviewCountLabel}
          </span>
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
        <button
          className="btn btn--ink btn--sm"
          type="button"
          onClick={() => openProfile(pro.id)}
        >
          View Profile
        </button>
        <button
          className="btn btn--outline btn--sm"
          type="button"
          onClick={() => openContact(pro.id)}
        >
          Contact
        </button>
      </div>
    </article>
  );
}

export function ProTile({ pro }: { pro: Pro }) {
  const { openProfile } = useDirectory();

  return (
    <article className="pro-tile">
      <div className="pro-tile__top">
        <div className="pro-tile__avatar" style={{ backgroundColor: pro.accent }}>
          {pro.initials}
        </div>
        <div>
          <span className="pro-tile__name">{pro.name}</span>
          <span className="pro-tile__cat">{pro.category}</span>
        </div>
      </div>
      <div className="pro-tile__row">
        <StarRating rating={pro.rating} />
        <span className="num">{pro.rating.toFixed(1)}</span>
        <span className="cnt">
          {pro.reviews != null ? `${pro.reviews} reviews` : 'Public rating'}
        </span>
      </div>
      <div className="pro-tile__loc">
        <PinIcon /> {pro.city}
      </div>
      <div className="pro-tile__foot">
        <button
          className="btn btn--outline btn--sm btn--block"
          type="button"
          onClick={() => openProfile(pro.id)}
        >
          View Profile
        </button>
      </div>
    </article>
  );
}
