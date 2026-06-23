import React from 'react';

/** PetLove Care — generic white surface card (shadow + rounded). */
export function Card({ children, padding = 'var(--space-5)', style }) {
  return (
    <div style={{
      background: 'var(--surface-card)',
      border: '1px solid var(--line)',
      borderRadius: 'var(--radius)',
      boxShadow: 'var(--shadow)',
      padding,
      ...style,
    }}>{children}</div>
  );
}
