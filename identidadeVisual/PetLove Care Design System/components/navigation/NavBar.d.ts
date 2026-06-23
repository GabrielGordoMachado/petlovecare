import * as React from 'react';

/**
 * Marketing top navigation — brand wordmark, centered links, coral CTA.
 *
 * @startingPoint section="Marketing" subtitle="Site top navigation" viewport="1100x90"
 */
export interface NavBarProps {
  links?: string[];
  active?: string;
  onNavigate?: (link: string) => void;
  onAgendar?: () => void;
  logoBasePath?: string;
  style?: React.CSSProperties;
}
export function NavBar(props: NavBarProps): JSX.Element;
