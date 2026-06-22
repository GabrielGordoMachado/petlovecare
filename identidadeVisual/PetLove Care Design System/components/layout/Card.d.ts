import * as React from 'react';

export interface CardProps {
  children: React.ReactNode;
  /** CSS padding. @default "var(--space-5)" */
  padding?: string;
  style?: React.CSSProperties;
}
export function Card(props: CardProps): JSX.Element;
