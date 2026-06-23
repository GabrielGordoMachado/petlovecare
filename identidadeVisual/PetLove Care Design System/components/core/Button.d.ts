import * as React from 'react';

/**
 * PetLove Care primary button. Coral = primary action, teal = secondary,
 * danger = destructive, outline = low-emphasis, link = soft text link.
 *
 * @startingPoint section="Core" subtitle="Brand button — coral / teal / danger" viewport="700x200"
 */
export interface ButtonProps {
  children: React.ReactNode;
  /** Visual style. @default "primary" */
  variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'link';
  /** @default "md" */
  size?: 'sm' | 'md' | 'lg';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  fullWidth?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  style?: React.CSSProperties;
}

export function Button(props: ButtonProps): JSX.Element;
