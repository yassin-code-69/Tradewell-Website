'use client';

import React, { useState } from 'react';
import { CORE_CATEGORIES, PROS } from '@/data/tradewell';
import { ProCard } from '@/components/pros/ProCard';
import { Icon, ArrowIcon } from '@/components/ui/Icons';
import { useDirectory } from '@/context/DirectoryContext';

export function CategoryShowcase() {
  const [activeTab, setActiveTab] = useState<string>('all');
  const { openDirectory, pros } = useDirectory();

  const categoriesToShow =
    activeTab === 'all'
      ? CORE_CATEGORIES
      : CORE_CATEGORIES.filter((c) => c.id === activeTab);

  return (
    <section className="section" id="featured-categories" style={{ paddingTop: '56px', paddingBottom: '76px' }}>
      <div className="wrap">
        {/* Section Header */}
        <div className="section__head flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <div className="section__eyebrow">Featured Arkansas Trades</div>
            <h2 className="section__title">Verified Local Professionals by Category</h2>
            <p className="section__sub">
              Start your next project with trusted Arkansas specialists. Click to call directly or drop your details to receive a free, no-obligation estimate.
            </p>
          </div>
          <button
            className="section__link"
            type="button"
            onClick={() => openDirectory('', '')}
          >
            <span>Search full directory</span>
            <ArrowIcon />
          </button>
        </div>

        {/* Category Tabs */}
        <div className="cat-tabs" style={{ marginBottom: '32px' }} role="tablist" aria-label="Trade Categories">
          <button
            type="button"
            className={`cat-tab ${activeTab === 'all' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('all')}
            role="tab"
            aria-selected={activeTab === 'all'}
          >
            <svg className="ico ico--sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7" rx="1.5" />
              <rect x="14" y="3" width="7" height="7" rx="1.5" />
              <rect x="14" y="14" width="7" height="7" rx="1.5" />
              <rect x="3" y="14" width="7" height="7" rx="1.5" />
            </svg>
            <span>All Categories ({pros.length})</span>
          </button>
          {CORE_CATEGORIES.map((cat) => {
            const count = pros.filter(
              (p) => p.category === cat.name || p.categories.includes(cat.name)
            ).length;
            return (
              <button
                key={cat.id}
                type="button"
                className={`cat-tab ${activeTab === cat.id ? 'is-active' : ''}`}
                onClick={() => setActiveTab(cat.id)}
                role="tab"
                aria-selected={activeTab === cat.id}
              >
                <Icon name={cat.icon} className="ico ico--sm" />
                <span>{cat.name} ({count})</span>
              </button>
            );
          })}
        </div>

        {/* Categories & Pros Showcase */}
        <div className="space-y-16">
          {categoriesToShow.map((cat) => {
            const catPros = pros.filter(
              (p) => p.category === cat.name || p.categories.includes(cat.name)
            );

            return (
              <div key={cat.id} id={`cat-${cat.id}`} className="trade-category-section">
                {/* Authentic Tradewell Section Head */}
                <div className="section__head">
                  <div>
                    <span className="section__eyebrow">{cat.name}</span>
                    <h2 className="section__title" style={{ fontSize: '26px' }}>{cat.name} professionals</h2>
                    <p className="section__sub">{cat.blurb}</p>
                  </div>
                  <button
                    className="section__link"
                    type="button"
                    onClick={() => openDirectory(cat.name, '')}
                  >
                    <span>See all {cat.name.toLowerCase()} pros</span>
                    <ArrowIcon />
                  </button>
                </div>

                {/* Pros Grid in full-width Tradewell pro-grid */}
                <div className="pro-grid">
                  {catPros.map((pro) => (
                    <ProCard key={`${cat.id}-${pro.id}`} pro={pro} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
