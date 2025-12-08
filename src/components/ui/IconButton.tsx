// ─────────────────────────────────────────────────────────────
// Component: IconButton
// Purpose: Square icon-only button for toolbars and compact UIs.
// Layer: UI Primitive
// Used by: Panel headers, toolbars, close buttons, navigation.
// Dependencies: Button (shares variant logic).
// ─────────────────────────────────────────────────────────────

import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { forwardRef } from 'react';

// ─── Types ───
export type IconButtonVariant = 'primary' | 'secondary' | 'ghost';
export type IconButtonSize = 'sm' | 'md' | 'lg';

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	/** The icon element to display */
	icon: ReactNode;
	/** Accessible label (required for screen readers) */
	label: string;
	/** Visual variant */
	variant?: IconButtonVariant;
	/** Size preset */
	size?: IconButtonSize;
	/** Show loading state */
	isLoading?: boolean;
}

// ─── Variant Styles ───
const variantStyles: Record<IconButtonVariant, string> = {
	primary: `
    bg-accent-primary text-bg-base
    hover:bg-accent-primary-hover
    active:scale-[0.95]
  `,
	secondary: `
    bg-transparent text-accent-primary
    border border-accent-primary
    hover:bg-accent-primary-muted
    active:scale-[0.95]
  `,
	ghost: `
    bg-transparent text-text-muted
    hover:bg-bg-hover hover:text-text-primary
    active:scale-[0.95]
  `,
};

// ─── Size Styles ───
const sizeStyles: Record<IconButtonSize, { button: string; icon: number }> = {
	sm: { button: 'w-7 h-7', icon: 14 },
	md: { button: 'w-9 h-9', icon: 18 },
	lg: { button: 'w-11 h-11', icon: 22 },
};

// ─── Component ───
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
	function IconButton(
		{
			icon,
			label,
			variant = 'ghost',
			size = 'md',
			isLoading = false,
			disabled,
			className = '',
			...props
		},
		ref
	) {
		const isDisabled = disabled || isLoading;
		const sizeConfig = sizeStyles[size];

		return (
			<button
				ref={ref}
				disabled={isDisabled}
				aria-label={label}
				title={label}
				className={`
          inline-flex items-center justify-center
          rounded-md
          transition-all duration-[var(--transition-fast)]
          focus:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base
          disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none
          ${variantStyles[variant]}
          ${sizeConfig.button}
          ${className}
        `}
				{...props}
			>
				{/* Loading spinner or icon */}
				{isLoading ? (
					<span className="animate-spin">⟳</span>
				) : (
					icon
				)}
			</button>
		);
	}
);
