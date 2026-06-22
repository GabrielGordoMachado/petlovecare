import React from 'react';

/**
 * PetLove Care — Textarea (e.g. "Observações" field, feedback replies).
 */
export function Textarea({ label, theme = 'light', value, placeholder, onChange, rows = 4, id, style, ...rest }) {
  const filled = theme === 'filled';
  const [focused, setFocused] = React.useState(false);
  const field = (
    <textarea
      id={id}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      rows={rows}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        width: '100%',
        boxSizing: 'border-box',
        resize: 'vertical',
        background: filled ? 'var(--input)' : '#fff',
        border: `2px solid ${focused ? 'var(--teal)' : filled ? 'transparent' : '#cbd5e1'}`,
        borderRadius: 'var(--radius)',
        padding: '12px 14px',
        fontFamily: 'var(--font-body)',
        fontSize: '15px',
        color: 'var(--navy)',
        outline: 'none',
        transition: 'border-color 0.15s',
        ...style,
      }}
      {...rest}
    />
  );
  if (!label) return field;
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 'var(--fw-bold)', color: filled ? 'var(--muted-on-dark)' : 'var(--muted)' }}>{label}</span>
      {field}
    </label>
  );
}
