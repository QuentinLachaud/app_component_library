// ─────────────────────────────────────────────────────────────
// Component: Button
// Purpose: Primary interaction element with multiple variants.
// Layer: UI Primitive
// Used by: All interactive flows, CTAs, form submissions.
// ─────────────────────────────────────────────────────────────

import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { forwardRef } from 'react';
import { Loader2 } from 'lucide-react';

// ─── Types ───
export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	/** Visual variant */
	variant?: ButtonVariant;
	/** Size preset */
	size?: ButtonSize;
	/** Icon displayed before the label */
	leftIcon?: ReactNode;
	/** Icon displayed after the label */
	rightIcon?: ReactNode;
	/** Show loading spinner and disable interaction */
	isLoading?: boolean;
	/** Expand to full container width */
	fullWidth?: boolean;
	/** Button content */
	children: ReactNode;
}

// ─── Variant Styles ───
const variantStyles: Record<ButtonVariant, string> = {
	primary: `
    bg-accent-primary text-bg-base
    hover:bg-accent-primary-hover
    active:scale-[0.97]
    shadow-sm hover:shadow-md
  `,
	secondary: `
    bg-transparent text-accent-primary
    border border-accent-primary
    hover:bg-accent-primary-muted
    active:scale-[0.97]
  `,
	ghost: `
    bg-transparent text-text-secondary
    hover:bg-bg-hover hover:text-text-primary
    active:scale-[0.97]
  `,
};

// ─── Size Styles ───
const sizeStyles: Record<ButtonSize, string> = {
	sm: 'px-3 py-1.5 text-xs gap-1.5',
	md: 'px-4 py-2 text-sm gap-2',
	lg: 'px-6 py-3 text-base gap-2.5',
};

// ─── Component ───
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	function Button(
		{
			variant = 'primary',
			size = 'md',
			leftIcon,
			rightIcon,
			isLoading = false,
			fullWidth = false,
			disabled,
			className = '',
			children,
			...props
		},
		ref
	) {
		const isDisabled = disabled || isLoading;

		return (
			<button
				ref={ref}
				disabled={isDisabled}
				className={`
          inline-flex items-center justify-center
          font-medium
          rounded-md
          transition-all duration-[var(--transition-fast)]
          focus:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base
          disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none
          ${variantStyles[variant]}
          ${sizeStyles[size]}
          ${fullWidth ? 'w-full' : ''}
          ${className}
        `}
				{...props}
			>
				{/* Loading Spinner - replaces left icon when loading */}
				{isLoading ? (
					<Loader2 size={size === 'sm' ? 14 : size === 'md' ? 16 : 18} className="animate-spin" />
				) : leftIcon ? (
					<span className="flex-shrink-0">{leftIcon}</span>
				) : null}

				{/* Label */}
				<span>{children}</span>

				{/* Right Icon */}
				{rightIcon && !isLoading && (
					<span className="flex-shrink-0">{rightIcon}</span>
				)}
			</button>
		);
	}
);
