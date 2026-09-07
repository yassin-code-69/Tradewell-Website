'use client';

import React, { useMemo } from 'react';
import { PROS } from '@/data/tradewell';
import { ProTile } from '@/components/pros/ProCard';

export function RecommendedProsSection() {
  const recommendedPros = useMemo(() => {
    const seen: Record<string, boolean> = {};
    return [...PROS]
      .sort((a, b) => b.rating - a.rating || (b.reviews || 0) - (a.reviews || 0))
      .filter((p) => {
        if (seen[p.category]) return false;
        seen[p.category] = true;
        return true;
      })
      .slice(0, 8);
  }, []);

  return (
    <section className="section section--surface home-only" id="recommended">
      <div className="wrap">
        <div className="section__head">
          <div>
            <span className="section__eyebrow">Highly rated near you</span>
            <h2 className="section__title">Recommended professionals</h2>
            <p className="section__sub">
              Well-reviewed pros across a range of trades, based on ratings and review volume in the directory.
            </p>
          </div>
        </div>
        <div className="pro-grid pro-grid--4" id="recommendedGrid">
          {recommendedPros.map((pro) => (
            <ProTile key={pro.id} pro={pro} />
          ))}
        </div>
      </div>
    </section>
  );
}
