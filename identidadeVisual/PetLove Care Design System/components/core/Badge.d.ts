import * as React from 'react';

/**
 * Pill badge. Pass `status` for an appointment-lifecycle pill (auto label),
 * or `tone` for a neutral/brand tag.
 */
export interface BadgeProps {
  children?: React.ReactNode;
  status?: 'agendado' | 'em_andamento' | 'finalizado' | 'cancelado';
  /** @default "neutral" */
  tone?: 'coral' | 'teal' | 'navy' | 'neutral';
  style?: React.CSSProperties;
}

export function Badge(props: BadgeProps): JSX.Element;
