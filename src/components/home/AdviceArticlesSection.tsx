'use client';

import React from 'react';
import Image from 'next/image';
import { ARTICLES } from '@/data/tradewell';
import { useDirectory } from '@/context/DirectoryContext';

export function AdviceArticlesSection() {
  const { handleQuickSearch } = useDirectory();

  return (
    <section className="section section--surface home-only" id="advice">
      <div className="wrap">
        <div className="section__head">
          <div>
            <span className="section__eyebrow">Resources</span>
            <h2 className="section__title">Helpful home service content</h2>
            <p className="section__sub">
              Cost guides and practical advice to help you plan a project before you start calling around.
            </p>
          </div>
        </div>
        <div className="article-grid" id="articleGrid">
          {ARTICLES.map((a) => (
            <button
              key={a.title}
              className="article-card"
              type="button"
              onClick={() => handleQuickSearch(a.topic)}
            >
              <span className="article-card__media">
                <Image
                  src={a.img}
                  alt=""
                  width={1200}
                  height={900}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </span>
              <span className="article-card__body">
                <span className="article-card__tag">{a.tag}</span>
                <span className="article-card__title">{a.title}</span>
                <span className="article-card__text">{a.blurb}</span>
                <span className="article-card__read">{a.read}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
