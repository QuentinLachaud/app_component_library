// ─────────────────────────────────────────────────────────────
// Component: Badge
// Purpose: Small label/tag for status indicators, counts, and labels.
// Layer: UI Primitive
// Used by: Status indicators, counts, tags, categories throughout the application.
// ─────────────────────────────────────────────────────────────

import type { HTMLAttributes, ReactNode } from 'react';

// ─── Types ───
export type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';
export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
	/** Visual variant */
	variant?: BadgeVariant;
	/** Size preset */
	size?: BadgeSize;
	/** Content to display in the badge */
	children: ReactNode;
	/** Whether to use outlined style */
	outlined?: boolean;
}

// ─── Variant Styles ───
const variantStyles: Record<BadgeVariant, { solid: string; outlined: string }> = {
	default: {
		solid: 'bg-bg-muted text-text-primary',
		outlined: 'border-border-default text-text-primary',
	},
	primary: {
		solid: 'bg-accent-primary text-white',
		outlined: 'border-accent-primary text-accent-primary',
	},
	success: {
		solid: 'bg-success text-white',
		outlined: 'border-success text-success',
	},
	warning: {
		solid: 'bg-warning text-text-primary',
		outlined: 'border-warning text-warning',
	},
	error: {
		solid: 'bg-error text-white',
		outlined: 'border-error text-error',
	},
	info: {
		solid: 'bg-accent-secondary text-white',
		outlined: 'border-accent-secondary text-accent-secondary',
	},
};

// ─── Size Styles ───
const sizeStyles: Record<BadgeSize, string> = {
	sm: 'px-1.5 py-0.5 text-[10px] leading-tight',
	md: 'px-2 py-1 text-xs',
	lg: 'px-2.5 py-1 text-sm',
};

// ─── Component ───
export function Badge({
	variant = 'default',
	size = 'md',
	outlined = false,
	children,
	className = '',
	...props
}: BadgeProps) {
	const styles = outlined ? variantStyles[variant].outlined : variantStyles[variant].solid;

	return (
		<span
			className={`
        inline-flex items-center justify-center
        font-medium
        rounded-md
        whitespace-nowrap
        ${outlined ? 'border bg-transparent' : ''}
        ${styles}
        ${sizeStyles[size]}
        ${className}
      `}
			{...props}
		>
			{children}
		</span>
	);
}
