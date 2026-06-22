import * as React from 'react';

/**
 * PetLove Care brand mark (paw-heart + cat silhouette).
 *
 * @startingPoint section="Brand" subtitle="Logo lockups — color & white" viewport="700x200"
 */
export interface LogoProps {
  /** @default "lockup" */
  variant?: 'lockup' | 'mark' | 'wordmark';
  /** color = for light bg, white = for navy/dark bg. @default "color" */
  theme?: 'color' | 'white';
  /** Pixel height (number) or any CSS length. */
  height?: number | string;
  /** Path to the /assets folder relative to the page. @default "../../assets/" */
  basePath?: string;
  alt?: string;
  style?: React.CSSProperties;
}

export function Logo(props: LogoProps): JSX.Element;
