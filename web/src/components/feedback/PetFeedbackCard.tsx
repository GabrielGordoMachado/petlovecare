import type { CSSProperties } from 'react';

import { RatingStars } from './RatingStars';

/*
 * PetLove Care — PetFeedbackCard
 * Card de avaliação construído em torno da FOTO do pet. A foto tem altura
 * controlada e o conteúdo (tutor + estrelas douradas + comentário completo)
 * domina o card sobre fundo branco. Tag de serviço + data opcionais.
 *
 * Os tokens do Design System (--teal, --navy, --font-display…) são mapeados
 * para os tokens em português deste projeto (ver styles/tokens.css).
 */

interface PetFeedbackCardProps {
  photo?: string;
  petName?: string;
  tutor?: string;
  rating?: number;
  comment?: string;
  service?: string;
  date?: string;
  /** Altura fixa da foto, em px (usada quando não há photoAspect/cardAspect). */
  photoHeight?: number;
  /** Proporção só da foto (sobrepõe photoHeight). */
  photoAspect?: string;
  /** Proporção do CARD inteiro (a foto preenche o espaço restante). */
  cardAspect?: string;
  style?: CSSProperties;
}

export function PetFeedbackCard({
  photo,
  petName,
  tutor = 'Tutor(a)',
  rating = 5,
  comment,
  service,
  date,
  photoHeight = 180,
  photoAspect = '4/5',
  cardAspect,
  style,
}: PetFeedbackCardProps) {
  const initial = (tutor || 'T').trim().charAt(0).toUpperCase();
  const photoBox: CSSProperties = cardAspect
    ? { flex: 1, minHeight: 0 }
    : photoAspect
      ? { aspectRatio: photoAspect, width: '100%' }
      : { height: photoHeight + 'px' };

  return (
    <article
      style={{
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'left', // não herda o text-align do contexto (ex.: seção centralizada)
        ...(cardAspect ? { aspectRatio: cardAspect } : {}),
        background: 'var(--cor-fundo)',
        border: '1px solid var(--cor-borda)',
        borderRadius: 'var(--raio-md)',
        boxShadow: 'var(--sombra-sm)',
        overflow: 'hidden',
        ...style,
      }}
    >
      {/* Foto — preenche o espaço quando cardAspect; senão 4:5 retrato */}
      <div
        style={{
          position: 'relative',
          ...photoBox,
          flexShrink: 0,
          background: 'var(--cor-fundo-alt)',
        }}
      >
        {photo ? (
          <img
            src={photo}
            alt={petName ? `Foto de ${petName}` : 'Foto do pet'}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'grid',
              placeItems: 'center',
              color: 'var(--cor-texto-suave)',
              fontSize: '30px',
            }}
          >
            🐾
          </div>
        )}
        {petName && (
          <span
            style={{
              position: 'absolute',
              left: '12px',
              bottom: '12px',
              background: 'rgba(30,41,59,0.82)',
              color: '#fff',
              padding: '4px 12px',
              borderRadius: 'var(--raio-pill)',
              fontFamily: 'var(--fonte-titulo)',
              fontWeight: 'var(--peso-bold)',
              fontSize: '13px',
              backdropFilter: 'blur(2px)',
            }}
          >
            {petName}
          </span>
        )}
      </div>

      {/* Conteúdo da avaliação — o protagonista */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          padding: '16px 18px 18px',
        }}
      >
        <header style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              flexShrink: 0,
              background: 'var(--cor-secundaria)',
              color: '#fff',
              display: 'grid',
              placeItems: 'center',
              fontFamily: 'var(--fonte-titulo)',
              fontWeight: 'var(--peso-bold)',
              fontSize: '15px',
            }}
          >
            {initial}
          </span>
          <div style={{ minWidth: 0, flex: 1 }}>
            <strong
              style={{
                display: 'block',
                fontFamily: 'var(--fonte-titulo)',
                fontWeight: 'var(--peso-bold)',
                color: 'var(--cor-escura)',
                fontSize: '15px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {tutor}
            </strong>
            <RatingStars value={rating} size={15} />
          </div>
        </header>

        <p
          style={{
            margin: 0,
            fontFamily: 'var(--fonte-corpo)',
            fontSize: '14.5px',
            lineHeight: 1.5,
            color: 'var(--cor-texto)',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textWrap: 'pretty',
          }}
        >
          {comment}
        </p>

        {(service || date) && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '8px',
              marginTop: '2px',
            }}
          >
            {service && (
              <span
                style={{
                  background: 'rgba(255,127,80,0.14)',
                  color: 'var(--cor-primaria-hover)',
                  padding: '3px 10px',
                  borderRadius: 'var(--raio-pill)',
                  fontFamily: 'var(--fonte-corpo)',
                  fontWeight: 'var(--peso-bold)',
                  fontSize: '12px',
                }}
              >
                {service}
              </span>
            )}
            {date && (
              <span
                style={{
                  fontFamily: 'var(--fonte-corpo)',
                  fontSize: '12px',
                  color: 'var(--cor-texto-suave)',
                }}
              >
                {date}
              </span>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
