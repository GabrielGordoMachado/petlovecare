import * as React from 'react';

/**
 * Admin feedback tile — client name + rating, comment, optional admin reply.
 *
 * @startingPoint section="Admin" subtitle="Feedback card" viewport="320x220"
 */
export interface FeedbackCardProps {
  name?: string;
  /** 1–5. @default 5 */
  rating?: number;
  comment: string;
  /** When set, shows the admin's reply note instead of a reply box. */
  response?: string;
  style?: React.CSSProperties;
}
export function FeedbackCard(props: FeedbackCardProps): JSX.Element;
