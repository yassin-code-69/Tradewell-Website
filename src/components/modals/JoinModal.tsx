'use client';

import React from 'react';
import { SITE } from '@/data/tradewell';
import { Icon, XMarkIcon } from '@/components/ui/Icons';
import { useDirectory } from '@/context/DirectoryContext';

export function JoinModal() {
  const { closeModal } = useDirectory();

  return (
    <>
      <div className="modal__head">
        <div>
          <h3 id="modalTitle">Join the {SITE.name} directory</h3>
          <p>Tell us about your business and we&apos;ll get your listing set up.</p>
        </div>
        <button className="modal__close" type="button" onClick={closeModal} aria-label="Close">
          <XMarkIcon />
        </button>
      </div>

      <div className="modal__body">
        <div className="notice">
          <Icon name="shield" />
          <span>
            <strong>Prototype form.</strong> Listing signup is not implemented in this demonstration.
          </span>
        </div>
      </div>

      <div className="modal__foot">
        <button className="btn btn--outline btn--block" type="button" onClick={closeModal}>
          Close
        </button>
      </div>
    </>
  );
}
