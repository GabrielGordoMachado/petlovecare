import * as React from 'react';

export interface TextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'style'> {
  label?: string;
  /** @default "light" */
  theme?: 'light' | 'filled';
  style?: React.CSSProperties;
}

export function Textarea(props: TextareaProps): JSX.Element;
