'use client';

import React from 'react';
import { useDirectory } from '@/context/DirectoryContext';

export function Toast() {
  const { toastMessage } = useDirectory();

  return (
    <div
      className={`toast ${toastMessage ? 'is-open' : ''}`}
      id="toast"
      role="status"
      aria-live="polite"
    >
      <svg
        className="ico"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="m5 13 4 4L19 7" />
      </svg>
      <span id="toastText">{toastMessage}</span>
    </div>
  );
}
