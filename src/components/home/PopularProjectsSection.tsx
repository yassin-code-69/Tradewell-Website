'use client';

import React from 'react';
import Image from 'next/image';
import { PROJECTS } from '@/data/tradewell';
import { useDirectory } from '@/context/DirectoryContext';

export function PopularProjectsSection() {
  const { handleQuickSearch } = useDirectory();

  return (
    <section className="section section--surface home-only" id="projects">
      <div className="wrap">
        <div className="section__head">
          <div>
            <span className="section__eyebrow">Browse by project</span>
            <h2 className="section__title">Popular home projects</h2>
            <p className="section__sub">
              Bigger jobs homeowners plan for, with typical cost ranges and how long they usually take.
            </p>
          </div>
        </div>

        <div className="project-grid" id="projectGrid">
          {PROJECTS.map((p) => (
            <button
              key={p.name}
              className="project-card"
              type="button"
              onClick={() => handleQuickSearch(p.name)}
            >
              <Image
                src={p.img}
                alt={p.label || p.name}
                width={1200}
                height={900}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <span className="project-card__veil" />
              <span className="project-card__body">
                <span className="project-card__name">{p.label || p.name}</span>
                <span className="project-card__meta">
                  <span>{p.cost}</span>
                  <span>{p.span}</span>
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
