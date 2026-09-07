'use client';

import React from 'react';
import Image from 'next/image';
import {
  byId,
  galleryFor,
  reviewsFor,
  isTopRated
} from '@/data/tradewell';
import {
  Icon,
  StarRating,
  PhoneIcon,
  XMarkIcon
} from '@/components/ui/Icons';
import { useDirectory } from '@/context/DirectoryContext';

export function ProfileModal() {
  const { activeProId, closeModal, openEstimate, openContact } = useDirectory();

  if (!activeProId) return null;
  const pro = byId(activeProId);
  if (!pro) return null;

  const gallery = galleryFor(pro);
  const reviews = reviewsFor(pro);

  return (
    <>
      <div className="modal__head">
        <div className="profile__hero" style={{ flex: 1 }}>
          <div
            className="profile__logo"
            style={{ backgroundColor: pro.accent }}
          >
            {pro.initials}
          </div>
          <div>
            <h3 className="profile__name" id="modalTitle">
              {pro.name}
            </h3>
            <div className="profile__meta">
              <StarRating rating={pro.rating} />
              <strong>{pro.rating.toFixed(1)}</strong>
              <span style={{ color: 'var(--muted)', fontSize: '14px' }}>
                {pro.reviews != null
                  ? `${pro.reviews} reviews`
                  : 'Rating from public profile'}
              </span>
              {isTopRated(pro) && (
                <span className="badge badge--top">Top rated</span>
              )}
            </div>
          </div>
        </div>
        <button
          className="modal__close"
          aria-label="Close"
          type="button"
          onClick={closeModal}
        >
          <XMarkIcon />
        </button>
      </div>

      <div className="modal__body">
        {pro.demo && (
          <div className="notice">
            <Icon name="shield" />
            <span>
              <strong>Demo profile.</strong> A fictional business created to populate this prototype directory. It does not represent a real company.
            </span>
          </div>
        )}

        <div className="profile__stats">
          <div className="profile__stat">
            <div className="l">Category</div>
            <span className="v">{pro.category}</span>
          </div>
          <div className="profile__stat">
            <div className="l">Service area</div>
            <span className="v" style={{ fontSize: '14px' }}>
              {pro.area}
            </span>
          </div>
          <div className="profile__stat">
            <div className="l">Response time</div>
            <span className="v" style={{ fontSize: '14px' }}>
              {pro.responds}
            </span>
          </div>
        </div>

        <div className="profile__section">
          <h4>About {pro.name}</h4>
          <p>{pro.about}</p>
        </div>

        <div className="profile__section">
          <h4>Services offered</h4>
          <div className="pro-card__tags">
            {pro.services.map((s) => (
              <span key={s} className="tag">
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className="profile__section">
          <h4>Listed under</h4>
          <div className="pro-card__tags">
            {pro.categories.map((c) => (
              <span key={c} className="tag">
                {c}
              </span>
            ))}
          </div>
        </div>

        <div className="profile__section">
          <h4>Project gallery</h4>
          <div className="profile__gallery">
            {gallery.map((g, idx) => (
              <Image
                key={idx}
                src={g}
                alt={`${pro.category} project`}
                width={1200}
                height={900}
                className="w-full h-auto object-cover rounded-xl"
                loading="lazy"
              />
            ))}
          </div>
        </div>

        <div className="profile__section">
          <h4>Service area</h4>
          <div className="pro-card__tags">
            {pro.covers.slice(0, 8).map((c) => (
              <span key={c} className="tag">
                {c}
              </span>
            ))}
          </div>
        </div>

        <div className="profile__section">
          <h4>Customer reviews</h4>
          {pro.ratingOnly ? (
            <div className="notice notice--plain">
              <Icon name="clipboard" />
              <span>
                This listing shows an overall rating of{' '}
                <strong>{pro.rating.toFixed(1)}</strong> imported from the business&apos;s public profile. Individual reviews are not syndicated to this directory.
              </span>
            </div>
          ) : (
            reviews.map((r, idx) => (
              <div key={idx} className="review-item">
                <div className="review-item__top">
                  <StarRating rating={r.stars} />
                  <span className="review-item__name">{r.name}</span>
                  <span className="review-item__date">{r.date}</span>
                </div>
                <p className="review-item__text">&ldquo;{r.text}&rdquo;</p>
                <span className="review-item__svc">{r.service}</span>
              </div>
            ))
          )}
        </div>

        <div className="profile__section">
          <h4>Contact</h4>
          <div className="profile__contact">
            {pro.phone ? (
              <a className="profile__phone" href={pro.phoneHref || `tel:${pro.phone}`}>
                <PhoneIcon /> {pro.phone}
              </a>
            ) : (
              <span className="profile__phone" style={{ color: 'var(--muted-2)' }}>
                <PhoneIcon /> Contact through the directory
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="modal__foot">
        <button
          className="btn btn--primary"
          type="button"
          onClick={() => openEstimate(pro.id)}
        >
          Request an Estimate
        </button>
        <button
          className="btn btn--outline"
          type="button"
          onClick={() => openContact(pro.id)}
        >
          Contact
        </button>
        <button
          className="btn btn--ghost"
          type="button"
          onClick={closeModal}
        >
          Close
        </button>
      </div>
    </>
  );
}
