import React from 'react';

/**
 * PetLove Care — Input
 * Two themes: "light" (admin forms on light surfaces — bordered) and
 * "filled" (brand modals over navy — solid #d9d9d9 fill, the Figma style).
 */
export function Input({
  label,
  theme = 'light',
  type = 'text',
  value,
  placeholder,
  onChange,
  id,
  error,
  style,
  ...rest
}) {
  const filled = theme === 'filled';
  const [focused, setFocused] = React.useState(false);

  const field = (
    <input
      id={id}
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        width: '100%',
        boxSizing: 'border-box',
        background: filled ? 'var(--input)' : '#fff',
        border: `2px solid ${error ? 'var(--danger)' : focused ? 'var(--coral)' : filled ? 'transparent' : '#cbd5e1'}`,
        borderRadius: 'var(--radius-sm)',
        padding: '11px 14px',
        fontFamily: 'var(--font-body)',
        fontSize: '15px',
        color: 'var(--navy)',
        outline: 'none',
        boxShadow: focused ? '0 0 0 4px rgba(255,127,80,0.18)' : 'none',
        transition: 'border-color 0.15s, box-shadow 0.15s',
        ...style,
      }}
      {...rest}
    />
  );

  if (!label) return field;
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <span style={{
        fontFamily: 'var(--font-body)',
        fontSize: '13px',
        fontWeight: 'var(--fw-bold)',
        color: filled ? 'var(--muted-on-dark)' : 'var(--muted)',
      }}>{label}</span>
      {field}
      {error && <span style={{ color: 'var(--danger)', fontSize: '12px', fontWeight: 600 }}>{error}</span>}
    </label>
  );
}
