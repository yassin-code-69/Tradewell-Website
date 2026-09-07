'use client';

import React, { useState } from 'react';
import { CATEGORIES } from '@/data/tradewell';
import { Icon } from '@/components/ui/Icons';
import { useDirectory } from '@/context/DirectoryContext';

export function CategoriesSection() {
  const { handleQuickSearch } = useDirectory();
  const [activeGroup, setActiveGroup] = useState<string>('All');

  const groups = ['All', ...Array.from(new Set(CATEGORIES.map((c) => c.group)))];

  const filteredCategories =
    activeGroup === 'All'
      ? CATEGORIES
      : CATEGORIES.filter((c) => c.group === activeGroup);

  return (
    <section className="section home-only" id="categories">
      <div className="wrap">
        <div className="section__head">
          <div>
            <span className="section__eyebrow">Full directory</span>
            <h2 className="section__title">Browse service categories</h2>
            <p className="section__sub">
              {CATEGORIES.length} categories across roofing and exteriors, home systems, remodeling, outdoor work and home care.
            </p>
          </div>
        </div>

        <div className="cat-tabs" id="catTabs" role="group" aria-label="Filter categories by group">
          {groups.map((g) => (
            <button
              key={g}
              className={`cat-tab ${g === activeGroup ? 'is-active' : ''}`}
              aria-pressed={g === activeGroup}
              type="button"
              onClick={() => setActiveGroup(g)}
            >
              {g}
              {g === 'All' ? ` (${CATEGORIES.length})` : ''}
            </button>
          ))}
        </div>

        <div className="cat-grid" id="catGrid">
          {filteredCategories.map((c) => (
            <button
              key={c.name}
              className="cat-tile"
              type="button"
              onClick={() => handleQuickSearch(c.name)}
            >
              <span className="cat-tile__icon">
                <Icon name={c.icon} />
              </span>
              <span className="cat-tile__body">
                <span className="cat-tile__name">{c.name}</span>
                <span className="cat-tile__count">{c.pros} pros listed</span>
              </span>
            </button>
          ))}
        </div>

        <p className="cat-note" id="catNote">
          Showing {filteredCategories.length} of {CATEGORIES.length} categories. Listed pro counts are prototype figures.
        </p>
      </div>
    </section>
  );
}
