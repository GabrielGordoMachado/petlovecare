import React from 'react';

/**
 * PetLove Care — Badge / StatusBadge
 * `status` maps to the appointment lifecycle pill colors from the admin app.
 * Without `status`, renders a neutral coral/teal/navy tag.
 */
const STATUS = {
  agendado:     { bg: 'var(--status-agendado-bg)',   fg: 'var(--status-agendado-fg)',   label: 'Agendado' },
  em_andamento: { bg: 'var(--status-andamento-bg)',  fg: 'var(--status-andamento-fg)',  label: 'Em andamento' },
  finalizado:   { bg: 'var(--status-finalizado-bg)', fg: 'var(--status-finalizado-fg)', label: 'Finalizado' },
  cancelado:    { bg: 'var(--status-cancelado-bg)',  fg: 'var(--status-cancelado-fg)',  label: 'Cancelado' },
};
const TONE = {
  coral: { bg: 'rgba(255,127,80,0.15)', fg: 'var(--coral-dark)' },
  teal:  { bg: 'rgba(44,110,143,0.14)', fg: 'var(--teal)' },
  navy:  { bg: 'var(--navy)', fg: '#fff' },
  neutral: { bg: 'var(--surface)', fg: 'var(--muted)' },
};

export function Badge({ children, status, tone = 'neutral', style }) {
  const s = status ? STATUS[status] : TONE[tone] || TONE.neutral;
  const text = children != null ? children : (status ? STATUS[status]?.label : '');
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      padding: '4px 11px',
      borderRadius: 'var(--radius-pill)',
      fontFamily: 'var(--font-body)',
      fontSize: '12px',
      fontWeight: 'var(--fw-bold)',
      letterSpacing: '0.01em',
      background: s.bg,
      color: s.fg,
      whiteSpace: 'nowrap',
      ...style,
    }}>{text}</span>
  );
}
