'use client';

import React from 'react';
import { useDirectory } from '@/context/DirectoryContext';

export function JoinBand() {
  const { openJoin, closeDirectory } = useDirectory();

  return (
    <section className="join-band home-only" id="join">
      <div className="wrap join-band__inner">
        <div>
          <h2>Run a home service business?</h2>
          <p>
            List your company in the Tradewell directory, set the categories and cities you cover, and start receiving estimate requests from homeowners nearby.
          </p>
        </div>
        <div className="join-band__actions">
          <button
            className="btn btn--primary btn--lg"
            id="joinBtn"
            type="button"
            onClick={openJoin}
          >
            Join the Directory
          </button>
          <a
            className="btn btn--outline btn--lg"
            href="#how"
            onClick={() => closeDirectory()}
          >
            How it works
          </a>
        </div>
      </div>
    </section>
  );
}
