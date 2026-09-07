'use client';

import React from 'react';
import Image from 'next/image';
import { SERVICES, CATEGORIES } from '@/data/tradewell';
import { Icon, ArrowIcon } from '@/components/ui/Icons';
import { useDirectory } from '@/context/DirectoryContext';

export function PopularServicesSection() {
  const { handleQuickSearch, closeDirectory } = useDirectory();

  return (
    <section className="section home-only" id="services">
      <div className="wrap">
        <div className="section__head">
          <div>
            <span className="section__eyebrow">Browse by service</span>
            <h2 className="section__title">Popular home services</h2>
            <p className="section__sub">
              The trades homeowners in Arkansas book most often, with typical local price ranges to help you budget before you call.
            </p>
          </div>
          <a
            className="section__link"
            href="#categories"
            onClick={() => closeDirectory()}
          >
            <span>See all {CATEGORIES.length} categories</span>
            <ArrowIcon />
          </a>
        </div>

        <div className="service-grid" id="serviceGrid">
          {SERVICES.map((s) => (
            <button
              key={s.name}
              className="service-card"
              type="button"
              onClick={() => handleQuickSearch(s.maps || s.name)}
            >
              <span className="service-card__media">
                <Image
                  src={s.img}
                  alt={s.name}
                  width={1200}
                  height={900}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </span>
              <span className="service-card__body">
                <span className="service-card__icon">
                  <Icon name={s.icon} />
                </span>
                <span className="service-card__title">{s.name}</span>
                <span className="service-card__text">{s.blurb}</span>
                <span className="service-card__foot">
                  <span className="service-card__cost">{s.cost}</span>
                  <span className="service-card__cta">
                    Find pros <ArrowIcon />
                  </span>
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
