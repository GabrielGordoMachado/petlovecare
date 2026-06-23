import React from 'react';

/**
 * PetLove Care — Logo
 * Renders the paw-heart + cat brand mark. Three lockups × two color themes.
 *  - variant: "lockup" (mark + PETLOVE CARE), "mark" (icon only), "wordmark" (text only)
 *  - theme: "color" (teal paw / coral+teal text — for light bg)
 *           "white" (all white — for navy / dark bg)
 * Assets live in the design-system /assets folder. `basePath` defaults to
 * "../../assets/" which resolves from any component card or ui_kit/<x>/ page;
 * override it if you mount the logo somewhere else.
 */
const FILES = {
  'lockup-color':   'logo-lockup.png',
  'mark-color':     'logo-mark.png',
  'wordmark-color': 'logo-wordmark-text.png',
  'lockup-white':   'logo-lockup-white.png',
  'mark-white':     'logo-mark-white.png',
  'wordmark-white': 'logo-wordmark-white.png',
};

export function Logo({ variant = 'lockup', theme = 'color', height, basePath = '../../assets/', style, alt = 'PetLove Care' }) {
  const file = FILES[`${variant}-${theme}`] || FILES['lockup-color'];
  const defaultH = variant === 'wordmark' ? 44 : variant === 'mark' ? 56 : 72;
  return (
    <img
      src={basePath + file}
      alt={alt}
      style={{
        height: (height || defaultH) + (typeof (height || defaultH) === 'number' ? 'px' : ''),
        width: 'auto',
        display: 'block',
        ...style,
      }}
    />
  );
}
