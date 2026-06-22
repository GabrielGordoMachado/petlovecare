import React from 'react';

/**
 * PetLove Care — SectionHeader
 * The navy band that opens every marketing section: a bright-teal rule,
 * a big white display title on the left, and a muted subtitle on the right.
 */
export function SectionHeader({ title, subtitle, style }) {
  return (
    <div style={{
      background: 'var(--navy)',
      padding: '40px clamp(24px, 6vw, 96px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '40px',
      flexWrap: 'wrap',
      ...style,
    }}>
      <div style={{ display: 'flex', alignItems: 'stretch', gap: '18px' }}>
        <span aria-hidden style={{ width: '5px', borderRadius: '3px', background: 'var(--teal-bright)', alignSelf: 'stretch' }} />
        <h2 style={{
          margin: 0,
          fontFamily: 'var(--font-display)',
          fontWeight: 'var(--fw-bold)',
          fontSize: 'clamp(28px, 4vw, 44px)',
          letterSpacing: 'var(--ls-display)',
          color: 'var(--white)',
          lineHeight: 1.05,
        }}>{title}</h2>
      </div>
      {subtitle && (
        <p style={{
          margin: 0,
          maxWidth: '460px',
          textAlign: 'right',
          fontFamily: 'var(--font-body)',
          fontSize: '17px',
          lineHeight: 1.4,
          color: 'var(--muted-on-dark)',
        }}>{subtitle}</p>
      )}
    </div>
  );
}
