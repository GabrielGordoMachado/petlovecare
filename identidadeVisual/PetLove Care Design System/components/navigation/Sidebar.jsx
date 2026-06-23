import React from 'react';
import { Logo } from '../brand/Logo.jsx';

/**
 * PetLove Care — Sidebar (admin desktop shell navigation)
 * Navy gradient rail: white logo, emoji-led nav items (active = coral),
 * and the logged-in admin block at the bottom.
 */
export function Sidebar({
  items = [
    { id: 'agendamentos', icon: '📅', label: 'Agendamentos' },
    { id: 'servicos', icon: '✂️', label: 'Serviços' },
    { id: 'feedbacks', icon: '💬', label: 'Feedbacks' },
  ],
  active,
  onSelect,
  adminName = 'Admin',
  adminRole = 'Administrador',
  onLogout,
  logoBasePath,
  style,
}) {
  return (
    <aside style={{
      width: 'var(--sidebar-w)',
      flexShrink: 0,
      background: 'linear-gradient(180deg, var(--navy) 0%, var(--navy-deep) 100%)',
      display: 'flex',
      flexDirection: 'column',
      padding: '22px 16px',
      gap: '22px',
      boxSizing: 'border-box',
      ...style,
    }}>
      <div style={{ padding: '4px 8px 2px' }}>
        <Logo variant="lockup" theme="white" height={88} basePath={logoBasePath} style={{ margin: '0 auto' }} />
      </div>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
        {items.map((it) => {
          const on = it.id === active;
          return (
            <button
              key={it.id}
              onClick={() => onSelect && onSelect(it.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '11px 14px',
                border: 'none',
                borderRadius: 'var(--radius-sm)',
                textAlign: 'left',
                cursor: 'pointer',
                fontFamily: 'var(--font-body)',
                fontWeight: 'var(--fw-bold)',
                fontSize: '15px',
                color: on ? '#fff' : 'var(--muted-on-dark)',
                background: on ? 'var(--coral)' : 'transparent',
                boxShadow: on ? 'var(--shadow-coral)' : 'none',
                transition: 'background 0.15s, color 0.15s',
              }}
              onMouseEnter={(e) => { if (!on) { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.color = '#fff'; } }}
              onMouseLeave={(e) => { if (!on) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--muted-on-dark)'; } }}
            >
              <span style={{ fontSize: '17px' }}>{it.icon}</span>{it.label}
            </button>
          );
        })}
      </nav>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '10px',
        borderRadius: 'var(--radius)',
        background: 'rgba(255,255,255,0.05)',
      }}>
        <div style={{
          width: '38px', height: '38px', borderRadius: '50%',
          background: 'var(--teal)', color: '#fff',
          display: 'grid', placeItems: 'center',
          fontFamily: 'var(--font-display)', fontWeight: 'var(--fw-bold)',
        }}>{adminName.charAt(0).toUpperCase()}</div>
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2, flex: 1, minWidth: 0 }}>
          <strong style={{ color: '#fff', fontSize: '14px', fontFamily: 'var(--font-body)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{adminName}</strong>
          <small style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px' }}>{adminRole}</small>
        </div>
        <button onClick={onLogout} title="Sair" style={{
          background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)',
          fontSize: '17px', cursor: 'pointer', padding: '2px 4px',
        }}>⏻</button>
      </div>
    </aside>
  );
}
