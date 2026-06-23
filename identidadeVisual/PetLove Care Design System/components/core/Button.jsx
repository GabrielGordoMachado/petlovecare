import React from 'react';

/**
 * PetLove Care — Button
 * Primary action uses coral; secondary uses teal; danger for destructive;
 * link for the soft text links used under forms.
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  type = 'button',
  disabled = false,
  fullWidth = false,
  onClick,
  style,
  ...rest
}) {
  const palette = {
    primary: { bg: 'var(--coral)', bgHover: 'var(--coral-dark)', fg: '#fff', border: 'transparent' },
    secondary: { bg: 'var(--teal)', bgHover: '#255f7c', fg: '#fff', border: 'transparent' },
    danger: { bg: 'var(--danger)', bgHover: '#b73636', fg: '#fff', border: 'transparent' },
    outline: { bg: 'transparent', bgHover: 'rgba(255,127,80,0.10)', fg: 'var(--coral)', border: 'var(--coral)' },
  };

  const sizes = {
    sm: { padding: '6px 13px', fontSize: '13px' },
    md: { padding: '12px 22px', fontSize: '15px' },
    lg: { padding: '15px 30px', fontSize: '17px' },
  };
  const p = palette[variant] || palette.primary;
  const s = sizes[size] || sizes.md;

  if (variant === 'link') {
    return (
      <button
        type={type}
        disabled={disabled}
        onClick={onClick}
        style={{
          background: 'none',
          border: 'none',
          color: 'var(--teal)',
          fontFamily: 'var(--font-body)',
          fontSize: '14px',
          fontWeight: 'var(--fw-semibold)',
          cursor: disabled ? 'default' : 'pointer',
          padding: '4px 2px',
          textDecoration: 'none',
          filter: 'brightness(1.1)',
          ...style,
        }}
        onMouseDown={(e) => (e.currentTarget.style.transform = 'translateY(1px)')}
        onMouseUp={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
        {...rest}
      >
        {children}
      </button>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        width: fullWidth ? '100%' : 'auto',
        background: p.bg,
        color: p.fg,
        border: `2px solid ${p.border}`,
        borderRadius: 'var(--radius-sm)',
        fontFamily: 'var(--font-display)',
        fontWeight: 'var(--fw-bold)',
        letterSpacing: '0.01em',
        cursor: disabled ? 'default' : 'pointer',
        opacity: disabled ? 0.6 : 1,
        transition: 'background 0.15s ease, transform 0.05s ease, filter 0.15s ease',
        ...s,
        ...style,
      }}
      onMouseEnter={(e) => { if (!disabled && p.bgHover) e.currentTarget.style.background = p.bgHover; }}
      onMouseLeave={(e) => { if (!disabled) e.currentTarget.style.background = p.bg; }}
      onMouseDown={(e) => { if (!disabled) e.currentTarget.style.transform = 'translateY(1px)'; }}
      onMouseUp={(e) => { if (!disabled) e.currentTarget.style.transform = 'translateY(0)'; }}
      {...rest}
    >
      {children}
    </button>
  );
}
