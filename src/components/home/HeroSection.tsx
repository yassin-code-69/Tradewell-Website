'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { CATEGORIES, PROS, CITIES, STATS, norm } from '@/data/tradewell';
import { Icon } from '@/components/ui/Icons';
import { useDirectory } from '@/context/DirectoryContext';

interface Suggestion {
  name: string;
  icon: string;
  meta: string;
}

export function HeroSection() {
  const { openDirectory, handleQuickSearch } = useDirectory();

  const [serviceQuery, setServiceQuery] = useState('');
  const [cityQuery, setCityQuery] = useState('');
  const [isSuggestOpen, setIsSuggestOpen] = useState(false);
  const [sugIndex, setSugIndex] = useState(-1);

  const suggestRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Suggestions computation
  const suggestions: Suggestion[] = React.useMemo(() => {
    const n = norm(serviceQuery);
    if (!n) {
      return CATEGORIES.slice(0, 8).map((c) => ({
        name: c.name,
        icon: c.icon,
        meta: `${c.pros} pros`
      }));
    }
    const cats = CATEGORIES.filter((c) => norm(c.name).includes(n))
      .sort((a, b) => norm(a.name).indexOf(n) - norm(b.name).indexOf(n))
      .slice(0, 6)
      .map((c) => ({ name: c.name, icon: c.icon, meta: `${c.pros} pros` }));

    const pros = PROS.filter((p) => norm(p.name).includes(n))
      .slice(0, 3)
      .map((p) => ({ name: p.name, icon: 'shield', meta: p.category }));

    return [...cats, ...pros];
  }, [serviceQuery]);

  // Click outside to close suggestion popup
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        suggestRef.current &&
        !suggestRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setIsSuggestOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleSelectSuggestion = (sug: Suggestion) => {
    setServiceQuery(sug.name);
    setIsSuggestOpen(false);
    openDirectory(sug.name, cityQuery.split(',')[0].trim());
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!isSuggestOpen) setIsSuggestOpen(true);
      setSugIndex((prev) => (prev + 1) % suggestions.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSugIndex((prev) => (prev - 1 + suggestions.length) % suggestions.length);
    } else if (e.key === 'Enter') {
      if (sugIndex >= 0 && sugIndex < suggestions.length) {
        e.preventDefault();
        handleSelectSuggestion(suggestions[sugIndex]);
      }
    } else if (e.key === 'Escape') {
      setIsSuggestOpen(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuggestOpen(false);
    openDirectory(serviceQuery.trim(), cityQuery.split(',')[0].trim());
  };

  const renderHighlight = (text: string, q: string) => {
    const n = norm(q);
    const i = norm(text).indexOf(n);
    if (!n || i === -1) return text;
    return (
      <>
        {text.slice(0, i)}
        <mark>{text.slice(i, i + n.length)}</mark>
        {text.slice(i + n.length)}
      </>
    );
  };

  return (
    <section className="hero home-only">
      <div className="wrap hero__grid">
        <div className="hero__copy">
          <span className="hero__badge">
            <span className="pill-dot">
              <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z" />
              </svg>
            </span>
            <span><b>14+</b> verified local pros across 5 core trade categories</span>
          </span>

          <h1>Find the right professional for your next project</h1>
          <p className="hero__lead">
            Connect with vetted Arkansas contractors for Roofing, Home Repairs, Commercial HVAC,
            Electrical, and Lawn & Garden. Compare ratings, click to call directly, or drop your info
            for a fast, free estimate.
          </p>

          <form className="searchbox" id="searchForm" role="search" autoComplete="off" onSubmit={handleSearchSubmit}>
            <div className="search-field">
              <svg className="ico" viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
              <div className="search-field__body">
                <label htmlFor="serviceInput">What service do you need?</label>
                <input
                  id="serviceInput"
                  ref={inputRef}
                  name="service"
                  type="text"
                  placeholder="Roofing, plumbing, HVAC…"
                  aria-autocomplete="list"
                  aria-controls="suggest"
                  aria-expanded={isSuggestOpen}
                  value={serviceQuery}
                  onChange={(e) => {
                    setServiceQuery(e.target.value);
                    setIsSuggestOpen(true);
                  }}
                  onFocus={() => setIsSuggestOpen(true)}
                  onKeyDown={handleKeyDown}
                />
              </div>

              {/* Suggestions dropdown */}
              <div
                className={`suggest ${isSuggestOpen ? 'is-open' : ''}`}
                id="suggest"
                ref={suggestRef}
                role="listbox"
                aria-label="Service suggestions"
              >
                {suggestions.length > 0 ? (
                  suggestions.map((s, idx) => (
                    <button
                      key={`${s.name}-${idx}`}
                      className={`suggest__item ${idx === sugIndex ? 'is-active' : ''}`}
                      type="button"
                      role="option"
                      aria-selected={idx === sugIndex}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        handleSelectSuggestion(s);
                      }}
                    >
                      <Icon name={s.icon} />
                      <span>{renderHighlight(s.name, serviceQuery)}</span>
                      <span className="suggest__meta">{s.meta}</span>
                    </button>
                  ))
                ) : (
                  <p className="suggest__empty">
                    No category matches &ldquo;{serviceQuery}&rdquo;. Press Enter to search anyway.
                  </p>
                )}
              </div>
            </div>

            <div className="search-field">
              <svg className="ico" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11z" />
                <circle cx="12" cy="10" r="2.6" />
              </svg>
              <div className="search-field__body">
                <label htmlFor="zipInput">Where?</label>
                <input
                  id="zipInput"
                  name="zip"
                  type="text"
                  placeholder="City in AR"
                  list="cityOptions"
                  value={cityQuery}
                  onChange={(e) => setCityQuery(e.target.value)}
                />
                <datalist id="cityOptions">
                  {CITIES.map((c) => (
                    <option key={c} value={`${c}, AR`} />
                  ))}
                </datalist>
              </div>
            </div>

            <button className="btn btn--primary btn--lg" type="submit">
              <svg className="ico" viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
              Search
            </button>
          </form>

          <div className="chips">
            <span className="chips__label">Popular Trades:</span>
            {['Roofing', 'Home repairs', 'HVAC (Commercial)', 'Electrical', 'Lawn/Garden'].map((trade) => (
              <button
                key={trade}
                className="chip"
                type="button"
                onClick={() => handleQuickSearch(trade)}
              >
                {trade}
              </button>
            ))}
          </div>
        </div>

        <div className="hero__media">
          <Image
            src="/assets/img/hero.jpg"
            alt="Suburban family home lit at dusk"
            width={1600}
            height={1100}
            priority
            className="w-full h-auto rounded-3xl"
          />
        </div>
      </div>

      <div className="stats">
        <div className="wrap">
          <div className="stats__grid" id="statsGrid">
            {STATS.map((s) => (
              <div key={s.label} className="stats__item">
                <div className="stats__value">{s.value}</div>
                <div className="stats__label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
