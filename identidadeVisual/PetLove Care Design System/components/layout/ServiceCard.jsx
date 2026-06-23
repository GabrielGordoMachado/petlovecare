import React from 'react';

/**
 * PetLove Care — ServiceCard
 * The coral service panel from the marketing site (TOSA / BANHO): a coral
 * fill, navy uppercase display title, navy body copy, centered.
 */
export function ServiceCard({ title, children, style }) {
  return (
    <div style={{
      background: 'var(--coral)',
      borderRadius: 'var(--radius)',
      padding: '40px 34px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '20px',
      textAlign: 'center',
      ...style,
    }}>
      <h3 style={{
        margin: 0,
        fontFamily: 'var(--font-display)',
        fontWeight: 'var(--fw-extra)',
        fontSize: '34px',
        letterSpacing: '0.02em',
        color: 'var(--navy)',
      }}>{title}</h3>
      <p style={{
        margin: 0,
        fontFamily: 'var(--font-body)',
        fontWeight: 'var(--fw-bold)',
        fontSize: '16px',
        lineHeight: 1.55,
        color: 'var(--navy)',
        textWrap: 'pretty',
      }}>{children}</p>
    </div>
  );
}
