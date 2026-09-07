import React from 'react';
import { STEPS } from '@/data/tradewell';

export function HowItWorksSection() {
  return (
    <section className="section section--surface home-only" id="how">
      <div className="wrap">
        <div className="section__head">
          <div>
            <span className="section__eyebrow">How it works</span>
            <h2 className="section__title">From search to scheduled in three steps</h2>
          </div>
        </div>
        <div className="steps" id="stepsGrid">
          {STEPS.map((s) => (
            <div key={s.n} className="step">
              <div className="step__n">{s.n}</div>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
