import * as React from 'react';

/**
 * Coral service panel (TOSA / BANHO) from the marketing site.
 *
 * @startingPoint section="Marketing" subtitle="Coral service card" viewport="380x420"
 */
export interface ServiceCardProps {
  title: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}
export function ServiceCard(props: ServiceCardProps): JSX.Element;
