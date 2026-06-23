import * as React from 'react';

export interface SelectOption { value: string; label: string; }

/** Brand dropdown. Options may be strings or {value,label}. */
export interface SelectProps {
  label?: string;
  /** @default "filled" */
  theme?: 'light' | 'filled';
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options?: (string | SelectOption)[];
  placeholder?: string;
  id?: string;
  style?: React.CSSProperties;
}

export function Select(props: SelectProps): JSX.Element;
