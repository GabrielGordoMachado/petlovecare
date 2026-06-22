import * as React from 'react';

export interface SidebarItem { id: string; icon?: string; label: string; }

/**
 * Admin desktop shell sidebar — navy gradient, white lockup, emoji nav,
 * admin user block. Active item is coral.
 *
 * @startingPoint section="Admin" subtitle="Admin shell sidebar" viewport="260x560"
 */
export interface SidebarProps {
  items?: SidebarItem[];
  active?: string;
  onSelect?: (id: string) => void;
  adminName?: string;
  adminRole?: string;
  onLogout?: () => void;
  logoBasePath?: string;
  style?: React.CSSProperties;
}
export function Sidebar(props: SidebarProps): JSX.Element;
