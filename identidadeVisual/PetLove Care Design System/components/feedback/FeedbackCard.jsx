import React from 'react';
import { RatingStars } from './RatingStars.jsx';

/**
 * PetLove Care — FeedbackCard
 * The admin feedback tile: client name + rating header, the comment, then
 * either the admin's reply (teal-bordered note) or a reply box.
 */
export function FeedbackCard({ name = 'Cliente', rating = 5, comment, response, style }) {
  return (
    <article style={{
      border: '1px solid var(--line)',
      borderRadius: 'var(--radius)',
      padding: '18px',
      background: 'var(--surface-card)',
      boxShadow: 'var(--shadow)',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      ...style,
    }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
        <strong style={{ fontFamily: 'var(--font-display)', fontWeight: 'var(--fw-bold)', color: 'var(--navy)', fontSize: '16px' }}>{name}</strong>
        <RatingStars value={rating} size={16} />
      </header>
      <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: '15px', color: 'var(--text)', lineHeight: 1.5 }}>{comment}</p>
      {response && (
        <p style={{
          margin: 0,
          background: 'var(--surface)',
          padding: '10px 12px',
          borderRadius: 'var(--radius-sm)',
          fontSize: '14px',
          color: 'var(--text)',
          borderLeft: '3px solid var(--teal)',
          lineHeight: 1.45,
        }}>
          <strong style={{ color: 'var(--teal)' }}>Resposta: </strong>{response}
        </p>
      )}
    </article>
  );
}
