'use client';

import React, { useState } from 'react';
import { CATEGORIES, CITIES, PROS, displayTerm } from '@/data/tradewell';
import { ProCard } from '@/components/pros/ProCard';
import { XMarkIcon } from '@/components/ui/Icons';
import { useDirectory, SortOption } from '@/context/DirectoryContext';

export function DirectoryView() {
  const {
    isDirectoryOpen,
    closeDirectory,
    term,
    setTerm,
    city,
    setCity,
    category,
    setCategory,
    minRating,
    setMinRating,
    fast,
    setFast,
    sort,
    setSort,
    resetFilters,
    clearFilter,
    results
  } = useDirectory();

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  if (!isDirectoryOpen) return null;

  const shown = displayTerm(term);
  const label = shown || 'All professionals';
  const cityLabel = city ? `${city}, AR` : 'Arkansas';

  const activeChips: { key: 'category' | 'city' | 'rating' | 'fast'; label: string }[] = [];
  if (category) activeChips.push({ key: 'category', label: category });
  if (city) activeChips.push({ key: 'city', label: `${city}, AR` });
  if (minRating > 0) activeChips.push({ key: 'rating', label: `${minRating.toFixed(1)}+ stars` });
  if (fast) activeChips.push({ key: 'fast', label: 'Fast responder' });

  return (
    <section className="directory is-open" id="directory" aria-live="polite">
      <div className="wrap">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <button type="button" id="backHome" onClick={closeDirectory}>
            Home
          </button>
          <span aria-hidden="true">/</span>
          <span id="crumbCurrent">{label}</span>
        </nav>

        <div className="directory__head">
          <h1 id="dirTitle">{shown ? `${shown} professionals` : 'All professionals'}</h1>
          <p id="dirSub">
            {cityLabel} · {results.length} {results.length === 1 ? 'listing' : 'listings'}
          </p>
        </div>

        <div className="directory__layout">
          {/* Filters Sidebar */}
          <aside
            className={`filters ${mobileFiltersOpen ? 'is-open' : ''}`}
            id="filters"
            aria-label="Filter results"
          >
            <div className="filters__head">
              <h2>Filters</h2>
              <button
                className="filters__reset"
                type="button"
                id="resetFilters"
                onClick={resetFilters}
              >
                Reset
              </button>
            </div>

            <div className="filter-group">
              <h3>Service category</h3>
              <label className="sr-only" htmlFor="filterCategory">
                Service category
              </label>
              <select
                className="select"
                id="filterCategory"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">All categories</option>
                {CATEGORIES.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <h3>Location</h3>
              <label className="sr-only" htmlFor="filterLocation">
                Location
              </label>
              <select
                className="select"
                id="filterLocation"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              >
                <option value="">All locations</option>
                {CITIES.map((c) => (
                  <option key={c} value={c}>
                    {c}, AR
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <h3>Rating</h3>
              <div id="filterRating">
                {[
                  { v: 4.0, l: '4.0+ stars' },
                  { v: 4.5, l: '4.5+ stars' },
                  { v: 5.0, l: '5.0 stars' }
                ].map((o) => (
                  <label key={o.v} className="filter-opt">
                    <input
                      type="checkbox"
                      className="rating-opt"
                      value={o.v}
                      checked={minRating === o.v}
                      onChange={(e) => {
                        setMinRating(e.target.checked ? o.v : 0);
                      }}
                    />
                    <span>{o.l}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <h3>Availability</h3>
              <label className="filter-opt">
                <input
                  type="checkbox"
                  id="filterFast"
                  checked={fast}
                  onChange={(e) => setFast(e.target.checked)}
                />
                <span>Responds within a few hours</span>
              </label>
            </div>
          </aside>

          {/* Results Column */}
          <div>
            <div className="results__bar">
              <p className="results__count" id="resultsCount">
                Showing <b>{results.length}</b> of {PROS.length} listed professionals
              </p>
              <div className="results__sort">
                <button
                  className="btn btn--outline btn--sm filters-toggle"
                  id="filtersToggle"
                  type="button"
                  onClick={() => setMobileFiltersOpen((prev) => !prev)}
                >
                  <svg className="ico ico--sm" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M4 6h16M7 12h10M10 18h4" />
                  </svg>
                  Filters
                </button>
                <label htmlFor="sortSelect">Sort</label>
                <select
                  className="select"
                  id="sortSelect"
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortOption)}
                >
                  <option value="recommended">Recommended</option>
                  <option value="rating">Highest rated</option>
                  <option value="reviews">Most reviewed</option>
                  <option value="name">Name (A–Z)</option>
                </select>
              </div>
            </div>

            {/* Active filters */}
            {activeChips.length > 0 && (
              <div className="active-filters" id="activeFilters">
                {activeChips.map((c) => (
                  <button
                    key={c.key}
                    className="chip"
                    type="button"
                    onClick={() => clearFilter(c.key)}
                  >
                    <span>{c.label}</span>
                    <XMarkIcon />
                  </button>
                ))}
              </div>
            )}

            {/* Pro grid or Empty state */}
            {results.length > 0 ? (
              <div className="pro-grid" id="resultsList">
                {results.map(({ pro }) => (
                  <ProCard key={pro.id} pro={pro} />
                ))}
              </div>
            ) : (
              <div className="results__empty">
                <h3>No professionals matched this search</h3>
                <p>Try a broader service term, widen the location, or clear the filters.</p>
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button
                    className="btn btn--primary"
                    id="emptyReset"
                    type="button"
                    onClick={resetFilters}
                  >
                    Clear filters
                  </button>
                  <button
                    className="btn btn--outline"
                    type="button"
                    onClick={() => {
                      setTerm('');
                      resetFilters();
                    }}
                  >
                    Browse all pros
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
