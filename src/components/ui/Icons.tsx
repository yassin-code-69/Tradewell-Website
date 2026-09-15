import React from 'react';
import { ICONS } from '@/data/tradewell';

interface IconProps {
  name: string;
  className?: string;
}

export function Icon({ name, className = '' }: IconProps) {
  const path = ICONS[name] || ICONS.home;
  return (
    <svg
      className={`ico ${className}`}
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={path} />
    </svg>
  );
}

export function ArrowIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      className={`ico ico--sm ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function PinIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      className={`ico ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  );
}

export function PhoneIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      className={`ico ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 3h4l2 5-2.5 1.5a12 12 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2.2 2A17 17 0 0 1 3 5.2 2 2 0 0 1 5 3z" />
    </svg>
  );
}

export function FacebookIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      className={`ico ${className}`}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

export function XMarkIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      className={`ico ico--sm ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function StarRating({ rating }: { rating: number }) {
  const starsArr = [];
  for (let i = 1; i <= 5; i++) {
    let cls = 's-empty';
    if (rating >= i) {
      cls = 's-full';
    } else if (rating >= i - 0.5) {
      cls = 's-half';
    }
    starsArr.push(
      <svg key={i} className={cls} viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2.6l2.9 5.9 6.5.95-4.7 4.6 1.1 6.45L12 17.45 6.2 20.5l1.1-6.45-4.7-4.6 6.5-.95z" />
      </svg>
    );
  }

  return (
    <span className="stars" role="img" aria-label={`${rating} out of 5 stars`}>
      {starsArr}
    </span>
  );
}
