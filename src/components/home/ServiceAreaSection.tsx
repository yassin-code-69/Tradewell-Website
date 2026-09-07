'use client';

import React from 'react';
import Image from 'next/image';
import { CITIES } from '@/data/tradewell';
import { useDirectory } from '@/context/DirectoryContext';

export function ServiceAreaSection() {
  const { handleCityClick } = useDirectory();

  return (
    <section className="section home-only" id="service-area">
      <div className="wrap area">
        <div>
          <span className="section__eyebrow">Coverage</span>
          <h2 className="section__title">Where the directory covers</h2>
          <p className="section__sub">
            Professionals are listed across Northeast and Central Arkansas. Pick a city to see who works there.
          </p>
          <div className="area__list" id="cityList">
            {CITIES.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => handleCityClick(c)}
              >
                {c}, AR
              </button>
            ))}
          </div>
        </div>
        <div className="area__media">
          <Image
            src="/assets/img/service-area.svg"
            alt="Stylized coverage map of Northeast and Central Arkansas"
            width={720}
            height={620}
            className="w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
}
