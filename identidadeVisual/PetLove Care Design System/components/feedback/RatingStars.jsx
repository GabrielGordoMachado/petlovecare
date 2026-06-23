import React from 'react';

/** PetLove Care — RatingStars (feedback 1–5, gold). */
export function RatingStars({ value = 0, max = 5, size = 18, style }) {
  const v = Math.max(0, Math.min(max, Math.round(value)));
  return (
    <span style={{ color: 'var(--star)', letterSpacing: '0.08em', fontSize: size + 'px', lineHeight: 1, ...style }}>
      {'★'.repeat(v)}{'☆'.repeat(max - v)}
    </span>
  );
}
