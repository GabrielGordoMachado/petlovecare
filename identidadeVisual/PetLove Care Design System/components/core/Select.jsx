import React from 'react';

/**
 * PetLove Care — Select
 * Brand dropdown used in the "Agende agora" modal (filled #d9d9d9) and
 * admin forms (light bordered). Chevron drawn with CSS.
 */
export function Select({
  label,
  theme = 'filled',
  value,
  onChange,
  options = [],
  placeholder,
  id,
  style,
  ...rest
}) {
  const filled = theme === 'filled';
  const [focused, setFocused] = React.useState(false);

  const field = (
    <div style={{ position: 'relative' }}>
      <select
        id={id}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: '100%',
          boxSizing: 'border-box',
          appearance: 'none',
          WebkitAppearance: 'none',
          background: filled ? 'var(--input)' : '#fff',
          border: `2px solid ${focused ? 'var(--coral)' : filled ? 'transparent' : '#cbd5e1'}`,
          borderRadius: 'var(--radius-sm)',
          padding: '11px 40px 11px 14px',
          fontFamily: 'var(--font-body)',
          fontSize: '15px',
          color: value ? 'var(--navy)' : '#7c8696',
          outline: 'none',
          cursor: 'pointer',
          boxShadow: focused ? '0 0 0 4px rgba(255,127,80,0.18)' : 'none',
          transition: 'border-color 0.15s, box-shadow 0.15s',
          ...style,
        }}
        {...rest}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((o) => {
          const val = typeof o === 'string' ? o : o.value;
          const lbl = typeof o === 'string' ? o : o.label;
          return <option key={val} value={val}>{lbl}</option>;
        })}
      </select>
      <span aria-hidden style={{
        position: 'absolute',
        right: '15px',
        top: '50%',
        width: '9px',
        height: '9px',
        borderRight: '2px solid var(--navy)',
        borderBottom: '2px solid var(--navy)',
        transform: 'translateY(-65%) rotate(45deg)',
        pointerEvents: 'none',
        opacity: 0.7,
      }} />
    </div>
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
    </label>
  );
}
