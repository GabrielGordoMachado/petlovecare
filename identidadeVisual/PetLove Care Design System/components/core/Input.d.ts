import * as React from 'react';

/**
 * Text input. `light` theme for admin forms (bordered on white);
 * `filled` theme for brand modals over navy (solid #d9d9d9 fill).
 */
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'style'> {
  label?: string;
  /** @default "light" */
  theme?: 'light' | 'filled';
  error?: string;
  style?: React.CSSProperties;
}

export function Input(props: InputProps): JSX.Element;
