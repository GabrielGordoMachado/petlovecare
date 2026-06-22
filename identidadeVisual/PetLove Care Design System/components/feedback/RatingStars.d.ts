import * as React from 'react';

export interface RatingStarsProps {
  /** 0–max filled stars. */
  value?: number;
  /** @default 5 */
  max?: number;
  /** Star font-size in px. @default 18 */
  size?: number;
  style?: React.CSSProperties;
}
export function RatingStars(props: RatingStarsProps): JSX.Element;
