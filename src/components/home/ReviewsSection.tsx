'use client';

import React, { useMemo } from 'react';
import { byId, reviewsFor } from '@/data/tradewell';
import { StarRating } from '@/components/ui/Icons';

export function ReviewsSection() {
  const reviews = useMemo(() => {
    const sampleIds = ['freshfield', 'ridgeline', 'kestrel-hvac'];
    return sampleIds
      .map((id) => {
        const pro = byId(id);
        if (!pro) return null;
        const r = reviewsFor(pro)[0];
        return { pro, r };
      })
      .filter((item): item is NonNullable<typeof item> => item !== null);
  }, []);

  return (
    <section className="section home-only" id="reviews">
      <div className="wrap">
        <div className="section__head">
          <div>
            <span className="section__eyebrow">Homeowner reviews</span>
            <h2 className="section__title">What homeowners are saying</h2>
            <p className="section__sub">
              Recent feedback left on professionals listed in the directory.
            </p>
          </div>
        </div>
        <div className="reviews-grid" id="reviewsGrid">
          {reviews.map(({ pro, r }) => (
            <article key={pro.id} className="review-card">
              <StarRating rating={r.stars} />
              <p className="review-card__quote">&ldquo;{r.text}&rdquo;</p>
              <div className="review-card__foot">
                <span className="review-card__avatar">{r.name.charAt(0)}</span>
                <span>
                  <span className="review-card__who">{r.name}</span>
                  <span className="review-card__what">
                    {r.service} · {pro.name} · {r.date}
                  </span>
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
