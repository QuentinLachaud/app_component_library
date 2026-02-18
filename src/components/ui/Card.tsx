// ─────────────────────────────────────────────────────────────
// Component: Card
// Purpose: Simple container for content grouping without panel complexity.
// Layer: UI Primitive
// Used by: Simple content grouping, lists, grids throughout the application.
// ─────────────────────────────────────────────────────────────

import type { HTMLAttributes, ReactNode } from 'react';

// ─── Types ───
export type CardVariant = 'default' | 'elevated' | 'outlined';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
	/** Visual variant */
	variant?: CardVariant;
	/** Padding preset */
	padding?: CardPadding;
	/** Content to display in the card */
	children: ReactNode;
	/** Whether the card should be hoverable with visual feedback */
	hoverable?: boolean;
	/** Whether the card should be clickable (adds cursor pointer) */
	clickable?: boolean;
}

// ─── Variant Styles ───
const variantStyles: Record<CardVariant, string> = {
	default: 'bg-bg-surface border border-border-default',
	elevated: 'bg-bg-surface shadow-md',
	outlined: 'bg-transparent border border-border-default',
};

// ─── Padding Styles ───
const paddingStyles: Record<CardPadding, string> = {
	none: '',
	sm: 'p-3',
	md: 'p-4',
	lg: 'p-6',
};

// ─── Component ───
export function Card({
	variant = 'default',
	padding = 'md',
	hoverable = false,
	clickable = false,
	children,
	className = '',
	...props
}: CardProps) {
	return (
		<div
			className={`
        rounded-lg
        transition-all duration-[var(--transition-fast)]
        ${variantStyles[variant]}
        ${paddingStyles[padding]}
        ${hoverable ? 'hover:shadow-lg hover:scale-[1.01]' : ''}
        ${clickable ? 'cursor-pointer' : ''}
        ${className}
      `}
			{...props}
		>
			{children}
		</div>
	);
}
