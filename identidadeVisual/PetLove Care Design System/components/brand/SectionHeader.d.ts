import * as React from 'react';

/**
 * Navy section-header band with a bright-teal rule, used to open marketing
 * sections (Sobre nós, Nossos serviços, Contato).
 *
 * @startingPoint section="Brand" subtitle="Navy section header band" viewport="900x180"
 */
export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  style?: React.CSSProperties;
}

export function SectionHeader(props: SectionHeaderProps): JSX.Element;
