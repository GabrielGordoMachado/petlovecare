import React from 'react';
import { Logo } from '../brand/Logo.jsx';
import { Button } from '../core/Button.jsx';

/**
 * PetLove Care — NavBar (marketing site top navigation)
 * Light bar: brand mark, centered links, coral "Agende" CTA.
 */
export function NavBar({
  links = ['Início', 'Serviços', 'Sobre nós', 'Contato'],
  active = 'Início',
  onNavigate,
  onAgendar,
  logoBasePath,
  style,
}) {
  return (
    <header style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '24px',
      padding: '16px clamp(20px, 5vw, 64px)',
      background: 'var(--bg-light)',
      ...style,
    }}>
      <Logo variant="wordmark" theme="color" height={34} basePath={logoBasePath} />
      <nav style={{ display: 'flex', alignItems: 'center', gap: 'clamp(16px, 3vw, 40px)' }}>
        {links.map((l) => (
          <a
            key={l}
            href="#"
            onClick={(e) => { e.preventDefault(); onNavigate && onNavigate(l); }}
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: l === active ? 'var(--fw-semibold)' : 'var(--fw-medium)',
              fontSize: '20px',
              color: 'var(--navy)',
              textDecoration: 'none',
              borderBottom: l === active ? '3px solid var(--coral)' : '3px solid transparent',
              paddingBottom: '2px',
              transition: 'border-color 0.15s, color 0.15s',
            }}
          >{l}</a>
        ))}
      </nav>
      <Button variant="primary" size="md" onClick={onAgendar}>Agende</Button>
    </header>
  );
}
