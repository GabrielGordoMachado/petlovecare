import type { CSSProperties } from 'react';

/*
 * PetLove Care — RatingStars
 * Régua de 5 estrelas douradas para exibir uma nota (0–5). Suporta nota
 * fracionada (ex.: 4.5) preenchendo parte da última estrela. Só leitura.
 */

interface RatingStarsProps {
  value?: number;
  /** Tamanho de cada estrela, em px. */
  size?: number;
  style?: CSSProperties;
}

const DOURADO = '#f6a609';

export function RatingStars({ value = 5, size = 16, style }: RatingStarsProps) {
  const nota = Math.max(0, Math.min(5, value));

  return (
    <span
      role="img"
      aria-label={`${nota} de 5 estrelas`}
      style={{ display: 'inline-flex', gap: '2px', lineHeight: 1, ...style }}
    >
      {Array.from({ length: 5 }, (_, i) => {
        // Quanto desta estrela está preenchido: 0, parcial ou 1.
        const preenchimento = Math.max(0, Math.min(1, nota - i));
        return (
          <span
            key={i}
            aria-hidden="true"
            style={{
              position: 'relative',
              display: 'inline-block',
              width: size + 'px',
              height: size + 'px',
              fontSize: size + 'px',
              color: 'var(--cor-borda)', // estrela "vazia"
            }}
          >
            ★
            <span
              style={{
                position: 'absolute',
                inset: 0,
                width: preenchimento * 100 + '%',
                overflow: 'hidden',
                color: DOURADO,
              }}
            >
              ★
            </span>
          </span>
        );
      })}
    </span>
  );
}
