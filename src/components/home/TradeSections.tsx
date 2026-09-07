'use client';

import React from 'react';
import { rankedFor } from '@/data/tradewell';
import { ProCard, ProTile } from '@/components/pros/ProCard';
import { ArrowIcon } from '@/components/ui/Icons';
import { useDirectory } from '@/context/DirectoryContext';

export function TradeSections() {
  const { handleQuickSearch } = useDirectory();

  const roofingPros = rankedFor('Roofing', 5);
  const plumbingPros = rankedFor('Plumbing', 4);
  const hvacPros = rankedFor('HVAC', 4);
  const electricalPros = rankedFor('Electrical', 4);
  const landscapingPros = rankedFor('Landscaping', 4);
  const cleaningPros = rankedFor('House Cleaning', 4);

  return (
    <>
      {/* Roofing Pros */}
      <section className="section home-only" id="roofing-pros">
        <div className="wrap">
          <div className="section__head">
            <div>
              <span className="section__eyebrow">Roofing</span>
              <h2 className="section__title">Roofing professionals</h2>
              <p className="section__sub">
                Roofers covering Northeast and Central Arkansas, ordered by our recommendation score.
              </p>
            </div>
            <button
              className="section__link"
              type="button"
              onClick={() => handleQuickSearch('Roofing')}
            >
              <span>See all roofers</span>
              <ArrowIcon />
            </button>
          </div>
          <div className="pro-grid" id="roofingList">
            {roofingPros.map((pro) => (
              <ProCard key={pro.id} pro={pro} />
            ))}
          </div>
        </div>
      </section>

      {/* Plumbing Pros */}
      <section className="section section--surface home-only" id="plumbing-pros">
        <div className="wrap">
          <div className="section__head">
            <div>
              <span className="section__eyebrow">Plumbing</span>
              <h2 className="section__title">Top plumbing professionals</h2>
              <p className="section__sub">
                Plumbing crews handling leaks, drains, water heaters and repipes.
              </p>
            </div>
            <button
              className="section__link"
              type="button"
              onClick={() => handleQuickSearch('Plumbing')}
            >
              <span>See all plumbers</span>
              <ArrowIcon />
            </button>
          </div>
          <div className="pro-grid" id="plumbingList">
            {plumbingPros.map((pro) => (
              <ProCard key={pro.id} pro={pro} />
            ))}
          </div>
        </div>
      </section>

      {/* More Trades */}
      <section className="section home-only" id="more-trades">
        <div className="wrap">
          <div className="section__head">
            <div>
              <span className="section__eyebrow">More trades</span>
              <h2 className="section__title">Top pros by category</h2>
              <p className="section__sub">
                A sample of well-rated professionals in four more of the directory&apos;s busiest categories.
              </p>
            </div>
          </div>

          <h3 className="section__title" style={{ fontSize: '21px', marginBottom: '16px' }}>
            Top HVAC professionals
          </h3>
          <div className="pro-grid pro-grid--4" id="hvacList" style={{ marginBottom: '42px' }}>
            {hvacPros.map((pro) => (
              <ProTile key={pro.id} pro={pro} />
            ))}
          </div>

          <h3 className="section__title" style={{ fontSize: '21px', marginBottom: '16px' }}>
            Top electrical professionals
          </h3>
          <div className="pro-grid pro-grid--4" id="electricalList" style={{ marginBottom: '42px' }}>
            {electricalPros.map((pro) => (
              <ProTile key={pro.id} pro={pro} />
            ))}
          </div>

          <h3 className="section__title" style={{ fontSize: '21px', marginBottom: '16px' }}>
            Top landscaping professionals
          </h3>
          <div className="pro-grid pro-grid--4" id="landscapingList" style={{ marginBottom: '42px' }}>
            {landscapingPros.map((pro) => (
              <ProTile key={pro.id} pro={pro} />
            ))}
          </div>

          <h3 className="section__title" style={{ fontSize: '21px', marginBottom: '16px' }}>
            Top home cleaning professionals
          </h3>
          <div className="pro-grid pro-grid--4" id="cleaningList">
            {cleaningPros.map((pro) => (
              <ProTile key={pro.id} pro={pro} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
